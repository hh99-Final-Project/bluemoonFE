import React from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { Grid, Text } from "../../elements/index";
import ChatBox from "../components/chat/ChatBox";
import styled from "styled-components";

const ChatDetail = () => {
    const navigate = useNavigate();
    const params = useParams();

    const { roomId } = params;
    console.log({ roomId });

    return (
        <div>
            <ChatBox />
            <BackButton onClick={() => navigate("/chatlist")}>채팅 리스트로 돌아가기</BackButton>
        </div>
    );
};

export default ChatDetail;

const BackButton = styled.div`
    width: 184px;
    height: 65px;
    background-color: #787878;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;
