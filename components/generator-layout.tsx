"use client"

import type { ReactNode } from "react"
import { Header } from "./header"
import { Footer } from "./footer"
import { BackButton } from "./back-button"

interface GeneratorLayoutProps {
  title: string
  description: string
  color: string
  icon: ReactNode
  children: ReactNode
}

export function GeneratorLayout({
  title,
  description,
  color,
  icon,
  children,
}: GeneratorLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-6">
            <BackButton />
          </div>

          {/* Page Header */}
          <div className="flex items-center gap-4 mb-8">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${color}15` }}
            >
              <div style={{ color }} className="w-8 h-8">
                {icon}
              </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {title}
              </h1>
              <p className="text-muted-foreground mt-1">{description}</p>
            </div>
          </div>

          {/* Generator Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
