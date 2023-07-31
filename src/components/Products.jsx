import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function Products({ productRepository }) {
  const [products, setProducts] = useState();
  useEffect(() => {
    productRepository.findAll(setProducts);
  }, [productRepository]);
  return (
    <ul className="grid grid-cols-4 gap-3 gap-y-4 mt-4 pr-2 pl-3">
      {products &&
        Object.entries(products).map(([key, value]) => (
          <ProductCard key={key} product={value} id={key} />
        ))}
    </ul>
  );
}
