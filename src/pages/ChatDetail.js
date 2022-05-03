import React from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { Grid, Text } from "../../elements/index";
import ChatBox from "../components/chat/ChatBox";
import styled from "styled-components";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Header2 from "../shared/Header2";
import CategoryBar from "../shared/CategoryBar";
import ChatMessage from "../components/chat/ChatMessage";
import ChatInput from "../components/chat/ChatInput";

const ChatDetail = () => {
    const navigate = useNavigate();
    const params = useParams();
    const roomId = params.id;

    // const [message, setMessage] = useState(null);

    // 채팅방 이전 메시지 호출
    // useEffect(() => {
    //     chatApi.getChatMessage(roomId).then((res) => {
    //         console.log(res);
    //         setMessage(res);
    //     });
    // });

    React.useEffect(() => {
        ConnectSub();
        //   return () => {
        //     DisConnectUnsub();
        //   };
    }, []);

    // 1. stomp 프로토콜 위에서 sockJS 가 작동되도록 클라이언트 생성
    let sock = new SockJS("http://121.139.34.35:8080/stomp/chat");
    let ws = Stomp.over(sock);

    // // 연결 및 구독. 파라메터로 토큰 넣어야 함
    function ConnectSub() {
        try {
            ws.connect({}, () => {
                ws.subscribe(
                    // 구독 주소 서버와 확인 필요
                    `/sub/chat/room/${roomId}`,
                    (response) => {
                        const newMessage = JSON.parse(response.body);
                    },
                    {},
                );
            });
        } catch (error) {
            console.log(error);
        }
    }

    // function DisConnectUnsub() {
    //   try {
    //     ws.disconnect(
    //       {
    //         Headers: {
    //           // 토큰
    //           Authorization: `${token}`,
    //         },
    //       },
    //       () => {
    //         ws.unsubscribe("sub-0");
    //       },
    //       { token: token }
    //     );
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    let message = [
        {
            userId: "1",
            nickname: "말 잘든는 원숭이",
            message: "안녕하세요",
            createdAt: "07:30",
        },
        {
            userId: "2",
            nickname: "못말리는 짱구",
            message: "반갑습니다",
            createdAt: "07:31",
        },

        {
            userId: "1",
            nickname: "말 잘든는 원숭이",
            message: "고민이 해결되셨나요?",
            createdAt: "07:32",
        },
        {
            userId: "2",
            nickname: "못말리는 짱구",
            message: "아뇨 여전합니다",
            createdAt: "07:33",
        },
    ];

    if (message === null) {
        return;
    } else {
        return (
            <Wrapper>
                <Header2 />
                <CategoryBar />
                <BackButton onClick={() => navigate("/chatlist")}>채팅 리스트로 돌아가기</BackButton>

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
                    <ChatInput roomId={roomId} />
                </InputWrpper>
            </Wrapper>
        );
    }
};

export default ChatDetail;

const Wrapper = styled.div`
    position: absolute;
    bottom: 5vh;
    display: block;
    width: 90vw;
    height: 70vh;
    margin: 0 auto;
    background-color: #ddd;
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
