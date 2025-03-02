import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, ChevronRight, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { getProductById, getRelatedProducts } from '../data/products';
import ProductCard from '../components/ProductCard';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const theme = searchParams.get('theme') as 'naruto' | 'one-piece' | 'kaiju' | 'bleach' || 'naruto';
  
  const product = getProductById(Number(id));
  const relatedProducts = getRelatedProducts(Number(id), 3);
  
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images?.[0] || product.image);
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Product Not Found</h2>
          <Link 
            to="/" 
            className="bg-gradient-to-r from-purple-600 to-teal-500 text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // Theme-specific styles
  const themeStyles = {
    naruto: {
      accent: 'from-orange-500 to-purple-600',
      button: 'bg-orange-600 hover:bg-orange-700',
      text: 'text-orange-400',
      border: 'border-orange-500',
    },
    'one-piece': {
      accent: 'from-red-500 to-gray-600',
      button: 'bg-red-600 hover:bg-red-700',
      text: 'text-red-400',
      border: 'border-red-500',
    },
    kaiju: {
      accent: 'from-blue-500 to-teal-600',
      button: 'bg-teal-600 hover:bg-teal-700',
      text: 'text-teal-400',
      border: 'border-teal-500',
    },
    bleach: {
      accent: 'from-gray-500 to-gray-700',
      button: 'bg-gray-600 hover:bg-gray-700',
      text: 'text-gray-400',
      border: 'border-gray-500',
    },
  };

  const style = themeStyles[theme];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center text-sm text-gray-400">
          <Link to="/" className="hover:text-white">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link to={`/explore/${theme}`} className="hover:text-white capitalize">{theme.replace('-', ' ')}</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-white">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
              <img 
                src={selectedImage} 
                alt={product.name} 
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images?.map((image, index) => (
                <button 
                  key={index}
                  className={`bg-gray-900 rounded-lg overflow-hidden ${
                    selectedImage === image ? `ring-2 ring-${style.text.split('-')[1]}` : ''
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} view ${index + 1}`} 
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className={`text-sm ${style.text} mb-2`}>{product.category}</div>
            <h1 className="text-3xl font-bold text-white mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`h-5 w-5 ${star <= 4 ? style.text : 'text-gray-600'}`} 
                    fill={star <= 4 ? 'currentColor' : 'none'} 
                  />
                ))}
              </div>
              <span className="text-gray-400 ml-2">(24 reviews)</span>
            </div>
            
            <div className="text-3xl font-bold text-white mb-8">${product.price.toFixed(2)}</div>
            
            <div className="mb-6">
              <h3 className="text-white font-medium mb-3">Description</h3>
              <p className="text-gray-400">{product.description}</p>
            </div>
            
            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-white font-medium mb-3">Color: <span className="text-gray-400">{selectedColor}</span></h3>
              <div className="flex space-x-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className={`w-10 h-10 rounded-full ${
                      selectedColor === color ? `ring-2 ring-${style.text.split('-')[1]} ring-offset-2 ring-offset-gray-900` : ''
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
            </div>
            
            {/* Size Selection */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-white font-medium">Size: <span className="text-gray-400">{selectedSize}</span></h3>
                <button className={`text-sm ${style.text} underline`}>Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`px-4 py-2 rounded-md ${
                      selectedSize === size
                        ? `bg-gradient-to-r ${style.accent} text-white`
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border border-gray-700 rounded-md">
                <button 
                  className="px-4 py-2 text-gray-400 hover:text-white"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="px-4 py-2 text-white">{quantity}</span>
                <button 
                  className="px-4 py-2 text-gray-400 hover:text-white"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              
              <button 
                className={`flex-grow ${style.button} text-white py-3 px-6 rounded-md font-medium flex items-center justify-center gap-2 ${
                  !product.inStock ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                }`}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-5 w-5" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <button className="border border-gray-700 text-white p-3 rounded-md hover:bg-gray-800">
                <Heart className="h-5 w-5" />
              </button>
            </div>
            
            {/* Product Features */}
            <div className="space-y-4 border-t border-gray-800 pt-8">
              <div className="flex items-start gap-3">
                <Truck className={`h-5 w-5 ${style.text} mt-0.5`} />
                <div>
                  <h4 className="text-white font-medium">Free Shipping</h4>
                  <p className="text-sm text-gray-400">Free standard shipping on orders over $100</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className={`h-5 w-5 ${style.text} mt-0.5`} />
                <div>
                  <h4 className="text-white font-medium">Quality Guarantee</h4>
                  <p className="text-sm text-gray-400">Premium materials and durable construction</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className={`h-5 w-5 ${style.text} mt-0.5`} />
                <div>
                  <h4 className="text-white font-medium">Easy Returns</h4>
                  <p className="text-sm text-gray-400">30-day return policy for unworn items</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="border-t border-gray-800 pt-16">
          <h2 className="text-2xl font-bold text-white mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} theme={theme} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;