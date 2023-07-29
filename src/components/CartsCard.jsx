import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";

export default function CartsCard({ id, productInCarts }) {
  const navigate = useNavigate();
  return (
    <li className="flex items-center mb-2 last:mb-0">
      <div
        className="w-1/3 mr-4 basis-1/6 cursor-pointer"
        onClick={() =>
          navigate(`/products/${id}`, {
            state: {
              product: productInCarts,
            },
          })
        }
      >
        <img
          src={productInCarts.imageURL}
          alt={productInCarts.name}
          className="w-full h-full"
        />
      </div>
      <div className="flex justify-between flex-grow basis-2/3">
        <div className="flex flex-col justify-center">
          <h3>{productInCarts.name}</h3>
          <span className="uppercase text-shoppypink font-bold">
            {productInCarts.option}
          </span>
          <span>₩{productInCarts.price}</span>
        </div>
        <div className="flex">
          <button className="mr-1">
            <AiOutlineMinusSquare />
          </button>
          <span className="mr-1 flex items-center">{productInCarts.count}</span>
          <button className="mr-3">
            <AiOutlinePlusSquare />
          </button>
          <button>
            <BsTrashFill />
          </button>
        </div>
      </div>
    </li>
  );
}
