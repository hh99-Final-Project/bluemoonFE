import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { chatApis } from "../../apis/chatApis";

import SockJS from "sockjs-client";
import StompJs from "@stomp/stompjs";

ChatBox.propTypes = {};

function ChatBox(props) {
  const navigate = useNavigate();
  const params = useParams();
  const { roomId } = params;
  console.log({ roomId });

  // 채팅방 이전 메시지 호출
  // useEffect(() => {
  //    chatApis.getChatMessage(roomId)
  //    .then
  // })

  // React.useEffect(() => {
  //   ConnectSub(token);
  //   return () => {
  //     DisConnectUnsub();
  //   };
  // }, []);

  // 1. stomp 프로토콜 위에서 sockJS 가 작동되도록 클라이언트 생성
  // let sock = new SockJS("연결할 url");
  // let ws = StompJs.over(sock);

  // // 연결 및 구독. 파라메터로 토큰 넣어야 함
  // function ConnectSub() {
  //   try {
  //     ws.connect(
  //       {
  //         // 토큰 넣어야 함
  //       },
  //       () => {
  //         ws.subscribe(
  //           // 구독 주소 서버와 확인 필요
  //           `/sub/api/chat/room/${roomId}`,
  //           (response) => {
  //             const newMessage = JSON.parse(response.body);
  //           },
  //           // 토큰 넣어야 함
  //           {}
  //         );
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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

  return (
    <Wrapper>
      <MessageWrapper>
        {message.map((message, idx) => {
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
        <ChatInput />
      </InputWrpper>
    </Wrapper>
  );
}

export default ChatBox;

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
