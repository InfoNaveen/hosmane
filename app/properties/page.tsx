'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { properties } from '@/lib/properties-data'
import { Building2, Bed, Bath, Ruler, Phone, MapPin } from 'lucide-react'
import { useState } from 'react'

export default function PropertiesPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const filteredProperties = selectedType
    ? properties.filter(p => p.type === selectedType)
    : properties

  const propertyTypes = Array.from(new Set(properties.map(p => p.type)))

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">

        {/* Hero */}
        <section className="pt-28 sm:pt-32 pb-10 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/45 to-background">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground mb-3">
                All Properties
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our complete collection of premium properties across Bannerghatta Road &amp; Bangalore
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="py-5 px-4 sm:px-6 lg:px-8 border-b border-border sticky top-[60px] bg-background/95 backdrop-blur-md z-30">
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <motion.button
                onClick={() => setSelectedType(null)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedType === null
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted text-foreground hover:bg-primary/10 active:bg-primary/20'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                All ({properties.length})
              </motion.button>
              {propertyTypes.map(type => (
                <motion.button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedType === type
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-muted text-foreground hover:bg-primary/10 active:bg-primary/20'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {type}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="py-8 sm:py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm text-muted-foreground mb-6">
              Showing {filteredProperties.length} propert{filteredProperties.length === 1 ? 'y' : 'ies'}
              {selectedType ? ` · ${selectedType}` : ''}
            </p>

            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            >
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
                  viewport={{ once: true }}
                  className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 active:border-primary/50 transition-all duration-300 hover:shadow-xl flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Type badge */}
                    <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-foreground px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-primary" />
                      {property.type}
                    </div>
                    {property.featured && (
                      <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2.5 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5 flex flex-col flex-1 gap-3">
                    {/* Title & location */}
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground mb-1 leading-tight">
                        {property.title}
                      </h3>
                      <div className="flex items-start gap-1 text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-xs sm:text-sm">{property.location}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="pt-2 border-t border-border">
                      <p className="text-xl sm:text-2xl font-bold text-primary">{property.price}</p>
                    </div>

                    {/* Features — hide beds/baths for plots & commercial */}
                    {property.bedrooms > 0 ? (
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-muted/50 rounded-lg py-2 px-1">
                          <Bed className="w-4 h-4 text-muted-foreground mx-auto mb-0.5" />
                          <p className="text-sm font-semibold text-foreground">{property.bedrooms}</p>
                          <p className="text-[10px] text-muted-foreground">Beds</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg py-2 px-1">
                          <Bath className="w-4 h-4 text-muted-foreground mx-auto mb-0.5" />
                          <p className="text-sm font-semibold text-foreground">{property.bathrooms}</p>
                          <p className="text-[10px] text-muted-foreground">Baths</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg py-2 px-1">
                          <Ruler className="w-4 h-4 text-muted-foreground mx-auto mb-0.5" />
                          <p className="text-[11px] font-semibold text-foreground leading-tight">{property.area}</p>
                          <p className="text-[10px] text-muted-foreground">Area</p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-muted/50 rounded-lg py-2 px-3 flex items-center gap-2">
                        <Ruler className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm font-semibold text-foreground">{property.area}</span>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 flex-1">
                      {property.description}
                    </p>

                    {/* CTA — full width, large touch target */}
                    <a
                      href={`https://wa.me/919900797419?text=${encodeURIComponent(
                        `Hello Manjunath! I'm interested in the following property:\n\n` +
                        `🏠 *${property.title}*\n` +
                        `📍 ${property.location}\n` +
                        `📐 ${property.area}\n` +
                        `💰 ${property.price}\n\n` +
                        `Please share more details and arrange a site visit.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 active:bg-green-700 active:scale-95 transition-all text-sm sm:text-base shadow-md shadow-green-500/20"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Enquire on WhatsApp
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {filteredProperties.length === 0 && (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">No properties found for this type.</p>
                <button
                  onClick={() => setSelectedType(null)}
                  className="mt-4 px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-medium"
                >
                  Show All
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/40">
          <div className="max-w-2xl mx-auto text-center space-y-5">
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-foreground">
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p className="text-muted-foreground">
              Tell Manjunath your requirements — he&apos;ll find the right property for you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <a
                href="tel:+919900797419"
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 active:scale-95 transition-all"
              >
                <Phone className="w-5 h-5" />
                +91 99007 97419
              </a>
              <a
                href="tel:+919008910419"
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 active:scale-95 transition-all"
              >
                <Phone className="w-5 h-5" />
                +91 90089 10419
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
