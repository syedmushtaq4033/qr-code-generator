"use client"

import Link from "next/link"
import type { ReactNode } from "react"

interface QRTypeCardProps {
  href: string
  icon: ReactNode
  title: string
  description: string
  color: string
}

export function QRTypeCard({ href, icon, title, description, color }: QRTypeCardProps) {
  return (
    <Link
      href={href}
      className="group relative block p-6 bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{
          background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
        }}
      />
      <div className="relative z-10">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${color}15` }}
        >
          <div style={{ color }} className="w-7 h-7">
            {icon}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-foreground transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  )
}
