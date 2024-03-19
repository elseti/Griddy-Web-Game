'use client'

import { useEffect, useState } from "react";
import { createGridArray } from "@/utils/GameLogic";

export default function GriddyGame(props){
    const [gridArray, setGridArray] = useState(null);
    const [inputArray, setInputArray] = useState(null);
    const [isTimerDone, setTimerDone] = useState(false);
    const [timerValue, setTimerValue] = useState(10);

    const gridNo = props.gridNo;
    const greenSquareNo = props.greenSquareNo;

    useEffect(() => {
        createGrid(gridNo, greenSquareNo);
    }, []);

    // Timer countdown
    useEffect(() => {
        if(timerValue > 0){
            const interval = setInterval(() => {
                setTimerValue(prevTimerValue => prevTimerValue - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
        if(timerValue === 0){
            setTimerDone(true);
        }
    }, [timerValue]);

    const createGrid = async(e) => {
        let grid = createGridArray(gridNo, greenSquareNo);
        let divArray = [];
        for(let i = 0; i < grid.length; i++){
            if(grid[i] === 1){
                divArray.push(<div className="bg-green-500 p-10"/>);
            }
            else{
                divArray.push(<div className="bg-gray-500 p-10"/>);
            }
        }
        await setGridArray(divArray);
    };

    return (
        <>
            <div className="flex flex-col justify-center bg-teal-200 text-black items-center h-screen">
                <div className="text-3xl p-10">
                    <p>{timerValue}</p>
                </div>
                <div className="grid grid-cols-4 gap-4">
                {!isTimerDone ? (
                    gridArray !== null ? (
                        gridArray.map((box, index) => (
                            <div key={index}>
                                {box}
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col justify-center bg-teal-200 text-black items-center h-screen">
                            <p>Loading...</p>
                        </div>
                    )
                ) : (
                    gridArray !== null ? (
                        gridArray.map((box, index) => (
                            <div key={index}>
                                <div className="bg-gray-300 hover:bg-yellow-300 p-10"/>
                            </div>
                        ))
                    ) : (
                        <>
                        <div className="flex flex-col justify-center bg-teal-200 text-black items-center h-screen">
                            <p>Loading...</p>
                        </div>
                        </>
                    )
                )}
                
                </div>
            </div>
        </>
    );
}