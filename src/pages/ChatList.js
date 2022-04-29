import React, { useState } from "react";
import styled from "styled-components";
// import Modal from "../components/modal";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

ChatList.propTypes = {

};

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
    //   api.get("/api/rooms", {
    //     headers: {
    //       Authorization: `//쿠키에서 토큰 받아오기`,
    //     },
    //   },
    //   { withCredentials: true })
    //   .then((res) => {
    //     console.log(res)
    //     // 컴포넌트 스테이트에 바로 저장
    // setRoomList(res.data);
    //   })
    // })

    // const enterRoom = (e) => {
    //   e.preventDefault();
    //   router.push("/chat/${i.roomId}") ;
    // };

    let roomList = [
        {
            roomName: "말 잘듣는 원숭이1",
            lastMessage: "마지막 메시지 1",
            lastTime: "마지막 메시지 온 시간",
            roomId: "1",
        },
        {
            roomName: "말 잘듣는 원숭이2",
            lastMessage: "마지막 메시지 2",
            lastTime: "마지막 메시지 온 시간",
            roomId: "2",
        },
        {
            roomName: "말 잘듣는 원숭이3",
            lastMessage: "마지막 메시지 3",
            lastTime: "마지막 메시지 온 시간",
            roomId: "3",
        },
    ];



    return (
        <React.Fragment>
            <Grid>
                {/* roomList 맵 반복문. 옵셔널 체이닝 사용 -> 오류 때문에 체이닝 제거합니다 ㅠㅠ */}
                {roomList.map((i, idx) => {
                    return (

                        <ChatRoom onClick={() => navigate(`/chat/${i.roomId}`)} key={idx}>
                            <Text>{i.roomName}</Text>
                            <Text>{i.lastMessage}</Text>
                            <Text>{i.lastTime}</Text>
                            {/* 모달은 좀 나중에... */}
                            {/* <button>
                  <Modal roomId={i.roomId} open={isModalOpen}></Modal>
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
  height: 90%;
  margin: 10% auto;
  display: flex;
  flex-direction: column;
  background-color: lightblue;
`;

const ChatRoom = styled.div`
  width: 90%;
  height: 15%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid black;
  margin: 1% auto;
  padding: 10px;
`;

const Text = styled.div``;