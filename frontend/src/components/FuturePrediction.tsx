import { useState } from 'react'
import { StockPredictionForm } from './StockPredictionForm'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { TrendingUp, TrendingDown } from 'lucide-react'

export function FuturePrediction() {
  const [predictionData, setPredictionData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePredict = async (stockName: string, startDate: string) => {
    setIsLoading(true)
    setError(null)
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

      setPredictionData({
        stockName: stockName,
        currency: rawData.currency || 'USD',
        futureDate: rawData.future_date,
        futurePrediction: rawData.future_prediction,
        currentPrice: rawData.current_price,
        generatedAt: rawData.generated_at
      })

    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false)
    }
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: predictionData?.currency || 'USD',
  })

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto space-y-10">
      <section className="text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
          Next Day Prediction
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground text-balance">
          Forecast the closing price for the next trading day.
        </p>
      </section>

      <section>
        <StockPredictionForm onPredict={handlePredict} isLoading={isLoading} />
      </section>

      {error && (
        <div className="rounded-md bg-destructive/15 p-4 text-sm text-destructive text-center">
          {error}
        </div>
      )}

      {predictionData && predictionData.futurePrediction && (() => {
        const isBullish = predictionData.currentPrice != null
          ? predictionData.futurePrediction > predictionData.currentPrice
          : true;
        const accentColor = isBullish ? 'text-emerald-500' : 'text-red-500';
        const accentBg = isBullish ? 'bg-emerald-500/10' : 'bg-red-500/10';
        const dotColor = isBullish ? 'bg-emerald-500' : 'bg-red-500';
        const ArrowIcon = isBullish ? TrendingUp : TrendingDown;

        return (
          <section className="mt-8 flex justify-center pt-4">
            <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
              <Card className="overflow-hidden border-border bg-card shadow-xl transition-all hover:shadow-2xl">
                <div className="flex flex-col">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-8">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${accentBg} ${accentColor}`}>
                            <ArrowIcon className="h-4 w-4" />
                          </div>
                          <h2 className="text-xl font-bold tracking-tight text-foreground uppercase">
                            {predictionData.stockName}
                          </h2>
                        </div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-10">
                          Forecasted Market Value
                        </p>
                      </div>
                      <div className="px-3 py-1 rounded-md bg-muted text-[10px] font-bold text-muted-foreground uppercase tracking-widest border border-border">
                        {predictionData.futureDate}
                      </div>
                    </div>

                    <div className="flex flex-col items-center bg-muted/30 rounded-2xl py-8 px-4 border border-border/50">
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${accentColor}`}>
                        Projected Close
                      </span>
                      <p className="text-5xl font-black text-foreground tracking-tighter tabular-nums drop-shadow-sm">
                        {formatter.format(predictionData.futurePrediction)}
                      </p>
                    </div>

                    <div className="mt-8 space-y-4">
                      <div className="flex items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${dotColor} opacity-40`} />
                          Updated: {predictionData.generatedAt}
                        </div>
                      </div>
                      <p className="text-[9px] text-center text-muted-foreground/60 leading-relaxed max-w-[280px] mx-auto uppercase tracking-tighter font-medium">
                        Disclaimer: This prediction is generated by model for educational purposes only. It is not financial advice.
                      </p>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          </section>
        );
      })()}
    </div>
  )
}
