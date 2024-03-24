'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { createGridArray, switchCurrentLevel, getLocalHighScore, setLocalHighScore } from "@/utils/GameLogic";
import useSound from "use-sound";
import GriddyGrid from "./GriddyGrid";

export default function GriddyGame(){
    const TIMER_DURATION = 5;

    const [answerArray, setAnswerArray] = useState([]);
    const [inputArray, setInputArray] = useState([]);
    const [isTimerDone, setIsTimerDone] = useState(false);
    const [timerValue, setTimerValue] = useState(TIMER_DURATION);
    const [currentLevel, setCurrentLevel] = useState(1);
    const [isGameOver, setIsGameOver] = useState(false);
    const [highScore, setHighScore] = useState("-");

    const [pageLoaded, setPageLoaded] = useState(false);

    const [endingTitle, setEndingTitle] = useState("");
    const [endingMessage, setEndingMessage] = useState("");

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
        setIsTimerDone(false);
        setTimerValue(TIMER_DURATION);
        let gridNo = switchCurrentLevel(currentLevel)[0];
        let greenSquareNo = switchCurrentLevel(currentLevel)[1];
        createGrid(gridNo, greenSquareNo);
        setPageLoaded(true);
    }, [currentLevel, pageLoaded]);
    
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
        let answer = createGridArray(gridNo, greenSquareNo);
        let input = Array(answer.length).fill(0);
        setAnswerArray(answer);
        setInputArray(input);
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
        for(let i = 0; i < inputArray.length; i++){
            if(inputArray[i] !== answerArray[i]){
                playWrongAudio();
                gameOver();
                return;
            }
        }
        playCorrectAudio();
        nextLevel();
    }

    // called when answer is right; progress to next level
    const nextLevel = () => {
        setLocalHighScore(currentLevel);
        setHighScore(currentLevel);
        if(currentLevel === 10){
            setEndingTitle("Congratulations!");
            setEndingMessage("You completed all 10 levels, what a superb memory you have!");
            setIsGameOver(true);
        }
        else{
            setCurrentLevel(prevLevel => prevLevel + 1);
        }
    };

    // called when answer is wrong; game over
    const gameOver = () => {
        if(currentLevel === 10){
            setLocalHighScore(10);
        }
        else{
            setLocalHighScore(currentLevel-1);
        }
        setHighScore(getLocalHighScore());
        setEndingTitle("Game Over!");
        setEndingMessage("Try Again?");
        setIsGameOver(true);
    };

    // called when retry button is clicked
    const retryButtonClicked = () => {
        setIsGameOver(false);
        setIsTimerDone(false);
        setPageLoaded(false);
        setCurrentLevel(1);
    }

    // called when home button is clicked
    const homeButtonClicked = () => {
        router.push("/");
    }


    return (
        <>
        {isGameOver ? (
            <div className="flex flex-col bg-gradient-to-b from-sky-400 to-cyan-100 text-slate-900 justify-center items-center text-center h-full p-32">
                <div className="rounded-3xl px-14 py-7 text-5xl lg:text-7xl font-bold p-10 mt-10">
                    {endingTitle}
                </div>
                <p className="lg:w-1/3 transition-opacity ease-in delay-100 duration-1000 text-xl p-3 text-center justify-between rounded-2xl">
                    Your current level: {currentLevel === 10 ? (<b>10</b>) : (<b>{currentLevel - 1}</b>)}
                </p>
                <p className="lgw-1/3 transition-opacity ease-in delay-100 duration-1000 text-xl p-3 text-center justify-between rounded-2xl">
                    Your highest level: <b>{highScore}</b>
                </p>
                <p className="transition ease-in-out delay-10 rounded-xl text-3xl px-10 py-5 mt-10">
                    {endingMessage}
                </p>
                <div className="flex md:flex-row md:gap-20 flex-col gap-3 items-center p-10">
                    <button onClick={()=> retryButtonClicked()}>
                        <p className="transition ease-in-out delay-10 bg-orange-400 w-52 shadow-xl hover:bg-orange-500 hover:scale-110 duration-300 rounded-xl text-2xl py-4 mt-10">
                            Play Again
                        </p>
                    </button>	
                    <button onClick={()=> homeButtonClicked()}>
                        <p className="transition ease-in-out delay-10 bg-orange-400 w-52 shadow-xl hover:bg-orange-500 hover:scale-110 duration-300 rounded-xl text-2xl py-4 mt-10">
                            Home
                        </p>
                    </button>	
                </div>
            </div>

        ) : (
            
            <div className={`${pageLoaded ? "opacity-100" : "opacity-0"} transition-opacity ease-in delay-100 duration-1000 text-slate-900 flex flex-col bg-gradient-to-b from-sky-500 to-teal-200 text-black items-center h-screen lg:h-full p-16`}>
                <div className="bg-cyan-200 rounded-xl px-14 text-3xl font-bold p-4 shadow-xl">
                    <p>Level {currentLevel}</p>
                </div>
                <div className="text-2xl font-bold justify-center text-center mt-10 mb-3"> 
                    <p>{timerValue}</p>
                </div>

                {/* Display grid based on current level */}
                { (currentLevel === 1 || currentLevel === 2) &&
                    <div className="bg-slate-500 lg:p-16 p-6 rounded-xl shadow-xl mt-5 mb-10">
                        <div className="grid grid-cols-3 gap-6">
                            <GriddyGrid currentLevel={currentLevel} timerDuration={TIMER_DURATION} inputArray={inputArray} answerArray={answerArray} addToInputArray={addToInputArray} deleteInInputArray={deleteInInputArray}/>
                        </div>
                    </div>
                }
                { (currentLevel === 3 || currentLevel === 4 || currentLevel === 5) &&
                    <div className="bg-slate-500 lg:p-16 p-6 rounded-xl shadow-xl mt-5 mb-10">
                        <div className="grid grid-cols-4 gap-6">
                            <GriddyGrid currentLevel={currentLevel} timerDuration={TIMER_DURATION} inputArray={inputArray} answerArray={answerArray} addToInputArray={addToInputArray} deleteInInputArray={deleteInInputArray}/>
                        </div>
                    </div>
                }
                { (currentLevel === 6 || currentLevel === 7 || currentLevel === 8) &&
                    <div className="bg-slate-500 lg:p-16 p-6 rounded-xl shadow-xl mt-5 mb-10">
                        <div className="grid grid-cols-5 gap-6">
                            <GriddyGrid currentLevel={currentLevel} timerDuration={TIMER_DURATION} inputArray={inputArray} answerArray={answerArray} addToInputArray={addToInputArray} deleteInInputArray={deleteInInputArray}/>
                        </div>
                    </div>
                }
                { (currentLevel === 9) &&
                    <div className="bg-slate-500 lg:p-16 p-6 rounded-xl shadow-xl mt-5 mb-10">
                        <div className="grid grid-cols-6 gap-6">
                            <GriddyGrid currentLevel={currentLevel} timerDuration={TIMER_DURATION} inputArray={inputArray} answerArray={answerArray} addToInputArray={addToInputArray} deleteInInputArray={deleteInInputArray}/>
                        </div>
                    </div>
                }
                { (currentLevel === 10) &&
                    <div className="bg-slate-500 lg:p-16 p-6 rounded-xl shadow-xl mt-5 mb-10">
                        <div className="grid grid-cols-7 gap-4">
                            <GriddyGrid currentLevel={currentLevel} timerDuration={TIMER_DURATION} inputArray={inputArray} answerArray={answerArray} addToInputArray={addToInputArray} deleteInInputArray={deleteInInputArray}/>
                        </div>
                    </div>
                }

                {isTimerDone ? (
                    <button onClick={() => checkAnswer()} className="transition ease-in-out delay-10 bg-orange-400 w-52 shadow-xl hover:bg-orange-500 hover:scale-110 duration-300 rounded-xl text-2xl text-black py-4 mt-2 mb-30">
                        Submit
                    </button>
                ) : (
                    <div className="p-10"/>
                )}
                
            </div>
        )}
            
        </>
    );
    
}