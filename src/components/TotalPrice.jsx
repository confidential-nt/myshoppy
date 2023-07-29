import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaEquals } from "react-icons/fa";

export default function TotalPrice({ productInCarts }) {
  const products = Object.entries(productInCarts).map(([k, v]) => v);
  const totalPrice = products.reduce((acc, cur) => {
    return cur.count * cur.price + acc;
  }, 0);
  const deliveryFee = 3000;

  return (
    <div className="flex flex-col w-10/12 mr-auto ml-auto pt-10">
      <div className="flex justify-around items-center mb-10">
        <div className="flex flex-col items-center">
          <span>상품 총액</span>
          <strong className="text-shoppypink">₩{totalPrice}</strong>
        </div>
        <span>
          <AiFillPlusCircle />
        </span>
        <div className="flex flex-col items-center">
          <span>배송비</span>
          <strong className="text-shoppypink">₩{deliveryFee}</strong>
        </div>
        <span>
          <FaEquals />
        </span>
        <div className="flex flex-col items-center">
          <span>총가격</span>
          <strong className="text-shoppypink">
            ₩{totalPrice + deliveryFee}
          </strong>
        </div>
      </div>
      <button className="bg-shoppypink text-white text-xl pt-1 pb-1">
        주문하기
      </button>
    </div>
  );
}
