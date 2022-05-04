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
