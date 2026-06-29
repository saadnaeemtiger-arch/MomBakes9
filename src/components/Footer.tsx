import React, { useState } from 'react';
import { Mail, Instagram, Facebook, MessageSquare, ArrowUp, Cake, Check, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 2000);
    }
  };

  const categories = [
    { name: 'Birthday Cakes', id: 'birthday' },
    { name: 'Wedding Cakes', id: 'wedding' },
    { name: 'Custom Celebration Cakes', id: 'custom' },
    { name: 'Gourmet Cupcakes', id: 'cupcakes' },
    { name: 'Assorted Brownies & Cookies', id: 'brownies' },
    { name: 'Artisanal Pastries & Desserts', id: 'pastries' },
  ];

  const quickLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About MomBakes', id: 'about' },
    { name: 'Our Signature Cakes', id: 'products' },
    { name: 'Design Your Cake', id: 'custom-builder' },
    { name: 'Baking Gallery', id: 'gallery' },
    { name: 'Customer Testimonials', id: 'testimonials' },
    { name: 'FAQ & Notices', id: 'faq' },
    { name: 'Get In Touch', id: 'contact' },
  ];

  return (
    <footer className="bg-chocolate text-cream pt-20 pb-8 relative overflow-hidden border-t-4 border-accent-pink">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-warm-brown opacity-10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gold opacity-5 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-cream/10">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-xl bg-cream/10 flex items-center justify-center text-accent-pink border border-cream/15">
                <Cake className="w-5 h-5 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-normal tracking-tight text-white leading-none">
                  MomBakes
                </span>
                <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-gold font-medium leading-none mt-1">
                  Artisanal Bakery
                </span>
              </div>
            </div>
            <p className="font-sans text-xs text-cream/70 leading-relaxed font-light">
              Crafting premium homemade cakes, custom event designs, fluffy cupcakes, and freshly baked artisanal treats using only the finest farm-fresh ingredients. Every bite is slow-baked with pure love.
            </p>
            {/* Social Icons */}
            <div className="flex items-center space-x-3.5 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-cream/5 border border-cream/10 flex items-center justify-center text-cream/80 hover:text-accent-pink hover:bg-cream/10 transition-all"
                aria-label="Instagram link"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-cream/5 border border-cream/10 flex items-center justify-center text-cream/80 hover:text-accent-pink hover:bg-cream/10 transition-all"
                aria-label="Facebook link"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/15550199"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-cream/5 border border-cream/10 flex items-center justify-center text-cream/80 hover:text-green-400 hover:bg-cream/10 transition-all"
                aria-label="WhatsApp direct link"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-sm font-bold text-white tracking-wider border-b border-cream/10 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onScrollToSection(link.id)}
                    className="text-cream/70 hover:text-gold hover:translate-x-1.5 transition-all focus:outline-none text-left cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-bold text-white tracking-wider border-b border-cream/10 pb-2">
              Cake Collections
            </h4>
            <ul className="space-y-2.5 text-xs">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onScrollToSection('products')}
                    className="text-cream/70 hover:text-gold hover:translate-x-1.5 transition-all focus:outline-none text-left cursor-pointer"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-bold text-white tracking-wider border-b border-cream/10 pb-2">
              Sweet Newsletters
            </h4>
            <p className="font-sans text-xs text-cream/70 leading-relaxed font-light">
              Subscribe to get seasonal flavor updates, secret home recipes, and priority notification on cake slots!
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs font-sans rounded-xl border border-cream/15 bg-white/5 px-4 py-3 text-white placeholder-cream/40 outline-none focus:border-accent-pink focus:bg-white/10 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSubscribed}
                className={`w-full py-2.5 rounded-xl font-sans text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-sm ${
                  isSubscribed
                    ? 'bg-gold text-chocolate border-transparent'
                    : 'bg-accent-pink text-white hover:bg-gold hover:text-chocolate'
                }`}
              >
                <AnimatePresence mode="wait">
                  {isSubscribed ? (
                    <motion.div
                      key="checked"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center space-x-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Subscribed!</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="send"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center space-x-1.5"
                    >
                      <Send className="w-3 h-3" />
                      <span>Join The Sweet List</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright details */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/55">
          <p>© 2026 MomBakes Co. All rights reserved. Handcrafted by Mom with love.</p>
          <div className="flex items-center space-x-4">
            <a href="#home" onClick={(e) => { e.preventDefault(); onScrollToSection('home'); }} className="hover:text-gold transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#home" onClick={(e) => { e.preventDefault(); onScrollToSection('home'); }} className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
