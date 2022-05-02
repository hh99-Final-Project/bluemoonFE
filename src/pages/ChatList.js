import React, { useState } from "react";
import styled from "styled-components";
// import Modal from "../components/modal";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { chatApi } from "../apis/chatApi";

ChatList.propTypes = {};

function ChatList(props) {
    // const [roomList, setRoomList] = useState([]);
    const navigate = useNavigate();

    const inicialRoom = {
        roomename: null,
        roomId: null,
        lastMessage: null,
        lastTime: null,
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // 채팅방 리스트 조회 api
    // React.useEffect(() => {
    //   chatApi.getChatList()
    //   .then((res) => {
    //     console.log(res)
    //     // 컴포넌트 스테이트에 바로 저장
    // setRoomList(res.data);
    //   })
    // })

    let chatList = [
        {
            roomName: "말 잘듣는 원숭이1",
            lastMessage: "마지막 메시지 1",
            lastTime: "2022-05-01 23:00",
            roomId: "1",
        },
        {
            roomName: "말 잘듣는 원숭이2",
            lastMessage: "마지막 메시지 2",
            lastTime: "2022-05-01 23:00",
            roomId: "2",
        },
        {
            roomName: "말 잘듣는 원숭이3",
            lastMessage: "마지막 메시지 3",
            lastTime: "2022-05-01 23:00",
            roomId: "3",
        },
    ];

    return (
        <React.Fragment>
            <Grid>
                {chatList.map((chat, i) => {
                    return (
                        <ChatRoom onClick={() => navigate(`/chat/${chat.roomId}`)} key={i}>
                            <Text>{chat.roomName}</Text>
                            <Text>{chat.lastMessage}</Text>
                            <Text>{chat.lastTime}</Text>
                            {/* <button>
                  <Modal roomId={chat.roomId} open={isModalOpen}></Modal>
                </button> */}
                        </ChatRoom>
                    );
                })}
            </Grid>
        </React.Fragment>
    );
}

export default ChatList;

const Grid = styled.div`
    width: 80vw;
    height: 80vh;
    margin: 20vh auto 0;
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
