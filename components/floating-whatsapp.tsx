"use client"

import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Phone, X } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export function FloatingWhatsApp() {
  const [showCalls, setShowCalls] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const whatsappNumber = "919900797419"
  const whatsappMessage = encodeURIComponent(
    "Hello Manjunath! I'm interested in learning more about your property listings."
  )
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  // Close call panel when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowCalls(false)
      }
    }
    if (showCalls) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showCalls])

  return (
    <div ref={ref} className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-3">
      {/* Call number popup */}
      <AnimatePresence>
        {showCalls && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-end gap-2"
          >
            <a
              href="tel:+919900797419"
              className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 active:scale-95 transition-all text-sm font-semibold min-w-[180px] justify-center"
            >
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>+91 99007 97419</span>
            </a>
            <a
              href="tel:+919008910419"
              className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 active:scale-95 transition-all text-sm font-semibold min-w-[180px] justify-center"
            >
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>+91 90089 10419</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call toggle button */}
      <motion.button
        onClick={() => setShowCalls((prev) => !prev)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.4 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
        aria-label={showCalls ? "Close call menu" : "Call us"}
      >
        <AnimatePresence mode="wait">
          {showCalls ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-6 h-6 text-white" />
            </motion.span>
          ) : (
            <motion.span key="phone" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <Phone className="w-6 h-6 text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

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
