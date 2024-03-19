'use client'

import { useEffect, useState } from "react";
import { createGridArray } from "@/utils/GameLogic";

export default function GriddyGame(props){
    const [gridArray, setGridArray] = useState(null);
    const gridNo = props.gridNo;
    const greenSquareNo = props.greenSquareNo;

    useEffect(() => {
        createGrid(gridNo, greenSquareNo);
    }, []);

    const createGrid = async(e) => {
        let grid = createGridArray(gridNo, greenSquareNo);
        let divArray = [];
        for(let i = 0; i < grid.length; i++){
            if(grid[i] === 1){
                divArray.push(<div className="bg-green-500 p-10"/>);
            }
            else{
                divArray.push(<div className="bg-red-500 p-10"/>);
            }
        }
        await setGridArray(divArray);
    };

    return (
        <>
            <div className="flex flex-col justify-center bg-teal-200 text-black items-center h-screen">
                <div className="grid grid-cols-4 gap-4">
                {gridArray !== null ? (
                    gridArray.map((box, index) => (
                        <div key={index}>
                            {box}
                        </div>
                    ))
                ) : (
                    <></>
                )}
                    
                    
                </div>
            </div>
        </>
    );
}