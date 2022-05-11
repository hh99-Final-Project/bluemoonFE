import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
// import Modal from "../components/modal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { chatApi } from "../apis/chatApi";
import CategoryBar from "../shared/CategoryBar";
import useStore from "../zustand/store";
import Header from "../shared/Header";
import Loading from "../shared/Loading";
import _ from "lodash";
import { Layout } from "../components/common";
import chatOutIcon from "../static/images/chat/more-hor.svg";

ChatList.propTypes = {};

function ChatList(props) {
    const navigate = useNavigate();
    const ref = useRef();
    const { setCurrentHeader } = useStore();

    // chatList 에 소켓에서 받는 안 읽은 메시지 수를 count 라는 속성에 넣어줘보자.
    const [chatList, setChatList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(null);
    const userInfo = useSelector((state) => state.userSlice.userInfo);

    console.log(chatList);

    const inicialRoom = {
        roomename: null,
        roomId: null,
        lastMessage: null,
        lastTime: null,
    };

    // 소켓 연결
    // useEffect(() => {
    //     wsConnect();

    //     return () => {
    //         wsDisConnect();
    //     };
    // }, []);

    // 1. stomp 프로토콜 위에서 sockJS 가 작동되도록 클라이언트 생성
    // let sock = new SockJS("http://121.139.34.35:8080/stomp/chat");
    // let ws = Stomp.over(sock);

    // 연결 및 구독. 파라메터로 토큰 넣어야 함
    // function wsConnect() {
    //     try {
    //         ws.connect({ token: token }, () => {
    //             ws.subscribe(
    // 구독할 주소 서버분들과 확인 필요!
    //                 `/sub/chat/room/${roomId}`,
    //                 (response) => {
    //                     const newMessage = JSON.parse(response.body);
    //                     console.log(response);
    //                     console.log(newMessage);
    //                     dispatch(subMessage(newMessage));
    //                 },
    //                 // {},
    //             );
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // function wsDisConnect() {
    //     try {
    //         ws.disconnect(() => {
    //             ws.unsubscribe("sub-0");
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const openModal = () => {
    //     setIsModalOpen(true);
    // };
    // const closeModal = () => {
    //     setIsModalOpen(false);
    // };

    // 채팅방 나가기
    const deleteChat = (chatId) => {
        if (window.confirm("정말 이 방을 나가시겠습니까?")) {
            chatApi.deleteChat(chatId).then((response) => {
                if (response.status === 200) {
                    window.alert("채팅방에서 나가셨습니다.");
                    //reload를 해주는 이유가 뭘까용? 강제 새로고침은 user UX에 좋지 않을 것 같아요!
                    window.location.reload();
                }
            });
        }
    };

    // 무한스크롤을 함수
    // Grid onScroll 이벤트에 넣어두어, Grid 스크롤 발생 시 실행됨
    const InfinityScroll = _.throttle((e) => {
        // // 실제 요소의 높이값
        // console.log(e.target.scrollHeight);

        //  // 스크롤 위치
        //  console.log(e.target.scrollTop);

        //  //현재 보여지는 요소의 높이 값 (border, scrollbar 크기 제외)
        // console.log(e.target.clientHeight);

        if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
            chatApi.getChatList(page).then((response) => {
                setChatList([...chatList, ...response.data]);
                setIsLoading(false);
                if (response.length < 5) {
                    setHasNext(false);
                } else {
                    setHasNext(true);
                }
                setPage(page + 1);
            });
        }
    }, 300);

    // 채팅방 리스트 조회 api
    useEffect(() => {
        chatApi.getChatList(page).then((response) => {
            console.log(response);
            setChatList([...chatList, ...response.data]);
            setIsLoading(false);
            if (response.length < 5) {
                setHasNext(false);
            } else {
                setHasNext(true);
            }
            setPage(page + 1);
        });

        setCurrentHeader("채팅");
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Layout>
            <Container>
                <Header />
                <CategoryBar />
                <ChatRoomListBox>
                    <DiaryName>
                        {userInfo?.nickname} <span>님 다이어리</span>
                    </DiaryName>
                    <ChatRoomListTitle>
                        <p>채팅 리스트</p>
                    </ChatRoomListTitle>
                    <ChatRoomWrapper ref={ref} onScroll={InfinityScroll}>
                        {chatList.map((chat, i) => {
                            return (
                                <ChatRoom
                                    roomName={chat.roomName}
                                    onClick={() => navigate(`/chat/${chat.chatRoomUuid}`)}
                                    key={chat.chatRoomUuid}
                                >
                                    <TiTleLine>
                                        <CharRoomTitle>{chat.roomName} 님과의 대화</CharRoomTitle>
                                        <LastChatTime>{chat.dayBefore}</LastChatTime>
                                    </TiTleLine>
                                    <ContentLine>
                                        <LastChat>{chat.lastMessage}</LastChat>
                                        <img
                                            src={chatOutIcon}
                                            alt={"채팅방 나가기"}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteChat(chat.chatRoomUuid);
                                            }}
                                        />

                                        {/* <ChatOutButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteChat(chat.chatRoomUuid);
                                            }}
                                        >
                                            채팅방 나가기
                                        </ChatOutButton> */}
                                    </ContentLine>
                                </ChatRoom>
                            );
                        })}
                    </ChatRoomWrapper>
                </ChatRoomListBox>
            </Container>
        </Layout>
    );
}

export default ChatList;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;

`;

const ChatRoomListBox = styled.div`
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

const DiaryName = styled.div`
    position: absolute;
    right: 0;
    bottom: calc(100% + 10px);
    color: rgba(255, 255, 255, 0.9);
    font-size: 16px;
    line-height: 19px;

    span {
        color: #9aebe7;
    }
`;

const ChatRoomListTitle = styled.div`
    position: absolute;
    width: 950px;
    height: 50px;
    top: 20px;

    background: #2f3a5f;

    border-radius: 0px;

    display: flex;
    align-items: center;

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

const ChatRoomWrapper = styled.div`
    width: 950px;
    height: 420px;
    position: absolute;
    top: 80px;
    overflow-y: auto;
`;

const ChatRoom = styled.div`
    width: 881px;
    height: 65px;
    border-radius: 5px;

    display: flex;
    flex-direction: column;
    background-color: #959ebe;
    border: 1px solid black;
    border-radius: 10px;
    margin: 10px auto;
    padding: 10px;
    cursor: pointer;
`;

const TiTleLine = styled.div`
    width: 860px;
    display: flex;
    justify-content: space-between;
    margin: 5px auto;
`;

const CharRoomTitle = styled.div`
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;

    color: #373857;
`;

const LastChatTime = styled.div`
    // width: 80px;
    overflow: hidden;
`;

const ContentLine = styled.div`
    width: 860px;
    display: flex;
    justify-content: space-between;
    margin: 10px auto;
`;

const LastChat = styled.div`
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
`;

const ChatOutButton = styled.button`
    width: 100px;
    cursor: pointer;
`;
