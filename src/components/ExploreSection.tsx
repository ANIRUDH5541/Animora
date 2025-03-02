import React from 'react';
import { Link } from 'react-router-dom';

const animeThemes = [
  {
    id: 'naruto',
    name: 'Naruto',
    image: '/imgs/explnaruto.jpg',
    colors: 'Black, Orange, and Purple',
    description: 'Discover our exclusive Naruto-themed collection featuring iconic designs from the ninja world.',
  },
  {
    id: 'one-piece',
    name: 'One Piece',
    image: '/imgs/explonep.jpg',
    colors: 'Black and White',
    description: 'Set sail with our One Piece collection featuring the Straw Hat Pirates and their adventures.',
  },
  {
    id: 'kaiju',
    name: 'Kaiju No. 8',
    image: '/imgs/explkaiju.jpg',
    colors: 'Black and Aqua',
    description: 'Embrace the monster within with our Kaiju No. 8 collection featuring bold designs.',
  },
  {
    id: 'bleach',
    name: 'Bleach',
    image: '/imgs/explbleach.jpg',
    colors: 'Black',
    description: 'Unleash your soul reaper spirit with our Bleach collection featuring iconic characters and symbols.',
  },
];

const ExploreSection: React.FC = () => {
  return (
    <section className="py-16 bg-black" id="explore">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent">
              Explore Anime Collections
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover our exclusive anime-themed collections featuring your favorite series. From apparel to accessories, express your passion with our premium products.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {animeThemes.map((theme) => (
            <Link 
              key={theme.id} 
              to={`/explore/${theme.id}`}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-all hover:translate-y-[-5px] group"
            >
              <div className="relative h-64">
                <img 
                  src={theme.image} 
                  alt={theme.name} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{theme.name}</h3>
                  <p className="text-sm text-gray-400">{theme.description}</p>
                  <div className="mt-4 bg-gradient-to-r from-purple-600 to-teal-500 text-white px-4 py-2 rounded-full font-medium w-fit opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore Collection
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;