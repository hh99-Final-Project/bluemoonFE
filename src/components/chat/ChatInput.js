import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Grid, Button, Input } from "../../elements/index";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

ChatInput.propTypes = {};

function ChatInput(props) {
    const { roomId } = props;
    console.log(roomId);

    let sock = new SockJS("http://121.139.34.35:8080/stomp/chat");
    let ws = Stomp.over(sock);

    // // 보낼 메세지
    const [text, setText] = React.useState("");

    // 보내는 사람
    // const sender = useSelector((state) => state.user.user.username);

    // const router = useRouter();
    // console.log(router); // 라우터 객체를 출력합니다.
    // const { roomId } = router.query;
    // console.log({ roomId });

    const onSend = async () => {
        try {
            // if (!token) {
            //   alert("문제가 발생했습니다. 다시 로그인 해주세요.");
            //   router.replace("/chatlist");
            // }
            // send할 데이터
            const message = {
                roomId: roomId,
                message: text,
                //   userId: userId, // 메시지 받는 상대방
                //   sender: sender, // 토큰 보내면 필요없는 정보
                type: "TALK",
            };
            // 빈문자열이면 리턴
            if (text === "") {
                return;
            }
            // 로딩 중
            waitForConnection(ws, function () {
                // 주소 넣어야 함
                ws.send("/pub/chat/message", {}, JSON.stringify(message));
                // ws.send("/pub/chat/message", {});
                console.log(ws.ws.readyState);
                setText("");
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
            1, // 밀리초 간격으로 실행
        );
    }

    return (
        <React.Fragment>
            <Input width="90%" type="text" _onChange={(e) => setText(e.target.value)} />
            {/* onClick 은 나중에 먹임 */}
            <Button width="7%" height="5%" padding="2%" _onClick={onSend}></Button>
        </React.Fragment>
    );
}

export default ChatInput;
