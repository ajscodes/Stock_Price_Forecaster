import { useState } from 'react'
import { Search } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'

interface StockPredictionFormProps {
  onPredict: (stockName: string, startDate: string) => void
  isLoading: boolean
}

export function StockPredictionForm({ onPredict, isLoading }: StockPredictionFormProps) {
  const [stockName, setStockName] = useState('')
  const [startDate, setStartDate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (stockName && startDate) {
      onPredict(stockName.toUpperCase(), startDate)
    }
  }

  // Get today's date in YYYY-MM-DD format for max date
  const today = new Date().toISOString().split('T')[0]
  
  // Get date 5 years ago for min date
  const minDate = new Date()
  minDate.setFullYear(minDate.getFullYear() - 5)
  const minDateStr = minDate.toISOString().split('T')[0]

  return (
    <Card className="mx-auto max-w-2xl border-border shadow-lg">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <div className="grid gap-6 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="stock-name">Stock Symbol</FieldLabel>
                <Input
                  id="stock-name"
                  type="text"
                  placeholder="e.g., AAPL, GOOGL, TSLA"
                  value={stockName}
                  onChange={(e) => setStockName(e.target.value)}
                  required
                  className="uppercase"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="start-date">Start Date</FieldLabel>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={minDateStr}
                  max={today}
                  required
                />
              </Field>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={isLoading || !stockName || !startDate}
            >
              {isLoading ? (
                <>
                  <Spinner className="h-4 w-4" />
                  Generating Prediction...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Generate Prediction
                </>
              )}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
