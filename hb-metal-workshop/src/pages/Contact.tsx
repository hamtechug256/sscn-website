import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = '256742337382'; // One of the provided WhatsApp numbers
    const whatsappMessage = `Hello H&B Metal Workshop, my name is ${name}. My email is ${email}. I have a message/order: ${message}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    // Clear form fields after submission
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-6 text-yellow-500">Get in Touch</h2>
            <p className="mb-4 text-lg">
              <strong className="text-yellow-400">Email:</strong> <a href="mailto:hamzaholix@gmail.com" className="hover:underline">hamzaholix@gmail.com</a>
            </p>
            <p className="mb-4 text-lg">
              <strong className="text-yellow-400">Phone:</strong>
              <a href="tel:+256742337382" className="hover:underline ml-2">+256 742 337 382</a> /
              <a href="tel:+256774333181" className="hover:underline ml-2">+256 774 333 181</a>
            </p>
            <p className="mb-4 text-lg">
              <strong className="text-yellow-400">Location:</strong> Mukono, Uganda
            </p>
            <p className="text-gray-400 mt-6">
              Feel free to reach out to us for any inquiries, custom orders, or consultations. We are here to help you with all your metalwork needs.
            </p>
          </div>

          {/* Order & Message Form */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-6 text-yellow-500">Send Us a Message or Place an Order</h2>
            <form onSubmit={handleWhatsAppSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">Your Email</label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-300 text-sm font-bold mb-2">Your Message or Order Details</label>
                <textarea
                  id="message"
                  rows={5}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                  placeholder="Describe your inquiry or order..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.244c-.096-.048-.647-.316-.748-.352-.104-.036-.18-.048-.256.048-.076.096-.296.352-.364.428-.072.076-.144.084-.268.036-.124-.048-.52-.192-1.004-.62-.388-.348-.648-.772-.724-.896-.076-.124-.004-.116.068-.188.064-.064.144-.152.212-.228.068-.076.092-.144.12-.24.028-.096.012-.18-.004-.256-.016-.076-.144-.18-.304-.436-.16-.256-.352-.612-.352-.648-.004-.036-.036-.048-.076-.048h-.268c-.124 0-.328.048-.504.224-.176.176-.676.66-.676 1.612 0 .952.692 1.868.792 1.992.1.124 1.364 2.084 3.328 2.988.472.224.848.364 1.132.468.484.192.62.152.852.092.232-.06.748-.304.852-.592.104-.288.104-.536.072-.592-.032-.06-.116-.092-.24-.148zM10.002 0C4.48 0 0 4.48 0 10.002c0 1.752.452 3.404 1.24 4.852L0 20l5.34-1.404c1.34.736 2.856 1.124 4.662 1.124C15.52 19.72 20 15.24 20 10.002 20 4.48 15.52 0 10.002 0zM10.002 18.16c-1.496 0-2.92-.408-4.164-1.172l-.296-.176-3.076.808.82-3.008-.196-.316c-.852-1.44-1.304-3.084-1.304-4.852 0-4.42 3.58-8.004 8-8.004s8 3.584 8 8.004c0 4.42-3.58 8.004-8 8.004z"/></svg>
                Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;