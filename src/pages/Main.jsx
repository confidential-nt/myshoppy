import React from "react";
import Products from "../components/Products";

export default function Main({ productRepository }) {
  return (
    <>
      <div className="bg-bannerImage  bg-no-repeat bg-center bg-cover h-60 flex flex-col justify-center items-center">
        <h3 className="capitalize text-white text-4xl mb-1">shop with us</h3>
        <span className="capitalize text-white text-sm">
          best products, high quality
        </span>
      </div>
      <Products productRepository={productRepository} />
    </>
  );
}
