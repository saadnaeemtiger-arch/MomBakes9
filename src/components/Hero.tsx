import { Cake, Sparkles, Star, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { HERO_BANNER_IMAGE } from '../data';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-cream-light overflow-hidden pt-20"
    >
      {/* Background Decorative Pattern & Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pastel-pink/40 via-transparent to-transparent z-0" />
      
      {/* Soft overlay on the hero banner side */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#8d5b4c_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-12 pb-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content Block */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6 md:space-y-8 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2"
            >
              <div className="w-8 h-[1px] bg-gold" />
              <span className="text-accent-pink font-bold text-xs uppercase tracking-[0.3em]">
                Handcrafted with Love
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-chocolate leading-[1.1] tracking-tight"
            >
              Freshly Baked, Made for <span className="text-gold italic font-normal">Every Celebration</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-sans text-base sm:text-lg text-warm-brown max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              From intimate birthdays to grand weddings, MomBakes creates artisan cakes that make your special moments unforgettable. Baked fresh with premium ingredients.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={() => onScrollToSection('products')}
                className="w-full sm:w-auto px-8 py-4 bg-accent-pink hover:bg-accent-pink-dark text-white font-sans text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 focus:outline-none"
              >
                <Cake className="w-4 h-4" />
                <span>Explore Collection</span>
              </button>
              <button
                onClick={() => onScrollToSection('custom-builder')}
                className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-cream-dark hover:bg-white text-chocolate font-sans text-sm font-bold uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center focus:outline-none"
              >
                Custom Request
              </button>
            </motion.div>

            {/* Micro Rating Accents */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="pt-6 border-t border-cream-dark flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-chocolate/70"
            >
              <div className="flex items-center space-x-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <span className="font-semibold text-chocolate font-display">4.9 (2,400+ Reviews)</span>
              </div>
              <div className="h-4 w-px bg-cream-dark hidden sm:block" />
              <div>
                <span className="font-semibold text-chocolate">Freshly Baked Daily</span> • Premium Ingredients
              </div>
            </motion.div>
          </div>

          {/* Visual Presentation Block */}
          <div className="lg:col-span-6 relative order-1 lg:order-2 flex justify-center items-center w-full min-h-[400px]">
            {/* Geometric Rotating Overlays */}
            <div className="absolute inset-4 bg-pastel-pink-dark rounded-[40px] transform rotate-3 z-0" />
            <div className="absolute inset-4 bg-cream-dark rounded-[40px] transform -rotate-3 overflow-hidden border-4 border-white shadow-2xl z-10">
              <div className="w-full h-full bg-chocolate/5 flex flex-col items-center justify-center p-8 relative">
                <img
                  src={HERO_BANNER_IMAGE}
                  alt="Beautiful artisanal cakes from MomBakes"
                  className="absolute inset-0 w-full h-full object-cover opacity-90 transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate/95 via-chocolate/30 to-transparent" />
                
                {/* Floating star medallion inside the offset layout */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-accent-pink rounded-full flex items-center justify-center text-white font-serif font-bold shadow-lg animate-pulse">★</div>
                
                <div className="absolute bottom-6 left-6 right-6 text-left">
                  <span className="text-white font-bold text-2xl font-serif block drop-shadow-md">Signature Red Velvet</span>
                  <span className="text-gold font-semibold text-sm tracking-widest uppercase block mt-1">Starting from $45</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Bounce Down Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 hidden sm:block">
        <button
          onClick={() => onScrollToSection('about')}
          className="p-2 rounded-full border border-pastel-pink-dark text-chocolate/60 hover:text-warm-brown hover:bg-pastel-pink transition-all duration-300 focus:outline-none animate-bounce"
          aria-label="Scroll down to About"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
