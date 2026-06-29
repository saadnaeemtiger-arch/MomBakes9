import { Category, CakeProduct, Testimonial, FAQItem, GalleryItem } from './types';

export const HERO_BANNER_IMAGE = '/src/assets/images/mombakes_hero_banner_1782709208153.jpg';
export const CUSTOM_CAKE_IMAGE = '/src/assets/images/mombakes_custom_cake_1782709223050.jpg';
export const CUPCAKES_IMAGE = '/src/assets/images/mombakes_cupcakes_1782709233804.jpg';
export const BAKING_PROCESS_IMAGE = '/src/assets/images/mombakes_baking_process_1782709244724.jpg';

export const CATEGORIES: Category[] = [
  {
    id: 'birthday',
    name: 'Birthday Cakes',
    description: 'Whimsical, colourful, and customized designs to make birthdays extra special.',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'wedding',
    name: 'Wedding Cakes',
    description: 'Bespoke, breathtaking multi-tier designs tailored for your dream wedding day.',
    image: CUSTOM_CAKE_IMAGE
  },
  {
    id: 'custom',
    name: 'Custom Cakes',
    description: 'Uniquely designed celebration cakes crafted to reflect your style and theme.',
    image: 'https://images.unsplash.com/photo-1514517604298-cf80e0fb7f1e?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cupcakes',
    name: 'Cupcakes',
    description: 'Delicate, fluffy cupcakes frosted with heavenly buttercream and elegant decorations.',
    image: CUPCAKES_IMAGE
  },
  {
    id: 'pastries',
    name: 'Pastries',
    description: 'Flaky, buttery pastries and fresh tarts baked fresh every single morning.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'brownies',
    name: 'Brownies',
    description: 'Fudgy, dense chocolate brownies featuring rich Belgian chocolate chips.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cookies',
    name: 'Cookies',
    description: 'Thick, golden-baked gourmet cookies with gooey centers and premium mix-ins.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'desserts',
    name: 'Desserts',
    description: 'An elegant selection of cheesecakes, tiramisu jars, and sweet dessert cups.',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&auto=format&fit=crop&q=80'
  }
];

export const PRODUCTS: CakeProduct[] = [
  {
    id: 'p1',
    name: 'Belgian Chocolate Fudge Cake',
    category: 'brownies',
    description: 'Layers of moist chocolate sponge filled and covered in an incredibly rich, luxurious Belgian dark chocolate ganache fudge.',
    startingPrice: 45,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    popular: true,
    flavors: ['Classic Belgian Chocolate', 'Chocolate Salted Caramel', 'Chocolate Hazelnut'],
    sizes: ["6\" Mini (6-8 portions)", "8\" Medium (12-16 portions)", "10\" Large (20-24 portions)"]
  },
  {
    id: 'p2',
    name: 'Red Velvet Devotion Cake',
    category: 'custom',
    description: 'A striking crimson-coloured cocoa cake with a super-fine crumb, stacked with premium Madagascar vanilla cream cheese frosting.',
    startingPrice: 48,
    image: 'https://images.unsplash.com/photo-1586985289688-ca9cf4993ec0?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
    popular: true,
    flavors: ['Traditional Cream Cheese Velvet', 'White Chocolate Cream Cheese'],
    sizes: ["6\" Mini (6-8 portions)", "8\" Medium (12-16 portions)", "10\" Large (20-24 portions)"]
  },
  {
    id: 'p3',
    name: 'Vanilla Pastel Celebration Cake',
    category: 'birthday',
    description: 'Fluffy Madagascar vanilla sponge layered with house-made mixed berry compote and wrapped in silky pastel swiss meringue buttercream.',
    startingPrice: 40,
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&auto=format&fit=crop&q=80',
    rating: 4.7,
    popular: false,
    flavors: ['Madagascar Vanilla Bean', 'Vanilla Lemon Raspberry'],
    sizes: ["6\" Mini (6-8 portions)", "8\" Medium (12-16 portions)", "10\" Large (20-24 portions)"]
  },
  {
    id: 'p4',
    name: 'Sweet Strawberry Cream Cake',
    category: 'desserts',
    description: 'Light, fluffy sponge cake piled high with sliced fresh organic strawberries, topped with Chantilly whipped cream and real berry glaze.',
    startingPrice: 42,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    popular: true,
    flavors: ['Classic Vanilla Strawberry', 'White Chocolate Strawberry'],
    sizes: ["6\" Mini (6-8 portions)", "8\" Medium (12-16 portions)"]
  },
  {
    id: 'p5',
    name: 'Salted Caramel Pecan Cake',
    category: 'pastries',
    description: 'Brown butter sponge drizzled with warm sea-salted caramel syrup, filled with toasted pecan praline and golden caramel buttercream.',
    startingPrice: 50,
    image: 'https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
    popular: false,
    flavors: ['Salted Caramel Crunch', 'Caramel Macchiato'],
    sizes: ["6\" Mini (6-8 portions)", "8\" Medium (12-16 portions)", "10\" Large (20-24 portions)"]
  },
  {
    id: 'p6',
    name: 'Floral Romance Wedding Cake',
    category: 'wedding',
    description: 'Our award-winning three-tiered bespoke masterpiece featuring handmade sugar flowers, ivory lace details, and gold leaf accents.',
    startingPrice: 280,
    image: CUSTOM_CAKE_IMAGE,
    rating: 5.0,
    popular: true,
    flavors: ['Top: Lemon Raspberry | Middle: Classic Vanilla | Bottom: Chocolate Fudge', 'All Madagascar Vanilla Bean', 'All Rich Fruit Cake'],
    sizes: ["3-Tier Luxury (65-80 portions)", "2-Tier Medium (35-45 portions)"]
  },
  {
    id: 'p7',
    name: 'Signature Cupcake Assortment',
    category: 'cupcakes',
    description: 'A beautiful box of 12 cupcakes containing a selection of Belgian Chocolate, Red Velvet, Vanilla Bean, and Salted Caramel flavors.',
    startingPrice: 32,
    image: CUPCAKES_IMAGE,
    rating: 4.9,
    popular: false,
    flavors: ['Assorted Signature Flavors', 'Chocolate & Vanilla Mix', 'Custom Floral Cupcakes'],
    sizes: ["Box of 12 Cupcakes", "Box of 24 Cupcakes"]
  },
  {
    id: 'p8',
    name: 'Kids Fantasy Theme Cake',
    category: 'birthday',
    description: 'Bring dreams to life with custom hand-sculpted fondant figurines, vibrant organic colours, and interactive 3D themed toppers.',
    startingPrice: 75,
    image: 'https://images.unsplash.com/photo-1514517604298-cf80e0fb7f1e?w=600&auto=format&fit=crop&q=80',
    rating: 5.0,
    popular: true,
    flavors: ['Rainbow Vanilla Confetti', 'Double Fudge Chocolate'],
    sizes: ["8\" Medium (12-16 portions)", "10\" Large (20-24 portions)"]
  }
];

export const GALLERY: GalleryItem[] = [
  { id: 'g1', title: 'Two-Tier Pearl Wedding Cake', category: 'wedding', image: CUSTOM_CAKE_IMAGE },
  { id: 'g2', title: 'Assorted Pastel Party Cupcakes', category: 'cupcakes', image: CUPCAKES_IMAGE },
  { id: 'g3', title: 'Beautiful Floral Hand-painted Cake', category: 'wedding', image: 'https://images.unsplash.com/photo-1511018556340-d16986a1c194?w=600&auto=format&fit=crop&q=80' },
  { id: 'g4', title: 'Dusting Chocolate Bundt Cake', category: 'process', image: BAKING_PROCESS_IMAGE },
  { id: 'g5', title: 'Chocolaty Strawberry Cream Treats', category: 'desserts', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&auto=format&fit=crop&q=80' },
  { id: 'g6', title: 'Hand-pressed Oatmeal Chocolate Chip Cookies', category: 'cookies', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&auto=format&fit=crop&q=80' },
  { id: 'g7', title: 'Rich Fudgy Walnut Brownie Stack', category: 'brownies', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80' },
  { id: 'g8', title: 'Flaky Apricot Glazed Croissants', category: 'pastries', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80' },
  { id: 'g9', title: 'Spirited Confetti Birthday Cake', category: 'birthday', image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&auto=format&fit=crop&q=80' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Eleanor Vance',
    role: 'Bride',
    rating: 5,
    review: 'MomBakes made our wedding day absolutely magical. The three-tier floral cake was not only a breathtaking centerpiece that our guests couldn\'t stop photographing, but it was also incredibly moist and delicious. Every layer was perfect!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 't2',
    name: 'Liam Sterling',
    role: 'Parent',
    rating: 5,
    review: 'Ordered the Kids Fantasy Theme Cake for my daughter\'s 6th birthday. The custom animal characters looked amazing, and the rainbow confetti flavor was a huge hit with both kids and parents. Highly recommend!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 't3',
    name: 'Sophia Loren',
    role: 'Event Designer',
    rating: 5,
    review: 'As an event planner, I have partnered with dozens of bakeries, but MomBakes is in a league of their own. Their dedication to homemade recipes, premium ingredients, and exquisite design detail is unmatched. They are my absolute go-to!',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'f1',
    question: 'How do I place an order?',
    answer: 'You can browse our Signature Cakes catalog, customize any cake options, and add them to your Inquiry Basket. Alternatively, use our interactive Custom Cake Builder to design your dream cake from scratch! Once your basket is full, fill out your contact details and click "Submit Inquiry". This compiles your request and provides a pre-formatted message to finalize details via WhatsApp or Email.'
  },
  {
    id: 'f2',
    question: 'How much notice is required?',
    answer: 'For our catalog Signature Cakes, cupcakes, and tarts, we kindly request at least 3-4 days in advance. For large custom event designs and luxury wedding cakes, we recommend booking 2-4 weeks in advance to guarantee availability, as we only take a limited number of bookings per week.'
  },
  {
    id: 'f3',
    question: 'Do you create fully custom cakes?',
    answer: 'Absolutely! Our specialty is tailoring bespoke cake designs to match your specific party theme, color scheme, or invitations. You can use our interactive Custom Cake Builder to specify tiers, flavors, frostings, fillings, text, and dietary preferences, and write any design requests.'
  },
  {
    id: 'f4',
    question: 'Do you offer delivery or pickup?',
    answer: 'We offer secure pickup from our home-studio bakery. We also provide professional delivery for standard orders within a 15-mile radius (charges based on distance). For large multi-tiered wedding cakes, we offer personal delivery and on-site assembly to ensure your cake is perfectly displayed.'
  },
  {
    id: 'f5',
    question: 'What payment methods do you accept?',
    answer: 'Once we finalize your custom cake design and booking details via WhatsApp or email, we accept secure payments via Bank Transfer, Venmo, Zelle, PayPal, or Cash on pickup/delivery. A 50% deposit is required to secure your booking date.'
  },
  {
    id: 'f6',
    question: 'Do you accommodate dietary restrictions?',
    answer: 'Yes! We want everyone to celebrate with cake. We offer Gluten-Free, Vegan, Eggless, and Dairy-Free adaptations for most of our cakes. You can select these directly when adding items to your inquiry or customizing your cake.'
  }
];
