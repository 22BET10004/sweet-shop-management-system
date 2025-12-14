import { useNavigate } from "react-router-dom";
import { useOrderHistory } from "../context/OrderHistoryContext";

export default function History() {
  const navigate = useNavigate();
  const { orders } = useOrderHistory();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-accent-50 to-highlight-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-primary-700 mb-3">
            Order History
          </h1>
          <p className="text-gray-600 text-lg">
            View all your past orders and their details
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              No Orders Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start shopping to see your order history here!
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-accent-600 hover:bg-accent-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-accent-50 to-highlight-50">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        Order ID: <span className="text-accent-600">{order.id}</span>
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {formatDate(order.date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-accent-600">
                        ₹{order.total}.00
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="font-semibold text-gray-800 mb-4">
                    Order Items:
                  </h4>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <span className="text-gray-800 font-medium">
                          {item.name}
                        </span>
                        <span className="text-accent-600 font-semibold">
                          ₹{item.price}.00
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {orders.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/")}
              className="bg-accent-600 hover:bg-accent-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
