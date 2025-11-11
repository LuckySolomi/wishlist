import React, { useState } from "react";
import type { Wish } from "../Types/Wish";
import { useWishes } from "../Context/WishContext";

export const WishForm: React.FC = () => {
  const { addWish } = useWishes();
  const [form, setForm] = useState<Omit<Wish, "id">>({
    title: "",
    description: "",
    price: 0,
    image: "",
    date: new Date().toISOString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "price" ? Number(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addWish(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 max-w-md p-4 border rounded"
    >
      <input name="title" placeholder="Title" onChange={handleChange} />
      <input
        name="description"
        placeholder="Description"
        onChange={handleChange}
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        onChange={handleChange}
      />
      <input name="image" placeholder="Image URL" onChange={handleChange} />

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-opacity-90 hover: transition hover:-translate-y-0.5 duration-150"
      >
        Add Wish
      </button>
    </form>
  );
};
