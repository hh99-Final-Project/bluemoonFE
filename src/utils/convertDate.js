export const convertDate = (date) => {
    let YYMMDD = date.split("T")[0];
    let HHMM = date.split("T")[1].substring(0, 5);
    return YYMMDD + " " + HHMM;
};

// export const convertDateInChatList = (date) => {
//     let HH = date.split(":")[0];
// };


export const timeFormatter = (recordTime) => {
    //00:00 형식으로 변환, recordTime은 초로 표현한 총 시간
    let min = Math.floor(recordTime/60);
    let sec = recordTime % 60;
    if(min < 10) {
        min = "0" + min;
    }

    if(sec < 10) {
        sec = "0" + sec;
    }

    return { min: min, sec: sec };
};

export const timeFormatter2 = (time) => {
    //단순히 0만 붙히는 로직
    if(time < 10) {
        time = "0" + time;
    }
    return time;
};
