import React, { useState } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY } from '../data';
import { GalleryItem } from '../types';

export default function GallerySection() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Gallery tabs
  const filterTabs = [
    { id: 'all', name: 'All Work' },
    { id: 'wedding', name: 'Wedding' },
    { id: 'birthday', name: 'Birthday' },
    { id: 'cupcakes', name: 'Cupcakes' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'cookies', name: 'Cookies' },
    { id: 'brownies', name: 'Brownies' },
    { id: 'pastries', name: 'Pastries' },
    { id: 'process', name: 'Baking Process' },
  ];

  // Filter gallery items
  const filteredGallery = GALLERY.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.category === selectedFilter;
  });

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === 0 ? filteredGallery.length - 1 : prev! - 1));
    }
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === filteredGallery.length - 1 ? 0 : prev! + 1));
    }
  };

  return (
    <section id="gallery" className="py-20 md:py-28 bg-cream-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <p className="font-sans text-xs md:text-sm font-bold text-accent-pink uppercase tracking-[0.2em]">
            Baked Masterpieces
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-chocolate tracking-tight">
            Our Sweet <span className="text-gold italic font-normal">Gallery</span>
          </h2>
          <div className="w-16 h-[1px] bg-gold mx-auto" />
          <p className="font-sans text-sm text-warm-brown leading-relaxed font-light">
            Browse through some of our favorite cake designs, custom catering orders, delicate desserts, and warm behind-the-scenes moments from our baking studio.
          </p>
        </div>

        {/* Gallery Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedFilter(tab.id);
                  setLightboxIndex(null); // clear lightbox focus when switching filters
                }}
                className={`px-4 py-2 rounded-xl font-sans text-[10px] font-bold uppercase tracking-widest transition-all duration-300 focus:outline-none shadow-sm ${
                  isActive
                    ? 'bg-accent-pink text-white border border-accent-pink scale-105'
                    : 'bg-cream border border-cream-dark text-chocolate hover:bg-pastel-pink hover:text-accent-pink'
                }`}
              >
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Responsive Photo Grid with Hover Zoom */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -4 }}
                onClick={() => setLightboxIndex(index)}
                className="group relative bg-white rounded-3xl border border-[#F5F5F5] hover:border-accent-pink shadow-md overflow-hidden aspect-[4/3] cursor-pointer"
              >
                {/* Image element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Hover overlay with detail and ZoomIn Icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate-dark/80 via-chocolate/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-2">
                    <span className="text-[9px] uppercase font-sans font-bold tracking-widest text-gold bg-white/10 px-2.5 py-1 rounded-lg border border-white/15 inline-block">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-base font-bold text-cream-light leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  {/* Absolute centered zoom icon */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-cream opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal View */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="fixed inset-0 z-100 bg-chocolate-dark/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 z-101 p-3 rounded-full bg-white/10 hover:bg-white/20 text-cream transition-colors focus:outline-none"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-101 p-3 rounded-full bg-white/10 hover:bg-white/20 text-cream transition-colors focus:outline-none hidden sm:flex"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-101 p-3 rounded-full bg-white/10 hover:bg-white/20 text-cream transition-colors focus:outline-none hidden sm:flex"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Lightbox Content Container */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl max-h-[80vh] w-full flex flex-col justify-center items-center"
              >
                <motion.div
                  key={lightboxIndex}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl bg-black"
                >
                  <img
                    src={filteredGallery[lightboxIndex].image}
                    alt={filteredGallery[lightboxIndex].title}
                    className="max-w-full max-h-[70vh] object-contain block mx-auto"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* Image Details Panel */}
                <div className="w-full text-center mt-6 space-y-1 max-w-xl">
                  <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-gold">
                    {filteredGallery[lightboxIndex].category}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-cream-light leading-snug">
                    {filteredGallery[lightboxIndex].title}
                  </h4>
                  <p className="text-xs text-cream/60">
                    Image {lightboxIndex + 1} of {filteredGallery.length}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
