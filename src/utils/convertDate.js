export const convertDate = (date) => {
    let YYMMDD = date.split("T")[0];
    let HHMM = date.split("T")[1].substring(0, 5);
    return YYMMDD + " " + HHMM;
};

// export const convertDateInChatList = (date) => {
//     let HH = date.split(":")[0];
// };
