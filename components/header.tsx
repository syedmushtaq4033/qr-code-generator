"use client"

import Link from "next/link"
import { QRCodeIcon } from "./icons"

export function Header() {
  return (
    <header className="w-full border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <QRCodeIcon className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground leading-tight">QR Generator</span>
              <span className="text-xs text-muted-foreground leading-tight hidden sm:block">100% Free Forever</span>
            </div>
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link 
              href="/advanced" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer hidden sm:block"
            >
              Advanced
            </Link>
            <Link 
              href="/#how-it-works" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer hidden sm:block"
            >
              How it Works
            </Link>
            <Link 
              href="/#faq" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer hidden sm:block"
            >
              FAQ
            </Link>
            <Link
              href="/#generators"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer"
            >
              Create QR Code
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
