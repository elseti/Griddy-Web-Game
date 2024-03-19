'use client'

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import GriddyGame from "./GriddyGame";


export default function GriddyGameHome(props){
    const searchParams = useSearchParams();
    const level = searchParams.get("level");
    
    console.log(level);
    return(
        <GriddyGame gridNo={4} greenSquareNo={3}/>
    );
}