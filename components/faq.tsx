"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Is this online QR code generator truly free to use?",
    answer:
      "Yes, this QR code generator is completely free for everyone. There are no subscriptions, no usage caps, and no paid upgrades. You can create unlimited high-resolution QR codes without spending money or sharing payment details.",
  },
  {
    question: "Do I need to sign up or log in to generate QR codes?",
    answer:
      "No registration is required. You can generate and download QR codes instantly without creating an account. All processing happens directly inside your browser, which means your information never leaves your device.",
  },
  {
    question: "Will the generated QR codes stop working in the future?",
    answer:
      "No, the QR codes generated here are permanent. They do not expire or deactivate over time. As long as the linked content exists—such as a website, phone number, or social profile—the QR code will continue to function indefinitely.",
  },
  {
    question: "Can these QR codes be used for commercial or professional use?",
    answer:
      "Yes, you are free to use the generated QR codes for business, marketing, and professional projects. They can be printed on packaging, flyers, menus, posters, visiting cards, or used in digital campaigns without restrictions.",
  },
  {
    question: "Is the QR code generator compatible with mobile phones?",
    answer:
      "Absolutely. The QR generator is optimized for mobile devices, tablets, and desktops. You can easily create and download QR codes from Android phones, iPhones, laptops, or any modern web browser.",
  },
  {
    question: "Is any personal or QR data stored on your servers?",
    answer:
      "Your QR content is generated locally in your browser and is not stored on our servers. We do use anonymous traffic analytics (such as page visits and performance metrics) to improve the website experience.",
  },
  {
    question: "Are the downloaded QR codes suitable for printing?",
    answer:
      "Yes. All QR codes are generated in high resolution, making them ideal for both digital sharing and professional printing. They remain sharp and scannable on posters, banners, stickers, and product labels.",
  },
  {
    question: "Why do some QR codes include icons or logos in the center?",
    answer:
      "Center icons are added to visually indicate the QR code’s purpose, such as social media, messaging, or video platforms. Advanced error correction is applied so the QR code remains easy to scan despite the embedded logo.",
  },
  {
    question: "Do WhatsApp QR codes open chats automatically?",
    answer:
      "Yes. WhatsApp QR codes are generated using the official WhatsApp deep-link format. On mobile devices, they open directly in the WhatsApp app, while desktop users are redirected to WhatsApp Web. Optional pre-written messages are also supported.",
  },
  {
    question: "What types of QR codes can I generate on this website?",
    answer:
      "This platform supports multiple QR code formats including website links, WhatsApp chat links, email actions, phone calls, Instagram profiles, Facebook pages, YouTube channels, Spotify links, digital business cards (vCard), and payment URLs.",
  },
]


export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-16 md:py-24 bg-muted/30 scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Everything you need to know about our free QR code generator.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card rounded-xl border border-border/50 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium text-foreground pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="px-6 pb-5 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
