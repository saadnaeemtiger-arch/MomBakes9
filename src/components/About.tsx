import { Heart, Sparkles, Award, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { BAKING_PROCESS_IMAGE } from '../data';

export default function About() {
  const highlights = [
    {
      icon: <Sparkles className="w-5 h-5 text-gold-dark" />,
      title: 'Fresh Ingredients',
      description: 'We source only premium real butter, farm eggs, organic fruit compotes, and authentic Belgian chocolate.',
    },
    {
      icon: <Heart className="w-5 h-5 text-warm-brown" />,
      title: 'Homemade Quality',
      description: 'Slow-baked in small batches using time-honoured, scratch recipes to lock in unparalleled moisture and flavor.',
    },
    {
      icon: <Award className="w-5 h-5 text-gold-dark" />,
      title: 'Custom Cake Designs',
      description: 'No templates. Every rose is hand-piped, and every tier is designed specifically to capture your celebration theme.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-warm-brown" />,
      title: 'Friendly Customer Service',
      description: 'From design consultation to seamless, stress-free pickups, we handle your special day with loving attention.',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-cream border-t border-b border-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Images Grid */}
          <div className="lg:col-span-5 relative order-2 lg:order-1 min-h-[350px] flex items-center justify-center">
            <div className="absolute inset-4 bg-pastel-pink-dark rounded-[40px] transform rotate-3 z-0" />
            
            <div className="relative rounded-[40px] overflow-hidden border-4 border-white shadow-2xl z-10 aspect-[4/3] sm:aspect-square md:aspect-[4/3] w-full transform -rotate-3">
              <img
                src={BAKING_PROCESS_IMAGE}
                alt="Baking process and chef expertise at MomBakes"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Corner Badge */}
            <div className="absolute -bottom-2 -right-2 bg-chocolate text-cream-light p-5 rounded-xl shadow-xl z-20 max-w-[180px] border-2 border-gold hidden sm:block">
              <p className="font-serif text-3xl font-bold text-gold">100%</p>
              <p className="font-sans text-[9px] uppercase tracking-wider text-cream/80 mt-1">Made from Scratch with Love</p>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 order-1 lg:order-2">
            <div className="space-y-3">
              <p className="font-sans text-xs md:text-sm font-bold text-accent-pink uppercase tracking-[0.2em]">
                Our Sweet Story
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-chocolate tracking-tight leading-tight">
                Crafting Edible Masterpieces from <span className="text-gold italic font-normal">Our Heart to Yours</span>
              </h2>
            </div>

            <p className="font-sans text-base text-warm-brown leading-relaxed font-light">
              MomBakes started in a humble family kitchen with one simple philosophy: cakes should look like a work of art and taste like a warm embrace. What began as baking for family birthdays has blossomed into a premier custom cake boutique, dedicated to sweetening life’s most beautiful moments.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 pt-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-pastel-pink flex items-center justify-center shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-sans text-sm font-bold text-chocolate">
                      {item.title}
                    </h3>
                    <p className="text-xs text-warm-brown leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
