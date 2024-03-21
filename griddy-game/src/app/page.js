'use client'

import { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import useSound from "use-sound";

export default function Home(){
  const [showWelcome, setShowWelcome] = useState(false);

  const [playBgm] = useSound(
		'audio/positivePuzzler.mp3',
		{ volume: 0.15 }
	);

  const [playSubmit] = useSound(
		'audio/click.mp3',
		{ volume: 0.25 }
	);
  
  useEffect(() => {
    setShowWelcome(true);
  });

  const startClicked = () => {
    playBgm();
    playSubmit();
    router.push("/game");
  };

  const router = useRouter();

  return (
      <div className="flex flex-col justify-center bg-gradient-to-b from-cyan-500 to-teal-200 ext-black items-center h-screen">
        <p className={`${showWelcome ? "opacity-100" : "opacity-0"} transition-opacity ease-in delay-100 duration-1000 md:p-0 text-9xl font-bold p-4 mb-4 mx-auto text-center justify-between`}>
              Welcome!
        </p>
        <button onClick={()=> startClicked()}>
          <p className="transition ease-in-out delay-10 bg-sky-500 hover:bg-orange-400 hover:-translate-y-1 hover:scale-110 duration-300 rounded-xl text-3xl text-white px-10 py-5 mt-10">
              Start Game!
          </p>
        </button>	
      </div>
  );  
}


