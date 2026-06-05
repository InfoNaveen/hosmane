"use client"

import { motion } from "framer-motion"
import { MessageCircle, Phone } from "lucide-react"

export function FloatingWhatsApp() {
  const whatsappNumber = "919900797419"
  const whatsappMessage = encodeURIComponent(
    "Hello Manjunath! I'm interested in learning more about your property listings."
  )
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-3">

      {/* Call button – directly opens phone dialer */}
      <motion.a
        href="tel:+919900797419"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.4 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Call us"
      >
        <Phone className="w-6 h-6 text-white" />
      </motion.a>

      {/* WhatsApp button */}
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.4 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30 pointer-events-none" />
      </motion.a>
    </div>
  )
}
