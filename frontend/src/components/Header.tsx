import { TrendingUp } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export function Header() {
  const location = useLocation()
  
  const isActive = (path: string) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link 
          to="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <TrendingUp className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">StockPredict AI</span>
        </Link>
        
        <nav className="hidden items-center gap-6 md:flex">
          <Link 
            to="/"
            className={`text-sm font-medium transition-colors hover:text-foreground ${
              isActive('/') ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            Dashboard
          </Link>
          <Link 
            to="/aboutmodel"
            className={`text-sm font-medium transition-colors hover:text-foreground ${
              isActive('/aboutmodel') ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            About Model
          </Link>
          <Link 
            to="/documentation"
            className={`text-sm font-medium transition-colors hover:text-foreground ${
              isActive('/documentation') ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            Documentation
          </Link>
        </nav>
      </div>
    </header>
  )
}
