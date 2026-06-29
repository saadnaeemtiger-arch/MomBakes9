export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface CakeProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  startingPrice: number;
  image: string;
  rating: number;
  popular: boolean;
  flavors: string[];
  sizes: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  review: string;
  avatar: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface CustomCakeOrder {
  id: string;
  name: string;
  tiers: number;
  flavor: string;
  frosting: string;
  filling: string;
  dietary: string[];
  message: string;
  colorTheme: string;
  specialInstructions: string;
  estimatedPrice: number;
}

export interface CartItem {
  id: string; // product_id-size-flavor OR custom-id
  type: 'catalog' | 'custom';
  product?: CakeProduct;
  customOrder?: CustomCakeOrder;
  selectedSize?: string;
  selectedFlavor?: string;
  quantity: number;
  price: number;
}

export interface InquiryDetails {
  name: string;
  email: string;
  phone: string;
  deliveryDate: string;
  deliveryType: 'pickup' | 'delivery';
  address?: string;
  notes?: string;
}
