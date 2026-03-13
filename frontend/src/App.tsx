import { useState } from 'react'
import { Header } from './components/Header'
import { StockPredictionForm } from './components/StockPredictionForm'
import { PredictionChart } from './components/PredictionChart'
import { StockInfo } from './components/StockInfo'
import { type PredictionData } from './lib/mockData'

function App() {
  const [predictionData, setPredictionData] = useState<PredictionData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handlePredict = async (stockName: string, startDate: string) => {
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticker: stockName, start_date: startDate }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch predictions');
      }

      const rawData = await response.json();

      // Transform API response into ChartDataPoint[]
      const chartData = rawData.dates.map((date: string, index: number) => ({
        date: date,
        actual: rawData.actual[index],
        predicted: rawData.predicted[index]
      }));

      const endDate = rawData.dates.length > 0 ? rawData.dates[rawData.dates.length - 1] : '';

      const data: PredictionData = {
        stockName: stockName,
        startDate: startDate,
        endDate: endDate,
        currency: rawData.currency || 'USD',
        chartData: chartData
      };

      setPredictionData(data)
    } catch (error: any) {
      console.error(error);
      alert(error.message);
      setPredictionData(null);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mx-auto max-w-5xl">
          {/* Hero Section */}
          <section className="mb-10 text-center">
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
              Stock Price Prediction
            </h1>
            <p className="mx-auto max-w-2xl text-muted-foreground text-balance">
              Powered by deep learning models to forecast stock prices. Enter a stock symbol and date range to see predicted vs actual prices.
            </p>
          </section>

          {/* Form Section */}
          <section className="mb-10">
            <StockPredictionForm onPredict={handlePredict} isLoading={isLoading} />
          </section>

          {/* Results Section */}
          {predictionData && (
            <section className="space-y-6">
              <StockInfo data={predictionData} />
              <PredictionChart data={predictionData} />
            </section>
          )}
        </div>
      </main>

      <footer className="border-t border-border py-6 text">
        <p className="text-sm text-muted-foreground">
          @2026 Stock Price Prediction Project. All rights reserved.
          <br />
          Educational purpose only.
          <br />
          Developed by: Ayush J. Maradia
        </p>
      </footer>
    </div>
  )
}

export default App
