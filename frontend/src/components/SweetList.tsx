import { purchaseSweet } from "../services/api";

export default function SweetList({ sweets, search, onAction }: any) {
  return (
    <div className="list">
      {sweets
        .filter((s: any) =>
          s.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((s: any) => (
          <div key={s.id} className="card">
            <h3>{s.name}</h3>
            <p>Category: {s.category}</p>
            <p>Price: ₹{s.price}</p>
            <p>Stock: {s.quantity}</p>
            <button onClick={async () => {
              await purchaseSweet(s.id);
              onAction();
            }}>
              Purchase
            </button>
          </div>
        ))}
    </div>
  );
}
