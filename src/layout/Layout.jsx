import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function Layout() {
  return (
    <div className="pr-36 pl-36">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
