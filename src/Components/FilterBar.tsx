import React, { useState } from "react";

interface FilterBarProps {
  onSort: (sort: { type: string; order: string }) => void;
  onAdd: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ onSort, onAdd }) => {
  const [dateOrder, setDateOrder] = useState("newest");
  const [priceOrder, setPriceOrder] = useState("highToLow");

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value;
    setDateOrder(order);
    onSort({ type: "date", order });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value;
    setPriceOrder(order);
    onSort({ type: "price", order });
  };

  return (
    <div className="flex flex-wrap gap-3 items-center mb-4 justify-center md:justify-between">
      <div>
        <label className="mr-2 font-medium">Sort by date:</label>
        <select
          value={dateOrder}
          onChange={handleDateChange}
          className="border rounded p-1"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <div>
        <label className="mr-2 font-medium">Sort by price:</label>
        <select
          value={priceOrder}
          onChange={handlePriceChange}
          className="border rounded p-1"
        >
          <option value="highToLow">High to low</option>
          <option value="lowToHigh">Low to high</option>
        </select>
      </div>

      <button
        onClick={onAdd}
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-opacity-90 hover:-translate-y-0.5 duration-150 md:ml-auto"
      >
        + Add New Wish
      </button>
    </div>
  );
};
