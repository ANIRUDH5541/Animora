export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    images?: string[];
    category: string;
    description: string;
    colors: string[];
    sizes: string[];
    animeTheme: 'naruto' | 'one-piece' | 'kaiju' | 'bleach';
    isNew: boolean;
    inStock: boolean;
    rating: number;
    reviews: number;
  }
  
  export const products: Product[] = [
    {
      id: 1,
      name: "Hashirama Sage Art : 1000 hands Hoodie",
      price: 69.99,
      image: "/imgs/narutohoodie.webp",
      images: [
        "/imgs/narutohoodieback.webp",  
        "/imgs/narutohoodie.webp",
      ],
      category: "Clothing",
      description: "Premium quality hoodie featuring Naruto's Sage Mode design",
      colors: ["Black"],
      sizes: ["S", "M", "L", "XL"],
      animeTheme: "naruto",
      isNew: true,
      inStock: true,
      rating: 4.8,
      reviews: 125
    },
    {
      id: 2,
      name: "Straw Hat Pirates Tee",
      price: 39.99,
      image: "/imgs/optshirt1.webp",
      images: [
        "/imgs/opshirt1.1.webp",
        "/imgs/optshirt1.webp",
      ],
      category: "Clothing",
      description: "Collage t-shirt featuring the Straw Hat Pirates wanted posters",
      colors: ["White", "brown"],
      sizes: ["S", "M", "L", "XL"],
      animeTheme: "one-piece",
      isNew: true,
      inStock: true,
      rating: 4.9,
      reviews: 89
    },
    {
      id: 3,
      name: "Kaiju No. 8 T-shirt",
      price: 89.99,
      image: "/imgs/kaijutshirt1.webp",
      category: "Outerwear",
      description: "classic t-shirt featuring kaiju no. 8",
      colors: ["Black"],
      sizes: ["M", "L", "XL"],
      animeTheme: "kaiju",
      isNew: true,
      inStock: true,
      rating: 4.7,
      reviews: 45
    }
  ];
  

  export const getProductById = (id: number): Product | undefined =>
    products.find(product => product.id === id);
  
  export const getProductsByTheme = (theme: Product['animeTheme']): Product[] =>
    products.filter(product => product.animeTheme === theme);
  
  export const getProductsByCategory = (category: string): Product[] =>
    products.filter(product => product.category === category);
  
  export const getRelatedProducts = (productId: number, limit: number): Product[] => {
    const currentProduct = getProductById(productId);
    if (!currentProduct) return [];
    
    return products
      .filter(product => 
        product.id !== productId && 
        product.animeTheme === currentProduct.animeTheme
      )
      .slice(0, limit);
  };
  
  export const getFeaturedProducts = (limit: number = 4): Product[] =>
    products
      .filter(product => product.isNew)
      .slice(0, limit);
  
  export const getNewArrivals = (limit: number = 4): Product[] =>
    products
      .sort((a, b) => b.id - a.id)
      .slice(0, limit);