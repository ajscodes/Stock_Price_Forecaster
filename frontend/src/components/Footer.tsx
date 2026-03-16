import { Github, Linkedin, Mail, TrendingUp, Twitter, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-card/30 pt-16 pb-12 overflow-hidden">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 relative z-0">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6 group cursor-default">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-transform group-hover:scale-110">
                <TrendingUp className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-foreground">
                Stock<span className="text-primary">Predict</span> AI
              </span>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-muted-foreground/80">
              <span className="font-bold text-foreground block">AJ Analytics Solutions</span>
              AI-powered financial analytics and predictive market technologies.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://github.com/ajscodes"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/50 text-muted-foreground transition-all hover:border-primary hover:text-primary hover:shadow-[0_0_10px_rgba(var(--primary),0.2)]"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/ayush-maradia0929484/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/50 text-muted-foreground transition-all hover:border-primary hover:text-primary hover:shadow-[0_0_10px_rgba(var(--primary),0.2)]"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="mailto:ayushmaradia@gmail.com"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/50 text-muted-foreground transition-all hover:border-primary hover:text-primary hover:shadow-[0_0_10px_rgba(var(--primary),0.2)]"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Gmail</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8 items-start align-top">
            <div className="flex flex-col items-start justify-start">
              <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-foreground/90 leading-none">Quick Links</h3>
              <ul className="space-y-4">
                <li>
                  <a href="https://finance.yahoo.com" target="_blank" rel="noopener noreferrer" className="group flex items-center text-sm text-muted-foreground transition-colors hover:text-primary">
                    <span className="relative">
                      Yahoo Finance
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all group-hover:w-full" />
                    </span>
                    <ExternalLink className="ml-1.5 h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
                <li>
                  <a href="https://www.tradingview.com" target="_blank" rel="noopener noreferrer" className="group flex items-center text-sm text-muted-foreground transition-colors hover:text-primary">
                    <span className="relative">
                      TradingView
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all group-hover:w-full" />
                    </span>
                    <ExternalLink className="ml-1.5 h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
                <li>
                  <a href="https://www.screener.in" target="_blank" rel="noopener noreferrer" className="group flex items-center text-sm text-muted-foreground transition-colors hover:text-primary">
                    <span className="relative">
                      Screener
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all group-hover:w-full" />
                    </span>
                    <ExternalLink className="ml-1.5 h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-start justify-start">
              <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-foreground/90 leading-none">How it works</h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/aboutmodel" className="group flex items-center text-sm text-muted-foreground transition-colors hover:text-primary">
                    <span className="relative">
                      About Model
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all group-hover:w-full" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/documentation" className="group flex items-center text-sm text-muted-foreground transition-colors hover:text-primary">
                    <span className="relative">
                      Documentation
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-start justify-start">
              <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-foreground/90 leading-none">Legal</h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/disclaimer" className="group flex items-center text-sm text-muted-foreground transition-colors hover:text-primary">
                    <span className="relative">
                      Disclaimer
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all group-hover:w-full" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="group flex items-center text-sm text-muted-foreground transition-colors hover:text-primary">
                    <span className="relative">
                      Terms of Service
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between border-t border-border/50 pt-8 gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground/60 text-center md:text-left">
            © {currentYear} StockPredict AI. Built with React & Deep Learning.
            <span className="block md:inline md:ml-2 text-primary/60 font-medium">Educational Research Project.</span>
          </p>

          <div className="flex items-center gap-1 text-sm text-muted-foreground/60">
            <span>Designed for the future of </span>
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent font-bold">Smart Trading</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
