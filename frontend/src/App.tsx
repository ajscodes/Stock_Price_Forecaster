import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { StockPredictionForm } from './components/StockPredictionForm'
import { PredictionChart } from './components/PredictionChart'
import { StockInfo } from './components/StockInfo'
import { Footer } from './components/Footer'
import { AboutModel } from './components/AboutModel'
import { Documentation } from './components/Documentation'
import { ScrollToTop } from './components/ScrollToTop'
import { RecentPredictions } from './components/RecentPredictions'
import { Disclaimer } from './components/Disclaimer'
import { TermsOfService } from './components/TermsOfService'
import { FuturePrediction } from './components/FuturePrediction'
import { type PredictionData } from './lib/mockData'

function App() {
  const [predictionData, setPredictionData] = useState<PredictionData | null>(null)
  const [recentPredictions, setRecentPredictions] = useState<PredictionData[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handlePredict = async (stockName: string, startDate: string) => {
    setIsLoading(true)
    setPredictionData(null)

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
        chartData: chartData,
        futureDate: rawData.future_date,
        futurePrediction: rawData.future_prediction,
        generatedAt: rawData.generated_at
      };

      setPredictionData(data)
      
      setRecentPredictions(prev => {
        const filtered = prev.filter(p => p.stockName !== data.stockName)
        return [data, ...filtered].slice(0, 4)
      })

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
      <ScrollToTop />
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="mx-auto max-w-5xl">
          <Routes>
            <Route path="/" element={
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <section className="mb-10 text-center">
                  <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
                    Stock Price Prediction
                  </h1>
                  <p className="mx-auto max-w-2xl text-muted-foreground text-balance">
                    Powered by deep learning models to forecast stock prices. Enter a stock symbol and date range to see predicted vs actual prices.
                  </p>
                </section>

                <section className="mb-10">
                  <StockPredictionForm onPredict={handlePredict} isLoading={isLoading} />
                </section>

                {predictionData && (
                  <section className="space-y-6">
                    <StockInfo data={predictionData} />
                    <PredictionChart data={predictionData} />
                  </section>
                )}

                <RecentPredictions predictions={recentPredictions} />
              </div>
            } />
            <Route path="/aboutmodel" element={<AboutModel />} />
            <Route path="/future-prediction" element={<FuturePrediction />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/terms" element={<TermsOfService />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
