import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent">
              Animora
            </h3>
            <p className="text-gray-400 mb-6">
              Redefining fashion with premium quality products that combine style, comfort, and innovation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Shop</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Categories</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">My Account</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Orders & Returns</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Shipping Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-teal-400 mt-0.5" />
                <span className="text-gray-400">123 Fashion Street, New York, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-teal-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-teal-400" />
                <span className="text-gray-400">support@animora.com</span>
              </li>
            </ul>
          </div>
        </div>
        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Animora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;