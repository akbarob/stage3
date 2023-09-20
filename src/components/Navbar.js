import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { BsSearch } from "react-icons/bs";

export default function Navbar({ setSearch, user }) {
  const router = useRouter();
  return (
    <nav className=" flex flex-col justify-center items-center  w-full relative gap-10">
      <div className="flex  justify-between  w-full relative">
        <h1 className="text-left font-bold text-2xl md:text-4xl text-rose-700 capitalize">
          HNG Image Gallery
        </h1>
        <div className="flex lg:absolute top-2 right-5 items-center">
          {user ? (
            <button
              className="px-3 py-2 rounded-lg bg-rose-700 text-sm lg:text-base"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          ) : (
            <div className="flex gap-4 items-center justify-center">
              <button
                className="text-sm md:text-base px-3 py-2 rounded-lg bg-white text-rose-700"
                onClick={() => router.push("login")}
              >
                Login
              </button>
              <button
                className="text-sm md:text-base px-3 py-2 rounded-lg bg-rose-700"
                onClick={() => router.push("signup")}
              >
                Signup
              </button>
            </div>
          )}
        </div>
      </div>

      {user && (
        <h1 className="text-center px-3 text-base text-rose-700 shadow-sm">
          Welcome, {user?.email}
        </h1>
      )}

      <div className="w-full md:max-w-[500px] flex justify-center items-center gap-2 bg-white p-2 px-4 rounded-lg">
        <input
          placeholder="search by tag e.g food, nature, football, car"
          className="flex-1 outline-none rounded-lg bg-transparent text-rose-700 h-[46px]"
          type="search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <BsSearch color="black" size={25} className="cursor-pointer" />
      </div>
    </nav>
  );
}
