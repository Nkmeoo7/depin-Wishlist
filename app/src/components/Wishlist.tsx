import React, { useRef, useState } from 'react';

const Wishlist: React.FC = () => {
  const wishlistFormRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleScrollToWishlist = () => {
    wishlistFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from reloading
    setMessage(''); // Clear previous messages
    setIsSubmitting(true); // Disable button

    try {
      // Send the data to your backend API
      const response = await fetch('http://localhost:3000/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }), // Send email in JSON format
      });

      const result = await response.json();

      if (!response.ok) {
        // If the server responded with an error (e.g., 409 duplicate email)
        throw new Error(result.message || 'Something went wrong');
      }

      // Handle success
      setMessage('✅ Thank you! You have been added to the wishlist.');
      setEmail(''); // Clear the input field

    } catch (error: any) {
      // Handle network errors or errors from the server
      console.error('Submission failed:', error);
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setIsSubmitting(false); // Re-enable button
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
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
            {message && <p className="mt-4 text-sm">{message}</p>}
          </div>
        </section>
        {/* --- END OF NEW SECTION --- */}

      </div>
    </div>
  );
};

export default Wishlist;

