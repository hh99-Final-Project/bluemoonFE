import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getCookie } from "../../utils/cookie";
import send from "../../static/images/chat/send.svg";

ChatInput.propTypes = {};

function ChatInput(props) {
    const { onSend, text, setText } = props;
    const ws = useRef();

    const token = getCookie("authorization");

    const onKeyPressHandler = (e) => {
        if (e.key === "Enter") {
            onSend();
        }
    };

    return (
        <React.Fragment>
            <Input type="text" onChange={(e) => setText(e.target.value)} onKeyPress={onKeyPressHandler} value={text} />
            {/* <SendButton onClick={onSend}>
                <img src={send}></img>
            </SendButton> */}
        </React.Fragment>
    );
}

export default React.memo(ChatInput);

const Input = styled.input`
    // position: absolute;
    width: 856px;
    height: 43px;
    background: #ffffff;
`;

const SendButton = styled.div`
    // position: absolute;
    width: 24px;
    height: 24px;
    // right: 35px;
    // bottom: 35px;
`;
