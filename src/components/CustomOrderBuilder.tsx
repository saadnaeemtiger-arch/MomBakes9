import React, { useState } from 'react';
import {
  Sparkles,
  ClipboardList,
  Upload,
  Cake,
  CheckCircle,
  Truck,
  Plus,
  Heart,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, CustomCakeOrder } from '../types';

interface CustomOrderBuilderProps {
  onAddToCart: (item: CartItem) => void;
}

export default function CustomOrderBuilder({ onAddToCart }: CustomOrderBuilderProps) {
  // Step-by-Step Illustration Config
  const steps = [
    {
      num: '1',
      title: 'Choose Your Cake',
      desc: 'Pick your dream sponge flavor, rich frostings, fillings, and structural tiers.',
      icon: <Cake className="w-5 h-5 text-chocolate" />,
    },
    {
      num: '2',
      title: 'Share Your Design',
      desc: 'Upload reference photos or share your exact themes, invitations, and colors.',
      icon: <ClipboardList className="w-5 h-5 text-chocolate" />,
    },
    {
      num: '3',
      title: 'Confirm Your Order',
      desc: 'We finalize pricing, secure your pickup date, and secure a 50% booking deposit.',
      icon: <CheckCircle className="w-5 h-5 text-chocolate" />,
    },
    {
      num: '4',
      title: 'Freshly Baked',
      desc: 'Mom hand-bakes your cake from scratch with love on the morning of your event.',
      icon: <Sparkles className="w-5 h-5 text-chocolate" />,
    },
    {
      num: '5',
      title: 'Pickup or Delivery',
      desc: 'Collect securely from our studio or arrange air-conditioned delivery straight to your door.',
      icon: <Truck className="w-5 h-5 text-chocolate" />,
    },
  ];

  // Interactive Custom Builder State
  const [tiers, setTiers] = useState<number>(1);
  const [flavor, setFlavor] = useState<string>('Madagascar Vanilla Bean');
  const [frosting, setFrosting] = useState<string>('Swiss Meringue Buttercream');
  const [filling, setFilling] = useState<string>('Fresh Strawberry Slices');
  const [dietary, setDietary] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  const [colorTheme, setColorTheme] = useState<string>('Pastel Pink & Cream');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [isAdded, setIsAdded] = useState<boolean>(false);

  // Dynamic pricing algorithm
  const calculatePrice = () => {
    let base = 45; // 1 tier starting
    if (tiers === 2) base = 110;
    if (tiers === 3) base = 195;

    // Additional options charge
    if (dietary.length > 0) base += dietary.length * 8; // dietary options add +$8 each
    if (flavor.includes('Caramel') || flavor.includes('Pecan')) base += 5;
    if (filling.includes('Praline') || filling.includes('Curd')) base += 5;

    return base;
  };

  const handleDietaryToggle = (item: string) => {
    setDietary((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleAddCustomCake = () => {
    const estimatedPrice = calculatePrice();
    const customCake: CustomCakeOrder = {
      id: `custom-${Date.now()}`,
      name: `Custom ${tiers}-Tier ${flavor.split(' ')[1] || 'Celebration'} Cake`,
      tiers,
      flavor,
      frosting,
      filling,
      dietary,
      message,
      colorTheme,
      specialInstructions,
      estimatedPrice,
    };

    const cartItem: CartItem = {
      id: customCake.id,
      type: 'custom',
      customOrder: customCake,
      quantity: 1,
      price: estimatedPrice,
    };

    onAddToCart(cartItem);

    // Show visual checkmark feedback
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      // Reset text inputs
      setMessage('');
      setSpecialInstructions('');
    }, 2500);
  };

  return (
    <section id="custom-builder" className="py-20 md:py-28 bg-cream border-t border-b border-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <p className="font-sans text-xs md:text-sm font-bold text-accent-pink uppercase tracking-[0.2em]">
            Bespoke Celebration Studio
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-chocolate tracking-tight">
            Custom Cake <span className="text-gold italic font-normal">Ordering</span>
          </h2>
          <div className="w-16 h-[1px] bg-gold mx-auto" />
          <p className="font-sans text-sm text-warm-brown leading-relaxed font-light">
            Bringing your dream celebrations to life is as easy as pie. Review our simple step-by-step custom design timeline, then use our interactive Custom Cake Builder below to send us your exact recipe specifications.
          </p>
        </div>

        {/* 5-Step Visual Ordering Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-20 relative">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-0.5 bg-pastel-pink-dark/70 z-0" />
          
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center space-y-3.5 relative z-10"
            >
              {/* Number and Icon node */}
              <div className="relative w-14 h-14 rounded-full bg-white border border-pastel-pink-dark shadow-sm flex items-center justify-center group hover:border-accent-pink hover:bg-pastel-pink transition-all duration-300">
                {step.icon}
                <span className="absolute -top-1 -right-1 w-5.5 h-5.5 bg-accent-pink text-white font-sans text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
                  {step.num}
                </span>
              </div>
              
              {/* Text content */}
              <div className="space-y-1 max-w-[180px]">
                <h4 className="font-serif text-sm font-bold text-chocolate">{step.title}</h4>
                <p className="font-sans text-[11px] text-warm-brown leading-relaxed font-light">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Custom Cake Builder Frame */}
        <div className="bg-white rounded-[2.5rem] border border-[#F5F5F5] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left panel: Form configuration */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-8">
            <div className="space-y-2">
              <span className="font-sans text-[10px] font-bold text-accent-pink uppercase tracking-widest bg-pastel-pink px-3 py-1 rounded-full border border-pastel-pink-dark">
                Interactive Lab
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-chocolate pt-2">
                Design Your <span className="text-gold italic font-normal">Dream Cake</span>
              </h3>
              <p className="font-sans text-xs text-warm-brown font-light">
                Mix-and-match sizing, layers, artisanal frostings, and fillings. We’ll calculate an approximate quote instantly.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Tiers Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-accent-pink">
                  Cake Tiers:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTiers(t)}
                      className={`py-2 rounded-xl border text-xs font-sans font-bold transition-all focus:outline-none ${
                        tiers === t
                          ? 'bg-accent-pink text-white border-accent-pink shadow-md scale-105'
                          : 'bg-cream-light/40 border-cream-dark text-chocolate/80 hover:bg-cream hover:text-chocolate'
                      }`}
                    >
                      {t} Tier{t > 1 ? 's' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Flavor Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-accent-pink">
                  Sponge Flavor:
                </label>
                <select
                  value={flavor}
                  onChange={(e) => setFlavor(e.target.value)}
                  className="w-full text-xs font-sans rounded-xl border border-cream-dark bg-cream-light/40 px-3.5 py-2.5 text-chocolate outline-none hover:border-accent-pink focus:border-accent-pink focus:bg-white transition-all cursor-pointer"
                >
                  <option value="Madagascar Vanilla Bean">Madagascar Vanilla Bean</option>
                  <option value="Belgian Chocolate Fudge">Belgian Chocolate Fudge</option>
                  <option value="Velvety Cocoa Red Velvet">Velvety Cocoa Red Velvet</option>
                  <option value="Salted Caramel Pecan">Salted Caramel Pecan</option>
                  <option value="Lemon Zest Raspberry">Lemon Zest Raspberry</option>
                  <option value="Zesty Orange Spice">Zesty Orange Spice</option>
                </select>
              </div>

              {/* Frosting Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-accent-pink">
                  Outer Frosting:
                </label>
                <select
                  value={frosting}
                  onChange={(e) => setFrosting(e.target.value)}
                  className="w-full text-xs font-sans rounded-xl border border-cream-dark bg-cream-light/40 px-3.5 py-2.5 text-chocolate outline-none hover:border-accent-pink focus:border-accent-pink focus:bg-white transition-all cursor-pointer"
                >
                  <option value="Swiss Meringue Buttercream">Swiss Meringue Buttercream (Silky)</option>
                  <option value="Classic Vanilla Cream Cheese">Classic Vanilla Cream Cheese (Rich)</option>
                  <option value="Belgian Chocolate Ganache">Belgian Chocolate Ganache (Fudgy)</option>
                  <option value="Fondant Wrap Decoration">Elegant Hand-sculpted Fondant Wrapper</option>
                </select>
              </div>

              {/* Filling Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-accent-pink">
                  Inner Filling Layer:
                </label>
                <select
                  value={filling}
                  onChange={(e) => setFilling(e.target.value)}
                  className="w-full text-xs font-sans rounded-xl border border-cream-dark bg-cream-light/40 px-3.5 py-2.5 text-chocolate outline-none hover:border-accent-pink focus:border-accent-pink focus:bg-white transition-all cursor-pointer"
                >
                  <option value="Fresh Strawberry Slices">Fresh Strawberry Slices & Cream</option>
                  <option value="Organic Raspberry Compote">Organic Raspberry Compote</option>
                  <option value="Rich Chocolate Fudge Ganache">Rich Chocolate Fudge Ganache</option>
                  <option value="Salted Caramel Pecan Praline">Salted Caramel Pecan Praline</option>
                  <option value="Tangy Lemon Curd">Tangy Lemon Curd</option>
                  <option value="Light Vanilla Chantilly Cream">Light Vanilla Chantilly Cream</option>
                </select>
              </div>

              {/* Color Theme Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-accent-pink">
                  Color Scheme:
                </label>
                <select
                  value={colorTheme}
                  onChange={(e) => setColorTheme(e.target.value)}
                  className="w-full text-xs font-sans rounded-xl border border-cream-dark bg-cream-light/40 px-3.5 py-2.5 text-chocolate outline-none hover:border-accent-pink focus:border-accent-pink focus:bg-white transition-all cursor-pointer"
                >
                  <option value="Pastel Pink & Cream">Pastel Pink & Cream</option>
                  <option value="Classic Ivory & Gold">Classic Ivory & Gold</option>
                  <option value="Lavender & Sage Green">Lavender & Sage Green</option>
                  <option value="Chocolate & Golden Bronze">Chocolate & Golden Bronze</option>
                  <option value="Vibrant Party Multi-Color">Vibrant Party Multi-Color</option>
                  <option value="Minimalist Clean All-White">Minimalist Clean All-White</option>
                </select>
              </div>

              {/* Dietary Preferences */}
              <div className="space-y-2">
                <label className="block text-xs font-sans font-bold uppercase tracking-wider text-accent-pink">
                  Dietary Accommodations:
                </label>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {['Gluten-Free', 'Vegan', 'Eggless', 'Dairy-Free'].map((item) => {
                    const selected = dietary.includes(item);
                    return (
                      <button
                        key={item}
                        onClick={() => handleDietaryToggle(item)}
                        className={`px-3 py-1.5 rounded-lg border text-[10px] font-sans font-bold tracking-wide transition-all focus:outline-none ${
                          selected
                            ? 'bg-pastel-pink border-pastel-pink-dark text-accent-pink'
                            : 'bg-cream-light/30 border-cream-dark text-chocolate/70 hover:bg-cream hover:text-chocolate'
                        }`}
                      >
                        {selected ? '✓ ' : '+ '}
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Custom greeting text */}
            <div className="space-y-2">
              <label className="block text-xs font-sans font-bold uppercase tracking-wider text-accent-pink">
                Greeting Message on Cake (Optional):
              </label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g. Happy 30th Birthday, Isabella! (Keep it sweet & short)"
                className="w-full text-xs font-sans rounded-xl border border-cream-dark bg-cream-light/40 px-3.5 py-2.5 text-chocolate outline-none hover:border-accent-pink focus:border-accent-pink focus:bg-white transition-all"
              />
            </div>

            {/* Special Design Notes */}
            <div className="space-y-2">
              <label className="block text-xs font-sans font-bold uppercase tracking-wider text-accent-pink">
                Design Theme & Special Instructions:
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                rows={3}
                placeholder="Describe your theme (e.g., 'Space galaxy theme with blue star sprinkles' or 'Rustic floral with white peonies on top')."
                className="w-full text-xs font-sans rounded-xl border border-cream-dark bg-cream-light/40 px-3.5 py-2.5 text-chocolate outline-none hover:border-accent-pink focus:border-accent-pink focus:bg-white transition-all resize-none"
              />
            </div>
          </div>

          {/* Right panel: Visual output / cost calculator */}
          <div className="lg:col-span-5 bg-gradient-to-br from-chocolate to-chocolate-dark p-8 sm:p-10 lg:p-12 text-cream flex flex-col justify-between space-y-8 relative">
            {/* Soft decorative light circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-warm-brown opacity-20 blur-2xl rounded-full" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold opacity-15 blur-2xl rounded-full" />

            <div className="space-y-6 relative z-10">
              <h4 className="font-serif text-lg font-bold text-gold tracking-wide border-b border-cream/15 pb-4">
                Your Custom Recipe
              </h4>

              {/* Dynamic Mock Cake representation */}
              <div className="py-2 flex justify-center items-center">
                <div className="flex flex-col items-center justify-end space-y-1 h-36 w-full max-w-[180px]">
                  {/* Tier 3 (Shown only if tiers >= 3) */}
                  <AnimatePresence>
                    {tiers >= 3 && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0, y: -20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="w-20 h-8 rounded-t-xl bg-pastel-pink border-2 border-white flex items-center justify-center text-warm-brown font-sans text-[9px] font-bold shadow-md uppercase"
                      >
                        Tier 3
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Tier 2 (Shown if tiers >= 2) */}
                  <AnimatePresence>
                    {tiers >= 2 && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0, y: -20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="w-28 h-10 bg-pastel-pink-dark border-2 border-white flex items-center justify-center text-warm-brown font-sans text-[10px] font-bold shadow-md uppercase"
                      >
                        Tier 2
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Tier 1 (Always shown) */}
                  <motion.div
                    layout
                    className="w-36 h-12 rounded-b-xl bg-cream border-2 border-white flex items-center justify-center text-chocolate font-sans text-xs font-bold shadow-md uppercase"
                  >
                    Base Tier
                  </motion.div>
                </div>
              </div>

              {/* Specs checklist */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between border-b border-cream/10 pb-1.5">
                  <span className="text-cream/60">Structure:</span>
                  <span className="font-semibold text-cream-light">{tiers} Tier{tiers > 1 ? 's' : ''} Cake</span>
                </div>
                <div className="flex justify-between border-b border-cream/10 pb-1.5">
                  <span className="text-cream/60">Sponge:</span>
                  <span className="font-semibold text-cream-light line-clamp-1">{flavor}</span>
                </div>
                <div className="flex justify-between border-b border-cream/10 pb-1.5">
                  <span className="text-cream/60">Frosting:</span>
                  <span className="font-semibold text-cream-light line-clamp-1">{frosting}</span>
                </div>
                <div className="flex justify-between border-b border-cream/10 pb-1.5">
                  <span className="text-cream/60">Filling:</span>
                  <span className="font-semibold text-cream-light line-clamp-1">{filling}</span>
                </div>
                {dietary.length > 0 && (
                  <div className="flex justify-between border-b border-cream/10 pb-1.5">
                    <span className="text-cream/60">Dietary:</span>
                    <span className="font-semibold text-gold line-clamp-1">{dietary.join(', ')}</span>
                  </div>
                )}
                <div className="flex justify-between border-b border-cream/10 pb-1.5">
                  <span className="text-cream/60">Color theme:</span>
                  <span className="font-semibold text-cream-light">{colorTheme}</span>
                </div>
                {message && (
                  <div className="flex flex-col space-y-1 pt-1">
                    <span className="text-cream/60">Writing Message:</span>
                    <span className="font-serif italic text-gold text-[11px] leading-tight font-medium bg-cream/10 px-3 py-1.5 rounded-lg border border-cream/15 block">
                      "{message}"
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Price estimation and CTA */}
            <div className="pt-6 border-t border-cream/15 relative z-10 space-y-4">
              <div className="flex items-end justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-cream/60">Estimated Starting Quote</span>
                  <span className="font-serif text-3xl font-bold text-gold">${calculatePrice()}</span>
                </div>
                <div className="flex items-center space-x-1 text-cream/50 text-[10px] uppercase font-sans">
                  <Heart className="w-3 h-3 text-gold fill-gold animate-pulse" />
                  <span>Cottage Rates</span>
                </div>
              </div>

              <button
                id="add-custom-to-basket"
                onClick={handleAddCustomCake}
                disabled={isAdded}
                className={`w-full py-3.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 shadow-md ${
                  isAdded
                    ? 'bg-gold text-chocolate scale-98'
                    : 'bg-white hover:bg-gold text-chocolate border border-transparent hover:scale-[1.02]'
                }`}
              >
                {isAdded ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-chocolate" />
                    <span>Added Custom Cake!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 text-chocolate" />
                    <span>Add Custom Cake to Inquiry</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
