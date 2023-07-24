import React, { useEffect, useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useUserRepositoryContext } from "../context/UserRepositoryContext";

export default function PencilIcon() {
  const { uid } = useUserContext();
  const { userRepository } = useUserRepositoryContext();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    userRepository.findById(uid, (user) => {
      if (user && user.isAdmin) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
  }, [uid, userRepository]);

  return (
    <>
      {isAdmin && (
        <Link to="/products/add" className="mr-7 text-xl">
          <BsPencilFill />
        </Link>
      )}
    </>
  );
}