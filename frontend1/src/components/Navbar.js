import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-sky-600">
          🏥 ArogyaAI
        </Link>
        <div className="flex space-x-6 text-lg font-medium">
          <Link
            to="/"
            className={`hover:text-sky-500 transition-all ${
              location.pathname === "/" ? "text-sky-600" : "text-gray-700"
            }`}
          >
            Home
          </Link>
          <Link
            to="/predict"
            className={`hover:text-sky-500 transition-all ${
              location.pathname === "/predict" ? "text-sky-600" : "text-gray-700"
            }`}
          >
            Predict
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
