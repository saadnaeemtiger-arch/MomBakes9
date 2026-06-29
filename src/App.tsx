import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import FeaturedCategories from './components/FeaturedCategories';
import SignatureCakes from './components/SignatureCakes';
import WhyChoose from './components/WhyChoose';
import CustomOrderBuilder from './components/CustomOrderBuilder';
import GallerySection from './components/GallerySection';
import Testimonials from './components/Testimonials';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import InquiryBasket from './components/InquiryBasket';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import { CartItem, InquiryDetails } from './types';

export default function App() {
  // Load initial cart from localStorage for user convenience
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mombakes_basket');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  // Sync basket to localStorage
  useEffect(() => {
    localStorage.setItem('mombakes_basket', JSON.stringify(cartItems));
  }, [cartItems]);

  // Set up IntersectionObserver to auto-track active navbar tabs
  useEffect(() => {
    const sections = [
      'home',
      'about',
      'categories',
      'products',
      'custom-builder',
      'gallery',
      'testimonials',
      'faq',
      'contact',
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // focused in upper-mid viewport
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Cart operations
  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex((item) => item.id === newItem.id);
      if (existingIdx !== -1) {
        const copy = [...prevItems];
        copy[existingIdx].quantity += 1;
        return copy;
      }
      return [...prevItems, newItem];
    });
    // Open the drawer briefly for positive reinforcement, except if custom builder does it
    if (newItem.type === 'catalog') {
      setIsCartOpen(true);
    }
  };

  const handleUpdateQty = (itemId: string, delta: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === itemId) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Helper scroll trigger
  const handleScrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      const offset = 80; // height of fixed header
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Trigger catalog focus and category filtration from featured collection card
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategoryFilter(categoryId);
    handleScrollToSection('products');
  };

  const handleInquirySubmission = (details: InquiryDetails) => {
    // If they have items in cart, we can also bind the cart items during general contact
    // For a simple single page app, this triggers feedback states in ContactSection
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div id="mombakes-app" className="relative min-h-screen bg-cream-light text-chocolate font-sans selection:bg-pastel-pink-dark selection:text-chocolate">
      {/* Dynamic Header navbar */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
      />

      <main className="relative">
        {/* Hero Banner Section */}
        <Hero onScrollToSection={handleScrollToSection} />

        {/* About MomBakes Section */}
        <About />

        {/* Featured Cake Categories */}
        <FeaturedCategories onSelectCategory={handleSelectCategory} />

        {/* Signature Products Catalog */}
        <SignatureCakes
          onAddToCart={handleAddToCart}
          selectedCategoryFilter={selectedCategoryFilter}
          onSetCategoryFilter={(cat) => setSelectedCategoryFilter(cat)}
        />

        {/* Why Choose MomBakes Benefits */}
        <WhyChoose />

        {/* Custom Cake Order Process and Interactive Builder */}
        <CustomOrderBuilder onAddToCart={handleAddToCart} />

        {/* Masonry image gallery */}
        <GallerySection />

        {/* Beautiful Client Testimonials */}
        <Testimonials />

        {/* Frequently Asked Questions */}
        <FAQSection />

        {/* Contact info and Online inquiry form */}
        <ContactSection onDirectInquiry={handleInquirySubmission} />
      </main>

      {/* Footer Section */}
      <Footer onScrollToSection={handleScrollToSection} />

      {/* Slide-out Inquiry Basket Sidebar */}
      <InquiryBasket
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Floating Interactive Buttons */}
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
}
