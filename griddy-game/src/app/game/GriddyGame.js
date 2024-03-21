'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { createGridArray, switchCurrentLevel } from "@/utils/GameLogic";
import useSound from "use-sound";

export default function GriddyGame(props){
    const timerDuration = 5;

    const [answerArray, setAnswerArray] = useState([]);
    const [inputArray, setInputArray] = useState([]);
    const [isTimerDone, setIsTimerDone] = useState(false);
    const [timerValue, setTimerValue] = useState(timerDuration);
    const [currentLevel, setCurrentLevel] = useState(7);
   

    let gridNo = props.gridNo;
    let greenSquareNo = props.greenSquareNo;

    const [divGridStyle, setDivGridStyle] = useState(null);
    // let divGridStyle = `grid grid-cols-${gridNo} gap-6`;

    const router = useRouter();

    const [playTick] = useSound(
		'audio/tick.mp3',
		{ volume: 0.15 }
	);

    const [playCorrectAudio] = useSound(
		'audio/correct.wav',
		{ volume: 0.25 }
	);

    const [playWrongAudio] = useSound(
		'audio/wrong.wav',
		{ volume: 0.25 }
	);

    const [playClickAudio] = useSound(
		'audio/plop1.mp3',
		{ volume: 0.25 }
	);

    const [playDeleteAudio] = useSound(
		'audio/plop2.mp3',
		{ volume: 0.25 }
	);

    // create answer grid based on current level
    useEffect(() => {
       
        gridNo = switchCurrentLevel(currentLevel)[0];
        greenSquareNo = switchCurrentLevel(currentLevel)[1];
        setDivGridStyle(switchCurrentLevel(currentLevel)[2]);
        console.log(gridNo, greenSquareNo, divGridStyle);
        setIsTimerDone(false);
        setTimerValue(timerDuration);
        createGrid(gridNo, greenSquareNo);
        
        console.log(gridNo, greenSquareNo, divGridStyle);
        
    }, [currentLevel]);

    // timer countdown
    useEffect(() => {
        if(timerValue > 0){
            const interval = setInterval(() => {
                playTick();
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
        // console.log(gridNo, greenSquareNo);
        let answer = createGridArray(gridNo, greenSquareNo);
        let input = Array(answer.length).fill(0);
        setAnswerArray(answer);
        setInputArray(input);

        console.log(answer);
    };

    // adds to inputArray
    const addToInputArray = async(gridIndex) => {
        playClickAudio();
        let newInputArray = [...inputArray];
        newInputArray[gridIndex] = 1;
        await setInputArray(newInputArray);
    };

    // delete in input array
    const deleteInInputArray = async(gridIndex) => {
        playDeleteAudio();
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
                playWrongAudio();
                console.log("wrong");
                gameOver();
                return;
            }
        }
        playCorrectAudio();
        nextLevel();
    }

    // called when answer is right; progress to next level
    const nextLevel = () => {
        setCurrentLevel(prevLevel => prevLevel + 1);
        console.log("Proceed to level " + currentLevel);
    };

    // called when answer is wrong; game over
    const gameOver = () => {
        console.log("Game over!");
        router.push("/");
    };



    return (
        <>
            <div className="flex flex-col bg-gradient-to-b from-sky-400 to-cyan-100 text-black items-center h-full p-32">
                {/* <div className="bg-gradient-to-b from-orange-100 to-orange-400 rounded-3xl px-14 py-7 text-5xl font-bold p-10"> */}
                <div className="bg-orange-200 rounded-3xl px-14 py-7 text-5xl font-bold p-10">
                    <p>Level {currentLevel}</p>
                </div>
                {/* <div className="bg-orange-200 text-3xl justify-center text-center px-10 py-5 rounded-full"> */}
                <div className="text-3xl justify-center text-center p-10"> 
                    <p>{timerValue}</p>
                </div>
                <div className="bg-gray-500 p-16 rounded-xl shadow-xl m-10">
                    <div className={divGridStyle}>
                        {/* <p>{divGridStyle}</p> */}
                        {!isTimerDone ? (
                            answerArray !== null ? (
                                answerArray.map((box, index) => (
                                    box === 1 ? (
                                        <div key={index}>
                                            <div className="bg-green-500 p-16 shadow-l"/>
                                        </div>
                                    ) : (
                                        <div key={index}>
                                            <div className="bg-gray-200 p-16 p-10"/>
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
                                        <button key={index} 
                                            onClick={() => deleteInInputArray(index)}
                                            className="bg-green-500 hover:bg-green-600 shadow-l p-16"
                                        />
                                    ) : (
                                        <button key={index} 
                                            onClick={() => addToInputArray(index)} 
                                            className="bg-gray-200 hover:bg-gray-300 shadow-l p-16"
                                        />
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
                    <button onClick={() => checkAnswer()} className="bg-orange-400 hover:bg-orange-500 font-bold text-black py-5 px-20 mt-10 text-3xl rounded-full">
                        Submit
                    </button>
                }

            </div>
        </>
    );
    
}