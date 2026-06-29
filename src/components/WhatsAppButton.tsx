import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhatsAppButton() {
  const triggerWhatsAppChat = () => {
    const defaultText = "Hi MomBakes! 🎂 I visited your website and would love to consult on a custom celebration cake order!";
    const url = `https://wa.me/15550199?text=${encodeURIComponent(defaultText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 left-6 z-45 hidden sm:block">
      {/* Pulse Rings */}
      <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25 scale-125" />
      <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse opacity-15 scale-105" />

      <motion.button
        onClick={triggerWhatsAppChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-14 h-14 bg-green-500 text-white rounded-full shadow-2xl flex items-center justify-center focus:outline-none cursor-pointer border border-green-400 group"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-current group-hover:rotate-12 transition-transform" />
        
        {/* Cute badge */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border border-white"></span>
        </span>
      </motion.button>
    </div>
  );
}
