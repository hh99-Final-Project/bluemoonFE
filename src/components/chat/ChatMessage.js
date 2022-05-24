import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

ChatMessage.propTypes = {
    message: PropTypes.string,
    userId: PropTypes.number,
    createdAt: PropTypes.string,
};

function ChatMessage(props) {
    const { message, userId, createdAt } = props;

    // 보내는 사람
    const userInfo = useSelector((state) => state.userSlice.userInfo);

    // 채팅 메시지 보낸 사람과 현재 로그인한 사람을 비교하여 같은 사람이면 true 다르면 false
    // 본인이 보낸 채팅 메시지는 오른쪽에 표시, 아닌 사람은 왼쪽에 표시한다.
    const user = userId === userInfo.userId ? true : false;

    const isMobile = useMediaQuery({
        query: "(max-width: 420px)",
    });

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
    margin-bottom: 15px;
    word-break: break-all;
  
`;

const MessageBox = styled.div`
    display: flex;
    flex-direction: ${(props) => (props.user ? "row-reverse" : "row")};
    align-items: flex-end;
    margin: ${(props) => (props.user ? "0 23px 0 0" : "0 0 0 23px")};

    @media only screen and (max-width: 420px) {
        margin: ${(props) => (props.user ? "0 7px 0 0" : "0 0 0 5px")};
    }
`;

const Message = styled.div`
    max-width: 70%;
    padding: 10px 15px;
    border-radius: 8px;
    background-color: ${(props) => (props.user ? "rgba(8, 17, 52, 0.6);" : "rgba(163, 171, 199, 0.6);")};
    margin: ${(props) => (props.user ? "0 0 0 5px" : "0 5px 0 0")};
    flex-direction: ${(props) => (props.user ? "row-reverse" : "row")};

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;

    color: #ffffff;

    @media only screen and (max-width: 420px) {
        padding: 14px 10px;

        font-size: 12px;
        line-height: 15px;
    }
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

    @media only screen and (max-width: 420px) {
        font-size: 8px;
        line-height: 10px;
    }
`;
