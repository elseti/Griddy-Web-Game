'use client'

import { useEffect, useState } from "react";

export default function GriddyGrid(props){

    const [isTimerDone, setIsTimerDone] = useState(false);

    const TIMER_DURATION = props.timerDuration;

    const [timerValue, setTimerValue] = useState(TIMER_DURATION);

    const answerArray = props.answerArray;

    const inputArray = props.inputArray;

    const currentLevel = props.currentLevel;

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
        console.log(currentLevel);
    }, [answerArray]);

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
        }
    }, [timerValue]);


    return (
        <>
            {!isTimerDone ? (
                answerArray !== null ? (
                    answerArray.map((box, index) => (
                        box === 1 ? (
                            <div key={index}>
                                <div className={`${currentLevel!==10 && currentLevel!==9 && "lg:p-12"} ${currentLevel===10 && "p-7"} ${currentLevel===9 && "p-9"} bg-green-500 border-slate-600 border-2 shadow-l p-5`}/>
                            </div>
                        ) : (
                            <div key={index}>
                                <div className={`${currentLevel!==10 && currentLevel!==9 && "lg:p-12"} ${currentLevel===10 && "p-7"} ${currentLevel===9 && "p-9"} bg-slate-200 border-slate-600 border-2 shadow-l p-5`}/>
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
                                className={`${currentLevel!==10 && currentLevel!==9 && "lg:p-12"} ${currentLevel===10 && "p-7"} ${currentLevel===9 && "p-9"} bg-green-500 hover:bg-green-600 border-slate-600 border-2 shadow-l p-5`}
                            />
                        ) : (
                            <button key={index} 
                                onClick={() => addParentInputArray(index)} 
                                className={`${currentLevel!==10 && currentLevel!==9 && "lg:p-12"} ${currentLevel===10 && "p-7"} ${currentLevel===9 && "p-9"} bg-gray-200 hover:bg-gray-300 border-slate-600 border-2 shadow-l p-5`}
                            />
                        )
                    ))
                ) : (
                    <div className="flex flex-col justify-center bg-teal-200 text-black items-center h-screen">
                        <p>Loading...</p>
                    </div>
                )
            )}
        </>
    );
    
}