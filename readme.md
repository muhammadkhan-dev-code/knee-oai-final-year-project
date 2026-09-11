# Knee-OAI Detection System

Welcome to the Knee-OAI Detection System. This project is a full-stack web application designed for clinical analysis of Knee Osteoarthritis (KOA). It uses a React (Vite) frontend and a FastAPI backend with MongoDB and deep learning models (EfficientNet and YOLO) for predictive analysis.

This guide will walk you through setting up the complete environment from scratch.

## Prerequisites
Before starting, make sure you have the following installed on your system:
- [Python 3.9+](https://www.python.org/downloads/)
- [Node.js (v18+)](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally on default port `27017`)


## Step 1: Setting up the Backend

The backend is built with FastAPI and handles user authentication, database operations, and the machine learning predictions.

### 1.1 Navigate to the Backend Directory
Open your terminal (Command Prompt or PowerShell) and navigate to the backend folder:
```bash
cd d:\knee-project\knee-backend
```

### 1.2 Create and Activate a Virtual Environment
It is highly recommended to use a virtual environment to isolate Python dependencies.
```bash
# Create the virtual environment
python -m venv venv

# Activate it (Windows)
venv\Scripts\activate

.\venv\Scripts\Activate.ps1
```

### 1.3 Install Dependencies
With the virtual environment activated, install all required packages:
```bash
pip install fastapi uvicorn python-multipart pymongo argon2-cffi pydantic[email] python-decouple tensorflow ultralytics opencv-python numpy
```

### 1.4 Start the Backend Server
Once dependencies are installed, navigate into the `server` directory where the `main.py` is located, and start the FastAPI server:
```bash
cd server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
*Note: The backend must remain running in this terminal. The API will be available at `http://localhost:8000`. You can view the API documentation at `http://localhost:8000/docs`.*

---

## Step 2: Setting up the Frontend

The frontend is built with React and Vite. It provides the user interface for authentication and the clinical analysis dashboard.

### 2.1 Navigate to the Frontend Directory
Open a **new** terminal window (keep the backend terminal running) and navigate to the frontend folder:
```bash
cd d:\knee-project\knee-frontend
```

### 2.2 Install Dependencies
Install all the required Node.js packages using npm:
```bash
npm install
```

### 2.3 Start the Frontend Development Server
Start the Vite development server:
```bash
npm run dev
```
*Note: This will start the frontend on `http://localhost:5173` (by default). Open this URL in your browser to view the application.*

---

## Project Structure Overview

- **`knee-backend/server/`**: Contains the FastAPI application.
  - `main.py`: Entry point for the server.
  - `.env`: Environment variables (Database name, MongoDB URI, Model paths).
  - `models/`: Stores the deep learning models (YOLO weights and EfficientNet models).
  - `predict/`: Contains logic for image processing and predictions.
  - `CRUD/`: Contains logic for user authentication (login/signup).
  - `database/`: Database connection and schemas.
- **`knee-frontend/`**: Contains the React/Vite web application.
  - Uses TailwindCSS for styling and Axios for API requests.

## Troubleshooting

- **MongoDB Connection Refused:** Ensure the MongoDB service is running on your machine. You can check your Windows Services to verify it is active on `localhost:27017`.
- **Python Module Not Found:** Ensure you have activated the virtual environment (`venv\Scripts\activate`) before running the server or installing packages.
- **Model Path Errors:** Ensure that the YOLO weights and EfficientNet models are correctly placed inside the `knee-backend/server/models` directory as specified in the backend's `.env` file.
