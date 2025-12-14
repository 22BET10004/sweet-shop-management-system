import { useState } from "react";

function AddSweetForm({ onAdd }: any) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = () => {
    onAdd({
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
    });
    setForm({ name: "", category: "", price: "", quantity: "" });
  };

  return (
    <div>
      <h3>Add Sweet</h3>
      <input name="name" placeholder="Name" onChange={handleChange} value={form.name} />
      <input name="category" placeholder="Category" onChange={handleChange} value={form.category} />
      <input name="price" placeholder="Price" onChange={handleChange} value={form.price} />
      <input name="quantity" placeholder="Quantity" onChange={handleChange} value={form.quantity} />
      <button onClick={submit}>Add</button>
    </div>
  );
}

export default AddSweetForm;
