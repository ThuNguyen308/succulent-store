import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <main className="container main-container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
