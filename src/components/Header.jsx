import React from "react";
import { Link } from "react-router-dom";
import { LuShoppingBag } from "react-icons/lu";
import CartsIcon from "./CartsIcon";
import { useAuthContext } from "../context/AuthContext";
import { useUserContext } from "../context/UserContext";
import { useUserRepositoryContext } from "../context/UserRepositoryContext";

export default function Header() {
  const { auth } = useAuthContext();
  const { uid, logUserIn } = useUserContext();
  const { userRepository } = useUserRepositoryContext();

  const handleLogin = () => {
    auth.login();
    auth.onStateChange((user) => {
      if (user) {
        logUserIn(user.uid);
        userRepository.insert(user);
      }
    });
  };

  const handleLogout = () => {
    auth.logout();
    auth.onStateChange((user) => {
      if (!user) {
        logUserIn(user);
      }
    });
  };

  return (
    <header className="w-full flex justify-between items-center pt-1 pr-8 pb-1 pl-2 border">
      <div>
        <Link to="/" className="flex items-center text-shoppypink text-xl">
          <LuShoppingBag className="mr-2" />
          <h1>Shoppy</h1>
        </Link>
      </div>
      <div className="flex items-center font-semibold">
        <Link to="/products" className="text-xs mr-3">
          Products
        </Link>
        <CartsIcon />
        {uid ? (
          <button
            onClick={handleLogout}
            type="button"
            className="bg-shoppypink text-white  pt-1 pr-3 pb-1 pl-3"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            type="button"
            className="bg-shoppypink text-white  pt-1 pr-3 pb-1 pl-3"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
