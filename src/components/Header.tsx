import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Cake } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
}

export default function Header({ cartCount, onOpenCart, activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Our Cakes', href: '#products' },
    { name: 'Custom Orders', href: '#custom-builder' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 80; // height of fixed header
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream-light/95 backdrop-blur-md shadow-md py-3 border-b border-pastel-pink-dark'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleScrollTo(e, '#home')}
            className="flex items-center space-x-2 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-pastel-pink flex items-center justify-center text-warm-brown border border-pastel-pink-dark group-hover:bg-warm-brown group-hover:text-cream transition-all duration-300">
              <Cake className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-chocolate leading-none group-hover:text-warm-brown transition-colors">
                MomBakes
              </span>
              <span className="font-display text-[9px] uppercase tracking-[0.25em] text-warm-brown font-medium leading-none mt-1">
                Artisanal Bakery
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className={`font-sans font-medium text-sm transition-all duration-200 relative py-1 focus:outline-none ${
                    isActive
                      ? 'text-warm-brown'
                      : 'text-chocolate/85 hover:text-warm-brown'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Utility Buttons */}
          <div className="flex items-center space-x-4">
            {/* Inquiry Basket Button */}
            <button
              id="open-basket-btn"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-cream border border-pastel-pink-dark text-chocolate hover:bg-pastel-pink hover:text-warm-brown transition-all duration-200 focus:outline-none"
              aria-label="Open Inquiry Basket"
            >
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-5.5 h-5.5 bg-gold text-chocolate font-display text-[10px] font-bold rounded-full flex items-center justify-center border border-cream-light"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Premium CTA order builder */}
            <a
              href="#custom-builder"
              onClick={(e) => handleScrollTo(e, '#custom-builder')}
              className="hidden md:inline-flex items-center justify-center px-5 py-2.5 bg-chocolate hover:bg-warm-brown text-cream-light font-display text-xs font-bold uppercase tracking-wider rounded-full premium-shimmer transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Design Your Cake
            </a>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-cream-dark/50 text-chocolate focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-cream-light/95 backdrop-blur-md border-b border-pastel-pink-dark"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className={`block px-4 py-2.5 rounded-lg font-sans text-base font-semibold transition-all ${
                      isActive
                        ? 'bg-pastel-pink text-warm-brown font-bold'
                        : 'text-chocolate/80 hover:bg-cream'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <div className="pt-4 px-4">
                <a
                  href="#custom-builder"
                  onClick={(e) => handleScrollTo(e, '#custom-builder')}
                  className="w-full flex items-center justify-center py-3 bg-chocolate hover:bg-warm-brown text-cream-light font-display text-xs font-bold uppercase tracking-wider rounded-full premium-shimmer transition-all"
                >
                  Design Your Cake
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
