const getCookie = (name) => {
    let value = "; " + document.cookie;
    let parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }
};

const setAccessCookie = (token, exp = 3) => {
    let date = new Date();
    date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * exp);
    document.cookie = `accessToken=${token}; expires=${date}`;
};

const setRefreshCookie = (token, exp = 7) => {
    let date = new Date();
    date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * exp);
    document.cookie = `refreshToken=${token}; expires=${date}`;
};

const introCookie = (bool , exp = 7) => {
    let date = new Date();
    date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * exp);
    document.cookie = `isSeenIntro=${bool}; expires=${date}`;
};

const deleteCookie = (name) => {
    let date = new Date("2020-01-01").toUTCString();
    document.cookie = name + "=; expires=" + date;
};

export { getCookie, setAccessCookie, setRefreshCookie, deleteCookie, introCookie };
