import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ChatBox from "../components/chat/ChatBox";
import styled from "styled-components";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Header2 from "../shared/Header2";
import CategoryBar from "../shared/CategoryBar";
import ChatMessage from "../components/chat/ChatMessage";
import ChatInput from "../components/chat/ChatInput";
import { subMessage } from "../redux/modules/chatSlice";

const ChatDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    console.log(params);
    const roomId = params.id;

    // 보내는 사람
    const userInfo = useSelector((state) => state.userSlice.userInfo);
    console.log(userInfo);
    // message state
    const messages = useSelector((state) => state.chatSlice.messages);
    console.log(messages);

    // 채팅방 이전 메시지 호출
    // useEffect(() => {
    //     chatApi.getChatMessage(roomId).then((res) => {
    //         console.log(res);
    //         setMessage(res);
    //     });
    // });

    React.useEffect(() => {
        wsConnect();
        return () => {
            wsDisConnect();
        };
    }, []);

    // 1. stomp 프로토콜 위에서 sockJS 가 작동되도록 클라이언트 생성
    let sock = new SockJS("http://121.139.34.35:8080/stomp/chat");
    let ws = Stomp.over(sock);

    // // 연결 및 구독. 파라메터로 토큰 넣어야 함
    function wsConnect() {
        try {
            ws.connect({}, () => {
                ws.subscribe(
                    `/sub/chat/room/${roomId}`,
                    (response) => {
                        const newMessage = JSON.parse(response.body);
                        console.log(response);
                        console.log(newMessage);
                        dispatch(subMessage(newMessage));
                    },
                    // {},
                );
            });
        } catch (error) {
            console.log(error);
        }
    }

    function wsDisConnect() {
        try {
            ws.disconnect(() => {
                ws.unsubscribe("sub-0");
            });
        } catch (error) {
            console.log(error);
        }
    }

    if (messages === null) {
        return;
    } else {
        return (
            <Container>
                <Header2 />
                <CategoryBar />
                <ChatRoom>
                    <ChatRoomTitle>
                        <p> OO 님과의 대화</p>
                        <BackButton onClick={() => navigate("/chatlist")}>채팅 리스트로 돌아가기</BackButton>
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
                    </MessageWrapper>
                    <InputWrpper>
                        <ChatInput roomId={roomId} userInfo={userInfo} />
                    </InputWrpper>
                </ChatRoom>
            </Container>
        );
    }
};

export default ChatDetail;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #111b3f;
    overflow: hidden;
`;

const ChatRoom = styled.div`
    width: 950px;
    height: 530px;

    background: linear-gradient(180deg, rgba(63, 75, 112, 0.79) 0%, rgba(100, 114, 152, 0.79) 100%);
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
    height: 50px;
    top: 20px;

    background: #2f3a5f;

    border-radius: 0px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    color: #ffffff;

    & p {
        margin-left: 20px;
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
    width: 184px;
    height: 65px;
    background-color: #787878;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;
