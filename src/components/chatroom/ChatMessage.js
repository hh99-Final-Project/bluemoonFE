import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import { Grid, Text } from "../../elements/index";

ChatMessage.propTypes = {

};

function ChatMessage(props) {

    const { message, nickname, createdAt } = props;

    if (nickname === "말 잘든는 원숭이") {
        return (
            <React.Fragment>
                <Box user={true}>
                    <Nickname>
                        <Text bold>{nickname}</Text>
                    </Nickname>
                    <div className="messageBox">
                        <div className="message">{message}</div>
                        <div>{createdAt}</div>
                    </div>
                </Box>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <Box user={false}>
                <Nickname>
                    <Text bold>{nickname}</Text>
                </Nickname>
                <div className="messageBox">
                    <div className="message">{message}</div>
                    <div>{createdAt}</div>
                </div>
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
  height: 15%;
  .messageBox {
    display: flex;
    flex-direction: ${(props) => (props.user ? "row-reverse" : "row")};
  }
  .message {
    padding: 4%;
    border: ${(props) => (props.user ? "none" : "1px solid #D2D2D2")};
    border-radius: ${(props) =>
    props.user ? "10% 0 10% 10%" : "0 10% 10% 10%"};
    background-color: ${(props) => (props.user ? "#FAEfE1" : "#BAAAE1")};
    flex-direction: ${(props) => (props.user ? "row-reverse" : "row")};
    word-break: break-all;
  }
`;