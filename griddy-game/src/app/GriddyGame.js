'use client'

import { useEffect, useState } from "react";
import { createGridArray } from "@/utils/GameLogic";

export default function GriddyGame(props){
    const [answerArray, setAnswerArray] = useState([]);
    const [inputArray, setInputArray] = useState([]);
    const [isTimerDone, setTimerDone] = useState(false);
    const [timerValue, setTimerValue] = useState(5);

    const gridNo = props.gridNo;
    const greenSquareNo = props.greenSquareNo;
    const divGridStyle = `grid grid-cols-${gridNo} gap-6`

    // create answer grid
    useEffect(() => {
        createGrid(gridNo, greenSquareNo);
    }, []);

    // timer countdown
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


    // creates answerArray
    const createGrid = async() => {
        let answer = createGridArray(gridNo, greenSquareNo);
        let input = Array(answer.length).fill(0);
        await setAnswerArray(answer);
        await setInputArray(input);
    };

    // adds to inputArray
    const addToInputArray = async(gridIndex) => {
        let newInputArray = [...inputArray];
        newInputArray[gridIndex] = 1;
        await setInputArray(newInputArray);
        console.log(inputArray)
    };

    // delete in input array
    const deleteInInputArray = async(gridIndex) => {
        let newInputArray = [...inputArray];
        newInputArray[gridIndex] = 0;
        await setInputArray(newInputArray);
        console.log(inputArray)
    }

    // check answer
    const checkAnswer = async() => {
        console.log("input: " + inputArray);
        console.log("answer: " + answerArray);

        for(let i = 0; i < inputArray.length; i++){
            if(inputArray[i] !== answerArray[i]){
                console.log("wrong");
                return false
            }
        }
        console.log("right");
        return true;
    }


    return (
        <>
            <div className="flex flex-col justify-center bg-teal-200 text-black items-center h-screen">
                <div className="text-3xl p-10">
                    <p>{timerValue}</p>
                </div>
                <div className="bg-slate-500 p-10 rounded-xl">
                    <div className={divGridStyle}>
                        {!isTimerDone ? (
                            answerArray !== null ? (
                                answerArray.map((box, index) => (
                                    box === 1 ? (
                                        <div key={index}>
                                            <div className="bg-green-500 p-10"/>
                                        </div>
                                    ) : (
                                        <div key={index}>
                                            <div className="bg-gray-200 p-10"/>
                                        </div>
                                    )
                                ))
                            ) : (
                                <div className="flex flex-col justify-center bg-teal-200 text-black items-center h-screen">
                                    <p>Loading...</p>
                                </div>
                            )
                        ) : (
                            inputArray !== null ? (
                                inputArray.map((box, index) => (
                                    box === 1 ? (
                                        <button key={index} onClick={() => deleteInInputArray(index)} className="bg-green-500 hover:bg-green-600 p-10"/>
                                    ) : (
                                        <button key={index} onClick={() => addToInputArray(index)} className="bg-gray-200 hover:bg-gray-300 p-10"/>
                                    )
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
                
                <button onClick={() => checkAnswer()} className="bg-teal-400 hover:bg-teal-500 text-black py-5 px-20 mt-10 text-3xl rounded-xl">
                    Submit
                </button>
            </div>
        </>
    );
}