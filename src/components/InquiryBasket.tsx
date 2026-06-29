import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Cake,
  Phone,
  Mail,
  Calendar,
  Send,
  MessageSquare,
  CheckCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, InquiryDetails } from '../types';

interface InquiryBasketProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function InquiryBasket({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: InquiryBasketProps) {
  const [details, setDetails] = useState<InquiryDetails>({
    name: '',
    email: '',
    phone: '',
    deliveryDate: '',
    deliveryType: 'pickup',
    address: '',
    notes: '',
  });

  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [bookingCode, setBookingCode] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const getGrandTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleInquiryCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `MB-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingCode(refCode);
    setIsBooked(true);

    // Write to localStorage
    const savedBookings = JSON.parse(localStorage.getItem('mombakes_bookings') || '[]');
    savedBookings.push({
      refCode,
      client: details,
      items: cartItems,
      total: getGrandTotal(),
      dateSubmitted: new Date().toISOString(),
    });
    localStorage.setItem('mombakes_bookings', JSON.stringify(savedBookings));
  };

  const sendWhatsAppMessage = () => {
    let messageText = `Hi MomBakes! 🎂 I'd like to submit a Cake Inquiry (Ref: ${bookingCode}):\n\n`;
    messageText += `*Client Details:*\n`;
    messageText += `• Name: ${details.name}\n`;
    messageText += `• Phone: ${details.phone}\n`;
    messageText += `• Date Required: ${details.deliveryDate}\n`;
    messageText += `• Service: ${details.deliveryType.toUpperCase()}\n`;
    if (details.address) messageText += `• Address: ${details.address}\n`;
    if (details.notes) messageText += `• Special Notes: ${details.notes}\n`;
    
    messageText += `\n*Inquiry Items:*\n`;
    cartItems.forEach((item, idx) => {
      if (item.type === 'catalog') {
        messageText += `${idx + 1}. *${item.product?.name}* (x${item.quantity})\n`;
        messageText += `   - Flavor: ${item.selectedFlavor}\n`;
        messageText += `   - Size: ${item.selectedSize}\n`;
      } else {
        messageText += `${idx + 1}. *${item.customOrder?.name}* (x${item.quantity})\n`;
        messageText += `   - Flavor: ${item.customOrder?.flavor}\n`;
        messageText += `   - Tiers: ${item.customOrder?.tiers}\n`;
        messageText += `   - Frosting: ${item.customOrder?.frosting}\n`;
        messageText += `   - Filling: ${item.customOrder?.filling}\n`;
        if (item.customOrder?.message) messageText += `   - Greeting: "${item.customOrder.message}"\n`;
      }
      messageText += `   - Estimated Price: $${item.price * item.quantity}\n\n`;
    });

    messageText += `*Estimated Grand Total:* $${getGrandTotal()}\n`;
    messageText += `_Please let me know how to finalize the deposit!_`;

    const url = `https://wa.me/15550199?text=${encodeURIComponent(messageText)}`;
    window.open(url, '_blank');
  };

  const handleReset = () => {
    onClearCart();
    setIsBooked(false);
    setDetails({
      name: '',
      email: '',
      phone: '',
      deliveryDate: '',
      deliveryType: 'pickup',
      address: '',
      notes: '',
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-chocolate-dark/60 backdrop-blur-sm"
          />

          {/* Drawer body */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 z-[101] w-full max-w-lg bg-cream-light shadow-2xl border-l border-cream-dark flex flex-col justify-between"
          >
            {/* Header block */}
            <div className="p-6 border-b border-cream-dark flex items-center justify-between bg-white">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-warm-brown" />
                <h2 className="font-serif text-lg font-bold text-chocolate">Your Inquiry Basket</h2>
                <span className="bg-pastel-pink text-warm-brown text-[10px] font-display font-bold uppercase tracking-wider px-2 py-1 rounded-full border border-pastel-pink-dark">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items
                </span>
              </div>
              <button
                id="close-basket-drawer"
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-cream text-chocolate transition-colors focus:outline-none"
              >
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            {/* Inner Content Scroller */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <AnimatePresence mode="wait">
                {!isBooked ? (
                  <motion.div
                    key="cart-list-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {cartItems.length === 0 ? (
                      /* Empty state layout */
                      <div className="text-center py-16 space-y-4 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-cream border border-cream-dark flex items-center justify-center text-chocolate/40 mb-2">
                          <Cake className="w-8 h-8" />
                        </div>
                        <h3 className="font-serif text-lg font-bold text-chocolate">Your basket is empty</h3>
                        <p className="font-sans text-xs text-chocolate/65 max-w-xs mx-auto font-light">
                          Browse our Signature Cakes catalog or custom build a celebration cake to compile your order inquiry!
                        </p>
                        <button
                          onClick={onClose}
                          className="mt-2 px-5 py-2.5 bg-chocolate text-cream font-display text-[10px] font-bold uppercase tracking-wider rounded-full hover:bg-warm-brown shadow-sm"
                        >
                          Explore Cakes Catalog
                        </button>
                      </div>
                    ) : (
                      /* Cart listing & Inquiry checkout form */
                      <>
                        <div className="space-y-4">
                          <h3 className="font-serif text-sm font-bold text-chocolate border-b border-cream/50 pb-2">Selected Treats</h3>
                          {cartItems.map((item) => (
                            <div
                              key={item.id}
                              className="bg-white border border-cream-dark rounded-2xl p-4 flex items-start space-x-3 shadow-sm"
                            >
                              {/* Product Thumbnail */}
                              <div className="w-14 h-14 rounded-xl overflow-hidden bg-cream shrink-0 border border-cream">
                                <img
                                  src={item.type === 'catalog' ? item.product?.image : '/src/assets/images/mombakes_custom_cake_1782709223050.jpg'}
                                  alt="Item thumbnail"
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>

                              {/* Details text */}
                              <div className="flex-1 space-y-1">
                                <h4 className="font-serif text-xs font-bold text-chocolate line-clamp-1">
                                  {item.type === 'catalog' ? item.product?.name : item.customOrder?.name}
                                </h4>
                                
                                {item.type === 'catalog' ? (
                                  <div className="text-[10px] text-chocolate/65 space-y-0.5">
                                    <p>Flavor: <span className="font-medium text-warm-brown">{item.selectedFlavor}</span></p>
                                    <p>Size: <span className="font-medium text-warm-brown">{item.selectedSize}</span></p>
                                  </div>
                                ) : (
                                  <div className="text-[10px] text-chocolate/65 space-y-0.5">
                                    <p>Tiers: <span className="font-medium text-warm-brown">{item.customOrder?.tiers} Layer(s)</span></p>
                                    <p>Flavor: <span className="font-medium text-warm-brown">{item.customOrder?.flavor}</span></p>
                                    <p>Frosting: <span className="font-medium text-warm-brown">{item.customOrder?.frosting}</span></p>
                                  </div>
                                )}

                                {/* Cost & quantity adjustment row */}
                                <div className="flex items-center justify-between pt-2">
                                  <span className="font-serif text-xs font-bold text-chocolate">${item.price * item.quantity}</span>
                                  
                                  <div className="flex items-center space-x-2 bg-cream-light border border-cream-dark rounded-lg p-1 scale-90 origin-right">
                                    <button
                                      onClick={() => onUpdateQty(item.id, -1)}
                                      className="p-1 rounded-md text-chocolate/60 hover:bg-cream hover:text-chocolate"
                                      aria-label="Decrease quantity"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="font-display text-[10px] font-bold text-chocolate px-1">{item.quantity}</span>
                                    <button
                                      onClick={() => onUpdateQty(item.id, 1)}
                                      className="p-1 rounded-md text-chocolate/60 hover:bg-cream hover:text-chocolate"
                                      aria-label="Increase quantity"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>

                                    <button
                                      onClick={() => onRemoveItem(item.id)}
                                      className="p-1 rounded-md text-red-500 hover:bg-red-50 hover:text-red-600 ml-1.5"
                                      aria-label="Remove item"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Inquiry checkout form inside basket */}
                        <form onSubmit={handleInquiryCheckout} className="space-y-4 pt-4 border-t border-cream-dark">
                          <h3 className="font-serif text-sm font-bold text-chocolate border-b border-cream/50 pb-2">Inquiry Contact Form</h3>
                          
                          <div className="space-y-3.5">
                            {/* Name */}
                            <div className="space-y-1">
                              <label className="block text-[10px] font-display font-bold uppercase tracking-wider text-chocolate/70">
                                Full Name: *
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  name="name"
                                  required
                                  value={details.name}
                                  onChange={handleChange}
                                  placeholder="e.g. Arthur Pendragon"
                                  className="w-full text-xs font-sans rounded-xl border border-cream-dark bg-white px-3.5 py-2.5 text-chocolate outline-none hover:border-warm-brown focus:border-warm-brown"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              {/* Phone */}
                              <div className="space-y-1">
                                <label className="block text-[10px] font-display font-bold uppercase tracking-wider text-chocolate/70">
                                  Phone Number: *
                                </label>
                                <input
                                  type="tel"
                                  name="phone"
                                  required
                                  value={details.phone}
                                  onChange={handleChange}
                                  placeholder="e.g. (555) 123-4567"
                                  className="w-full text-xs font-sans rounded-xl border border-cream-dark bg-white px-3.5 py-2.5 text-chocolate outline-none hover:border-warm-brown focus:border-warm-brown"
                                />
                              </div>

                              {/* Email */}
                              <div className="space-y-1">
                                <label className="block text-[10px] font-display font-bold uppercase tracking-wider text-chocolate/70">
                                  Email address: *
                                </label>
                                <input
                                  type="email"
                                  name="email"
                                  required
                                  value={details.email}
                                  onChange={handleChange}
                                  placeholder="e.g. arthur@camelot.com"
                                  className="w-full text-xs font-sans rounded-xl border border-cream-dark bg-white px-3.5 py-2.5 text-chocolate outline-none hover:border-warm-brown focus:border-warm-brown"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              {/* Event date */}
                              <div className="space-y-1">
                                <label className="block text-[10px] font-display font-bold uppercase tracking-wider text-chocolate/70">
                                  Event Date: *
                                </label>
                                <input
                                  type="date"
                                  name="deliveryDate"
                                  required
                                  value={details.deliveryDate}
                                  onChange={handleChange}
                                  className="w-full text-xs font-sans rounded-xl border border-cream-dark bg-white px-3.5 py-2.5 text-chocolate outline-none hover:border-warm-brown focus:border-warm-brown cursor-pointer"
                                />
                              </div>

                              {/* Delivery option */}
                              <div className="space-y-1">
                                <label className="block text-[10px] font-display font-bold uppercase tracking-wider text-chocolate/70">
                                  Service Option:
                                </label>
                                <select
                                  name="deliveryType"
                                  value={details.deliveryType}
                                  onChange={handleChange}
                                  className="w-full text-xs font-sans rounded-xl border border-cream-dark bg-white px-3.5 py-2.5 text-chocolate outline-none hover:border-warm-brown focus:border-warm-brown cursor-pointer"
                                >
                                  <option value="pickup">Studio Pickup</option>
                                  <option value="delivery">Hand-Delivery</option>
                                </select>
                              </div>
                            </div>

                            {/* Delivery Address (Conditional) */}
                            {details.deliveryType === 'delivery' && (
                              <div className="space-y-1">
                                <label className="block text-[10px] font-display font-bold uppercase tracking-wider text-chocolate/70">
                                  Delivery Address: *
                                </label>
                                <input
                                  type="text"
                                  name="address"
                                  required={details.deliveryType === 'delivery'}
                                  value={details.address}
                                  onChange={handleChange}
                                  placeholder="e.g. 52 Castle Road, Camelot"
                                  className="w-full text-xs font-sans rounded-xl border border-cream-dark bg-white px-3.5 py-2.5 text-chocolate outline-none hover:border-warm-brown focus:border-warm-brown"
                                />
                              </div>
                            )}

                            {/* Inquiry Notes */}
                            <div className="space-y-1">
                              <label className="block text-[10px] font-display font-bold uppercase tracking-wider text-chocolate/70">
                                Special Requests:
                              </label>
                              <textarea
                                name="notes"
                                value={details.notes}
                                onChange={handleChange}
                                rows={2}
                                placeholder="Dietary restrictions, styling references, theme wishes..."
                                className="w-full text-xs font-sans rounded-xl border border-cream-dark bg-white px-3.5 py-2.5 text-chocolate outline-none hover:border-warm-brown focus:border-warm-brown resize-none"
                              />
                            </div>
                          </div>

                          {/* Submit Action */}
                          <button
                            type="submit"
                            className="w-full mt-4 py-4 bg-chocolate hover:bg-warm-brown text-cream-light font-display text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-md premium-shimmer"
                          >
                            <Send className="w-4 h-4" />
                            <span>Send Custom Cake Inquiry</span>
                          </button>
                        </form>
                      </>
                    )}
                  </motion.div>
                ) : (
                  /* Success/Ref display state */
                  <motion.div
                    key="success-view"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-10 space-y-6 flex flex-col items-center justify-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-pastel-pink border border-pastel-pink-dark flex items-center justify-center text-warm-brown">
                      <CheckCircle className="w-10 h-10 stroke-1.5" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl font-bold text-chocolate">Inquiry Registered!</h3>
                      <p className="font-sans text-xs text-chocolate/70 max-w-sm mx-auto font-light">
                        Congratulations! Your custom request has been saved in our booking files. Please send your detailed order layout to Mom via WhatsApp to finalize pricing details instantly.
                      </p>
                    </div>

                    <div className="bg-cream border border-cream-dark px-6 py-4 rounded-2xl">
                      <span className="font-display text-[9px] font-bold text-chocolate/55 uppercase tracking-wider block">Reference Reference</span>
                      <span className="font-mono text-xl font-bold text-warm-brown tracking-widest">{bookingCode}</span>
                    </div>

                    <div className="space-y-3 w-full max-w-xs pt-4">
                      <button
                        onClick={sendWhatsAppMessage}
                        className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-display text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md hover:scale-[1.01]"
                      >
                        <MessageSquare className="w-4 h-4 fill-current" />
                        <span>Forward to Mom via WhatsApp</span>
                      </button>
                      <button
                        onClick={handleReset}
                        className="w-full py-2.5 bg-cream hover:bg-cream-dark text-chocolate/75 font-display text-[9px] font-bold uppercase tracking-wider rounded-xl transition-all"
                      >
                        Start Fresh Inquiry
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer starting total panel (only shown if in catalog list mode and has items) */}
            {!isBooked && cartItems.length > 0 && (
              <div className="p-6 border-t border-cream-dark bg-white space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-display font-semibold tracking-wider text-chocolate/55">Estimated Starting Price</span>
                    <span className="font-sans text-xs text-chocolate/60">Final pricing depends on bespoke designs</span>
                  </div>
                  <span className="font-serif text-2xl font-bold text-warm-brown">${getGrandTotal()}</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
