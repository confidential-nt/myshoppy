import React from "react";
import ProductsComp from "../components/Products";

export default function Products({ productRepository }) {
  return (
    <div>
      <ProductsComp productRepository={productRepository} />
    </div>
  );
}
