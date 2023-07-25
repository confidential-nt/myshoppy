import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function Products({ productRepository }) {
  const [products, setProducts] = useState();
  useEffect(() => {
    productRepository.findAll(setProducts);
  }, []);
  return (
    <ul className="flex mt-4">
      {products &&
        Object.entries(products).map(([key, value]) => (
          <ProductCard key={key} product={value} />
        ))}
    </ul>
  );
}
