import numpy as np
import pandas as pd
import yfinance as yf
import torch
import torch.optim as optim
import torch.nn as nn
from sklearn.preprocessing import StandardScaler

from model import PredictModel

def train_and_predict(ticker: str, start_date: str):
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

    df = yf.download(ticker, start=start_date)
    
    if df.empty:
        raise ValueError(f"No data found for ticker {ticker} with start date {start_date}")

    if isinstance(df.columns, pd.MultiIndex):
        close_prices = df['Close'].values
    else:
        close_prices = df[['Close']].values


    scaler = StandardScaler()
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
    optimizer = optim.Adam(model.parameters(), lr=0.01)

    
    num_epochs = 200
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

    
    return {
        "dates": dates,
        "actual": y_test_inv.flatten().tolist(),
        "predicted": y_test_pred_inv.flatten().tolist()
    }