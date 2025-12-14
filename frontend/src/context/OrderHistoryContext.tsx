import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { CartItem } from "./CartContext";

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  orderDate: Date;
};

type OrderHistoryContextType = {
  orders: Order[];
  addOrder: (items: CartItem[], total: number) => void;
  getOrderById: (id: string) => Order | undefined;
};

const OrderHistoryContext = createContext<OrderHistoryContextType | null>(null);

const STORAGE_KEY = "sweetShopOrders";

export function OrderHistoryProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.map((order: Order) => ({
          ...order,
          orderDate: new Date(order.date),
        }));
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const addOrder = (items: CartItem[], total: number) => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      items: [...items],
      total,
      date: new Date().toISOString(),
      orderDate: new Date(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrderById = (id: string) => {
    return orders.find((order) => order.id === id);
  };

  return (
    <OrderHistoryContext.Provider value={{ orders, addOrder, getOrderById }}>
      {children}
    </OrderHistoryContext.Provider>
  );
}

export function useOrderHistory() {
  const context = useContext(OrderHistoryContext);
  if (!context)
    throw new Error("useOrderHistory must be used inside OrderHistoryProvider");
  return context;
}

