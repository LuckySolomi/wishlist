import React from "react";
import { Modal } from "./Modal";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold text-center mb-4">
        Are you sure you want to delete this wish?
      </h2>
      <div className="flex justify-center gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
        >
          No
        </button>
        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
        >
          Yes
        </button>
      </div>
    </Modal>
  );
};
