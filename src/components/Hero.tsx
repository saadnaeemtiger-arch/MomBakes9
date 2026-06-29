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
              className="inline-flex items-center space-x-2 bg-pastel-pink border border-pastel-pink-dark px-4 py-1.5 rounded-full text-warm-brown text-xs md:text-sm font-semibold tracking-wide"
            >
              <Sparkles className="w-4.5 h-4.5 text-gold animate-spin-slow" />
              <span>Gourmet Home Bakery</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-chocolate leading-[1.1] tracking-tight"
            >
              Freshly Baked with <span className="text-warm-brown relative inline-block">
                Love
                <svg className="absolute left-0 bottom-0.5 w-full h-2.5 text-pastel-pink-dark -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="6" fill="none" />
                </svg>
              </span>, Made for Every Celebration
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-sans text-base sm:text-lg text-chocolate/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              From birthdays to weddings, MomBakes creates handcrafted cakes and desserts that make every occasion unforgettable. Baked fresh with premium ingredients.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={() => onScrollToSection('products')}
                className="w-full sm:w-auto px-8 py-4 bg-chocolate hover:bg-warm-brown text-cream-light font-display text-sm font-bold uppercase tracking-wider rounded-full shadow-lg hover:shadow-xl premium-shimmer transition-all duration-300 flex items-center justify-center space-x-2 focus:outline-none"
              >
                <Cake className="w-4 h-4" />
                <span>Order Now</span>
              </button>
              <button
                onClick={() => onScrollToSection('categories')}
                className="w-full sm:w-auto px-8 py-4 bg-cream border-2 border-pastel-pink-dark hover:border-warm-brown text-chocolate hover:text-warm-brown font-display text-sm font-bold uppercase tracking-wider rounded-full shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center focus:outline-none"
              >
                Explore Our Cakes
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
                <span className="font-semibold text-chocolate font-display">5.0 Star Rated</span>
              </div>
              <div className="h-4 w-px bg-cream-dark hidden sm:block" />
              <div>
                <span className="font-semibold text-chocolate">100% Handcrafted</span> with Premium Ingredients
              </div>
            </motion.div>
          </div>

          {/* Visual Presentation Block */}
          <div className="lg:col-span-6 relative order-1 lg:order-2 flex justify-center items-center">
            {/* Soft backdrop decorative glow card */}
            <div className="absolute w-[80%] h-[80%] rounded-full bg-pastel-pink blur-3xl opacity-60 z-0 animate-pulse" />

            {/* Floating Visual Elements */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 z-20 bg-cream-light/90 border border-pastel-pink-dark shadow-md p-3.5 rounded-2xl flex items-center space-x-2.5 backdrop-blur-sm hidden sm:flex"
            >
              <div className="w-8 h-8 rounded-full bg-pastel-pink flex items-center justify-center text-warm-brown">
                <Star className="w-4 h-4 fill-warm-brown" />
              </div>
              <div>
                <p className="font-display text-[10px] font-bold text-chocolate uppercase tracking-wider leading-none">Freshly Baked</p>
                <p className="text-xs text-warm-brown font-semibold mt-0.5">Every Single Day</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-4 right-2 z-20 bg-cream-light/90 border border-pastel-pink-dark shadow-md p-3.5 rounded-2xl flex items-center space-x-2.5 backdrop-blur-sm hidden sm:flex"
            >
              <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center text-gold-dark">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="font-display text-[10px] font-bold text-chocolate uppercase tracking-wider leading-none">Award Winning</p>
                <p className="text-xs text-warm-brown font-semibold mt-0.5">Bespoke Decor</p>
              </div>
            </motion.div>

            {/* Main Hero Image Frame */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden border-8 border-cream shadow-2xl z-10 aspect-[4/3] w-full max-w-lg md:max-w-xl"
            >
              <img
                src={HERO_BANNER_IMAGE}
                alt="Beautiful artisanal cakes from MomBakes"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>
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
