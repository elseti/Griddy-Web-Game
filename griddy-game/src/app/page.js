'use client'

import { useReducer, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home(){

  const router = useRouter();

  return (
      <div className="flex flex-col justify-center bg-teal-200 text-black items-center h-screen">
        <p className="md:p-0 text-9xl font-bold p-4 mb-4 mx-auto text-center justify-between">
                Welcome!
        </p>
        <button onClick={()=> router.push(`/game?level=1`)}>
          <p className="bg-teal-600 hover:bg-teal-400 rounded-xl text-3xl text-white px-10 py-5 mt-10">
              Click to continue
          </p>
        </button>	
      </div>
  );  
}


