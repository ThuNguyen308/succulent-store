import React from "react";
import UserMenu from "./components/UserMenu";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function UserLayout() {
  return (
    <>
      <Header />
      <main
        className="container"
        style={{ marginTop: "40px", marginBottom: "40px" }}
      >
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
