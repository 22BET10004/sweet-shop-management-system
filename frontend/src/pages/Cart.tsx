import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useOrderHistory } from "../context/OrderHistoryContext";

export default function Cart() {
  const { cart, clearCart } = useCart();
  const { addOrder } = useOrderHistory();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);

  const checkout = () => {
    if (cart.length === 0) return;
    
    addOrder(cart, subtotal);
    clearCart();
    navigate("/history");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-accent-50 to-highlight-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-primary-700 mb-3">Shopping Cart</h1>
          <p className="text-gray-600 text-lg">
            Review your items before checkout
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Add some delicious sweets to get started!
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-accent-600 hover:bg-accent-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* CART ITEMS */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Quantity: 1
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-2xl font-bold text-accent-600">
                      ₹{item.price}.00
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-lg font-semibold text-gray-800">
                      ₹{subtotal}.00
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3">
                    <span className="text-xl font-bold text-gray-800">Total</span>
                    <span className="text-2xl font-bold text-accent-600">
                      ₹{subtotal}.00
                    </span>
                  </div>
                </div>

                <button
                  onClick={checkout}
                  className="w-full bg-accent-600 hover:bg-accent-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
