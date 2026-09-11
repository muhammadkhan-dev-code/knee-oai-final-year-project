
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from database.schema import PredictionResponse
from fastapi import UploadFile, File
import cv2
import numpy as np
from .utils import get_roi,predict,make_scorecam_heatmap,overlay_heatmap,convert_to_base64


router = APIRouter()

@router.post("/predict", response_model=PredictionResponse)
async def predict_grade(image: UploadFile = File(...)):
    try:
        class_labels = ["kl0_kl1", "kl2_kl3", "kl4"]
        
        contents = await image.read()
        nparr = np.frombuffer(contents, np.uint8)
        img_gray = cv2.imdecode(nparr, cv2.IMREAD_GRAYSCALE)
        
        img_rgb = cv2.cvtColor(img_gray, cv2.COLOR_GRAY2RGB)
        if img_gray is None:
            raise ValueError("Failed to decode image — invalid or corrupted file")    
        
        img_crop = get_roi(img_gray)        
        img_resized = cv2.resize(img_crop, (224, 224))
        img_heatmap = cv2.resize(img_rgb, (224, 224))
        y_pred = predict(img_resized)
        
        prediction_idx = int(np.argmax(y_pred))
        predicted_category = class_labels[prediction_idx]
        confidence = round(float(np.max(y_pred)), 4)
        
        class_probs = {
            label: round(float(prob), 4)
            for label, prob in zip(class_labels, y_pred)
        }                

        heatmap = make_scorecam_heatmap(img_heatmap[np.newaxis,...])
        result_img = overlay_heatmap(img_gray, heatmap)
        converted_img = convert_to_base64(result_img)
        return JSONResponse(status_code=200, content={
            "predicted_category": predicted_category,
            "confidence": confidence,
            "class_probabilities": class_probs,
            "heatmap": converted_img
        })
    except Exception as e:
        return JSONResponse(status_code=500, content=str(e))    
