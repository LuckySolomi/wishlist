import React, { useState } from "react";
import { useWishes } from "../Context/WishContext";
import type { Wish } from "../Types/Wish";

export const WishForm: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { addWish } = useWishes();
  const [form, setForm] = useState<Omit<Wish, "id">>({
    title: "",
    description: "",
    price: 0,
    image: "",
    date: new Date().toISOString(),
  });

  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "price" ? Number(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.image.trim() ||
      form.price <= 0
    ) {
      setError("Please fill in all fields before adding a wish.");
      return;
    }

    setError("");
    addWish(form);
    setForm({
      title: "",
      description: "",
      price: 0,
      image: "",
      date: new Date().toISOString(),
    });

    onClose?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 w-full max-w-md mx-auto p-4 border rounded"
    >
      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
        className="input"
      />
      <input
        name="description"
        placeholder="Description"
        onChange={handleChange}
        className="input"
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        min="0"
        onChange={handleChange}
        className="input"
      />
      <input
        name="image"
        placeholder="Image URL"
        onChange={handleChange}
        className="input"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-opacity-90 hover: transition hover:-translate-y-0.5 duration-150"
      >
        Add Wish
      </button>
    </form>
  );
};
