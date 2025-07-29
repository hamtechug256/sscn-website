import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleGetQuoteClick = () => {
    navigate('/order');
  };

  return (
    <div className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-50"
        style={{ backgroundImage: `url(https://www.supplyht.com/ext/resources/2021/08-2021/sht-0821-Eyeonsafety-2.jpg)` }}
      ></div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          H&B Metal Workshop
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Crafting Excellence in Metalwork
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-full text-lg font-semibold shadow-lg"
          onClick={handleGetQuoteClick}
        >
          Get a Quote
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Home;