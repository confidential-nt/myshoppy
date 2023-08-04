import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useUserRepositoryContext } from "../context/UserRepositoryContext";
import CartsCard from "../components/CartsCard";
import TotalPrice from "../components/TotalPrice";

async function productsInCarts(uid, userRepository, productRepository) {
  const user = await userRepository.findById(uid);
  if (!user) return null;
  if (!user.carts) return null;

  const keys = Object.keys(user.carts);

  return productRepository.findAll().then((products) => {
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
    return Object.fromEntries(productInCarts);
  });
}

export default function Carts({ productRepository }) {
  const { uid } = useUserContext();
  const { userRepository } = useUserRepositoryContext();

  const {
    isLoading,
    error,
    data: carts,
  } = useQuery(
    ["carts", uid],
    () => productsInCarts(uid, userRepository, productRepository),
    {
      staleTime: 1000 * 60 * 1,
    }
  );

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onAddCount = useMutation(
    (productId) => userRepository.updateCount(uid, productId, 1),

    {
      onSuccess: () => queryClient.invalidateQueries(["carts", uid]),
    }
  );

  const onDeleteCount = useMutation(
    (productId) => userRepository.updateCount(uid, productId, -1),

    {
      onSuccess: () => queryClient.invalidateQueries(["carts", uid]),
    }
  );

  const onDeleteCarts = useMutation(
    (productId) => {
      userRepository.deleteCarts(uid, productId);
    },
    {
      onSuccess: () => queryClient.invalidateQueries(["carts", uid]),
    }
  );

  useEffect(() => {
    if (!uid) {
      navigate("/");
    }
  }, [uid, navigate]);

  return (
    <>
      <h1 className="pt-5 pb-3 font-bold text-center">내 장바구니</h1>
      <ul className="pt-4 pb-4 pl-6 pr-6 border-t border-b w-11/12 mr-auto ml-auto">
        {isLoading ? (
          <p>is loading...</p>
        ) : error ? (
          <p>Something is wrong</p>
        ) : !carts ? null : (
          Object.entries(carts).map(([k, v]) => (
            <CartsCard
              key={k}
              id={k}
              productInCarts={v}
              onAddCount={onAddCount}
              onDeleteCount={onDeleteCount}
              onDeleteCarts={onDeleteCarts}
            />
          ))
        )}
      </ul>
      {isLoading ? null : error ? null : !carts ? null : (
        <TotalPrice productInCarts={carts} />
      )}
    </>
  );
}
