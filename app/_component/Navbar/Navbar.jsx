"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "./../../context/CartContext";

export default function Navbar() {
  const { numberOfCartItem } = useContext(CartContext);
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log(session, status);

  // function handleSignOut() {
  //   localStorage.removeItem("loggedInUser");
  //   signOut({ callbackUrl: "/login" });
  // }
  async function handleSignOut() {
  await signOut({ redirect: false }); // يمنع الريدايركت التلقائي
  localStorage.removeItem("loggedInUser");
  window.location.href = "/login"; // تحويل يدوي
}
  return (
    <>
      <nav className=" bg-cyan-950 py-2 fixed top-0 left-0 w-full z-50">
        <div className="flex justify-between w-full items-center flex-col lg:flex-row container lg:w-[80%] mx-auto text-white">
          <div className="left">
            <ul className="flex gap-8 items-center">
              <li>
                <Link href={"/"}>
                  <Image
                    src="/images/logo1.png"
                    alt="E-Shop logo"
                    width={80}
                    height={80}
                  />
                </Link>
              </li>
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/products"}>Products</Link>
              </li>
              {session && (
                <li>
                  <Link className=" relative" href={"/cart"}>
                    Cart{" "}
                    {numberOfCartItem > 0 && (
                      <span className=" absolute top-[-13px] right-[-13px] bg-cyan-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-1">
                        {numberOfCartItem}
                      </span>
                    )}
                  </Link>
                </li>
              )}
              {/* <li>
              <Link href={"/categories"}>Categories</Link>
            </li> */}
              <li>
                <Link href={"/brands"}>Brands</Link>
              </li>
            </ul>
          </div>
          <div className="right hidden md:flex">
            <ul className="flex gap-8 items-center">
              <li>
                <Link
                  href="https://www.facebook.com/MedoTechGroup"
                  target="_blank"
                >
                  <i className="fab fa-facebook-f"></i>
                </Link>
              </li>
              <li>
                <i className="fab fa-twitter"></i>
              </li>
              <li>
                <Link
                  href="https://www.instagram.com/medo.tech2022/"
                  target="_blank"
                >
                  <i className="fab fa-instagram"></i>
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.tiktok.com/@medotech2022"
                  target="_blank"
                >
                  <i className="fab fa-tiktok"></i>
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.youtube.com/@medotech2022"
                  target="_blank"
                >
                  <i className="fab fa-youtube"></i>
                </Link>
              </li>
              {!session ? (
                <>
                  <li>
                    <Link href={"/register"}>Register</Link>
                  </li>
                  <li>
                    <Link href={"/login"}>Login</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <span onClick={handleSignOut} className="cursor-pointer">
                      Sign Out
                    </span>
                  </li>
                  {session && (
                    <li className="text-sm rounded-3xl bg-cyan-700 p-2">
                      {" "}
                      {session?.user?.name}
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white text-2xl"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden bg-cyan-950 w-full">
            <ul className="flex flex-col gap-4 p-4 text-white">
              <li>
                <Link href={"/"} onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link href={"/products"} onClick={() => setIsMenuOpen(false)}>
                  Products
                </Link>
              </li>
              {session && (
                <li>
                  <Link href={"/cart"} onClick={() => setIsMenuOpen(false)}>
                    Cart{" "}
                    {numberOfCartItem > 0 && (
                      <span className="bg-cyan-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-1 inline-block">
                        {numberOfCartItem}
                      </span>
                    )}
                  </Link>
                </li>
              )}
              <li>
                <Link href={"/brands"} onClick={() => setIsMenuOpen(false)}>
                  Brands
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.facebook.com/MedoTechGroup"
                  target="_blank"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="fab fa-facebook-f"></i> Facebook
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.instagram.com/medo.tech2022/"
                  target="_blank"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="fab fa-instagram"></i> Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.tiktok.com/@medotech2022"
                  target="_blank"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="fab fa-tiktok"></i> TikTok
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.youtube.com/@medotech2022"
                  target="_blank"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="fab fa-youtube"></i> YouTube
                </Link>
              </li>
              {!session ? (
                <>
                  <li>
                    <Link
                      href={"/register"}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link href={"/login"} onClick={() => setIsMenuOpen(false)}>
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <span
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="cursor-pointer"
                    >
                      Sign Out
                    </span>
                  </li>
                  {session && <li>{session?.user?.name}</li>}
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
