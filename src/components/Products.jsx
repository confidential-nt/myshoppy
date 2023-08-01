import React from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";

export default function Products({ productRepository }) {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(["products"], () => productRepository.findAll(), {
    staleTime: 1000 * 60 * 1,
  });

  return (
    <ul className="grid grid-cols-4 gap-3 gap-y-4 mt-4 pr-2 pl-3">
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong 😖</p>}
      {!products && null}
      {products &&
        Object.entries(products).map(([key, value]) => (
          <ProductCard key={key} product={value} id={key} />
        ))}
    </ul>
  );
}
