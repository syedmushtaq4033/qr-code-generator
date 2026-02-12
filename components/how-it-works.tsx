export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Choose QR Type",
      description: "Select the type of QR code you want to create from our 18+ options including URLs, payments, Wi-Fi, maps, events, and more.",
      color: "#4F46E5",
    },
    {
      number: "02",
      title: "Enter Your Data",
      description: "Fill in the required information like your URL, phone number, or social media username. See your QR code generate in real-time.",
      color: "#25D366",
    },
    {
      number: "03",
      title: "Download & Share",
      description: "Download your high-quality QR code as a PNG image. Each QR code includes the relevant platform logo for instant recognition.",
      color: "#E4405F",
    },
  ]

  return (
    <section id="how-it-works" className="py-16 md:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Our streamlined QR code creation process lets you generate and download QR codes in just a few easy steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-border" />
              )}
              
              <div className="relative bg-card rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold mb-6"
                  style={{ backgroundColor: `${step.color}15`, color: step.color }}
                >
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#generators"
            className="inline-flex px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity cursor-pointer shadow-lg shadow-primary/25"
          >
            Create Your First QR Code
          </a>
        </div>
      </div>
    </section>
  )
}
