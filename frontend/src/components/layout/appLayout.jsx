import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import MobileNav from "./mobileNav";

export default function AppLayout() {
  return (
    <>
    <div
    style={{
      background:
        "linear-gradient(332deg, rgba(0, 139, 245, 1) 0%, rgba(12, 44, 70, 1) 50%, rgba(0, 0, 0, 1) 100%)",
    }} className="h-screen overflow-hidden py-8">
      <h1 className="text-5xl text-center font-bela text-white block sm:hidden mb-1 shadow-xl">Fluidify</h1>
      <div
        className="flex h-full"
      >
        <Header />
        <div className=" w-full overflow-y-auto ">
          <Outlet />
        </div>
        <Footer />
      </div>
      <MobileNav />
      </div>
    </>
  );
}
