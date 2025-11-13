import React from "react";
import { Link } from "react-router-dom";
import type { Wish } from "../Types/Wish";

interface WishCardProps {
  wish: Wish;
  onDelete: () => void;
  onUpdate: () => void;
}

export const WishCard: React.FC<WishCardProps> = ({
  wish,
  onDelete,
  onUpdate,
}) => {
  return (
    <div className="border rounded-xl shadow-md p-4 flex flex-col hover:shadow-lg">
      <img
        src={wish.image}
        alt={wish.title}
        className="w-full h-48 object-cover rounded-lg mb-3 hover:scale-105 duration-150"
      />
      <h2 className="text-lg font-semibold">{wish.title}</h2>
      <p className="text-gray-600 text-sm mb-2">{wish.description}</p>
      <p className="font-bold mb-3">${wish.price}</p>

      <div className="flex justify-center gap-2  mt-3 w-full">
        <button onClick={onDelete} className="cardButton ">
          Delete
        </button>

        <button onClick={onUpdate} className="cardButton ">
          Update
        </button>

        <Link to={`/wish/${wish.id}`} className="cardButton ">
          Details
        </Link>
      </div>
    </div>
  );
};
