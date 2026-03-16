import numpy as np
import pandas as pd
import yfinance as yf
import torch
import torch.optim as optim
import torch.nn as nn
from sklearn.preprocessing import MinMaxScaler

from model import PredictModel

def train_and_predict(ticker: str, start_date: str):
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

    df = yf.download(ticker, start=start_date)
    
    if df.empty:
        raise ValueError(f"No data found for ticker {ticker} with start date {start_date}")

    df = df.dropna()

    if isinstance(df.columns, pd.MultiIndex):
        close_prices = df['Close'].values
    else:
        close_prices = df[['Close']].values


    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(close_prices.reshape(-1, 1))

    seq_length = 30
    data = []
    
    if len(scaled_data) <= seq_length:
        raise ValueError("Not enough data to create sequences. Pick an earlier start date.")

    for i in range(len(scaled_data) - seq_length + 1):
        data.append(scaled_data[i : i + seq_length])
        
    data = np.array(data)

    
    train_size = int(len(data) * 0.8)

    X_train = torch.from_numpy(data[:train_size, :-1, :]).type(torch.Tensor).to(device)
    y_train = torch.from_numpy(data[:train_size, -1, :]).type(torch.Tensor).to(device)
    X_test = torch.from_numpy(data[train_size:, :-1, :]).type(torch.Tensor).to(device)
    y_test = torch.from_numpy(data[train_size:, -1, :]).type(torch.Tensor).to(device)

    
    model = PredictModel(input_dim=1, hidden_dim=32, num_layers=2, output_dim=1).to(device)

    criterion = nn.MSELoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)

    
    num_epochs = 300
    model.train()
    
    for epoch in range(num_epochs):
        y_train_pred = model(X_train)
        loss = criterion(y_train_pred, y_train)

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

    
    model.eval()
    with torch.no_grad():
        y_test_pred = model(X_test)

    
    y_test_pred_inv = scaler.inverse_transform(y_test_pred.cpu().numpy())
    y_test_inv = scaler.inverse_transform(y_test.cpu().numpy())

    
    dates = df.index[-len(y_test_inv):].strftime('%Y-%m-%d').tolist()

    currency = "USD"
    try:
        ticker_info = yf.Ticker(ticker)
        currency = ticker_info.info.get("currency", "USD")
    except:
        pass

    import datetime
    
    last_actual_date = df.index[-1]
    
    # Skip weekends for next trading day
    next_date = last_actual_date + datetime.timedelta(days=1)
    if next_date.weekday() >= 5:
        next_date += datetime.timedelta(days=(7 - next_date.weekday()))
    
    future_date_str = next_date.strftime('%Y-%m-%d')

    last_29_days = scaled_data[-(seq_length - 1):]
    
    X_future = torch.from_numpy(last_29_days).type(torch.Tensor).unsqueeze(0).to(device)
    
    model.eval()
    with torch.no_grad():
        future_pred_scaled = model(X_future)
        
    future_pred = scaler.inverse_transform(future_pred_scaled.cpu().numpy())[0][0]
    
    # Trend-aware correction for future prediction
    recent_prices = close_prices.flatten()[-5:]
    if len(recent_prices) >= 2:
        daily_changes = np.diff(recent_prices)
        avg_momentum = np.mean(daily_changes)
        momentum_weight = 0.3
        current_price = float(recent_prices[-1])
        
        if avg_momentum < 0 and future_pred > current_price:
            future_pred = current_price + avg_momentum * momentum_weight
        elif avg_momentum > 0 and future_pred < current_price:
            future_pred = current_price + avg_momentum * momentum_weight
    
    print(f"Prediction generated for {ticker} at {datetime.datetime.now()}")
    print(f"Latest data point: {last_actual_date.strftime('%Y-%m-%d')} - {close_prices[-1]}")
    
    return {
        "dates": dates,
        "actual": y_test_inv.flatten().tolist(),
        "predicted": y_test_pred_inv.flatten().tolist(),
        "currency": currency,
        "future_date": future_date_str,
        "future_prediction": float(future_pred),
        "current_price": float(close_prices.flatten()[-1]),
        "generated_at": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }