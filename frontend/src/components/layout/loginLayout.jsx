import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../globals/Logo";
export default function LoginLayout() {
  return (
    <>
      <section
        className="relative p-5"
        style={{
          background:
            "radial-gradient(circle,rgba(0, 139, 245, 1) 0%, rgba(12, 44, 70, 1) 50%, rgba(0, 0, 0, 1) 100%)",
        }}
      >
        <Link to="/">
          <Logo className="w-[120px] hidden md:block absolute rounded-full" />
        </Link>
        <Outlet />
      </section>
    </>
  );
}
