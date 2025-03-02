import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterProps {
  themeColors: string[];
  onFilterChange: (filters: any) => void;
}

const ProductFilter: React.FC<FilterProps> = ({ themeColors, onFilterChange }) => {
  const [filters, setFilters] = useState<{
    price: string;
    colors: string[];
    sizes: string[];
    availability: boolean;
    category: string;
  }>({
    price: '',
    colors: [],
    sizes: [],
    availability: false,
    category: '',
  });

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    color: true,
    size: true,
    availability: true,
    category: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const handlePriceChange = (range: string) => {
    const newFilters = { ...filters, price: range };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleColorChange = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color];
    
    const newFilters = { ...filters, colors: newColors };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSizeChange = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    
    const newFilters = { ...filters, sizes: newSizes };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleAvailabilityChange = () => {
    const newFilters = { ...filters, availability: !filters.availability };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCategoryChange = (category: string) => {
    const newFilters = { ...filters, category };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex items-center mb-6">
        <Filter className="h-5 w-5 mr-2 text-teal-400" />
        <h3 className="text-xl font-semibold text-white">Filters</h3>
      </div>

      {/* Price Filter */}
      <div className="mb-6 border-b border-gray-800 pb-6">
        <button 
          className="flex items-center justify-between w-full text-left mb-4"
          onClick={() => toggleSection('price')}
        >
          <span className="font-medium text-white">Price Range</span>
          {expandedSections.price ? (
            <ChevronUp className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          )}
        </button>
        
        {expandedSections.price && (
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="price"
                className="form-radio text-purple-600"
                checked={filters.price === 'under50'}
                onChange={() => handlePriceChange('under50')}
              />
              <span className="ml-2 text-gray-300">Under $50</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="price"
                className="form-radio text-purple-600"
                checked={filters.price === '50to100'}
                onChange={() => handlePriceChange('50to100')}
              />
              <span className="ml-2 text-gray-300">$50 - $100</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="price"
                className="form-radio text-purple-600"
                checked={filters.price === '100to200'}
                onChange={() => handlePriceChange('100to200')}
              />
              <span className="ml-2 text-gray-300">$100 - $200</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="price"
                className="form-radio text-purple-600"
                checked={filters.price === 'over200'}
                onChange={() => handlePriceChange('over200')}
              />
              <span className="ml-2 text-gray-300">Over $200</span>
            </label>
          </div>
        )}
      </div>

      {/* Color Filter */}
      <div className="mb-6 border-b border-gray-800 pb-6">
        <button 
          className="flex items-center justify-between w-full text-left mb-4"
          onClick={() => toggleSection('color')}
        >
          <span className="font-medium text-white">Color</span>
          {expandedSections.color ? (
            <ChevronUp className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          )}
        </button>
        
        {expandedSections.color && (
          <div className="flex flex-wrap gap-2">
            {themeColors.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full border-2 ${
                  filters.colors.includes(color) 
                    ? 'border-teal-400' 
                    : 'border-transparent'
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
                onClick={() => handleColorChange(color)}
                aria-label={`Select ${color} color`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Size Filter */}
      <div className="mb-6 border-b border-gray-800 pb-6">
        <button 
          className="flex items-center justify-between w-full text-left mb-4"
          onClick={() => toggleSection('size')}
        >
          <span className="font-medium text-white">Size</span>
          {expandedSections.size ? (
            <ChevronUp className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          )}
        </button>
        
        {expandedSections.size && (
          <div className="flex flex-wrap gap-2">
            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <button
                key={size}
                className={`px-3 py-1 rounded-md ${
                  filters.sizes.includes(size)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => handleSizeChange(size)}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Availability Filter */}
      <div className="mb-6 border-b border-gray-800 pb-6">
        <button 
          className="flex items-center justify-between w-full text-left mb-4"
          onClick={() => toggleSection('availability')}
        >
          <span className="font-medium text-white">Availability</span>
          {expandedSections.availability ? (
            <ChevronUp className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          )}
        </button>
        
        {expandedSections.availability && (
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-purple-600"
              checked={filters.availability}
              onChange={handleAvailabilityChange}
            />
            <span className="ml-2 text-gray-300">In Stock Only</span>
          </label>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <button 
          className="flex items-center justify-between w-full text-left mb-4"
          onClick={() => toggleSection('category')}
        >
          <span className="font-medium text-white">Category</span>
          {expandedSections.category ? (
            <ChevronUp className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          )}
        </button>
        
        {expandedSections.category && (
          <div className="space-y-2">
            {['Keychains', 'Pendants', 'T-shirts', 'Sweatshirts', 'Hoodies'].map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  className="form-radio text-purple-600"
                  checked={filters.category === category}
                  onChange={() => handleCategoryChange(category)}
                />
                <span className="ml-2 text-gray-300">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <button 
        className="w-full bg-gradient-to-r from-purple-600 to-teal-500 text-white py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
        onClick={() => {
          setFilters({
            price: '',
            colors: [],
            sizes: [],
            availability: false,
            category: '',
          });
          onFilterChange({
            price: '',
            colors: [],
            sizes: [],
            availability: false,
            category: '',
          });
        }}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default ProductFilter;