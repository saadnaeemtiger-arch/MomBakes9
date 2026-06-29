import React, { useState } from 'react';
import { Star, ShoppingBag, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, CATEGORIES } from '../data';
import { CakeProduct, CartItem } from '../types';

interface SignatureCakesProps {
  onAddToCart: (item: CartItem) => void;
  selectedCategoryFilter: string;
  onSetCategoryFilter: (category: string) => void;
}

export default function SignatureCakes({
  onAddToCart,
  selectedCategoryFilter,
  onSetCategoryFilter,
}: SignatureCakesProps) {
  // Store selected flavor and size per product ID
  const [productSelections, setProductSelections] = useState<{
    [productId: string]: { flavor: string; size: string };
  }>({});

  // Store adding animation states per product ID
  const [addedStates, setAddedStates] = useState<{ [productId: string]: boolean }>({});

  const handleFlavorChange = (productId: string, flavor: string) => {
    setProductSelections((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], flavor },
    }));
  };

  const handleSizeChange = (productId: string, size: string) => {
    setProductSelections((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], size },
    }));
  };

  const handleAddToInquiry = (product: CakeProduct) => {
    const selection = productSelections[product.id] || {
      flavor: product.flavors[0],
      size: product.sizes[0],
    };

    const flavor = selection.flavor || product.flavors[0];
    const size = selection.size || product.sizes[0];

    // Simple pricing helper based on sizes
    let priceMultiplier = 1.0;
    if (size.includes('8"')) priceMultiplier = 1.4;
    else if (size.includes('10"')) priceMultiplier = 1.8;
    else if (size.includes('3-Tier')) priceMultiplier = 1.6;
    else if (size.includes('24 Cupcakes')) priceMultiplier = 1.8;

    const basePrice = product.startingPrice;
    const finalPrice = Math.round(basePrice * priceMultiplier);

    const cartItem: CartItem = {
      id: `${product.id}-${size.replace(/\s+/g, '-')}-${flavor.replace(/\s+/g, '-')}`,
      type: 'catalog',
      product,
      selectedSize: size,
      selectedFlavor: flavor,
      quantity: 1,
      price: finalPrice,
    };

    onAddToCart(cartItem);

    // Trigger feedback animation
    setAddedStates((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedStates((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  // Build filter list
  const filterTabs = [{ id: 'all', name: 'All Cakes' }, ...CATEGORIES];

  // Filter products based on selected category tab
  const filteredProducts = PRODUCTS.filter((product) => {
    if (selectedCategoryFilter === 'all') return true;
    
    // Support fuzzy mapping of categories
    if (selectedCategoryFilter === 'birthday') return product.category === 'birthday';
    if (selectedCategoryFilter === 'wedding') return product.category === 'wedding';
    if (selectedCategoryFilter === 'cupcakes') return product.category === 'cupcakes';
    
    // Default to strict category matching
    return product.category === selectedCategoryFilter;
  });

  return (
    <section id="products" className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <p className="font-display text-xs md:text-sm font-bold text-warm-brown uppercase tracking-widest">
            Handcrafted Signature Creations
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-chocolate tracking-tight">
            Our Signature Cakes & Treats
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
          <p className="font-sans text-sm text-chocolate/75 leading-relaxed font-light">
            Indulge in our exquisite assortment of cakes and pastries, freshly baked to perfection. Customize your cake sizes and flavors below and add them directly to your custom order inquiry.
          </p>
        </div>

        {/* Categories Tab Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
          {filterTabs.map((tab) => {
            const isActive = selectedCategoryFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSetCategoryFilter(tab.id)}
                className={`px-5 py-2.5 rounded-full font-display text-xs font-bold uppercase tracking-wider transition-all duration-300 focus:outline-none shadow-sm hover:shadow-md ${
                  isActive
                    ? 'bg-chocolate text-cream border border-chocolate-dark scale-105'
                    : 'bg-white text-chocolate border border-cream-dark hover:bg-pastel-pink hover:text-warm-brown'
                }`}
              >
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Products Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const selection = productSelections[product.id] || {
                flavor: product.flavors[0],
                size: product.sizes[0],
              };
              const isAdded = addedStates[product.id];

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-3xl border border-cream-dark overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Image Holder */}
                  <div className="relative aspect-[4/3] bg-cream overflow-hidden">
                    {product.popular && (
                      <div className="absolute top-4 left-4 z-10 bg-gold text-chocolate font-display text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm border border-gold-dark">
                        Best Seller
                      </div>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-chocolate/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-gold text-gold" />
                        <span className="text-xs font-bold text-chocolate font-display">{product.rating}</span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-chocolate line-clamp-1 group-hover:text-warm-brown transition-colors">
                        {product.name}
                      </h3>
                      <p className="font-sans text-xs text-chocolate/75 leading-relaxed font-light line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    {/* Options Form selectors */}
                    <div className="space-y-2.5 pt-2 border-t border-cream">
                      {/* Flavor Selector */}
                      <div className="space-y-1">
                        <label className="block text-[10px] font-display font-bold uppercase tracking-wider text-warm-brown">
                          Select Flavor:
                        </label>
                        <select
                          value={selection.flavor}
                          onChange={(e) => handleFlavorChange(product.id, e.target.value)}
                          className="w-full text-xs font-sans rounded-xl border border-cream-dark bg-cream-light/60 px-3 py-2 text-chocolate outline-none hover:border-warm-brown focus:border-warm-brown focus:bg-white transition-all cursor-pointer"
                        >
                          {product.flavors.map((flavor) => (
                            <option key={flavor} value={flavor}>
                              {flavor}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Size Selector */}
                      <div className="space-y-1">
                        <label className="block text-[10px] font-display font-bold uppercase tracking-wider text-warm-brown">
                          Select Size:
                        </label>
                        <select
                          value={selection.size}
                          onChange={(e) => handleSizeChange(product.id, e.target.value)}
                          className="w-full text-xs font-sans rounded-xl border border-cream-dark bg-cream-light/60 px-3 py-2 text-chocolate outline-none hover:border-warm-brown focus:border-warm-brown focus:bg-white transition-all cursor-pointer"
                        >
                          {product.sizes.map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Pricing and Button */}
                    <div className="pt-3 border-t border-cream flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-display font-bold text-chocolate/60 tracking-wider">Starting At</span>
                        <span className="font-serif text-xl font-bold text-warm-brown">${product.startingPrice}</span>
                      </div>

                      <button
                        id={`add-to-basket-${product.id}`}
                        onClick={() => handleAddToInquiry(product)}
                        disabled={isAdded}
                        className={`px-4 py-2.5 rounded-full font-display text-[10px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center space-x-1.5 shadow-sm hover:shadow-md focus:outline-none ${
                          isAdded
                            ? 'bg-gold text-chocolate border border-gold-dark scale-95'
                            : 'bg-chocolate hover:bg-warm-brown text-cream border border-chocolate-dark'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add To Inquiry</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
