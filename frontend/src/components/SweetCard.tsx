import type { Sweet } from "../data/sweets";
import { useCart } from "../context/CartContext";

export default function SweetCard({ sweet }: { sweet: Sweet }) {
  const { addToCart } = useCart();

  return (
    <div className="card">
      <span className="badge">{sweet.category}</span>
      <img src={sweet.image} />
      <h3>{sweet.name}</h3>
      
      <div className="price-row">
        <span className="price">₹{sweet.price}</span>
        <span>{sweet.quantity} left</span>
      </div>

      <div className="actions">
        <button className="cart-btn" onClick={() => addToCart(sweet)}>
          🛒 Add to Cart
        </button>
        <button className="buy-btn">Buy Now</button>
      </div>
    </div>
  );
}
