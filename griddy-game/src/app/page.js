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
      <div className="flex flex-col justify-center items-center p-20 bg-gradient-to-b from-cyan-500 to-teal-200 text-black items-center h-full">
        <p className={`${showWelcome ? "opacity-100" : "opacity-0"} transition-opacity ease-in delay-100 duration-1000 md:p-0 text-7xl font-bold p-4 mb-4 mx-auto text-center justify-between`}>
              Welcome to Griddy Game!
        </p>
        <div className={`${showWelcome ? "opacity-60" : "opacity-0"} transition-opacity ease-in delay-500 duration-1000 flex flex-col justify-center bg-blue-100 p-10 rounded-xl m-10`}>
          <p className="md:p-0 text-4xl font-bold p-10 mb-7 mx-auto text-center justify-between">
                How to Play
          </p>
          {/* <p className={`${showWelcome ? "opacity-100" : "opacity-0"} transition-opacity ease-in delay-200 duration-1000 md:p-0 text-xl font-bold p-4 mb-4 mx-auto text-center justify-between`}> */}
          <div className="p-5">
            <p className={`md:p-0 text-2xl font-bold p-4 mb-4 mx-auto text-center justify-between`}>
              1. Memorize Green Squares
            </p>
            <p className={`md:p-0 text-xl p-4 mb-4 mx-auto text-center justify-between`}>
              Memorize the locations of the green squares before the timer runs out!
            </p>
          </div>

          <div className="p-5">
            <p className={`md:p-0 text-2xl font-bold p-4 mb-4 mx-auto text-center justify-between`}>
              2. Replicate the grid
            </p>
            <p className={`md:p-0 text-xl p-4 mb-4 mx-auto text-center justify-between`}>
              After the timer finishes counting down, press the tiles to match them with the previous pattern!
            </p>
          </div>

          <div className="p-5">
            <p className={`md:p-0 text-2xl font-bold p-4 mb-4 mx-auto text-center justify-between`}>
              3. Press Submit
            </p>
            <p className={`md:p-0 text-xl p-4 mb-4 mx-auto text-center justify-between`}>
              If you press the correct buttons, you proceed to the next level. If you press the wrong button, it's game over.
            </p>
          </div>

          <div className="p-5">
            <p className={`md:p-0 text-2xl font-bold p-4 mb-4 mx-auto text-center justify-between`}>
              4. 10 levels to go!
            </p>
            <p className={`md:p-0 text-xl p-4 mb-4 mx-auto text-center justify-between`}>
              There are a total of 10 levels to complete. Good luck! 
            </p>
          </div>
          
        </div>
        
        <div className={`${showWelcome ? "opacity-100" : "opacity-0"} text-center justify-between transition-opacity ease-in delay-700 duration-1000`}>
          <p className="md:p-0 text-xl p-3 mx-auto text-teal-900">
            Warm up... and click this button once you are ready!
          </p>
          <button onClick={()=> startClicked()}>
            <p className="animate-bounce transition ease-in-out delay-10 bg-orange-400 hover:bg-orange-500 hover:-translate-y-1 hover:scale-110 duration-300 rounded-xl text-3xl text-white px-10 py-5 mt-10">
                Start Game!
            </p>
          </button>	
        </div>
        
      </div>
  );  
}


