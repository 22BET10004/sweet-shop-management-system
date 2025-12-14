import { useState } from "react";
import { useOrderHistory } from "../context/OrderHistoryContext";
import { useNavigate } from "react-router-dom";

export default function TrackOrder() {
  const { orders, getOrderById } = useOrderHistory();
  const [orderId, setOrderId] = useState("");
  const [searchedOrder, setSearchedOrder] = useState<typeof orders[0] | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    setError("");
    setSearchedOrder(null);

    if (!orderId.trim()) {
      setError("Please enter an order ID");
      return;
    }

    const order = getOrderById(orderId.trim());
    if (order) {
      setSearchedOrder(order);
    } else {
      setError("Order not found. Please check your order ID and try again.");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getOrderStatus = (orderDate: Date) => {
    const hoursSinceOrder = (Date.now() - orderDate.getTime()) / (1000 * 60 * 60);
    
    if (hoursSinceOrder < 1) return { status: "Processing", color: "bg-accent-500", icon: "⏳" };
    if (hoursSinceOrder < 24) return { status: "Preparing", color: "bg-highlight-500", icon: "👨‍🍳" };
    if (hoursSinceOrder < 48) return { status: "Ready for Pickup", color: "bg-accent-600", icon: "📦" };
    return { status: "Completed", color: "bg-green-500", icon: "✅" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-accent-50 to-highlight-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-primary-700 mb-3">Track Your Order</h1>
          <p className="text-gray-600 text-lg">
            Enter your order ID to check the status of your order
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter Order ID (e.g., ORD-1234567890-abc123)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent-500 focus:outline-none transition-all duration-300 text-lg"
            />
            <button
              onClick={handleSearch}
              className="bg-accent-600 hover:bg-accent-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Track Order
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Order Details */}
        {searchedOrder && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className={`${getOrderStatus(searchedOrder.orderDate).color} text-white p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {getOrderStatus(searchedOrder.orderDate).icon} {getOrderStatus(searchedOrder.orderDate).status}
                  </h2>
                  <p className="text-white/90">Order ID: {searchedOrder.id}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Order Date</h3>
                  <p className="text-gray-600">{formatDate(searchedOrder.date)}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Total Amount</h3>
                  <p className="text-2xl font-bold text-accent-600">₹{searchedOrder.total}.00</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-800 mb-4">Order Items</h3>
                <div className="space-y-3">
                  {searchedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg"
                    >
                      <span className="text-gray-800 font-medium">{item.name}</span>
                      <span className="text-accent-600 font-semibold">₹{item.price}.00</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Orders */}
        {orders.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-primary-700 mb-4">Your Recent Orders</h2>
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => {
                    setOrderId(order.id);
                    setSearchedOrder(order);
                    setError("");
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{order.id}</p>
                      <p className="text-sm text-gray-600">{formatDate(order.date)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-accent-600">₹{order.total}.00</p>
                      <p className="text-sm text-gray-500">{order.items.length} items</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/")}
            className="bg-accent-600 hover:bg-accent-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

