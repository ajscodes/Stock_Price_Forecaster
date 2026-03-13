from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

# Import the logic we wrote in prediction.py
from prediction import train_and_predict

app = FastAPI(title="Stock Price Prediction API")

# Configure CORS so the React frontend can communicate with this backend
# In development, React typically runs on port 5173 (Vite) or 3000 (Create React App)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For production, change to the exact URL of your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# This defines what the React frontend will send us
class PredictionRequest(BaseModel):
    ticker: str
    start_date: str

@app.get("/")
def read_root():
    return {"message": "Welcome to the Stock Price Prediction API"}

@app.post("/predict")
def predict_stock(request: PredictionRequest):
    try:
        # Call the machine learning function from prediction.py
        result = train_and_predict(ticker=request.ticker, start_date=request.start_date)
        return result
    except ValueError as ve:
        # e.g., if there's not enough data or the ticker is invalid
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        # Catch any other unexpected errors (like yfinance connection issues)
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

# This allows you to run the server simply by running `python main.py`
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
