const API_URL = import.meta.env.VITE_API_URL;

export async function predictImage(imageFile) {
  const formData = new FormData();

  // backend (predict/route.py) expects the upload field to be named "image"
  formData.append("image", imageFile);

  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      typeof data === "string"
        ? data
        : data?.detail || data?.message || "Prediction failed";
    throw new Error(message);
  }

  return data;
}