import React from "react";
import { Link } from "react-router-dom";
import { useWishes } from "../Context/WishContext";
import type { Wish } from "../Types/Wish";

interface WishCardProps {
  wish: Wish;
}

export const WishCard: React.FC<WishCardProps> = ({ wish }) => {
  const { deleteWish } = useWishes();

  return (
    <div className="border rounded-xl shadow-md p-4 flex flex-col">
      <img
        src={wish.image}
        alt={wish.title}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />
      <h2 className="text-lg font-semibold">{wish.title}</h2>
      <p className="text-gray-600 text-sm mb-2">{wish.description}</p>
      <p className="font-bold mb-3">${wish.price}</p>

      <div className="flex justify-between">
        <Link
          to={`/wish/${wish.id}`}
          className="text-blue-600 hover:underline text-sm"
        >
          View details
        </Link>
        <button
          onClick={() => wish.id && deleteWish(wish.id)}
          className="text-red-500 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
