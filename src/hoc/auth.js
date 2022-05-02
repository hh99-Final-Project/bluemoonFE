import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCookie } from "../utils/cookie";

const auth = (Component) => () => {
    const dispatch = useDispatch();
    const cookie = getCookie("authorization");

    if (cookie) {
        // SetAuthToken(getCookie("user_login"));
        // 리덕스 toolkit isLogin true
        // userApi 받아오는 API 호출
    }

    return <Component />;
};

export default auth;