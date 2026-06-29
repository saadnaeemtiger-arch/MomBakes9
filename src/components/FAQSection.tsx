import React, { useState } from 'react';
import { Plus, Minus, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS } from '../data';

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('f1'); // Keep first one open by default

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-cream border-t border-b border-cream-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <p className="font-sans text-xs md:text-sm font-bold text-accent-pink uppercase tracking-[0.2em]">
            Common Inquiries
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-chocolate tracking-tight">
            Frequently Asked <span className="text-gold italic font-normal">Questions</span>
          </h2>
          <div className="w-16 h-[1px] bg-gold mx-auto" />
          <p className="font-sans text-sm text-warm-brown leading-relaxed font-light">
            Got questions about custom cake planning, notices, delivery rates, or dietary recipes? We’ve gathered answers to help make your booking seamless.
          </p>
        </div>

        {/* FAQs Accordion Grid */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-accent-pink shadow-md'
                    : 'border-[#F5F5F5] shadow-sm hover:border-accent-pink'
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => handleToggle(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
                >
                  <span className="font-serif text-base font-bold text-chocolate group-hover:text-accent-pink transition-colors">
                    {faq.question}
                  </span>
                  
                  {/* Rotating Chevron Icon */}
                  <div
                    className={`p-1.5 rounded-xl border transition-all duration-300 ${
                      isOpen
                        ? 'bg-pastel-pink border-pastel-pink-dark text-accent-pink rotate-180'
                        : 'bg-cream border-cream-dark text-chocolate/60 group-hover:text-chocolate'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                  </div>
                </button>

                {/* Animated Collapsible Answer Block */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-cream text-xs sm:text-sm text-warm-brown leading-relaxed font-light font-sans">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
