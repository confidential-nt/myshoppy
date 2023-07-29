import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useUserRepositoryContext } from "../context/UserRepositoryContext";
import CartsCard from "../components/CartsCard";

export default function Carts({ productRepository }) {
  // eslint-disable-next-line
  const [carts, setCarts] = useState({});

  const navigate = useNavigate();

  const { uid } = useUserContext();
  const { userRepository } = useUserRepositoryContext();

  useEffect(() => {
    if (!uid) {
      navigate("/");
    }
    userRepository.findById(uid, (user) => {
      if (user && user.carts) {
        const keys = Object.keys(user.carts);
        productRepository.findAll((products) => {
          const productList = Object.entries(products);
          const productInCarts = productList
            .filter(([k, v]) => keys.includes(k))
            .map(([k, v]) => [
              k,
              {
                ...v,
                option: user.carts[k].option,
                count: user.carts[k].count,
              },
            ]);
          setCarts(Object.fromEntries(productInCarts));
        });
      }
    });
  }, [uid, navigate, userRepository, productRepository]);

  return (
    <>
      <h1 className="pt-5 pb-3 font-bold text-center">내 장바구니</h1>
      <ul className="pt-4 pb-4 pl-6 pr-6 border-t border-b w-11/12 mr-auto ml-auto">
        {!Object.keys(carts).length
          ? "loading..."
          : Object.entries(carts).map(([k, v]) => (
              <CartsCard key={k} id={k} productInCarts={v} />
            ))}
      </ul>
    </>
  );
}
