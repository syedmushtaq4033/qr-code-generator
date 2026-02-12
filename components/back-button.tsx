"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export function BackButton() {
  const router = useRouter()

  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      router.back()
    } else {
      // If no history, go to home
      router.push("/")
    }
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label="Go back to previous page"
      title="Go back"
      className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer group"
    >
      <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
      <span className="font-medium">Back</span>
    </button>
  )
}
