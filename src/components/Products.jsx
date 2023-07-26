import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function Products({ productRepository }) {
  const [products, setProducts] = useState();
  useEffect(() => {
    productRepository.findAll(setProducts);
  }, []);
  return (
    <ul className="flex mt-4 pr-2 pl-3">
      {products &&
        Object.entries(products).map(([key, value]) => (
          <ProductCard key={key} product={value} id={key} />
        ))}
    </ul>
  );
}
