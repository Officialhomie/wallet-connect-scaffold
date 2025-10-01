import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'gradient' | 'glass'
  hover?: boolean
}

export function Card({ children, className = '', variant = 'default', hover = false }: CardProps) {
  const variants = {
    default: 'bg-white border border-slate-200/60 shadow-sm',
    gradient: 'bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-slate-200/60 shadow-lg',
    glass: 'bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl'
  }

  return (
    <div className={`
      rounded-2xl p-6 transition-all duration-300
      ${variants[variant]}
      ${hover ? 'hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1' : ''}
      ${className}
    `}>
      {children}
    </div>
  )
}