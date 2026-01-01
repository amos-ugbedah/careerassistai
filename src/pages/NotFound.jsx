import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Page Not Found</p>
      <Link
        to="/"
        className="px-6 py-3 bg-black text-[#c7ae6a] rounded font-semibold hover:bg-gray-900 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
