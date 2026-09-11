from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from CRUD.route import router as auth_router
from predict.route import router as prediction_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(prediction_router)


