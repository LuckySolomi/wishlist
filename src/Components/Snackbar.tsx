import React, { useEffect } from "react";

interface SnackbarProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export const Snackbar: React.FC<SnackbarProps> = ({
  message,
  type,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-5 right-5 px-4 py-2 rounded text-white shadow-lg ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );
};
