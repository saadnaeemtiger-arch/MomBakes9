import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  MessageCircle,
  Send,
  CheckCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InquiryDetails } from '../types';

interface ContactSectionProps {
  onDirectInquiry: (details: InquiryDetails) => void;
}

export default function ContactSection({ onDirectInquiry }: ContactSectionProps) {
  const [formData, setFormData] = useState<InquiryDetails>({
    name: '',
    email: '',
    phone: '',
    deliveryDate: '',
    deliveryType: 'pickup',
    address: '',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [refCode, setRefCode] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a beautiful unique booking/inquiry reference code (e.g. MB-5129)
    const code = `MB-${Math.floor(1000 + Math.random() * 9000)}`;
    setRefCode(code);
    
    // Call parent handler
    onDirectInquiry(formData);
    
    setIsSubmitted(true);

    // Auto WhatsApp redirect helper
    const messageText = `Hi MomBakes! 🎂 I'd like to place a general inquiry (Ref: ${code}):\n\n• Name: ${formData.name}\n• Phone: ${formData.phone}\n• Email: ${formData.email}\n• Date: ${formData.deliveryDate}\n• Option: ${formData.deliveryType.toUpperCase()}\n${formData.address ? `• Address: ${formData.address}\n` : ''}${formData.notes ? `• Notes: ${formData.notes}\n` : ''}`;
    
    // Stash the inquiry in localStorage
    const savedInquiries = JSON.parse(localStorage.getItem('mombakes_inquiries') || '[]');
    savedInquiries.push({ ...formData, refCode: code, dateSubmitted: new Date().toISOString() });
    localStorage.setItem('mombakes_inquiries', JSON.stringify(savedInquiries));
  };

  const triggerWhatsApp = () => {
    const messageText = `Hi MomBakes! 🎂 My inquiry code is ${refCode}.\n\n• Name: ${formData.name}\n• Date: ${formData.deliveryDate}\n• Type: ${formData.deliveryType.toUpperCase()}\n• Notes: ${formData.notes || 'None'}`;
    const url = `https://wa.me/15550199?text=${encodeURIComponent(messageText)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-cream border-t border-b border-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <p className="font-sans text-xs md:text-sm font-bold text-accent-pink uppercase tracking-[0.2em]">
            Let's Stay Connected
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-chocolate tracking-tight">
            Contact & <span className="text-gold italic font-normal">Inquiries</span>
          </h2>
          <div className="w-16 h-[1px] bg-gold mx-auto" />
          <p className="font-sans text-sm text-warm-brown leading-relaxed font-light">
            Have questions or want to secure your booking date? Drop us a line using our quick online inquiry form, visit our cottage studio, or connect instantly on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Block: Contact Info and Map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F5F5F5] hover:border-accent-pink shadow-md space-y-6 transition-all duration-300">
              <h3 className="font-serif text-xl font-bold text-chocolate">Bakery Details</h3>
              
              <div className="space-y-4 text-sm">
                
                {/* Phone */}
                <a
                  href="tel:+15550199"
                  className="flex items-start space-x-3 text-chocolate/80 hover:text-accent-pink transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full bg-cream border border-pastel-pink-dark flex items-center justify-center shrink-0 text-accent-pink group-hover:bg-accent-pink group-hover:text-white transition-colors mt-0.5">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="font-sans text-[10px] font-bold text-warm-brown uppercase tracking-widest">Call or Text</p>
                    <p className="font-semibold text-chocolate mt-0.5">+1 (555) 0199-BAKE</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:hello@mombakes.com"
                  className="flex items-start space-x-3 text-chocolate/80 hover:text-accent-pink transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full bg-cream border border-pastel-pink-dark flex items-center justify-center shrink-0 text-accent-pink group-hover:bg-accent-pink group-hover:text-white transition-colors mt-0.5">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="font-sans text-[10px] font-bold text-warm-brown uppercase tracking-widest">Email Us</p>
                    <p className="font-semibold text-chocolate mt-0.5">orders@mombakes.com</p>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-start space-x-3 text-chocolate/80">
                  <div className="w-9 h-9 rounded-full bg-cream border border-pastel-pink-dark flex items-center justify-center shrink-0 text-accent-pink mt-0.5">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="font-sans text-[10px] font-bold text-warm-brown uppercase tracking-widest">Studio Address</p>
                    <p className="font-semibold text-chocolate mt-0.5">142 Sweetwater Lane, Sweetwater Hills</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-3 text-chocolate/80">
                  <div className="w-9 h-9 rounded-full bg-cream border border-pastel-pink-dark flex items-center justify-center shrink-0 text-accent-pink mt-0.5">
                    <Clock className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="font-sans text-[10px] font-bold text-warm-brown uppercase tracking-widest">Business Hours</p>
                    <p className="font-semibold text-chocolate mt-0.5">Tue – Sat: 8:00 AM – 6:00 PM</p>
                    <p className="text-xs text-chocolate/60">Sunday: Closed (Event Deliveries Only)</p>
                  </div>
                </div>

              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-cream flex items-center space-x-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-cream border border-cream-dark flex items-center justify-center text-chocolate/80 hover:text-accent-pink hover:bg-pastel-pink transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-cream border border-cream-dark flex items-center justify-center text-chocolate/80 hover:text-accent-pink hover:bg-pastel-pink transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/15550199"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-cream border border-cream-dark flex items-center justify-center text-chocolate/80 hover:text-green-600 hover:bg-green-50 transition-all"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Custom Interactive Styled Google Map Representation */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#F5F5F5] hover:border-accent-pink shadow-md h-64 relative group transition-all duration-300">
              {/* Artistic Grid Background representing street coordinates */}
              <div className="absolute inset-0 bg-cream/35 bg-[linear-gradient(to_right,#e3dac9_1px,transparent_1px),linear-gradient(to_bottom,#e3dac9_1px,transparent_1px)] bg-[size:24px_24px] z-0" />
              
              {/* Illustrative road lines */}
              <div className="absolute top-1/2 left-0 right-0 h-8 bg-cream border-t border-b border-cream-dark/80 rotate-3 z-10" />
              <div className="absolute left-1/3 top-0 bottom-0 w-8 bg-cream border-l border-r border-cream-dark/80 -rotate-12 z-10" />

              {/* Pin representation */}
              <div className="absolute top-[45%] left-[38%] transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                {/* Ping wave */}
                <div className="absolute w-10 h-10 bg-warm-brown/30 rounded-full animate-ping" />
                <div className="w-10 h-10 rounded-full bg-chocolate border border-white shadow-lg flex items-center justify-center text-gold relative">
                  <MapPin className="w-5 h-5 fill-gold text-chocolate" />
                </div>
                <div className="bg-chocolate text-cream font-sans text-[9px] font-bold uppercase tracking-wider py-1 px-2 rounded-md shadow-md mt-1 border border-chocolate-dark whitespace-nowrap">
                  MomBakes Studio
                </div>
              </div>

              {/* Directions prompt */}
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-4 right-4 z-20 px-4 py-2 bg-accent-pink text-white font-sans text-[10px] font-bold uppercase tracking-wider rounded-xl shadow-md hover:bg-chocolate transition-all"
              >
                Open Google Maps
              </a>
            </div>
          </div>

          {/* Right Block: Inquiry Form with Multi-State Animation */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#F5F5F5] hover:border-accent-pink shadow-md transition-all duration-300">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-normal text-chocolate">
                      Send a Quick <span className="text-gold italic">Inquiry</span>
                    </h3>
                    <p className="font-sans text-xs text-warm-brown font-light">
                      Planning a birthday, wedding or special event? Give us a few details and we’ll reach out to finalize your bespoke order.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-sans font-bold uppercase tracking-wider text-accent-pink">
                        Your Full Name: *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Charlotte Brown"
                        className="w-full text-xs font-sans rounded-xl border border-cream-dark bg-cream-light/40 px-3.5 py-2.5 text-chocolate outline-none hover:border-accent-pink focus:border-accent-pink focus:bg-white transition-all"
                      />
                    </div>

                    {/* Email address */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-sans font-bold uppercase tracking-wider text-accent-pink">
                        Email Address: *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. charlotte@example.com"
                        className="w-full text-xs font-sans rounded-xl border border-cream-dark bg-cream-light/40 px-3.5 py-2.5 text-chocolate outline-none hover:border-accent-pink focus:border-accent-pink focus:bg-white transition-all"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-sans font-bold uppercase tracking-wider text-accent-pink">
                        Phone Number: *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. (555) 019-9234"
                        className="w-full text-xs font-sans rounded-xl border border-cream-dark bg-cream-light/40 px-3.5 py-2.5 text-chocolate outline-none hover:border-accent-pink focus:border-accent-pink focus:bg-white transition-all"
                      />
                    </div>

                    {/* Preferred Date */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-sans font-bold uppercase tracking-wider text-accent-pink">
                        Event Date: *
                      </label>
                      <input
                        type="date"
                        name="deliveryDate"
                        required
                        value={formData.deliveryDate}
                        onChange={handleChange}
                        className="w-full text-xs font-sans rounded-xl border border-cream-dark bg-cream-light/40 px-3.5 py-2.5 text-chocolate outline-none hover:border-accent-pink focus:border-accent-pink focus:bg-white transition-all cursor-pointer"
                      />
                    </div>

                    {/* Pickup or Delivery */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-sans font-bold uppercase tracking-wider text-accent-pink">
                        Service Preference:
                      </label>
                      <select
                        name="deliveryType"
                        value={formData.deliveryType}
                        onChange={handleChange}
                        className="w-full text-xs font-sans rounded-xl border border-cream-dark bg-cream-light/40 px-3.5 py-2.5 text-chocolate outline-none hover:border-accent-pink focus:border-accent-pink focus:bg-white transition-all cursor-pointer"
                      >
                        <option value="pickup">Secure Studio Pickup</option>
                        <option value="delivery">Hand-Delivery (local radius)</option>
                      </select>
                    </div>

                    {/* Address (conditional on delivery) */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-sans font-bold uppercase tracking-wider text-accent-pink">
                        Delivery Address:
                      </label>
                      <input
                        type="text"
                        name="address"
                        disabled={formData.deliveryType === 'pickup'}
                        value={formData.address}
                        onChange={handleChange}
                        placeholder={formData.deliveryType === 'pickup' ? 'Not required for pickup' : 'e.g. 742 Evergreen Terrace'}
                        className="w-full text-xs font-sans rounded-xl border border-cream-dark bg-cream-light/40 px-3.5 py-2.5 text-chocolate outline-none hover:border-accent-pink focus:border-accent-pink focus:bg-white transition-all disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Special notes */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-sans font-bold uppercase tracking-wider text-accent-pink">
                      Event Notes & Sweet Requests:
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Share your guest count, color preferences, party themes, or any allergy requirements."
                      className="w-full text-xs font-sans rounded-xl border border-cream-dark bg-cream-light/40 px-3.5 py-2.5 text-chocolate outline-none hover:border-accent-pink focus:border-accent-pink focus:bg-white transition-all resize-none"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-accent-pink hover:bg-chocolate text-white font-sans text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Online Inquiry</span>
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-10 space-y-6 flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-xl bg-pastel-pink border border-pastel-pink-dark flex items-center justify-center text-accent-pink">
                    <CheckCircle className="w-10 h-10 stroke-1.5" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-serif text-3xl font-normal text-chocolate">Inquiry <span className="text-gold italic font-normal">Submitted!</span></h3>
                    <p className="font-sans text-sm text-warm-brown max-w-md mx-auto font-light">
                      Thank you so much, <span className="font-semibold text-chocolate">{formData.name}</span>! Mom Bakes has received your details. We have generated a custom reference number for your event.
                    </p>
                  </div>

                  {/* Ref Box */}
                  <div className="bg-cream border border-cream-dark px-6 py-4 rounded-xl inline-block">
                    <span className="font-sans text-[10px] font-bold text-accent-pink uppercase tracking-widest block">Booking Code</span>
                    <span className="font-mono text-2xl font-bold text-chocolate tracking-widest">{refCode}</span>
                  </div>

                  {/* Quick WhatsApp checkout */}
                  <div className="space-y-3 pt-4 w-full max-w-sm">
                    <button
                      onClick={triggerWhatsApp}
                      className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-sans text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md hover:scale-[1.01]"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Chat Instantly on WhatsApp</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          deliveryDate: '',
                          deliveryType: 'pickup',
                          address: '',
                          notes: '',
                        });
                      }}
                      className="w-full py-2.5 bg-cream hover:bg-cream-dark text-chocolate/80 hover:text-chocolate font-sans text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
