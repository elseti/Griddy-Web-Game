'use client'

import { useReducer, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home(){

  const router = useRouter();

  return (
      <div className="flex flex-col justify-center bg-gradient-to-b from-cyan-500 to-teal-200 ext-black items-center h-screen">
        <p className="md:p-0 text-9xl font-bold p-4 mb-4 mx-auto text-center justify-between">
                Welcome!
        </p>
        <button onClick={()=> router.push("/game")}>
          <p className="bg-teal-600 hover:bg-orange-400 rounded-xl text-3xl text-white px-10 py-5 mt-10">
              Start Game!
          </p>
        </button>	
      </div>
  );  
}


