"use client";
import React, { useState } from "react";
import Link from "next/link";
import { BiMenu, BiX } from "react-icons/bi";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Features", href: "/contact" },
  ];

  //
  // Breakpoint prefix	Minimum width	CSS
  // sm	640px	@media (min-width: 640px) { ... }
  // md	768px	@media (min-width: 768px) { ... }
  // lg	1024px	@media (min-width: 1024px) { ... }
  // xl	1280px	@media (min-width: 1280px) { ... }
  // 2xl	1536px	@media (min-width: 1536px) { ... }

  return (
    <>
      <nav className="lg:py-6 md:py-4 py-2  sticky top-0 w-full bg-gray-100 z-50 text-primary">
        <section className="h-full w-full  flex lg:px-10 md:px-8 px-4 items-center justify-between">
          <p>
            SS
          </p>
          <div className="hidden md:block">
            <ul className="md:flex  lg:gap-x-4 md:gap-x-2 hidden">
              {navigation.map((item) => {
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm tracking-wider hover:text-primary cursor-pointer duration-200 text-primary hover:bg-primary/10 p-2 rounded-md lg:px-3 md:px-2"
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="gap-2 hidden md:flex">
            <button className="bg-primary/10 hover:bg-primary/20 duration-200 text-primary font-semibold py-1 px-6 text-sm rounded-md uppercase tracking-wide">
              Inquire
            </button>
            <Link href={"/freight_audit"}>
              <button className="bg-primary hover:bg-secondary duration-200 text-white py-1 px-6 text-sm rounded-md tracking-wide font-semibold uppercase">
                Sign In
              </button>
            </Link>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {!isOpen ? (
                <BiMenu className="w-6 h-6" />
              ) : (
                <BiX className="w-6 h-6" />
              )}
            </button>
          </div>
          {/* Mobile Navigation */}
          <section
            className={`${
              isOpen
                ? "bg-white absolute top-[0rem] left-0 w-full h-[60vh] duration-300 translate-y-0 transition-all px-2 py-3 space-y-5"
                : "-translate-y-full duration-300 transition-all top-0 left-0 w-full absolute bg-white h-72"
            }`}
          >
            <div className="w-full flex justify-between items-center px-2">
              <p className="text-xl font-bold">SS</p>
              <button onClick={() => setIsOpen(!isOpen)}>
                <BiX className="w-6 h-6" />
              </button>
            </div>
            <div>
              <ul className="text-center space-y-3">
                {navigation.map((item) => {
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm tracking-wider hover:text-primary cursor-pointer duration-200 text-primary hover:bg-primary/10 p-2 rounded-md px-3"
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex flex-col gap-y-2 items-center justify-center">
              <Link href={"/contact"} className="w-[90%]">
                <button className="w-full bg-primary/10 hover:bg-primary/20 duration-200 text-primary font-semibold py-1 px-6 text-sm rounded-md uppercase tracking-wide">
                  Inquire
                </button>
              </Link>
              <Link href={"/freight_audit"} className="w-[90%]">
                <button className="w-full bg-primary hover:bg-secondary duration-200 text-white py-1 px-6 text-sm rounded-md tracking-wide font-semibold uppercase">
                  Sign In
                </button>
              </Link>
            </div>
          </section>
        </section>
      </nav>
    </>
  );
};

export default Navbar;
