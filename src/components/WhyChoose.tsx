import {
  Sparkles,
  Award,
  Heart,
  Palette,
  DollarSign,
  Truck,
  Gift,
  Smile,
} from 'lucide-react';
import { motion } from 'motion/react';

export default function WhyChoose() {
  const points = [
    {
      icon: <Sparkles className="w-6 h-6 text-gold-dark" />,
      title: 'Freshly Baked Daily',
      description: 'We don\'t freeze or pre-make our cakes. Every sponge is whipped up and slow-baked fresh on the morning of your event.',
    },
    {
      icon: <Award className="w-6 h-6 text-warm-brown" />,
      title: 'Premium Ingredients',
      description: 'Madagascar vanilla bean pods, organic farm butter, rich farm milk, and real Belgian chocolate define our high-end taste.',
    },
    {
      icon: <Heart className="w-6 h-6 text-gold-dark" />,
      title: 'Homemade Recipes',
      description: 'Time-tested family legacy recipes designed from scratch with love. No artificial preservatives, stabilizers, or boxed mixes.',
    },
    {
      icon: <Palette className="w-6 h-6 text-warm-brown" />,
      title: 'Custom Designs',
      description: 'Your dream, fully realized. We hand-paint details, mold custom fondant toppers, and match your exact color swatches.',
    },
    {
      icon: <DollarSign className="w-6 h-6 text-gold-dark" />,
      title: 'Affordable Prices',
      description: 'Get luxury styling and premium culinary craftsmanship at friendly, transparent cottage prices with no hidden fees.',
    },
    {
      icon: <Truck className="w-6 h-6 text-warm-brown" />,
      title: 'Fast & Safe Delivery',
      description: 'We offer secure, air-conditioned local delivery and professional on-site setup to keep multi-tiered designs perfectly intact.',
    },
    {
      icon: <Gift className="w-6 h-6 text-gold-dark" />,
      title: 'Beautiful Presentation',
      description: 'Arrives in elegant, clear-window signature cake boxes, complete with luxury satin ribbons and personalized name tags.',
    },
    {
      icon: <Smile className="w-6 h-6 text-warm-brown" />,
      title: 'Customer Satisfaction',
      description: 'Over 500+ glowing local reviews and thousands of celebration smiles. Your absolute joy is our golden standard.',
    },
  ];

  return (
    <section id="why-choose" className="py-20 md:py-28 bg-cream-light border-t border-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <p className="font-display text-xs md:text-sm font-bold text-warm-brown uppercase tracking-widest">
            The MomBakes Promise
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-chocolate tracking-tight">
            Why Choose MomBakes?
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
          <p className="font-sans text-sm text-chocolate/75 leading-relaxed font-light">
            We pour heart, soul, and premium artistry into every mixing bowl. Discover why families trust us with their most cherished life milestones.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl p-6 border border-cream-dark shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col space-y-4 text-center items-center"
            >
              {/* Animated Icon Container */}
              <div className="w-14 h-14 rounded-full bg-cream border border-pastel-pink-dark flex items-center justify-center shadow-inner">
                {point.icon}
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="font-serif text-base font-bold text-chocolate">
                  {point.title}
                </h3>
                <p className="font-sans text-xs text-chocolate/70 leading-relaxed font-light">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
