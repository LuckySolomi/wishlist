import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const WishPage = () => {
  const { id } = useParams();
  const [wish, setWish] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/wishes/${id}`)
      .then((res) => res.json())
      .then((data) => setWish(data))
      .catch((err) => console.error("Error loading wish:", err));
  }, [id]);

  if (!wish) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <img
        src={wish.image}
        alt={wish.title}
        className="rounded-xl mb-4 w-full"
      />
      <h1 className="text-3xl font-bold mb-2">{wish.title}</h1>
      <p className="text-gray-600 mb-4">{wish.description}</p>
      <p className="font-semibold text-xl">${wish.price}</p>
    </div>
  );
};

export default WishPage;
