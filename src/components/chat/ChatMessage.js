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
    // const cookie = getCookie("authorization");

    // 보내는 사람
    const userInfo = useSelector((state) => state.userSlice.userInfo);
    console.log(userInfo);

    // 채팅 메시지 보낸 사람과 현재 로그인한 사람을 비교하여 같은 사람이면 true 다르면 false
    // 본인이 보낸 채팅 메시지는 오른쪽에 표시, 아닌 사람은 왼쪽에 표시한다.
    const user = userId === userInfo.userId ? true : false;

    return (
        <React.Fragment>
            {/* <Box user={user}>
                <div className="messageBox">
                    <Message>{message}</Message>
                    <div>{createdAt}</div>
                </div>
            </Box> */}

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

const Nickname = styled.div`
    display: flex;
`;

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
    padding: 15px;
    border-radius: 10px;
    // border-radius: ${(props) => (props.user ? "10px 0 10px 10px" : "0 10px 10px 10px")};
    background-color: ${(props) => (props.user ? "#293252" : "#707CA4")};
    flex-direction: ${(props) => (props.user ? "row-reverse" : "row")};
    word-break: break-all;
    color: white;
`;

const CreatedAt = styled.div`
    display: table-cell;
    vertical-align: middle;
`;
