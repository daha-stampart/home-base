const API_URL =
  "https://script.google.com/macros/s/AKfycbwCpkurYDA6dO9zdFnzO_eQq_PlJhM9nDEd0_r54BmT9Tl25GY0LJGkjGfwLReQLT0Gyg/exec";

export async function fetchUsers() {
  const res = await fetch(`${API_URL}?action=user`);

  if (!res.ok) {
    throw new Error("Gagal mengambil data user");
  }

  return res.json();
}