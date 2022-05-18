import React, {useState} from "react";

export const UseTimer = () => {

    const [currentMin, setCurrentMin] = useState(0);
    const [currentSec, setCurrentSec] = useState(0);

    let time = 0;
    let cron;

    const start = () => {
        updateTimer();
        cron = setInterval(updateTimer, 1000);
    };

    const updateTimer = () => {
        const checkMin = Math.floor(time / 60);
        const minutes = checkMin % 60;
        const seconds = time % 60;
        setCurrentMin(minutes);
        setCurrentSec(seconds);
        time++;
    };

    return {
        start,
        currentMin,
        currentSec
    };

};