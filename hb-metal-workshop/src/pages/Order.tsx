import React, { useState } from 'react';

const Order: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orderDescription, setOrderDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = '256742337382'; // One of the provided WhatsApp numbers
    const message = `Hello H&B Metal Workshop, I'd like to place an order.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phoneNumber}\nOrder Details: ${orderDescription}\n\nPlease get back to me to confirm and discuss further.`
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Clear form fields after submission
    setName('');
    setEmail('');
    setOrderDescription('');
    setPhoneNumber('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold text-center mb-8">Place Your Order</h1>
        <p className="text-center text-gray-300 mb-8">
          Fill out the form below with your order details, and we'll get back to you via WhatsApp to confirm and discuss your project.
        </p>

        <form onSubmit={handleWhatsAppOrder}>
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
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-300 text-sm font-bold mb-2">Your Phone Number (for WhatsApp)</label>
            <input
              type="tel"
              id="phoneNumber"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
              placeholder="e.g., +256742337382"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="orderDescription" className="block text-gray-300 text-sm font-bold mb-2">Order Details</label>
            <textarea
              id="orderDescription"
              rows={7}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
              placeholder="Describe your custom order, including dimensions, materials, and any specific requirements."
              value={orderDescription}
              onChange={(e) => setOrderDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.244c-.096-.048-.647-.316-.748-.352-.104-.036-.18-.048-.256.048-.076.096-.296.352-.364.428-.072.076-.144.084-.268.036-.124-.048-.52-.192-1.004-.62-.388-.348-.648-.772-.724-.896-.076-.124-.004-.116.068-.188.064-.064.144-.152.212-.228.068-.076.092-.144.12-.24.028-.096.012-.18-.004-.256-.016-.076-.144-.18-.304-.436-.16-.256-.352-.612-.352-.648-.004-.036-.036-.048-.076-.048h-.268c-.124 0-.328.048-.504.224-.176.176-.676.66-.676 1.612 0 .952.692 1.868.792 1.992.1.124 1.364 2.084 3.328 2.988.472.224.848.364 1.132.468.484.192.62.152.852.092.232-.06.748-.304.852-.592.104-.288.104-.536.072-.592-.032-.06-.116-.092-.24-.148zM10.002 0C4.48 0 0 4.48 0 10.002c0 1.752.452 3.404 1.24 4.852L0 20l5.34-1.404c1.34.736 2.856 1.124 4.662 1.124C15.52 19.72 20 15.24 20 10.002 20 4.48 15.52 0 10.002 0zM10.002 18.16c-1.496 0-2.92-.408-4.164-1.172l-.296-.176-3.076.808.82-3.008-.196-.316c-.852-1.44-1.304-3.084-1.304-4.852 0-4.42 3.58-8.004 8-8.004s8 3.584 8 8.004c0 4.42-3.58 8.004-8 8.004z"/></svg>
            Send Order via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};

export default Order;
