'use client'

import { useState } from "react";
import WelcomeText from "./WelcomeText";
import GriddyGame from "./GriddyGame";


export default function Home(){
  const [welcomeClicked, setWelcomeClicked] = useState(false);

  if(!welcomeClicked){
    return (
        <div className="flex flex-col justify-center bg-teal-200 text-black items-center h-screen">
          <p className="md:p-0 text-9xl font-bold p-4 mb-4 mx-auto text-center justify-between">
                  Welcome!
          </p>
          <button onClick={()=>setWelcomeClicked(true)}>
            <p className="bg-teal-600 hover:bg-teal-400 rounded-xl text-3xl text-white px-10 py-5 mt-10">
                Click to continue
            </p>
          </button>	
        </div>
    );  
  }
  else if(welcomeClicked){
    return(
      <GriddyGame gridNo={4} greenSquareNo={3}/>
    );
  }
}
