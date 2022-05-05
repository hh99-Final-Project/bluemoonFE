import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Grid, Text } from "../../elements/index";

ChatMessage.propTypes = {
    message: PropTypes.string,
    nickname: PropTypes.string,
    createdAt: PropTypes.string,
};

function ChatMessage(props) {
    const { message, nickname, createdAt } = props;

    const user = nickname === "말 잘든는 원숭이" ? true : false;

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
    display: flex;
    flex-direction: column;
    align-items: ${(props) => (props.user ? "flex-end" : "flex-start")};
    margin: 0 20px;
    height: 70px;
`;

const MessageBox = styled.div`
    display: flex;
    flex-direction: ${(props) => (props.user ? "row-reverse" : "row")};
    height: 61.533203125px;
`;

const Message = styled.div`
    padding: 4%;
    border-radius: ${(props) => (props.user ? "10px 0 10px 10px" : "0 10px 10px 10px")};
    background-color: ${(props) => (props.user ? "#293252" : "#707CA4")};
    flex-direction: ${(props) => (props.user ? "row-reverse" : "row")};
    word-break: break-all;
    color: white;
`;

const CreatedAt = styled.div`
    display: table-cell;
    vertical-align: middle;
`;
