# 📈 Stock Price Forecaster

A modern, full-stack stock price prediction application powered by Deep Learning. This project uses an LSTM (Long Short-Term Memory) neural network to analyze historical stock data and forecast future price movements.

## 🚀 Features

- **Real-time Stock Search**: Integrated with Yahoo Finance API for instant ticker lookup.
- **Deep Learning Predictions**: Uses a PyTorch-based LSTM model trained on-the-fly for the selected stock.
- **Interactive Visualizations**: Beautiful, responsive charts showing actual vs. predicted prices using Recharts.
- **Future Forecasting**: Predicts the next trading day's closing price with trend-aware corrections.
- **Modern UI/UX**: Built with React 19, Tailwind CSS, and Shadcn UI components for a premium feel.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
- **Dark/Light Mode**: Elegant theme support that adapts to user preference.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **ML Framework**: [PyTorch](https://pytorch.org/) (LSTM Model)
- **Data Source**: [yfinance](https://github.com/ranaroussi/yfinance)
- **Data Processing**: NumPy, Pandas, Scikit-learn (MinMaxScaler)
- **Server**: Uvicorn

## 📋 Prerequisites

- **Node.js**: v18 or late
- **Python**: v3.9 or later
- **Git**

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/Stock_Price_Forecaster.git
cd Stock_Price_Forecaster
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python main.py
```
The backend API will be running at `http://localhost:8000`.

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
The frontend application will be running at `http://localhost:5173`.


## 🧠 How It Works

1. **Data Acquisition**: When a ticker is searched, the backend fetches historical closing prices from Yahoo Finance.
2. **Preprocessing**: The data is normalized using `MinMaxScaler` and transformed into sequences (time-series windowing).
3. **Training**: A 2-layer LSTM model is instantiated and trained for 300 epochs on 80% of the historical data.
4. **Prediction**: The model predicts the remaining 20% (test set) and the "next-day" price.
5. **Visualization**: Predictions are sent back via FastAPI and rendered on the frontend using interactive area charts.

## 🛡️ Disclaimer

This application is for **educational and research purposes only**. Financial markets are inherently unpredictable. Never use the predictions of this model for real-world trading or investment decisions.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
Built with ❤️ by [Ayush J. Maradia](https://github.com/your-username)
