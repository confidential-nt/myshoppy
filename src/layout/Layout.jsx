import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function Layout() {
  return (
    <div className="px-10 lg:px-28">
      <Header />
      <main className="pb-12">
        <Outlet />
      </main>
    </div>
  );
}
