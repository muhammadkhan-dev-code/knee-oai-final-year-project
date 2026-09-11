import base64
import cv2
import numpy as np
from tensorflow.keras.applications.efficientnet import preprocess_input as effnet_preprocess
from tensorflow.keras.applications.mobilenet_v3 import preprocess_input as mobnet_preprocess
from tensorflow.keras.applications.densenet import preprocess_input as densenet_preprocess
import tensorflow as tf
from ultralytics import YOLO
from decouple import config

classifier_path = config("classifier_path")
detector_path = config("detector_path")
last_conv_layer_name = config("last_conv_layer_name")
base_layer = config("base_layer")

model = tf.keras.models.load_model(classifier_path)
model_YOLO = YOLO(detector_path)


def apply_clahe(img):        

    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))    
    enhanced = clahe.apply(img)
    result = cv2.cvtColor(enhanced, cv2.COLOR_GRAY2RGB)
    return result.astype(np.float32)



def get_roi(image):
    results = model_YOLO(image)
    
    if len(results[0].boxes) == 0:
        
        return image

    box = results[0].boxes[0]
    
    x1, y1, x2, y2 = map(int, box.xyxy[0])

    img_crop = image[y1:y2, x1:x2]

    if img_crop.size == 0:
        return image

    return img_crop

def predict(img):    
    img_array = apply_clahe(img)
    img_array = img_array[np.newaxis, ...]
    if(model.layers[0].name == "densenet121"):
        img_array = effnet_preprocess(img_array.copy())    
    elif(model.layers[0].name == "MobileNetV3Small"):
        img_array = mobnet_preprocess(img_array.copy())    
    else:
        img_array = effnet_preprocess(img_array.copy())    
    # ── Predict ──
    y_pred = model.predict(img_array)[0]    
    return y_pred

def build_logit_classifier(model):
    """Rebuild classifier_model but output logits instead of softmax probabilities"""
    
    classifier_input = tf.keras.Input(shape=model.get_layer("efficientnetb0")
                                      .get_layer("top_conv").output.shape[1:])
    x = classifier_input
    found = False
    for layer in model.layers:
        if found:
            # ── For the final Dense layer, strip softmax ──
            if isinstance(layer, tf.keras.layers.Dense):
                # Reuse weights but no activation
                logit_layer = tf.keras.layers.Dense(
                    units=layer.units,
                    activation=None,          # ← strip softmax
                    use_bias=layer.use_bias,
                )
                x = logit_layer(x)
                logit_layer.set_weights(layer.get_weights())  # copy trained weights
            else:
                x = layer(x)
        if layer.name == "efficientnetb0":
            found = True

    return tf.keras.models.Model(inputs=classifier_input, outputs=x)

def make_scorecam_heatmap(img_array, max_channels=64):

    base_model = model.get_layer(base_layer)
    last_conv_layer = base_model.get_layer(last_conv_layer_name)

    conv_model = tf.keras.models.Model(
        inputs=base_model.input,
        outputs=last_conv_layer.output
    )

    # ← Use logit classifier instead of softmax classifier
    classifier_model = build_logit_classifier(model)

    feature_maps = conv_model(img_array).numpy()[0]
    H, W, C = feature_maps.shape
    input_H, input_W = img_array.shape[1], img_array.shape[2]

    baseline_conv  = conv_model(img_array)
    baseline_logits = classifier_model(baseline_conv).numpy()[0]
    pred_index     = int(np.argmax(baseline_logits))

    print(f"[ScoreCAM] Baseline logits: {baseline_logits}")  # Should NOT be 0 or 1 now

    channel_indices = np.linspace(0, C - 1, min(max_channels, C), dtype=int)
    raw_scores = []

    for i in channel_indices:
        fmap = feature_maps[:, :, i]

        fmin, fmax = fmap.min(), fmap.max()
        if fmax - fmin < 1e-8:
            raw_scores.append(0.0)
            continue

        mask = (fmap - fmin) / (fmax - fmin)
        mask_resized = cv2.resize(mask, (input_W, input_H))
        mask_resized = mask_resized[np.newaxis, :, :, np.newaxis]

        masked_input = img_array * mask_resized
        masked_conv  = conv_model(masked_input)

        # ← logits here too
        masked_logits = classifier_model(masked_conv).numpy()[0]
        raw_scores.append(float(masked_logits[pred_index]))

    raw_scores = np.array(raw_scores)
    print(f"[ScoreCAM] Logit scores min={raw_scores.min():.4f}, max={raw_scores.max():.4f}, std={raw_scores.std():.4f}")

    score_min   = raw_scores.min()
    score_max   = raw_scores.max()
    score_range = score_max - score_min

    if score_range < 1e-6:
        print("[ScoreCAM] Still flat — using raw activation magnitudes")
        heatmap = np.mean(np.maximum(feature_maps, 0), axis=-1)
    else:
        normalized_scores = (raw_scores - score_min) / score_range
        heatmap = np.zeros((H, W), dtype=np.float32)
        for idx, ch_idx in enumerate(channel_indices):
            heatmap += normalized_scores[idx] * feature_maps[:, :, ch_idx]
        heatmap = np.maximum(heatmap, 0)

    if heatmap.max() > 0:
        heatmap /= heatmap.max()

    return heatmap

def overlay_heatmap(img_rgb, heatmap, alpha=0.4):
    
    orig_h, orig_w = img_rgb.shape[:2]  
    
    
    img_resized = cv2.resize(img_rgb, (224, 224))
    img_bgr = cv2.cvtColor(img_resized, cv2.COLOR_RGB2BGR)

    heatmap_resized = cv2.resize(heatmap, (224, 224))
    heatmap_uint8 = np.uint8(255 * heatmap_resized)
    heatmap_colored = cv2.applyColorMap(heatmap_uint8, cv2.COLORMAP_JET)

    superimposed = cv2.addWeighted(img_bgr, 1 - alpha, heatmap_colored, alpha, 0)
    superimposed = cv2.cvtColor(superimposed, cv2.COLOR_BGR2RGB)

    
    superimposed = cv2.resize(superimposed, (orig_w, orig_h))

    return superimposed
def convert_to_base64(img):
    _, buffer = cv2.imencode('.jpg', img)
    return base64.b64encode(buffer).decode('utf-8')