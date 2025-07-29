import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12">About H&B Metal Workshop</h1>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-800 p-8 rounded-lg shadow-lg mb-8"
        >
          <h2 className="text-3xl font-semibold text-yellow-500 mb-4">Our Story</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Founded with a passion for precision and a commitment to craftsmanship, H&B Metal Workshop has grown to become a trusted name in the welding and metal fabrication industry. With years of experience, we have honed our skills to deliver exceptional results for a diverse range of projects, from intricate artistic metalwork to robust industrial structures.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Our journey began with a simple goal: to provide high-quality metal solutions that not only meet but exceed our clients' expectations. We believe in the power of metal to transform ideas into tangible, durable, and beautiful creations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gray-800 p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-3xl font-semibold text-yellow-500 mb-4">Our Expertise</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            At H&B Metal Workshop, our team comprises highly skilled and certified welders and fabricators who are experts in various welding techniques, including MIG, TIG, and Stick welding. We work with a wide array of metals, including steel, stainless steel, aluminum, and more.
          </p>
          <ul className="list-disc list-inside text-gray-300 leading-relaxed">
            <li className="mb-2">Custom Metal Fabrication</li>
            <li className="mb-2">Structural Welding</li>
            <li className="mb-2">Repair and Maintenance</li>
            <li className="mb-2">Artistic Metalwork</li>
            <li className="mb-2">On-Site Welding</li>
            <li>Precision Cutting</li>
          </ul>
          <p className="text-gray-300 leading-relaxed mt-4">
            We are dedicated to continuous improvement, staying updated with the latest industry standards and technologies to ensure we provide the best possible service to our clients.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;