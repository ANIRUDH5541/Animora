import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import NarutoPage from './pages/NarutoPage';
import OnePiecePage from './pages/OnePiecePage';
import KaijuPage from './pages/KaijuPage';
import BleachPage from './pages/BleachPage';
import ProductDetails from './pages/ProductDetails';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-black text-white flex flex-col">
          <Toaster position="top-right" />
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore/naruto" element={<NarutoPage />} />
              <Route path="/explore/one-piece" element={<OnePiecePage />} />
              <Route path="/explore/kaiju" element={<KaijuPage />} />
              <Route path="/explore/bleach" element={<BleachPage />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;