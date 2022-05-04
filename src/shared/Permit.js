// 이전에 썼던 permit 페이지 가지고 왔어요!
// 참고용입니다.

import React from "react";
import { useSelector } from "react-redux";

export const Permit = (props) => {
    const is_login = useSelector((state) => state.user.is_login);

    const token = localStorage.getItem("token") ? true : false;

    if (is_login && token) {
        return <React.Fragment>{props.children}</React.Fragment>;
    }

    return null;
};
