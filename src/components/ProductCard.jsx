import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, id }) {
  const navigate = useNavigate();
  return (
    <li
      onClick={() =>
        navigate(`/products/${id}`, {
          state: {
            product,
          },
        })
      }
      className="basis-1/4 mr-3 last:mr-0 cursor-pointer shadow-lg hover:scale-105 transition"
    >
      <div className="w-full">
        <img
          src={product.imageURL}
          alt={product.name}
          className="w-full h-full"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between">
          <h4>{product.name}</h4>
          <strong className="font-normal">₩{product.price}</strong>
        </div>
        <span className="text-sm text-gray-700">{product.category}</span>
      </div>
    </li>
  );
}
