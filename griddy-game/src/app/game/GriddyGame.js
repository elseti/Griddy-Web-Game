'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { createGridArray, switchCurrentLevel } from "@/utils/GameLogic";

export default function GriddyGame(props){
    const timerDuration = 5;

    const [answerArray, setAnswerArray] = useState([]);
    const [inputArray, setInputArray] = useState([]);
    const [isTimerDone, setIsTimerDone] = useState(false);
    const [timerValue, setTimerValue] = useState(timerDuration);
    const [currentLevel, setCurrentLevel] = useState(1);
    const [divGridStyle, setDivGridStyle] = useState("grid grid-cols-3 gap-6");

    let gridNo = props.gridNo;
    let greenSquareNo = props.greenSquareNo;

    const router = useRouter();

    // create answer grid based on current level
    useEffect(() => {
        gridNo = switchCurrentLevel(currentLevel)[0];
        greenSquareNo = switchCurrentLevel(currentLevel)[1];
        setDivGridStyle(switchCurrentLevel(currentLevel)[2]);
        console.log(gridNo, greenSquareNo, divGridStyle);
        setIsTimerDone(false);
        setTimerValue(timerDuration);
        createGrid(gridNo, greenSquareNo);
    }, [currentLevel]);

    // timer countdown
    useEffect(() => {
        if(timerValue > 0){
            const interval = setInterval(() => {
                setTimerValue(prevTimerValue => prevTimerValue - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
        if(timerValue === 0){
            setIsTimerDone(true);
            setTimerValue("Press the submit button after clicking the correct boxes.");
        }
    }, [timerValue]);


    // creates answerArray
    const createGrid = async(gridNo, greenSquareNo) => {
        let answer = createGridArray(gridNo, greenSquareNo);
        let input = Array(answer.length).fill(0);
        setAnswerArray(answer);
        setInputArray(input);

        console.log(answer);
    };

    // adds to inputArray
    const addToInputArray = async(gridIndex) => {
        let newInputArray = [...inputArray];
        newInputArray[gridIndex] = 1;
        await setInputArray(newInputArray);
    };

    // delete in input array
    const deleteInInputArray = async(gridIndex) => {
        let newInputArray = [...inputArray];
        newInputArray[gridIndex] = 0;
        await setInputArray(newInputArray);
    }

    // check answer
    const checkAnswer = async() => {
        console.log("input: " + inputArray);
        console.log("answer: " + answerArray);

        for(let i = 0; i < inputArray.length; i++){
            if(inputArray[i] !== answerArray[i]){
                console.log("wrong");
                gameOver();
                return; // not needed?
            }
        }
        nextLevel();
    }

    // called when answer is right; progress to next level
    const nextLevel = async() => {
        setCurrentLevel(prevLevel => prevLevel + 1);
        console.log("Proceed to level " + currentLevel + typeof currentLevel);
    };

    // called when answer is wrong; game over
    const gameOver = async() => {
        console.log("Game over!");
        router.push("/");
    };

    return (
        <>
            <div className="flex flex-col justify-center bg-emerald-100 text-black items-center h-screen">
                <div className="text-3xl p-10">
                    <p>Level {currentLevel}</p>
                </div>
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

                {isTimerDone &&
                    <button onClick={() => checkAnswer()} className="bg-teal-400 hover:bg-teal-500 text-black py-5 px-20 mt-10 text-3xl rounded-xl">
                        Submit
                    </button>
                }

            </div>
        </>
    );
}