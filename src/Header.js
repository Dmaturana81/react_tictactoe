import React from "react";
import "./index.css";

export default function Header () {
return (
  <div className="container mx-auto bg-lime-200 rounded-xl shadow border p-8 m-10">
  <p className="text-3xl text-gray-700 font-bold mb-5 text-center">
    Welcome!
  </p>
  <p className="text-gray-500 text-lg text-center">
    First Tic – Tac – Toe game!!
  </p>
</div>
    )
}