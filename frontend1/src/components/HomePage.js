import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-100 flex flex-col items-center justify-center px-6 py-16">
      <h1 className="text-4xl font-extrabold text-sky-700 mb-10 animate-fade-in">
        👩‍⚕️ Choose Your Doctor
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-5xl">
        <div
          onClick={() => navigate("/predict")}
          className="bg-white hover:bg-sky-50 shadow-lg rounded-2xl p-10 text-center text-xl font-semibold text-sky-800 cursor-pointer transform hover:scale-105 transition-all duration-300 animate-fade-in-up"
        >
          🧠 MBBS General Physician
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-10 text-center text-xl font-semibold text-red-700 opacity-70 cursor-not-allowed animate-fade-in-up">
          ❤️ Heart Specialist
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-10 text-center text-xl font-semibold text-purple-700 opacity-70 cursor-not-allowed animate-fade-in-up">
          🧬 Cancer Oncologist
        </div>
      </div>
    </div>
  );
}

export default HomePage;
