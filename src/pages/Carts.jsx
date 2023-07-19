import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export default function Carts() {
  const navigate = useNavigate();

  const { user } = useUserContext();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return <div>여기는 계산페이지</div>;
}
