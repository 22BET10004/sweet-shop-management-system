
import { addSweet } from "../services/api";

export default function SweetForm({ onAdd }: any) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const submit = async (e: any) => {
    e.preventDefault();
    await addSweet({
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
    });
    setForm({ name: "", category: "", price: "", quantity: "" });
    onAdd();
  };

  return (
    <form className="form" onSubmit={submit}>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Category" onChange={e => setForm({ ...form, category: e.target.value })} />
      <input placeholder="Price" type="number" onChange={e => setForm({ ...form, price: e.target.value })} />
      <input placeholder="Quantity" type="number" onChange={e => setForm({ ...form, quantity: e.target.value })} />
      <button>Add Sweet</button>
    </form>
  );
}
