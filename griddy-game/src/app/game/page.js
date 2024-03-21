'use client'

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import GriddyGame from "./GriddyGame";


export default function GriddyGameHome(props){
    return(
        <GriddyGame gridNo={3} greenSquareNo={3}/>
    );
}