import React from 'react';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  quote: string;
  author: string;
  company?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, company }) => {
  return (
    <motion.div
      className="bg-gray-800 p-8 rounded-lg shadow-lg text-center"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-gray-300 text-lg italic mb-4">"{quote}"</p>
      <p className="text-yellow-500 font-semibold text-xl">- {author}</p>
      {company && <p className="text-gray-400 text-md">{company}</p>}
    </motion.div>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: `H&B Metal Workshop delivered an outstanding custom gate for our property. The craftsmanship is superb, and it truly enhances our home's aesthetic.`,
      author: 'John Doe',
      company: 'Residential Client',
    },
    {
      quote: 'Their team handled our structural welding project with utmost professionalism and precision. Highly recommend their services for any industrial needs.',
      author: 'Jane Smith',
      company: 'Construction Co.',
    },
    {
      quote: 'The artistic metal piece they created for our office is a true masterpiece. Their attention to detail and creativity are unmatched.',
      author: 'David Lee',
      company: 'Art Gallery Owner',
    },
    {
      quote: 'Reliable, efficient, and top-quality work. H&B Metal Workshop is our go-to for all metal fabrication and repair needs.',
      author: 'Sarah Chen',
      company: 'Manufacturing Firm',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12">What Our Clients Say</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;