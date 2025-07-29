import React from 'react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div
      className="bg-gray-800 p-8 rounded-lg shadow-lg text-center"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-yellow-500 text-5xl mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      icon: '⚙️', // Placeholder icon
      title: 'Custom Metal Fabrication',
      description: 'From concept to creation, we design and fabricate custom metal pieces to your exact specifications.',
    },
    {
      icon: '🛠️', // Placeholder icon
      title: 'Structural Welding',
      description: 'Expert welding services for robust and reliable structural components in construction and industrial projects.',
    },
    {
      icon: '🔩', // Placeholder icon
      title: 'Repair & Maintenance',
      description: 'Skilled repair and maintenance of metal structures, machinery, and equipment to ensure longevity.',
    },
    {
      icon: '🎨', // Placeholder icon
      title: 'Artistic Metalwork',
      description: 'Unique and intricate metal art pieces, sculptures, and decorative elements crafted with precision.',
    },
    {
      icon: '🚧', // Placeholder icon
      title: 'On-Site Welding',
      description: 'Convenient and efficient on-site welding services for projects that require immediate attention.',
    },
    {
      icon: '📏', // Placeholder icon
      title: 'Precision Cutting',
      description: 'Advanced metal cutting services using modern techniques for accurate and clean results.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;