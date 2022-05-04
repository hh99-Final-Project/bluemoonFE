import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import Modal from "../components/modal";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { chatApi } from "../apis/chatApi";
import CategoryBar from "../shared/CategoryBar";
import useStore from "../zustand/store";
import Header2 from "../shared/Header2";
import Loading from "../shared/Loading";

ChatList.propTypes = {};

function ChatList(props) {
    const [chatList, setChatList] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { setCurrentHeader } = useStore();

    const inicialRoom = {
        roomename: null,
        roomId: null,
        lastMessage: null,
        lastTime: null,
    };

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
                    navigate("/chatlist");
                }
            });
        }
    };

    // 채팅방 리스트 조회 api
    useEffect(() => {
        chatApi.getChatList(1).then((response) => {
            console.log(response);
            setChatList(response.data);
            setIsLoading(false);
        });

        setCurrentHeader("채팅");
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <Header2 />
            <CategoryBar />
            <Grid>
                {chatList.map((chat, i) => {
                    return (
                        <ChatRoom onClick={() => navigate(`/chat/${chat.chatRoomUuid}`)} key={chat.chatRoomUuid}>
                            <Text>{chat.roomName}</Text>
                            <Text>{chat.lastMessage}</Text>
                            <Text>{chat.lastTime}</Text>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteChat(chatRoomUuid);
                                    navigate("/chatlist");
                                }}
                            >
                                채팅방 나가기
                            </button>
                        </ChatRoom>
                    );
                })}
            </Grid>
        </div>
    );
}

export default ChatList;

const Grid = styled.div`
    width: 80vw;
    height: 80vh;
    margin: auto;
    display: flex;
    flex-direction: column;
    background-color: lightgray;
`;

const ChatRoom = styled.div`
    width: 90%;
    height: 15%;
    display: flex;
    flex-direction: column;
    background-color: white;
    border: 1px solid black;
    border-radius: 10px;
    margin: 1% auto;
    padding: 10px;
`;

const Text = styled.p``;
