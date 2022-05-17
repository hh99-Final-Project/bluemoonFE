import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Header from "../shared/Header";
import CategoryBar from "../shared/CategoryBar";
import ChatMessage from "../components/chat/ChatMessage";
import ChatInput from "../components/chat/ChatInput";
import { Layout } from "../components/common";
import { getChatMessage, subMessage } from "../redux/modules/chatSlice";
import { getCookie } from "../utils/cookie";
import { chatApi } from "../apis/chatApi";
import close from "../static/images/chat/close.svg";
import useStore from "../zustand/store";
import {color} from "../utils/designSystem";


const ChatDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const roomId = params.id;
    const { setCurrentHeader } = useStore();

    // 보내는 사람
    const userInfo = useSelector((state) => state.userSlice.userInfo);
    const token = getCookie("authorization");
    const [text, setText] = React.useState("");
    const scrollRef = useRef();
    const ws = useRef();

    // 상대방 정보
    const [otherUserInfo, setOtherUserInfo] = useState([]);

    // messages
    const messages = useSelector((state) => state.chatSlice.messages);

    // 상대방 정보 가져오기
    useEffect(() => {
        setCurrentHeader("채팅");
        chatApi
            .enterChatRoom(roomId)
            .then((response) => {
                setOtherUserInfo(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // 채팅방 이전 메시지 가져오기
    useEffect(() => {
        let sock = new SockJS("http://13.209.155.82/stomp/chat");
        let client = Stomp.over(sock);
        ws.current = client;

        dispatch(getChatMessage(roomId));
    }, []);

    // 소켓 연결
    useEffect(() => {
        wsConnect();
        return () => {
            wsDisConnect();
        };
    }, []);

    // 입장 시 enter
    // roomId 바뀔 때 실행되도록 세팅
    useEffect(() => {
        enterMessage();
        scrollRef.current.scrollIntoView({behavior: "smooth", block: "end"});
    }, []);

    useEffect(()=>{
        scrollRef.current.scrollIntoView({behavior: "smooth", block:"end"});
    },[messages]);


    // // // 연결 및 구독. 파라메터로 토큰 넣어야 함
    function wsConnect() {
        try {
            ws.current.connect({ token: token, type: "CHAT" }, () => {
                console.log("socket connected");
                ws.current.subscribe(
                    `/sub/chat/room/${roomId}`,
                    (response) => {
                        const newMessage = JSON.parse(response.body);
                        console.log(response);
                        console.log(newMessage);
                        dispatch(subMessage(newMessage));
                    },
                );
            });
        } catch (error) {
            console.log(error);
        }
    }

    function wsDisConnect() {
        try {
            ws.current.disconnect(() => {
                ws.current.unsubscribe("sub-0");
            });
        } catch (error) {
            console.log(error);
        }
    }

    const enterMessage = () => {
        try {
            // send할 데이터
            const message = {
                type: "ENTER",
                roomId: roomId,
            };

            // waitForConnection(ws, () => {
            ws.current.send("/pub/chat/enter", { token: token }, JSON.stringify(message));
            // });
        } catch (error) {
            console.log(error);
        }
    };

    const onSend = async () => {
        try {
            // send할 데이터
            const message = {
                roomId: roomId,
                message: text,
                otherUserId: otherUserInfo.otherUserId, // 메시지 받는 상대방
                type: "TALK",
            };

            if (text === "") {
                return;
            }
            // 로딩 중
            // waitForConnection(ws, function () {
                ws.current.send("/pub/chat/message", { token: token }, JSON.stringify(message));
                console.log(ws.current.ws.readyState);
                setText("");
            // });
        } catch (error) {
            console.log(error);
        }
    };

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

    if (messages === null) {
        return;
    }

    return (
        <Layout>
            <Container>
                <Header />
                <CategoryBar />
                <ChatRoom BgColor={color.containerBoxColor}>
                    <ChatRoomTitle>
                        <p> {otherUserInfo.otherUserNickname} 님과의 대화</p>
                        <BackButton onClick={() => navigate("/chatlist")}>
                            <img src={close}/>
                        </BackButton>
                    </ChatRoomTitle>

                    <MessageWrapper>
                        {messages.length > 0 &&
                            messages.map((message, idx) => {
                                return (
                                    <ChatMessage
                                        key={idx}
                                        message={message.message}
                                        userId={message.userId}
                                        createdAt={message.createdAt}
                                    />
                                );
                            })}
                        <div ref={scrollRef}/>
                    </MessageWrapper>
                    <InputWrpper>
                        <ChatInput userInfo={userInfo} onSend={onSend} text={text} setText={setText}/>
                    </InputWrpper>
                </ChatRoom>
            </Container>
        </Layout>
    );
};

export default ChatDetail;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
`;

const ChatRoom = styled.div`
    width: 950px;
    height: 530px;
    background: ${props => props.BgColor};
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0px 0px 70px #465981;
    backdrop-filter: blur(80px);

    border-radius: 25px;

    position: relative;
    margin: auto;
`;

const ChatRoomTitle = styled.div`
    position: absolute;
    width: 950px;
    height: 52px;
    top: 20px;

    background: #2f3a5f;

    border-radius: 0px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    color: #ffffff;

    & p {
        margin-left: 22px;
        font-size: 20px;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0em;
        text-align: left;
    }
`;

const MessageWrapper = styled.div`
    width: 950px;
    height: 375px;
    position: absolute;
    top: 80px;
    overflow-y: auto;
`;
const InputWrpper = styled.div`
    position: absolute;
    width: 100%;
    height: 70px;
    bottom: 0px;
    background: #2f3a5f;
    border-radius: 0px 0px 25px 25px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

const BackButton = styled.div`
    position: absolute;
    top: 13px;
    left: 903px;

    // display: flex;
    // align-items: center;
    // justify-content: center;
    cursor: pointer;
`;
