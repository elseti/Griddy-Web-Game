'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { createGridArray, switchCurrentLevel } from "@/utils/GameLogic";
import useSound from "use-sound";

export default function GriddyGrid(props){

    const [isTimerDone, setIsTimerDone] = useState(false);

    const TIMER_DURATION = props.timerDuration;

    const [timerValue, setTimerValue] = useState(TIMER_DURATION);

    const answerArray = props.answerArray;

    const inputArray = props.inputArray;

    const addParentInputArray = (index) => {
        props.addToInputArray(index);
    }

    const deleteParentInputArray = (index) => {
        props.deleteInInputArray(index);
    }
    
    // reset timer when answer array changes
    useEffect(() => {
        setTimerValue(TIMER_DURATION);
        setIsTimerDone(false);
    }, [answerArray]);

    // timer countdown
    useEffect(() => {
        if(timerValue > 0){
            const interval = setInterval(() => {
                console.log("timer is "  + timerValue);
                setTimerValue(prevTimerValue => prevTimerValue - 1);
                
            }, 1000);
            return () => clearInterval(interval);
        }
        if(timerValue === 0){
            console.log('timer is 0');
            setIsTimerDone(true);
        }
    }, [timerValue]);


    return (
        <>
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
                                onClick={() => deleteParentInputArray(index)}
                                className="bg-green-500 hover:bg-green-600 shadow-l p-16"
                            />
                        ) : (
                            <button key={index} 
                                onClick={() => addParentInputArray(index)} 
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
        </>
    );
    
}