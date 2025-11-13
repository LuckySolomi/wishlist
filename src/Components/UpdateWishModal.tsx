import React, { useState, useEffect } from "react";
import { Modal } from "./Modal";
import type { Wish } from "../Types/Wish";

interface UpdateWishModalProps {
  isOpen: boolean;
  wish: Wish | null;
  onClose: () => void;
  onUpdate: (updatedWish: Wish) => void;
}

export const UpdateWishModal: React.FC<UpdateWishModalProps> = ({
  isOpen,
  wish,
  onClose,
  onUpdate,
}) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    if (wish) {
      setForm({
        title: wish.title,
        description: wish.description,
        price: wish.price.toString(),
        image: wish.image,
      });
    } else {
      setForm({
        title: "",
        description: "",
        price: "",
        image: "",
      });
    }
  }, [wish]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "price") {
      if (/^\d*$/.test(value)) {
        setForm((prev) => ({ ...prev, price: value }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.image || !form.price) return;

    const updatedWish: Wish = {
      id: wish!.id,
      title: form.title,
      description: form.description,
      price: Number(form.price),
      image: form.image,
      date: wish!.date,
    };

    onUpdate(updatedWish);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Update Wish</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="input"
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="input"
        />
        <input
          name="price"
          type="number"
          value={form.price}
          min="0"
          onChange={handleChange}
          placeholder="Price"
          className="input"
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="input"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Save
        </button>
      </form>
    </Modal>
  );
};
