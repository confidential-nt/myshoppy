import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useUserContext } from "../context/UserContext";
import { useUserRepositoryContext } from "../context/UserRepositoryContext";

export default function ProductDetail() {
  const [complete, setComplete] = useState(false);

  const queryClient = useQueryClient();

  const {
    state: { product },
  } = useLocation();

  const [selectedOption, setSelectedOption] = useState(
    product.options.split(",")[0]
  );

  const { uid } = useUserContext();
  const { userRepository } = useUserRepositoryContext();

  const { productId } = useParams();

  const handleClick = useMutation(
    () => {
      if (!uid) return;
      userRepository.updateCartsOnce(uid, productId, selectedOption);

      setComplete(true);
      setTimeout(() => {
        setComplete(false);
      }, 3000);
    },
    {
      onSuccess: () => queryClient.invalidateQueries(["carts", uid]),
    }
  );

  return (
    <div className="pl-5 pr-5">
      <strong className="inline-block mt-3 mb-3 pl-4 font-normal text-xs text-gray-500">
        &gt; {product.category}
      </strong>
      <div className="flex flex-col lg:flex-row">
        <img src={product.imageURL} alt={product.name} className="basis-3/5" />
        <div className="basis-2/5 ml-5 pt-3">
          <div className="border-b pb-1 mb-2">
            <h3 className="font-semibold text-xl mb-1">{product.name}</h3>
            <span className="font-semibold">₩{product.price}</span>
          </div>
          <p className="text-sm mb-3">{product.desc}</p>
          <div className="flex items-center mb-3">
            <span className="text-shoppypink text-xs mr-2">옵션:</span>
            <select
              name="options"
              className="block grow border border-dashed border-shoppypink pl-1 pr-1 pt-1 pb-1"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              {product.options.split(",").map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className="block cursor-pointer relative bg-shoppypink w-5/6 mr-auto ml-auto text-white text-xl pt-1 pb-1 after:content-[''] after:w-full after:h-full after:absolute after:top-0 after:left-0 after:bg-black/30 after:hidden hover:after:block  disabled:cursor-not-allowed disabled:hover:after:hidden disabled:bg-shoppypink/30"
            disabled={!Boolean(uid)}
            onClick={() => handleClick.mutate()}
          >
            장바구니에 추가
          </button>
          {complete && <span>✔️ 장바구니에 추가되었습니다.</span>}
        </div>
      </div>
    </div>
  );
}
