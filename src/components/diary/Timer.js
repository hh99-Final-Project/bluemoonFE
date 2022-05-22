import React from "react";
import { useTimer } from "react-timer-hook";

export const MyTimer = (expiryTimestamp) => {
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart
    } = useTimer({
        expiryTimestamp,
        onExpire: () => console.warn("onExpire called"),
        autoStart: false
    });

    return {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart
    };
};
