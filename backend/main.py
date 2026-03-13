from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import requests
from functools import lru_cache
from typing import List, Dict


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

@lru_cache(maxsize=128)
def fetch_yahoo_suggestions(query: str) -> List[Dict]:
    url = "https://query2.finance.yahoo.com/v1/finance/search"
    params = {
        "q": query,
        "quotesCount": 10,
        "newsCount": 0
    }
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    response = requests.get(url, params=params, headers=headers, timeout=5)
    response.raise_for_status()
    data = response.json()
    
    suggestions = []
    for quote in data.get('quotes', []):
        if quote.get('quoteType') in ['EQUITY', 'ETF']:
            suggestions.append({
                'symbol': quote.get('symbol'),
                'name': quote.get('shortname') or quote.get('longname') or quote.get('symbol'),
                'exchDisp': quote.get('exchDisp'),
                'type': quote.get('quoteType')
            })
    return suggestions

@app.get("/search")
def search_stocks(q: str):
    if not q or len(q) < 1:
        return []
    
    try:
        suggestions = fetch_yahoo_suggestions(q)
        
        # Fallback: if no suggestions and text has spaces (e.g. "praj industry"),
        # try searching with just the most significant first word to find variations.
        if not suggestions and " " in q:
            first_word = q.split(" ")[0]
            suggestions = fetch_yahoo_suggestions(first_word)
            
        return list(suggestions)[:5] # Limit to top 5 for the UI
    except Exception as e:
        import traceback
        print(f"Search error: {e}")
        traceback.print_exc()
        return []

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
