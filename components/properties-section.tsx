"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Bed, Bath, Square, MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

const properties = [
  {
    id: 1,
    title: "Pruthvi Royal",
    location: "Gottigere, Bannerghatta Road",
    price: "₹65 Lac",
    type: "Sale",
    beds: 2,
    baths: 2,
    sqft: "1,154",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Purva Panorama – 3 BHK",
    location: "Kalena Agrahara Metro Station, Bannerghatta Road",
    price: "₹1.85 Cr",
    type: "Sale",
    beds: 3,
    baths: 2,
    sqft: "1,500",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Prestige White Meadows",
    location: "Whitefield, Bangalore",
    price: "₹11.5 Cr",
    type: "Sale",
    beds: 4,
    baths: 5,
    sqft: "6,651",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    title: "Himagiri Meadows Duplex",
    location: "Bannerghatta Main Road",
    price: "₹2.45 Cr",
    type: "Sale",
    beds: 3,
    baths: 3,
    sqft: "1,600",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
  },
]

function PropertyCard({ property, index }: { property: typeof properties[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl overflow-hidden glass border border-border/30"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={property.image}
          alt={property.title}
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        {/* Type Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
            property.type === "Sale" 
              ? "bg-primary text-primary-foreground" 
              : "bg-secondary text-secondary-foreground"
          }`}>
            {property.type}
          </span>
        </div>

        {/* Price */}
        <div className="absolute bottom-4 left-4">
          <span className="text-2xl font-bold text-gold-gradient">{property.price}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {property.title}
        </h3>
        
        <div className="flex items-center gap-1 text-muted-foreground mb-4">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm">{property.location}</span>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{property.beds}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{property.baths}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4" />
            <span>{property.sqft} sqft</span>
          </div>
        </div>

        {/* CTA */}
        <motion.a
          href={`https://wa.me/919900797419?text=${encodeURIComponent(
            `Hello Manjunath! I'm interested in the following property:\n\n` +
            `🏠 *${property.title}*\n` +
            `📍 ${property.location}\n` +
            `📐 ${property.sqft} sqft\n` +
            `💰 ${property.price}\n\n` +
            `Please share more details and arrange a site visit.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 5 }}
          className="flex items-center gap-2 text-primary text-sm font-medium"
        >
          <span>View Details</span>
          <ArrowRight className="w-4 h-4" />
        </motion.a>
      </div>
    </motion.div>
  )
}

export function PropertiesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(properties.length / 2))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(properties.length / 2)) % Math.ceil(properties.length / 2))
  }

  return (
    <section id="properties" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm uppercase tracking-widest mb-4 block">
            Featured Listings
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Exclusive <span className="text-gold-gradient">Properties</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover handpicked premium properties in Bangalore&apos;s most sought-after locations
          </p>
        </motion.div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-4 mt-12"
        >
          <button
            onClick={prevSlide}
            className="p-3 rounded-full border border-border/50 text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="p-3 rounded-full border border-border/50 text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-8"
        >
          <a
            href="/properties"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-primary/90 transition-all duration-300"
          >
            <span>View All Properties</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
