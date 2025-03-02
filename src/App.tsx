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

function App() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore/naruto" element={<NarutoPage />} />
          <Route path="/explore/one-piece" element={<OnePiecePage />} />
          <Route path="/explore/kaiju" element={<KaijuPage />} />
          <Route path="/explore/bleach" element={<BleachPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;