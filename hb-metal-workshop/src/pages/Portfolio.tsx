import React from 'react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ image, title, description }) => {
  return (
    <motion.div
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

const Portfolio: React.FC = () => {
  const projects = [
    {
      image: 'https://via.placeholder.com/400x300/000000/FFFFFF?text=Project+1',
      title: 'Industrial Structure',
      description: 'Fabrication and installation of a robust industrial steel structure.',
    },
    {
      image: 'https://via.placeholder.com/400x300/000000/FFFFFF?text=Project+2',
      title: 'Custom Gate Design',
      description: 'Artistic and secure custom metal gate for a residential property.',
    },
    {
      image: 'https://via.placeholder.com/400x300/000000/FFFFFF?text=Project+3',
      title: 'Staircase Railing',
      description: 'Elegant and durable metal railing for an interior staircase.',
    },
    {
      image: 'https://via.placeholder.com/400x300/000000/FFFFFF?text=Project+4',
      title: 'Metal Furniture',
      description: 'Handcrafted metal table and chairs for a modern living space.',
    },
    {
      image: 'https://via.placeholder.com/400x300/000000/FFFFFF?text=Project+5',
      title: 'Architectural Facade',
      description: 'Intricate metal facade design for a commercial building.',
    },
    {
      image: 'https://via.placeholder.com/400x300/000000/FFFFFF?text=Project+6',
      title: 'Welded Sculpture',
      description: 'Abstract metal sculpture showcasing advanced welding techniques.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12">Our Portfolio</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;