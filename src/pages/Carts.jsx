import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export default function Carts() {
  const navigate = useNavigate();

  const { uid } = useUserContext();

  useEffect(() => {
    if (!uid) {
      navigate("/");
    }
  }, [uid, navigate]);

  return <div>여기는 계산페이지</div>;
}
