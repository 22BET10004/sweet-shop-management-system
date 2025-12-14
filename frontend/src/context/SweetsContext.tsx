import { createContext, useContext, useState, ReactNode } from "react";
import { sweets as initialSweets } from "../data/sweets";

export type Sweet = {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
};

type SweetsContextType = {
  sweets: Sweet[];
  addSweet: (sweet: Omit<Sweet, "id">) => void;
  deleteSweet: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
};

const SweetsContext = createContext<SweetsContextType | null>(null);

export function SweetsProvider({ children }: { children: ReactNode }) {
  const [sweets, setSweets] = useState<Sweet[]>(initialSweets);

  const addSweet = (sweet: Omit<Sweet, "id">) => {
    const newId = Math.max(...sweets.map((s) => s.id), 0) + 1;
    setSweets((prev) => [...prev, { ...sweet, id: newId }]);
  };

  const deleteSweet = (id: number) => {
    setSweets((prev) => prev.filter((sweet) => sweet.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setSweets((prev) =>
      prev.map((sweet) => (sweet.id === id ? { ...sweet, quantity } : sweet))
    );
  };

  return (
    <SweetsContext.Provider value={{ sweets, addSweet, deleteSweet, updateQuantity }}>
      {children}
    </SweetsContext.Provider>
  );
}

export function useSweets() {
  const context = useContext(SweetsContext);
  if (!context) throw new Error("useSweets must be used inside SweetsProvider");
  return context;
}

