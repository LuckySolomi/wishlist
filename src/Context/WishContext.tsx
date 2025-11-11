import React, { createContext, useContext, useEffect, useState } from "react";
import type { Wish } from "../Types/Wish";
import { useApi } from "../Hooks/useApi";
import { API_URL } from "../Constants/Api";

interface WishContextType {
  wishes: Wish[];
  addWish: (wish: Omit<Wish, "id">) => Promise<void>;
  deleteWish: (id: number) => Promise<void>;
  updateWish: (wish: Wish) => Promise<void>;
}

const WishContext = createContext<WishContextType | undefined>(undefined);

export const WishProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { request } = useApi(API_URL);
  const [wishes, setWishes] = useState<Wish[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await request("/wishes");
      if (data) setWishes(data);
    };
    load();
  }, []);

  const addWish = async (wish: Omit<Wish, "id">) => {
    const data = await request("/wishes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(wish),
    });

    if (data) setWishes((prev) => [...prev, data]);
  };

  const deleteWish = async (id: number) => {
    await request(`/wishes/${id}`, { method: "DELETE" });
    setWishes((prev) => prev.filter((w) => w.id !== id));
  };

  const updateWish = async (wish: Wish) => {
    const data = await request(`/wishes/${wish.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(wish),
    });
    if (data)
      setWishes((prev) => prev.map((w) => (w.id === wish.id ? data : w)));
  };

  return (
    <WishContext.Provider value={{ wishes, addWish, deleteWish, updateWish }}>
      {children}
    </WishContext.Provider>
  );
};

export const useWishes = () => {
  const context = useContext(WishContext);
  if (!context) throw new Error("useWishes must be used within WishProvider");
  return context;
};
