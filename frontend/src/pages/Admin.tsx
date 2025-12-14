import { useState, useMemo } from "react";
import { useSweets } from "../context/SweetsContext";
import { useOrderHistory } from "../context/OrderHistoryContext";

export default function Admin() {
  const { sweets, addSweet, deleteSweet } = useSweets();
  const { orders } = useOrderHistory();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    image: "",
  });

  // Calculate statistics
  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalStock = sweets.reduce((sum, sweet) => sum + sweet.quantity, 0);
    const lowStockItems = sweets.filter(sweet => sweet.quantity <= 5 && sweet.quantity > 0).length;
    const outOfStockItems = sweets.filter(sweet => sweet.quantity === 0).length;
    const totalItems = sweets.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    // Calculate items sold (approximate - based on orders)
    const itemsSold = orders.reduce((sum, order) => sum + order.items.length, 0);

    return {
      totalOrders,
      totalRevenue,
      totalStock,
      lowStockItems,
      outOfStockItems,
      totalItems,
      averageOrderValue,
      itemsSold,
    };
  }, [orders, sweets]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.price || !formData.image || !formData.quantity) {
      alert("Please fill all fields");
      return;
    }

    addSweet({
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      image: formData.image,
    });

    setFormData({ name: "", category: "", price: "", quantity: "", image: "" });
  };

  const StatCard = ({ title, value, icon, color, delay = 0 }: { 
    title: string; 
    value: string | number; 
    icon: string; 
    color: string;
    delay?: number;
  }) => (
    <div 
      className={`bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-l-4 ${color} animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${color.replace('border-', 'bg-').replace('-500', '-100')} flex items-center justify-center text-2xl`}>
          {icon}
        </div>
        <div className={`text-3xl font-bold ${color.replace('border-', 'text-')}`}>
          {typeof value === 'number' && title.includes('Revenue') ? `₹${value.toLocaleString('en-IN')}` : 
           typeof value === 'number' && title.includes('Order') ? value.toLocaleString('en-IN') : 
           value}
        </div>
      </div>
      <h3 className="text-gray-600 font-semibold text-sm uppercase tracking-wide">{title}</h3>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-accent-50 to-highlight-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-primary-700 mb-3 animate-fade-in">Admin Dashboard</h1>
          <p className="text-gray-600 text-lg">
            Comprehensive overview of your sweet shop operations
          </p>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard 
            title="Total Orders" 
            value={stats.totalOrders} 
            icon="📦" 
            color="border-accent-500"
            delay={0}
          />
          <StatCard 
            title="Total Revenue" 
            value={stats.totalRevenue} 
            icon="💰" 
            color="border-highlight-500"
            delay={100}
          />
          <StatCard 
            title="Stock Remaining" 
            value={stats.totalStock} 
            icon="📊" 
            color="border-primary-500"
            delay={200}
          />
          <StatCard 
            title="Average Order" 
            value={`₹${stats.averageOrderValue.toFixed(2)}`} 
            icon="📈" 
            color="border-accent-600"
            delay={300}
          />
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-600 font-semibold text-sm uppercase tracking-wide mb-2">Low Stock Items</h3>
                <p className="text-3xl font-bold text-yellow-600">{stats.lowStockItems}</p>
              </div>
              <div className="text-4xl">⚠️</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-600 font-semibold text-sm uppercase tracking-wide mb-2">Out of Stock</h3>
                <p className="text-3xl font-bold text-red-600">{stats.outOfStockItems}</p>
              </div>
              <div className="text-4xl">🚫</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-highlight-500 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-600 font-semibold text-sm uppercase tracking-wide mb-2">Items Sold</h3>
                <p className="text-3xl font-bold text-highlight-600">{stats.itemsSold}</p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </div>
        </div>

        {/* ADD SWEET FORM */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span>➕</span> Add New Sweet
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                placeholder="Sweet Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent-500 focus:outline-none transition-all duration-300 focus:ring-2 focus:ring-accent-200"
              />

              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent-500 focus:outline-none transition-all duration-300 focus:ring-2 focus:ring-accent-200"
              />

              <input
                type="number"
                placeholder="Price (₹)"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent-500 focus:outline-none transition-all duration-300 focus:ring-2 focus:ring-accent-200"
              />

              <input
                type="number"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent-500 focus:outline-none transition-all duration-300 focus:ring-2 focus:ring-accent-200"
              />

              <input
                type="text"
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent-500 focus:outline-none transition-all duration-300 focus:ring-2 focus:ring-accent-200 md:col-span-2"
              />
            </div>

            <button
              type="submit"
              className="bg-accent-600 hover:bg-accent-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              ➕ Add Sweet
            </button>
          </form>
        </div>

        {/* SWEETS LIST */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span>📋</span> All Sweets ({sweets.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sweets.map((sweet, index) => (
              <div
                key={sweet.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={sweet.image}
                    alt={sweet.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://via.placeholder.com/400x300/E2E8F0/64748B?text=${encodeURIComponent(sweet.name)}`;
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-accent-500 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                      {sweet.category}
                    </span>
                  </div>
                  {sweet.quantity <= 5 && sweet.quantity > 0 && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm animate-pulse">
                        ⚠️ Low Stock
                      </span>
                    </div>
                  )}
                  {sweet.quantity === 0 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-accent-600 transition-colors">
                    {sweet.name}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-2xl font-bold text-accent-600">
                      ₹{sweet.price}.00
                    </p>
                    <p className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      sweet.quantity > 10 
                        ? 'bg-highlight-100 text-highlight-700' 
                        : sweet.quantity > 0 
                        ? 'bg-yellow-100 text-yellow-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      Stock: {sweet.quantity}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteSweet(sweet.id)}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
