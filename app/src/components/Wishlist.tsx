import React, { useRef, useState } from 'react';

const Wishlist: React.FC = () => {
  const wishlistFormRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState('');

  const handleScrollToWishlist = () => {
    wishlistFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from reloading on submit
    if (email) {
      console.log('Submitted email:', email);
      // TODO: Add your logic here to send the email to your backend or a service like Mailchimp
      alert(`Thank you for joining the wishlist with ${email}!`);
      setEmail(''); // Clear the input field after submission
    } else {
      alert('Please enter a valid email address.');
    }
  };

  return (
    <div className="bg-[#0D0D0D] text-white min-h-screen font-sans p-8">
      {/* Background decorative squares */}
      <div className="absolute inset-0 z-0 opacity-10">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="absolute bg-gray-700 w-4 h-4" style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 90}deg)`
          }}></div>
        ))}
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto">
        {/* Header Navigation */}
        <header className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold">DePINLauncher</div>
          <nav className="hidden md:flex items-center space-x-8 text-gray-300">
            <a href="#" className="hover:text-white">About</a>
            <a href="#" className="hover:text-white">Networks</a>
            <a href="#" className="hover:text-white">FAQ</a>
            <a href="#" className="hover:text-white">Docs</a>
          </nav>
          {/* Updated button with onClick handler */}
          <button
            onClick={handleScrollToWishlist}
            className="hidden md:block bg-gray-800 border border-gray-700 px-6 py-2 rounded-lg hover:bg-gray-700"
          >
            Join The Wishlist
          </button>
        </header>

        {/* Hero Section */}
        <main className="text-center py-24 md:py-32">
          <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-1 rounded-full text-sm mb-4">
            <span className="font-bold">NEW!</span> Try advanced DpinLauncher
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Launch Your Solana DePIN Network
            <br />
            in Minutes, Not Months
          </h1>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Decentralized Physical Infrastructure (DePIN) is the next frontier for Solana, but launching a new network is incredibly complex, slow, and expensive.
          </p>
          {/* Updated button with onClick handler */}
          <button
            onClick={handleScrollToWishlist}
            className="bg-blue-600 px-8 py-3 rounded-xl mt-8 font-semibold hover:bg-blue-700 transition-transform hover:scale-105"
          >
            Join The Wishlist
          </button>
        </main>

        {/* --- NEW WISHLIST FORM SECTION --- */}
        <section
          ref={wishlistFormRef} // Attach the ref to this section
          className="py-20 md:py-32"
        >
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Early Access</h2>
            <p className="text-gray-400 mb-8">
              Be the first to know when DePINLauncher goes live. Join the wishlist to get exclusive updates and early access.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
              />
              <button
                type="submit"
                className="bg-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </section>
        {/* --- END OF NEW SECTION --- */}

      </div>
    </div>
  );
};

export default Wishlist;
