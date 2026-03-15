import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react'

export function TermsOfService() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto py-10 px-4">
      <div className="flex items-center gap-4 mb-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Terms of Service</h1>
          <p className="text-muted-foreground">Usage Guidelines for AJ Analytics Solutions</p>
        </div>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
        <section className="bg-card/50 border border-border p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            1. Acceptance of Terms
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing and using StockPredict AI, you agree to be bound by these Terms of Service.
            If you do not agree with any part of these terms, you must not use our services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">2. Permitted Use</h2>
          <p className="text-muted-foreground leading-relaxed">
            The Platform is provided for educational research and individual analysis. Users agree NOT to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Use the data for building automated trading bots without authorization.</li>
            <li>Resell or redistribute the prediction data as professional financial advice.</li>
            <li>Attempt to reverse engineer the predictive models or scraping APIs.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            3. Data Privacy
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We value your privacy. StockPredict AI does not store sensitive personal information or financial portfolios.
            Search history may be cached locally on your browser for your convenience.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            4. Limitation of Liability
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            AJ Analytics Solutions shall not be liable for any financial losses, damages, or missed opportunities
            resulting from the use of our predictive data. Use of the Platform is entirely at your own risk.
          </p>
        </section>

        <section className="border-t border-border pt-8 mt-12 pb-10 text-sm text-muted-foreground italic">
          Last updated: March 15, 2026
        </section>
      </div>
    </div>
  )
}
