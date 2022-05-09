import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

ChatInput.propTypes = {};

function ChatInput(props) {
    const { roomId, userInfo } = props;
    console.log(props);

    let sock = new SockJS("http://121.139.34.35:8080/stomp/chat");
    let ws = Stomp.over(sock);

    // // 보낼 메세지
    const [text, setText] = React.useState("");

    // 보내는 사람
    // const userInfo = useSelector((state) => state.userSlice.userInfo);
    // console.log(userInfo);

    // const router = useRouter();
    // console.log(router); // 라우터 객체를 출력합니다.
    // const { roomId } = router.query;
    // console.log({ roomId });

    const onSend = async () => {
        try {
            // send할 데이터
            const message = {
                roomId: roomId,
                message: text,
                userId: userInfo.userId, // 메시지 보내는 사람
                type: "TALK",
            };

            if (text === "") {
                return;
            }
            // 로딩 중
            waitForConnection(ws, function () {
                ws.send("/pub/chat/message", {}, JSON.stringify(message));
                // ws.send("/pub/chat/message", {});
                console.log(ws.ws.readyState);
                // setText("");
            });
        } catch (error) {
            console.log(error);
            console.log(ws.ws.readyState);
        }
    };

    // // 웹소켓이 연결될 때 까지 실행
    function waitForConnection(ws, callback) {
        setTimeout(
            function () {
                // 연결되었을 때 콜백함수 실행
                if (ws.ws.readyState === 1) {
                    callback();
                    // 연결이 안 되었으면 재호출
                } else {
                    waitForConnection(ws, callback);
                }
            },
            10, // 밀리초 간격으로 실행
        );
    }

    return (
        <React.Fragment>
            <Input type="text" onChange={(e) => setText(e.target.value)} />
            <SendButton onClick={onSend}></SendButton>
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
    background: #555;
`;
