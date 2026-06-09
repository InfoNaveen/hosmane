"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { MapPin, Phone, Mail, Clock, MessageCircle, CheckCircle } from "lucide-react"

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    message: "",
  })

  const propertyTypeLabels: Record<string, string> = {
    buy: "Buy Property",
    rent: "Rent Property",
    sell: "Sell Property",
    invest: "Investment Consultation",
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const typeLabel = propertyTypeLabels[formData.propertyType] || formData.propertyType || "Not specified"

    const text = encodeURIComponent(
      `Hello Manjunath! I'd like to enquire about a property.\n\n` +
      `👤 Name: ${formData.name}\n` +
      `📞 Phone: ${formData.phone}\n` +
      `📧 Email: ${formData.email || "Not provided"}\n` +
      `🏠 Interest: ${typeLabel}\n` +
      `💬 Message: ${formData.message || "No additional message"}`
    )

    window.open(`https://wa.me/919900797419?text=${text}`, "_blank")

    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", phone: "", propertyType: "", message: "" })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      content: "MLA Layout Main Rd, Himagiri Meadows, Gottigere, Bengaluru, Karnataka 560076",
      link: undefined as string | undefined,
      numbers: undefined as { label: string; link: string }[] | undefined,
    },
    {
      icon: Phone,
      title: "Call Us",
      content: null as string | null,
      link: undefined,
      numbers: [
        { label: "+91 99007 97419", link: "tel:+919900797419" },
        { label: "+91 90089 10419", link: "tel:+919008910419" },
      ],
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "hosmaneproperties@gmail.com",
      link: "mailto:hosmaneproperties@gmail.com",
      numbers: undefined,
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: "Mon – Sat: 9:00 AM – 8:00 PM",
      link: undefined,
      numbers: undefined,
    },
  ]

  return (
    <section id="contact" className="py-16 sm:py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-primary text-sm uppercase tracking-widest mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Let&apos;s Find Your <span className="text-gold-gradient">Dream Home</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Share your requirements and Manjunath will get back to you with tailored property options, honest pricing, and a no-pressure consultation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-5 sm:p-8 rounded-2xl glass border border-border/30"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">Send us a message</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-base"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-base"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-base"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="propertyType" className="block text-sm font-medium text-muted-foreground mb-2">
                  Property Interest
                </label>
                <select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-base"
                >
                  <option value="">Select property type</option>
                  <option value="buy">Buy Property</option>
                  <option value="rent">Rent Property</option>
                  <option value="sell">Sell Property</option>
                  <option value="invest">Investment Consultation</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none text-base"
                  placeholder="Tell us about your requirements — budget, location preference, BHK type..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                disabled={isSubmitted}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 active:bg-green-700 transition-colors disabled:opacity-70 text-base shadow-lg shadow-green-500/20"
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Opening WhatsApp…</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span>Send Enquiry via WhatsApp</span>
                  </>
                )}
              </motion.button>

              <p className="text-xs text-center text-muted-foreground">
                Tapping the button opens WhatsApp with your details pre-filled
              </p>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col gap-4"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-4 p-5 rounded-xl glass border border-border/30"
                >
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm">{info.title}</h4>
                    {info.numbers ? (
                      <div className="flex flex-col gap-1">
                        {info.numbers.map((n) => (
                          <a
                            key={n.link}
                            href={n.link}
                            className="text-sm text-muted-foreground hover:text-primary active:text-primary transition-colors py-0.5"
                          >
                            {n.label}
                          </a>
                        ))}
                      </div>
                    ) : info.link ? (
                      <a
                        href={info.link}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors break-all"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">{info.content}</p>
                    )}
                  </div>
                </motion.div>
              )
            })}

            {/* Map Embed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="rounded-xl overflow-hidden border border-border/30 h-52 sm:h-64 flex-1 min-h-[200px]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.34!2d77.5683!3d12.8725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6ac542318cc9%3A0x12dbe6a253725d0a!2sHosamane%20Properties!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg)" }}
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Hosamane Properties Location"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
