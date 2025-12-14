const BASE_URL = "http://localhost:3000/api";

export const getSweets = async () => {
  const res = await fetch(`${BASE_URL}/sweets`);
  return res.json();
};

export const purchaseSweet = async (id: number) => {
  const res = await fetch(`${BASE_URL}/sweets/${id}/purchase`, {
    method: "POST",
  });
  return res.json();
};
