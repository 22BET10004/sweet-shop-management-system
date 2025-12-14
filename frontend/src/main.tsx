import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { SweetsProvider } from "./context/SweetsContext";
import { OrderHistoryProvider } from "./context/OrderHistoryContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SweetsProvider>
          <OrderHistoryProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </OrderHistoryProvider>
        </SweetsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
