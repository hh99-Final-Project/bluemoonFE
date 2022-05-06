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
    const params = useParams();
    console.log(params);
    const roomId = params.id;

    // 보내는 사람
    const userInfo = useSelector((state) => state.userSlice.userInfo);
    // message state
    const message = useSelector((state) => state.chatSlice.messages);

    // const [message, setMessage] = useState([
    //     {
    //         userId: "1",
    //         nickname: "말 잘든는 원숭이",
    //         message: "안녕하세요",
    //         createdAt: "07:30",
    //     },
    //     {
    //         userId: "2",
    //         nickname: "못말리는 짱구",
    //         message: "반갑습니다",
    //         createdAt: "07:31",
    //     },

    //     {
    //         userId: "1",
    //         nickname: "말 잘든는 원숭이",
    //         message: "고민이 해결되셨나요?",
    //         createdAt: "07:32",
    //     },
    //     {
    //         userId: "2",
    //         nickname: "못말리는 짱구",
    //         message: "아뇨 여전합니다",
    //         createdAt: "07:33",
    //     },
    // ]);

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
                        subMessage(newMessage);
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

    if (message === null) {
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
                        {message.length > 0 &&
                            message.map((message, idx) => {
                                return (
                                    <ChatMessage
                                        key={idx}
                                        message={message.message}
                                        nickname={message.nickname}
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
    width: 946px;
    height: 80vh;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(180deg, rgba(63, 75, 112, 0.79) 0%, rgba(100, 114, 152, 0.79) 100%);
    border: 2px solid #ffffff4d;
    border-radius: 25px;
    box-shadow: 0 0 70px #465981;
`;

const ChatRoomTitle = styled.div`
    margin: 20px 0;
    background-color: #2f3a5f;
    height: 52px;
    width: 946px;
    left: 167px;
    top: 160px;
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
    width: 100%;
    height: 90%;
    overflow-y: scroll;
`;
const InputWrpper = styled.div`
    // position: absolute;
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: gray;
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
