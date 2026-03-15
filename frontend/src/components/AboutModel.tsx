import { Cpu, Layers, Activity, Database, TrendingUp, ShieldCheck } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export function AboutModel() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
          About Our AI Architecture
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-balance">
          Explore the AI-driven technology that fuels our stock price forecasting platform.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:shadow-md">
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Cpu className="h-5 w-5" />
            </div>
            <CardTitle>LSTM Networks</CardTitle>
            <CardDescription>Long Short-Term Memory</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our model uses LSTM layers, a type of recurrent neural network capable of learning long-term dependencies.
              This is crucial for stock market analysis where historical trends significantly impact future prices.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:shadow-md">
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
              <Layers className="h-5 w-5" />
            </div>
            <CardTitle>Deep Architecture</CardTitle>
            <CardDescription>Multi-layered approach</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The model consists of multiple stacked LSTM layers followed by dropout layers to prevent overfitting,
              ensuring the predictions generalize well to unseen market conditions.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:shadow-md">
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-500">
              <Activity className="h-5 w-5" />
            </div>
            <CardTitle>Time Series Analysis</CardTitle>
            <CardDescription>Sequential processing</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We process data in sequential windows of 30-60 days. The model analyzes price movements, volume,
              and volatility within these windows to extract meaningful predictive signals.
            </p>
          </CardContent>
        </Card>
      </div>

      <section className="rounded-3xl border border-border bg-gradient-to-br from-primary/5 via-background to-card p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="grid gap-12 md:grid-cols-2 lg:items-center relative z-10">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-2 tracking-tight">Training Process</h3>
              <p className="text-sm text-muted-foreground">Our methodology ensures maximum accuracy and reliability through rigorous computational steps.</p>
            </div>

            <div className="grid gap-4">
              {[
                {
                  icon: Database,
                  title: "Data Normalization",
                  desc: "Raw price indices are scaled to a [0, 1] range using MinMaxScaler to optimize neural network convergence and training speed.",
                  color: "text-blue-500",
                  bg: "bg-blue-500/10"
                },
                {
                  icon: TrendingUp,
                  title: "ADAM Optimizer",
                  desc: "Utilizing an adaptive learning rate schedule that fine-tunes weights based on gradient moments for faster, more stable training.",
                  color: "text-primary",
                  bg: "bg-primary/10"
                },
                {
                  icon: ShieldCheck,
                  title: "RMSE Validation",
                  desc: "20% of historical data is reserved for continuous validation to prevent overfitting and ensure the model remains robust on unseen data.",
                  color: "text-green-500",
                  bg: "bg-green-500/10"
                }
              ].map((item, i) => (
                <div key={i} className="group flex gap-4 rounded-2xl border border-border/50 bg-background/40 p-4 transition-all hover:border-border hover:bg-background/60 hover:shadow-sm">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.color} transition-transform group-hover:scale-110`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-primary/20 via-blue-500/20 to-green-500/20 opacity-0 blur transition duration-500 group-hover:opacity-100" />
            <div className="relative aspect-video rounded-2xl bg-zinc-950 border border-border/50 flex flex-col items-center justify-center overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

              <div className="w-full px-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Training Epochs</span>
                    <div className="flex items-center gap-0.5 ml-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-0.5 bg-primary/40 animate-pulse" style={{ height: `${2 + Math.random() * 8}px`, animationDelay: `${i * 150}ms` }} />
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                      <span className="text-[9px] font-mono text-zinc-400">Loss</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <span className="text-[9px] font-mono text-zinc-400">Val Loss</span>
                    </div>
                  </div>
                </div>

                <div className="h-32 w-full flex items-end gap-1 pt-4 relative">
                  {/* Brighter background graph */}
                  <svg className="absolute inset-x-0 bottom-0 w-full h-24 opacity-60 px-2" viewBox="0 0 400 100" preserveAspectRatio="none">
                    {/* Brighter horizontal grid lines */}
                    <line x1="0" y1="20" x2="400" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-zinc-700" />
                    <line x1="0" y1="50" x2="400" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-zinc-700" />
                    <line x1="0" y1="80" x2="400" y2="80" stroke="currentColor" strokeWidth="0.5" className="text-zinc-700" />

                    {/* More saturated curve lines */}
                    <path d="M0,90 Q50,40 100,65 T200,30 T300,50 T400,20" fill="none" stroke="currentColor" strokeWidth="2" className="text-rose-400" />
                    <path d="M0,95 Q70,50 140,75 T280,45 T400,35" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue-400" />
                  </svg>

                  {/* High-Contrast Axis Indicators */}
                  <div className="absolute left-0 top-8 flex flex-col gap-8 text-[7px] font-mono text-zinc-400 pl-1 uppercase font-bold">
                    <span>1.0</span>
                    <span>0.5</span>
                    <span>0.0</span>
                  </div>

                  {/* Vivid decreasing loss curve */}
                  {[95, 82, 70, 62, 55, 48, 42, 38, 32, 28, 25, 22, 20, 18, 16, 15, 14].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end gap-[2px] relative z-10">
                      <div
                        className="w-full bg-blue-400/40 rounded-t-[1px]"
                        style={{
                          height: `${h + 10}%`
                        }}
                      />
                      <div
                        className="w-full bg-rose-500 rounded-t-[1px] shadow-[0_0_8px_rgba(244,63,94,0.4)]"
                        style={{
                          height: `${h}%`,
                          animation: 'grow 3s ease-in-out infinite alternate',
                          animationDelay: `${i * 50}ms`
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center bg-zinc-900 rounded-xl p-3 border border-zinc-700 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
                  <div className="space-y-1">
                    <div className="text-[9px] text-zinc-300 uppercase font-black tracking-widest">Loss</div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-mono text-rose-400 font-bold">0.0142</div>
                      <TrendingUp className="h-3 w-3 text-rose-400 rotate-180" />
                    </div>
                  </div>
                  <div className="h-8 w-[1px] bg-zinc-800" />
                  <div className="space-y-1">
                    <div className="text-[9px] text-zinc-300 uppercase font-black tracking-widest">Accuracy</div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-mono text-blue-400 font-bold">98.4%</div>
                      <TrendingUp className="h-3 w-3 text-blue-400" />
                    </div>
                  </div>
                  <div className="h-8 w-[1px] bg-zinc-800" />
                  <div className="space-y-1">
                    <div className="text-[9px] text-zinc-300 uppercase font-black tracking-widest">Status</div>
                    <div className="rounded-full bg-green-500/20 px-2.5 py-1 border border-green-500/40">
                      <div className="text-[10px] font-mono text-green-400 font-bold animate-pulse">OPTIMIZED</div>
                    </div>
                  </div>
                </div>

                <p className="text-[9px] uppercase tracking-[0.25em] text-center text-zinc-400 font-bold pt-2">LSTM Model Training Feed</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
