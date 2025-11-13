import React, { useState, useEffect } from "react";
import { FilterBar } from "../Components/FilterBar";
import { WishCard } from "../Components/WishCard";
import { Snackbar } from "../Components/Snackbar";
import { WishForm } from "../Components/WishForm";
import { DeleteConfirmModal } from "../Components/DeleteConfirmModal";
import { UpdateWishModal } from "../Components/UpdateWishModal";
import { useWishes } from "../Context/WishContext";
import type { Wish } from "../Types/Wish";

export const Dashboard: React.FC = () => {
  const { wishes, deleteWish, updateWish } = useWishes();
  const [sortedWishes, setSortedWishes] = useState<Wish[]>([]);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null);

  useEffect(() => {
    setSortedWishes(wishes);
  }, [wishes]);

  const handleSort = (sort: { type: string; order: string }) => {
    let sorted = [...sortedWishes];

    if (sort.type === "date") {
      sorted.sort((a, b) =>
        sort.order === "newest"
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else if (sort.type === "price") {
      sorted.sort((a, b) =>
        sort.order === "highToLow" ? b.price - a.price : a.price - b.price
      );
    }
    setSortedWishes(sorted);
  };

  const handleDeleteClick = (wish: Wish) => {
    setSelectedWish(wish);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedWish) {
      deleteWish(selectedWish.id);
      setSnackbar({ message: "Wish deleted successfully", type: "success" });
    }
    setDeleteModalOpen(false);
  };

  const handleUpdateClick = (wish: Wish) => {
    setSelectedWish(wish);
    setUpdateModalOpen(true);
  };

  const handleUpdate = (updatedWish: Wish) => {
    updateWish(updatedWish);
    setSnackbar({ message: "Wish updated successfully", type: "success" });
    setUpdateModalOpen(false);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">My Wishlist</h1>

      <FilterBar onSort={handleSort} onAdd={() => setShowForm(!showForm)} />

      {showForm && (
        <div className="mb-6 flex justify-center">
          <WishForm onClose={() => setShowForm(false)} />
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {sortedWishes.length > 0 ? (
          sortedWishes.map((wish) => (
            <WishCard
              key={wish.id}
              wish={wish}
              onDelete={() => handleDeleteClick(wish)}
              onUpdate={() => handleUpdateClick(wish)}
            />
          ))
        ) : (
          <p className="text-gray-500">No wishes yet.</p>
        )}
      </div>
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <UpdateWishModal
        isOpen={updateModalOpen}
        wish={selectedWish}
        onClose={() => setUpdateModalOpen(false)}
        onUpdate={handleUpdate}
      />

      {snackbar && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={() => setSnackbar(null)}
        />
      )}
    </div>
  );
};
