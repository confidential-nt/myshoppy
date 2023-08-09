import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";

export default function CartsCard({
  id,
  productInCarts,
  onAddCount,
  onDeleteCount,
  onDeleteCarts,
}) {
  const navigate = useNavigate();
  const [count, setCount] = useState(productInCarts.count);

  const handleAddCount = () => {
    onAddCount.mutate(id);
    setCount((prev) => prev + 1);
  };
  const handleDeleteCount = () => {
    if (count === 1) {
      handleDeleteCarts();
      return;
    }
    onDeleteCount.mutate(id);
    setCount((prev) => prev - 1);
  };
  const handleDeleteCarts = () => {
    onDeleteCarts.mutate(id);
    setCount(0);
  };

  return (
    <>
      {count > 0 ? (
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
            role="img"
            aria-label="go-to-product-detail"
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
              <button
                type="button"
                className="mr-1"
                onClick={handleDeleteCount}
                aria-label="deleteCount"
              >
                <AiOutlineMinusSquare />
              </button>
              <span className="mr-1 flex items-center">{count}</span>
              <button
                type="button"
                className="mr-3"
                onClick={handleAddCount}
                aria-label="addCount"
              >
                <AiOutlinePlusSquare />
              </button>
              <button
                type="button"
                onClick={handleDeleteCarts}
                aria-label="deleteCarts"
              >
                <BsTrashFill />
              </button>
            </div>
          </div>
        </li>
      ) : null}
    </>
  );
}
