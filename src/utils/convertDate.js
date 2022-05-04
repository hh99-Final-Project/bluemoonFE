export const convertDate = (date) => {
    let YYMMDD = date.split("T")[0];
    let HHMM = date.split("T")[1].substring(0,5);
    return YYMMDD + " " + HHMM;
}