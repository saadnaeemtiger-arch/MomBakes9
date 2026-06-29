import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { CATEGORIES } from '../data';

interface FeaturedCategoriesProps {
  onSelectCategory: (categoryId: string) => void;
}

export default function FeaturedCategories({ onSelectCategory }: FeaturedCategoriesProps) {
  return (
    <section id="categories" className="py-20 md:py-28 bg-cream-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <p className="font-sans text-xs md:text-sm font-bold text-accent-pink uppercase tracking-[0.2em]">
            Baked with Passion
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-chocolate tracking-tight">
            Explore Our <span className="text-gold italic font-normal">Sweet Collections</span>
          </h2>
          <div className="w-16 h-[1px] bg-gold mx-auto" />
          <p className="font-sans text-sm text-warm-brown leading-relaxed font-light">
            Each category is crafted with love and tailored recipes to bring you the finest homemade treats, from fluffy cupcakes to majestic wedding centerpieces.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-3xl border border-[#F5F5F5] hover:border-accent-pink overflow-hidden flex flex-col transition-all duration-300 shadow-md"
            >
              {/* Image Frame with Zoom effect */}
              <div className="relative aspect-[4/3] overflow-hidden bg-cream-dark">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content Box */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-bold text-chocolate group-hover:text-accent-pink transition-colors">
                    {category.name}
                  </h3>
                  <p className="font-sans text-xs text-warm-brown leading-relaxed font-light line-clamp-2">
                    {category.description}
                  </p>
                </div>

                <button
                  onClick={() => onSelectCategory(category.id)}
                  className="inline-flex items-center space-x-1.5 text-xs font-sans font-bold text-accent-pink uppercase tracking-widest hover:text-accent-pink-dark transition-colors focus:outline-none mt-auto"
                >
                  <span>View Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
