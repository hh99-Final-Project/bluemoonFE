import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { chatApi } from "../apis/chatApi";
import CategoryBar from "../shared/CategoryBar";
import useStore from "../zustand/store";
import Header from "../shared/Header";
import Loading from "../shared/Loading";
import _ from "lodash";
import { Layout } from "../components/common";
import ChatOutModal from "../components/common/ChatOutModal";
import { color } from "../utils/designSystem";
import Popup from "../shared/Popup";

ChatList.propTypes = {};

function ChatList(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { setCurrentHeader } = useStore();

    // const chatList = useSelector((state) => state.chatSlice.chatList);
    const userInfo = useSelector((state) => state.userSlice.userInfo);

    // chatList 에 소켓에서 받는 안 읽은 메시지 수를 count 라는 속성에 넣어줘보자.
    const [chatList, setChatList] = useState([]);
    const [isOpenPopup, setIsOpenPopup] = useState(false);

    // 무한스크롤
    const InfinityScrollref = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(null);

    // modal
    const [ModalisOpen, setModalIsOpen] = useState(false);
    const ChatOutTabRef = useRef();

    const openModal = () => {
        console.log("open!");
        setModalIsOpen(true);
    };
    const closeModal = () => {
        console.log("close!");
        setModalIsOpen(false);
    };

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
    // let sock = new SockJS("http://13.209.155.82/stomp/chat");
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

    // 채팅방 나가기
    const deleteChat = (chatId) => {
        chatApi.deleteChat(chatId).then((response) => {
            if (response.status === 200) {
                setIsOpenPopup(false);
                // 리덕스 charList 에서 delete 처리 해줘야 함.
            } else {
                window.alert("에러처리");
            }
        });

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

        console.log(e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight));

        if (e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) <= 200 && hasNext) {
            chatApi.getChatList(page).then((response) => {
                console.log(response);
                setChatList([...chatList, ...response.data]);
                setIsLoading(false);
                if (response.data.length < 5) {
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
                <ChatRoomListBox BgColor={color.containerBoxColor}>
                    <ChatRoomListTitle>
                        <p>채팅 리스트</p>
                    </ChatRoomListTitle>
                    <ChatRoomWrapper ref={InfinityScrollref} onScroll={InfinityScroll}>
                        {chatList.length === 0 && <NoChatNotice>아직 개설된 채팅방이 없습니다.</NoChatNotice>}
                        {chatList.length > 0 &&
                            chatList.map((chat, i) => {
                                return (
                                    <ChatRoom
                                        roomName={chat.roomName}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate(`/chat/${chat.chatRoomUuid}`);
                                        }}
                                        key={chat.chatRoomUuid}
                                    >
                                        <TiTleLine>
                                            <CharRoomTitle>{chat.roomName} 님과의 대화</CharRoomTitle>
                                            <LastChatTime>{chat.dayBefore}</LastChatTime>
                                        </TiTleLine>
                                        <ContentLine>
                                            <LastChat>{chat.lastMessage}</LastChat>
                                            <ChatOutButton
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setIsOpenPopup(true);
                                                }}>
                                                나가기
                                            </ChatOutButton>
                                        </ContentLine>

                                        {isOpenPopup &&
                                            <Popup
                                                title={"정말로/대화를 종료하시겠습니까?"}
                                                close={() => setIsOpenPopup(false)}
                                                event={() => {
                                                    deleteChat(chat.chatRoomUuid);
                                                }}/>
                                        }
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
    background: ${props => props.BgColor};
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0px 0px 70px #465981;
    backdrop-filter: blur(80px);

    border-radius: 25px;

    position: relative;
    margin: auto;
`;


const NoChatNotice = styled.div`
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translate(-50%, 0);

    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    text-align: center;

    color: #d7d7d7;
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
    width: 889px;
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

const ModalOpenButton = styled.div`
    // width: 100px;
    cursor: pointer;
`;

const ChatOutButton = styled.div``;
