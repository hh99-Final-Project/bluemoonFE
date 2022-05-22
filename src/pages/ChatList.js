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
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { deleteUnreadCount, getChatList, deleteChatList } from "../redux/modules/chatSlice";
import { unreadCount } from "../static/images/resources";
import { useMediaQuery } from "react-responsive";

ChatList.propTypes = {};

function ChatList(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { setCurrentHeader } = useStore();

    const chatList = useSelector((state) => state.chatSlice.chatList);
    const isLoading = useSelector((state) => state.chatSlice.isLoading);
    const hasNext = useSelector((state) => state.chatSlice.hasNext);
    const page = useSelector((state) => state.chatSlice.page);

    const isMobile = useMediaQuery({
        query: "(max-width: 420px)",
    });

    const inicialRoom = {
        roomename: null,
        roomId: null,
        lastMessage: null,
        lastTime: null,
        chatList,
    };


    // 채팅방 나가기 모달창
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [clickedChatId, setClickedChatId] = useState("");
    const PopupRef = useRef();

    // 채팅방 나가기
    const deleteChat = () => {
        chatApi.deleteChat(clickedChatId).then((response) => {
            if (response.status === 200) {
                setIsOpenPopup(false);
                dispatch(deleteChatList(clickedChatId));
            } else {
                window.alert("에러처리");
            }
        });
    };

    // 무한스크롤(리덕스 코드 구현 여부 확인되면 코드 정리 예정)
    const InfinityScrollRef = useRef();
    // const [isLoading, setIsLoading] = useState(true);
    // const [page, setPage] = useState(1);
    // const [hasNext, setHasNext] = useState(null);

    // 무한스크롤을 함수
    // Grid onScroll 이벤트에 넣어두어, Grid 스크롤 발생 시 실행됨
    const InfinityScroll = _.throttle((e) => {
        // console.log(e.target.scrollHeight);  // 요소 전체 높이
        // console.log(e.target.scrollTop);  // 스크롤 위치
        // console.log(e.target.clientHeight); // 현재 보여지는 요소의 높이 값 (border, scrollbar 크기 제외)
        // console.log(e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight));

        if (e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) <= 200 && hasNext) {
            // chatApi.getChatList(page).then((response) => {
            //     console.log(response);
            //     setChatList([...chatList, ...response.data]);
            //     setIsLoading(false);
            //     if (response.data.length < 10) {
            //         setHasNext(false);
            //     } else {
            //         setHasNext(true);
            //     }
            //     setPage(page + 1);
            // });
            dispatch(getChatList(page));
        }
    }, 300);

    // 카테고리바에 별 표시 삭제
    useEffect(() => {
        dispatch(deleteUnreadCount());
    }, []);

    // 채팅방 리스트 조회 api
    useEffect(() => {
        // chatApi.getChatList(page).then((response) => {
        //     console.log(response);
        //     setChatList([...chatList, ...response.data]);
        //     setIsLoading(false);
        //     if (response.length < 10) {
        //         setHasNext(false);
        //     } else {
        //         setHasNext(true);
        //     }
        //     setPage(page + 1);
        // });

        dispatch(getChatList(page));
        setCurrentHeader("채팅");
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Layout>
            <Container>
                <Header />
                {!isMobile ? <CategoryBar /> : <MobTitle>마이 페이지</MobTitle>}
                <ChatRoomListBox BgColor={color.containerBoxColor}>
                    <ChatRoomListTitle>
                        <p>채팅 리스트</p>
                    </ChatRoomListTitle>
                    <ChatRoomWrapper ref={InfinityScrollRef} onScroll={InfinityScroll}>
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
                                        <TitleLine>
                                            <CharRoomTitle>{chat.roomName} 님과의 대화</CharRoomTitle>
                                            <UnreadCount>
                                                {chat.unreadCount > 0 && (
                                                    <>
                                                        <UnreadCountNum>{chat.unreadCount}</UnreadCountNum>
                                                        <UnreadCountIcon src={unreadCount}></UnreadCountIcon>
                                                    </>
                                                )}
                                            </UnreadCount>
                                        </TitleLine>
                                        <LastChatTime>{chat.dayBefore}</LastChatTime>
                                        <LastChat>{chat.lastMessage}</LastChat>
                                        <ChatOutButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsOpenPopup(true);
                                                setClickedChatId(chat.chatRoomUuid);
                                            }}
                                            chatRoomUuid={chat.chatRoomUuid}
                                        >
                                            나가기
                                        </ChatOutButton>
                                    </ChatRoom>
                                );
                            })}
                        {isOpenPopup && (
                            <Popup
                                title={"정말로/대화를 종료하시겠습니까?"}
                                close={() => setIsOpenPopup(false)}
                                event={() => {
                                    deleteChat();
                                }}
                            />
                        )}
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

    @media only screen and (max-width: 420px) {
        width: 320px;
        margin: auto;
    }
`;

const MobTitle = styled.div`
    width: 320px;
    height: 34px;
    color: #ffffff;
    text-align: center;
    margin: 0 auto;
`;

const ChatRoomListBox = styled.div`
    width: 950px;
    height: 530px;
    background: ${(props) => props.BgColor};
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0px 0px 70px #465981;
    backdrop-filter: blur(80px);

    border-radius: 25px;

    position: relative;
    margin: auto;

    @media only screen and (max-width: 420px) {
        width: 320px;

        background: none;
        border: none;
        box-shadow: none;
        backdrop-filter: none;
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

    p {
        margin-left: 23px;
        font-family: "Spoqa Han Sans Neo";
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;
        display: flex;
        align-items: center;
        color: #ffffff;
    }

    @media only screen and (max-width: 420px) {
        display: none;
    }
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

    @media only screen and (max-width: 420px) {
        position: none;
        margin: 50px auto;
    }
`;

const ChatRoomWrapper = styled.div`
    width: 915px;
    height: 414px;
    position: absolute;
    top: 94px;
    left: 25px;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #d3d3d3;
        border-radius: 50px;
    }

    &::-webkit-scrollbar-track {
        background-color: #08105d;
        border-radius: 50px;
    }

    @media only screen and (max-width: 420px) {
        width: 320px;
        height: 580px;

        top: 0;
        left: 0;
    }
`;

const ChatRoom = styled.div`
    position: relative;
    width: 889px;
    height: 65px;
    border-radius: 5px;
    background: #959ebe;

    margin: 0 auto 5px;
    // padding: 16px;
    box-sizing: border-box;
    cursor: pointer;

    @media only screen and (max-width: 420px) {
        width: 310px;
        height: 78px;
        border-radius: 3px;
    }
`;

const TitleLine = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    margin: 12px 0 0 16px;

    @media only screen and (max-width: 420px) {
        margin: 15px 0 0 14px;
    }
`;

const CharRoomTitle = styled.div`
    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    display: flex;
    align-items: center;

    color: #354569;

    @media only screen and (max-width: 420px) {
        font-weight: 700;
        font-size: 12px;
        line-height: 15px;
    }
`;

const UnreadCount = styled.div`
    position: relative;
    // top: 14px;
    // left: 125px;

    margin: 0 0 0 11px;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 13px;
    display: flex;
    align-items: center;

    color: #c6d3ec;
`;

const UnreadCountNum = styled.div`
    z-index: 1;
    margin-left: 4px;
`;

const UnreadCountIcon = styled.img`
    position: absolute;
`;

const LastChatTime = styled.div`
    position: absolute;
    top: 12px;
    right: 16px;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 13px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #354569;

    @media only screen and (max-width: 420px) {
        top: 15px;
        right: 15px;
    }
`;

const LastChat = styled.div`
    position: absolute;
    top: 42px;
    left: 16px;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 13px;
    display: flex;
    align-items: center;

    color: #354569;

    @media only screen and (max-width: 420px) {
        top: 51px;
        right: 15px;
    }
`;

const ChatOutButton = styled.div`
    position: absolute;
    top: 44px;
    right: 16px;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 13px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #354569;

    @media only screen and (max-width: 420px) {
        top: 52px;
        right: 17px;
    }
`;
