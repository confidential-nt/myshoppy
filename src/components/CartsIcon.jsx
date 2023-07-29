import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useUserContext } from "../context/UserContext";
import { useUserRepositoryContext } from "../context/UserRepositoryContext";

export default function CartsIcon() {
  const [number, setNumber] = useState(0);
  const { uid } = useUserContext();
  const { userRepository } = useUserRepositoryContext();

  useEffect(() => {
    userRepository.findById(uid, (user) => {
      if (user) {
        const number = user.carts ? Object.keys(user.carts).length : 0;
        setNumber(number);
      }
    });

    if (uid) {
      userRepository.onUpdateCarts((carts) => {
        if (carts) {
          setNumber(Object.keys(carts).length);
        }
      }, uid);
    }
  }, [uid, userRepository]);

  return (
    <Link to="/carts" className="mr-7 text-xl relative">
      {uid && (
        <div className="absolute -right-3 -top-2 text-xs text-white bg-red-500 rounded-full w-4 text-center">
          {number}
        </div>
      )}
      <AiOutlineShoppingCart />
    </Link>
  );
}
