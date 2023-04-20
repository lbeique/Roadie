// i need a next.js with tailwind header that has a home, login/signout and profile link

import { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "../auth/AuthContext"

const Navigation = () => {
  const { user, signOut } = useContext(AuthContext)
  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();
    await signOut();
    router.push("/auth/login");
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-gray-200">
      <div className="flex items-center">
        <Link className="px-4 py-2 text-sm font-medium text-white rounded-md hover:text-gray-500" href="/">
          Home
        </Link>
        {user ? (
          <>
            <Link className="px-4 py-2 text-sm font-medium text-white rounded-md hover:text-gray-500" href="/profile">
              Profile
            </Link>
            <button
              className="px-4 py-2 text-sm font-medium text-white rounded-md hover:text-gray-500"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link className="px-4 py-2 text-sm font-medium text-white rounded-md hover:text-gray-500"href="/auth/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navigation;