import React from "react";
import {useNavigate, useParams} from "react-router-dom";
// import { Grid, Text } from "../../elements/index";
import { ChatBox } from "../components/chatroom";
import SockJS from "sockjs-client";
import StompJs from "@stomp/stompjs";


const Chat = () => {
    const navigate = useNavigate();
    const params = useParams();

    const { roomId } = params;
    console.log({ roomId });

    return (
        <div>
            <ChatBox/>
            <div onClick={() => navigate('/chatlist')}>채팅 리스트로 돌아가기</div>
        </div>
    );
};

export default Chat;