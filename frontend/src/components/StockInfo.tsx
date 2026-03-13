import { TrendingUp, TrendingDown, Activity, Target } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import type { PredictionData } from '../lib/mockData'

interface StockInfoProps {
  data: PredictionData
}

export function StockInfo({ data }: StockInfoProps) {
  const latestActual = data.chartData[data.chartData.length - 1].actual
  const latestPredicted = data.chartData[data.chartData.length - 1].predicted
  const firstActual = data.chartData[0].actual
  
  const actualChange = ((latestActual - firstActual) / firstActual) * 100
  const predictionError = Math.abs(((latestPredicted - latestActual) / latestActual) * 100)
  
  const isPositive = actualChange >= 0

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="border-border shadow-md">
        <CardContent className="flex items-center gap-4 py-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Activity className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Stock Symbol</p>
            <p className="text-2xl font-bold text-foreground">{data.stockName}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border shadow-md">
        <CardContent className="flex items-center gap-4 py-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-1/10">
            {isPositive ? (
              <TrendingUp className="h-6 w-6 text-chart-1" />
            ) : (
              <TrendingDown className="h-6 w-6 text-destructive" />
            )}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Price</p>
            <p className="text-2xl font-bold text-foreground">
              ₹{latestActual.toFixed(2)}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border shadow-md">
        <CardContent className="flex items-center gap-4 py-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${isPositive ? 'bg-chart-1/10' : 'bg-destructive/10'}`}>
            {isPositive ? (
              <TrendingUp className="h-6 w-6 text-chart-1" />
            ) : (
              <TrendingDown className="h-6 w-6 text-destructive" />
            )}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Price Change</p>
            <p className={`text-2xl font-bold ${isPositive ? 'text-chart-1' : 'text-destructive'}`}>
              {isPositive ? '+' : ''}{actualChange.toFixed(2)}%
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border shadow-md">
        <CardContent className="flex items-center gap-4 py-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-2/10">
            <Target className="h-6 w-6 text-chart-2" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Model Accuracy</p>
            <p className="text-2xl font-bold text-foreground">
              {(100 - predictionError).toFixed(1)}%
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
