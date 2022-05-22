import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getCookie } from "../../utils/cookie";
import { send } from "../../static/images/resources";
import { useMediaQuery } from "react-responsive";

ChatInput.propTypes = {};

function ChatInput(props) {
    const { onSend, text, setText } = props;
    const ws = useRef();

    const token = getCookie("authorization");

    const isMobile = useMediaQuery({
        query: "(max-width: 420px)",
    });

    const onKeyPressHandler = (e) => {
        if (e.key === "Enter") {
            onSend();
        }
    };

    const onClick = (e) => {
        onSend();
    };

    return (
        <React.Fragment>
            <Input type="text" onChange={(e) => setText(e.target.value)} onKeyPress={onKeyPressHandler} value={text} />
            <SendButton onClick={onClick}>
                <img src={send}></img>
            </SendButton>
        </React.Fragment>
    );
}

export default React.memo(ChatInput);

const Input = styled.input`
    width: 858px;
    height: 29px;
    background: #ffffff;
    border-radius: 6px;

    @media only screen and (max-width: 420px) {
        width: 262px;
        height: 33px;
    }
`;

const SendButton = styled.div`
    width: 22.08px;
    height: 21.87px;
`;
