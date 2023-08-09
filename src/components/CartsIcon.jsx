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
    if (uid) {
      userRepository.findById(uid).then((user) => {
        if (user) {
          const number = user.carts ? Object.keys(user.carts).length : 0;
          setNumber(number);
        }
      });
    }

    if (uid) {
      userRepository.onUpdateCarts((carts) => {
        setNumber(carts ? Object.keys(carts).length : 0);
      }, uid);
    }
  }, [uid, userRepository]);

  return (
    <Link to="/carts" className="mr-3 lg:mr-7 text-sm lg:text-xl relative">
      {uid && (
        <div className="absolute -right-3 -top-2 text-xs text-white bg-red-500 rounded-full w-4 text-center">
          {number}
        </div>
      )}
      <AiOutlineShoppingCart />
    </Link>
  );
}
