const AboutUs = () => {
    return (
        <div>
         <section className="bg-white py-16 px-4 sm:px-6 lg:px-20">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
      About <span className="text-green-600">Wild Trail Gear</span>
    </h2>
    <p className="text-lg text-gray-600 mb-10">
      Your trusted companion for every journey — built for the wild, made for you.
    </p>
    <div className="grid md:grid-cols-2 gap-10 text-left">
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">Who We Are</h3>
        <p className="text-gray-600 leading-relaxed">
          Wild Trail Gear was founded by passionate explorers who understand the importance of durable, dependable gear. We provide premium travel and adventure essentials that elevate every trip, big or small.
        </p>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">Our Mission</h3>
        <p className="text-gray-600 leading-relaxed">
          To empower travelers and outdoor lovers with carefully curated products that combine functionality, comfort, and style — so you're always ready to take the trail less traveled.
        </p>
      </div>
    </div>

    <div className="mt-12">
      <h3 className="text-2xl font-bold text-gray-800 mb-3">Why Choose Us?</h3>
      <ul className="text-gray-600 space-y-3 list-disc list-inside">
        <li>🧭 Adventure-ready gear tested by real explorers</li>
        <li>🌱 Eco-conscious and sustainable product options</li>
        <li>💼 Lightweight, durable, and travel-friendly designs</li>
        <li>💬 Friendly customer support & hassle-free returns</li>
      </ul>
    </div>

    <div className="mt-16">
      <img src="/logo.png" alt="Wild Trail Gear Logo" className="mx-auto h-16 w-16 mb-4" />
      <p className="text-gray-500 italic">
        “Explore more. Pack light. Live wild.”
      </p>
    </div>
  </div>
</section>

        </div>
    );
};

export default AboutUs;