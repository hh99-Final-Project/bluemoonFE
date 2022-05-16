import React, { useEffect } from "react";
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
    const { roomId, userInfo, otherUserInfo } = props;
    // console.log(props);

    const [text, setText] = React.useState("");
    const token = getCookie("authorization");

    // let sock = new SockJS("http://121.139.34.35:8080/stomp/chat");
    // let ws = Stomp.over(sock);

    // const onSend = async () => {
    //     try {
    //         // send할 데이터
    //         const message = {
    //             roomId: roomId,
    //             message: text,
    //             otherUserId: otherUserInfo.otherUserId, // 메시지 받는 상대방
    //             type: "TALK",
    //         };

    //         if (text === "") {
    //             return;
    //         }
    //         // 로딩 중
    //         waitForConnection(ws, function () {
    //             ws.send("/pub/chat/message", { token: token }, JSON.stringify(message));
    //             console.log(ws.ws.readyState);
    //             setText("");
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         console.log(ws.ws.readyState);
    //     }
    // };

    // // // 웹소켓이 연결될 때 까지 실행
    // function waitForConnection(ws, callback) {
    //     setTimeout(
    //         function () {
    //             // 연결되었을 때 콜백함수 실행
    //             if (ws.ws.readyState === 1) {
    //                 callback();
    //                 // 연결이 안 되었으면 재호출
    //             } else {
    //                 waitForConnection(ws, callback);
    //             }
    //         },
    //         10, // 밀리초 간격으로 실행
    //     );
    // }

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

export default ChatInput;

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
