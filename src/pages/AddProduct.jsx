import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function AddProduct({ imageUploader }) {
  const [file, setFile] = useState();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [options, setOptions] = useState("");

  const { uid } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!uid) {
      navigate("/");
    }
  }, [uid, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    imageUploader.upload(e.target.files[0]).then(setFile);
  };

  return (
    <div className="w-11/12 mr-auto ml-auto">
      <h2 className="text-center pt-2 pb-3 font-bold text-lg">
        새로운 제품 등록
      </h2>
      {file && (
        <div className="w-full h-1/2 flex justify-center mb-3">
          <div className="w-64 h-96">
            <img
              className="w-full h-full object-cover"
              src={file}
              alt="등록할 제품"
            />
          </div>
        </div>
      )}
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          className="border pt-3 pb-3 pl-2 mb-2"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <input
          className="border pt-3 pb-3 pl-2 mb-2"
          type="text"
          placeholder="제품명"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border pt-3 pb-3 pl-2 mb-2"
          type="text"
          placeholder="가격"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          className="border pt-3 pb-3 pl-2 mb-2"
          type="text"
          placeholder="카테고리"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          className="border pt-3 pb-3 pl-2 mb-2"
          type="text"
          placeholder="제품 설명"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          className="border pt-3 pb-3 pl-2 mb-2"
          type="text"
          placeholder="옵션들(콤마(,)로 구분)"
          value={options}
          onChange={(e) => setOptions(e.target.value)}
        />
        <button
          className="bg-shoppypink text-white w-11/12 ml-auto mr-auto pt-2 pb-2 text-xl "
          type="submit"
        >
          제품 등록하기
        </button>
      </form>
    </div>
  );
}
