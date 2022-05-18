import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useSelector } from "react-redux";

ChatMessage.propTypes = {
    message: PropTypes.string,
    userId: PropTypes.string,
    createdAt: PropTypes.string,
};

function ChatMessage(props) {
    const { message, userId, createdAt } = props;

    // 보내는 사람
    const userInfo = useSelector((state) => state.userSlice.userInfo);

    // 채팅 메시지 보낸 사람과 현재 로그인한 사람을 비교하여 같은 사람이면 true 다르면 false
    // 본인이 보낸 채팅 메시지는 오른쪽에 표시, 아닌 사람은 왼쪽에 표시한다.
    const user = userId === userInfo.userId ? true : false;

    return (
        <React.Fragment>
            <Box user={user}>
                <MessageBox user={user}>
                    <Message user={user}>{message}</Message>
                    <CreatedAt>{createdAt}</CreatedAt>
                </MessageBox>
            </Box>
        </React.Fragment>
    );
}

export default ChatMessage;

const Box = styled.div`
    align-items: ${(props) => (props.user ? "flex-end" : "flex-start")};
    margin: 10px;
    // height: 70px;
`;

const MessageBox = styled.div`
    display: flex;
    flex-direction: ${(props) => (props.user ? "row-reverse" : "row")};
    align-items: flex-end;
    margin: 10px;
`;

const Message = styled.div`
    max-width: 70%;
    padding: 10px 15px;
    border-radius: 10px;
    background-color: ${(props) => (props.user ? "rgba(8, 17, 52, 0.6);" : "rgba(163, 171, 199, 0.6);")};
    margin: ${(props) => (props.user ? "0 0 0 5px" : "0 5px 0 0")};
    flex-direction: ${(props) => (props.user ? "row-reverse" : "row")};
    word-break: keep-all;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;

    color: #ffffff;
`;

const CreatedAt = styled.div`
    display: table-cell;
    vertical-align: middle;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 13px;
    text-align: center;

    color: #c6d3ec;
`;
