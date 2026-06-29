import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-cream-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <p className="font-sans text-xs md:text-sm font-bold text-accent-pink uppercase tracking-[0.2em]">
            Loved By Families
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-chocolate tracking-tight">
            Sweet Words From <span className="text-gold italic font-normal">Clients</span>
          </h2>
          <div className="w-16 h-[1px] bg-gold mx-auto" />
          <p className="font-sans text-sm text-warm-brown leading-relaxed font-light">
            We are honored to have played a sweet role in our clients’ weddings, children’s birthdays, anniversaries, and precious celebrations. See what they have to say!
          </p>
        </div>

        {/* Testimonials Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-[2rem] p-8 border border-[#F5F5F5] hover:border-accent-pink shadow-md hover:shadow-xl relative flex flex-col justify-between transition-all duration-300"
            >
              {/* Decorative Absolute Giant Quote Mark */}
              <div className="absolute top-6 right-8 text-pastel-pink opacity-30 select-none">
                <Quote className="w-16 h-16 transform scale-x-[-1] fill-current" />
              </div>

              {/* Star Rating and Content */}
              <div className="space-y-4 relative z-10">
                {/* Gold Stars */}
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-gold text-gold" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="font-sans text-xs sm:text-sm text-warm-brown italic leading-relaxed font-light">
                  "{testimonial.review}"
                </p>
              </div>

              {/* Client Info Footer */}
              <div className="flex items-center space-x-3.5 pt-6 mt-6 border-t border-cream relative z-10">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-pastel-pink-dark shrink-0">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-chocolate leading-tight">
                    {testimonial.name}
                  </h4>
                  <p className="font-sans text-[10px] font-semibold text-accent-pink uppercase tracking-widest mt-0.5">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
