const getCookie = (name) => {
    let value = "; " + document.cookie;
    let parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }
};

const setCookie = (token, exp = 3) => {
    let date = new Date();
    date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * exp);
    document.cookie = `authorization=${token}; expires=${date}`;
};

const deleteCookie = (name) => {
    let date = new Date("2020-01-01").toUTCString();
    document.cookie = name + "=; expires=" + date;
};

export { getCookie, setCookie, deleteCookie };
