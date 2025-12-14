import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useSweets } from "../context/SweetsContext";

export default function Shop() {
  const { addToCart } = useCart();
  const { sweets, updateQuantity } = useSweets();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [addedItems, setAddedItems] = useState<Set<number>>(new Set());

  const categories = Array.from(new Set(sweets.map((s) => s.category)));

  const filteredSweets = sweets.filter((item) => {
    const matchName = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" || item.category === category;

    return matchName && matchCategory;
  });

  const handleAddToCart = (item: { id: number; name: string; price: number }, sweetId: number) => {
    const sweet = sweets.find(s => s.id === sweetId);
    if (sweet && sweet.quantity > 0) {
      addToCart(item);
      updateQuantity(sweetId, sweet.quantity - 1);
      setAddedItems((prev) => new Set(prev).add(item.id));
      setTimeout(() => {
        setAddedItems((prev) => {
          const next = new Set(prev);
          next.delete(item.id);
          return next;
        });
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-accent-50 to-highlight-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-700 to-accent-700 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-4">
            🍬 Premium Sweet Shop
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Indulge in our handcrafted collection of premium sweets and chocolates
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
              ✨ Fresh Daily
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
              🚚 Fast Delivery
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
              💯 Quality Guaranteed
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="🔍 Search sweets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent-500 focus:outline-none transition-all duration-300 text-lg"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent-500 focus:outline-none transition-all duration-300 text-lg bg-white min-w-[200px]"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <p className="text-gray-600 mt-4 text-sm">
            Showing <span className="font-semibold text-accent-600">{filteredSweets.length}</span> of{" "}
            <span className="font-semibold">{sweets.length}</span> sweets
          </p>
        </div>

        {/* Sweets Grid */}
        {filteredSweets.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              No sweets found
            </h2>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSweets.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      // If image fails, try a generic food image as fallback
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes('pexels.com/photos/1435904')) {
                        target.src = "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop";
                      }
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-accent-500 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg">
                      {item.category}
                    </span>
                  </div>
                  {item.quantity <= 5 && item.quantity > 0 && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        Only {item.quantity} left!
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-accent-600 transition-colors">
                    {item.name}
                  </h3>

                  <div className="flex items-center justify-between mb-4">
                    <p className="text-2xl font-bold text-accent-600">
                      ₹{item.price}.00
                    </p>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${item.quantity > 0 ? 'text-highlight-600' : 'text-red-500'}`}>
                        {item.quantity > 0 ? `Stock: ${item.quantity}` : 'Out of Stock'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleAddToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                      }, item.id)
                    }
                    disabled={addedItems.has(item.id) || item.quantity === 0}
                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform ${
                      item.quantity === 0
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : addedItems.has(item.id)
                        ? "bg-highlight-500 text-white cursor-not-allowed"
                        : "bg-accent-600 hover:bg-accent-700 text-white hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {item.quantity === 0
                      ? "Out of Stock"
                      : addedItems.has(item.id)
                      ? (
                          <span className="flex items-center justify-center gap-2">
                            <span>✓</span> Added to Cart
                          </span>
                        )
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
