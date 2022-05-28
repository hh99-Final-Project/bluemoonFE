import React, { useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { send } from "../../static/images/resources";

ChatInput.propTypes = {};

function ChatInput(props) {
    const { onSend, text, setText } = props;
    const ws = useRef();

    const onKeyPressHandler = (e) => {
        if (e.key === "Enter") {
            onSend();
        }
    };

    const onChangeChatHandler = useCallback((e) => {
        setText(e.target.value);
    },[]);

    const onClick = (e) => {
        onSend();
    };

    return (
        <React.Fragment>
            <Input type="text"
                   onChange={onChangeChatHandler}
                   onKeyPress={onKeyPressHandler}
                   value={text} />
            <SendButton onClick={onClick}>
                <img src={send}/>
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
    outline: none;
    padding-left: 10px;

    @media only screen and (max-width: 420px) {
        width: 262px;
        height: 33px;
    }
`;

const SendButton = styled.div`
    width: 22.08px;
    height: 21.87px;
`;
