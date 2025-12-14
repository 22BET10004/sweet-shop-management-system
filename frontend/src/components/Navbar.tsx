import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const cartCount = cart.length;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-100 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
              🍬
            </span>
            <span className="text-2xl font-bold text-primary-600 group-hover:text-primary-700 transition-colors">
              Premium Sweet Shop
            </span>
          </div>

          {/* NAV LINKS */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-accent-600 text-white shadow-lg scale-105"
                    : "text-gray-700 hover:bg-accent-50 hover:text-accent-600"
                }`
              }
            >
              Shop
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl font-semibold transition-all duration-300 relative ${
                  isActive
                    ? "bg-accent-600 text-white shadow-lg scale-105"
                    : "text-gray-700 hover:bg-accent-50 hover:text-accent-600"
                }`
              }
            >
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-pulse">
                  {cartCount}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/history"
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-accent-600 text-white shadow-lg scale-105"
                    : "text-gray-700 hover:bg-accent-50 hover:text-accent-600"
                }`
              }
            >
              History
            </NavLink>

            <NavLink
              to="/track-order"
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-accent-600 text-white shadow-lg scale-105"
                    : "text-gray-700 hover:bg-accent-50 hover:text-accent-600"
                }`
              }
            >
              Track Order
            </NavLink>

            {user?.role === "ADMIN" && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-accent-600 text-white shadow-lg scale-105"
                      : "text-gray-700 hover:bg-accent-50 hover:text-accent-600"
                  }`
                }
              >
                Admin
              </NavLink>
            )}
          </div>

          {/* USER INFO */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="hidden sm:block text-gray-700 font-medium">
                  Hi, <span className="text-accent-600 font-semibold">{user.name}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
