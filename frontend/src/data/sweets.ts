// Using actual working image URLs from Pexels and Pixabay only
export interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
}

export const sweets = [
  {
    id: 1,
    name: "Chocolate Cake",
    category: "Cakes",
    price: 450,
    quantity: 8,
    image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  },
  {
    id: 2,
    name: "Vanilla Cupcake",
    category: "Cupcakes",
    price: 80,
    quantity: 25,
    image: "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  },
  {
    id: 3,
    name: "Chocolate Truffle",
    category: "Chocolates",
    price: 120,
    quantity: 15,
    image: "https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  },
  {
    id: 4,
    name: "Pastry",
    category: "Cakes",
    price: 80,
    quantity: 20,
    image: "https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_1280.jpg",
  },
  {
    id: 5,
    name: "Dark Chocolate Bar",
    category: "Chocolates",
    price: 150,
    quantity: 12,
    image: "https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  },
  {
    id: 6,
    name: "Red Velvet Cupcake",
    category: "Cupcakes",
    price: 95,
    quantity: 20,
    image: "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  },
];
