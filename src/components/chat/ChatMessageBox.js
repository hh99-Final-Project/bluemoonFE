import React from "react";
import ChatMessage from "./ChatMessage";
import styled from "styled-components";

const ChatMessageBox = ({ messages, scrollRef }) => {
    return (
        <MessageWrapper>
            {messages.length > 0 &&
                messages.map((message, idx) => {
                    return (
                        <ChatMessage
                            key={idx}
                            message={message.message}
                            userId={message.userId}
                            createdAt={message.createdAt}
                        />
                    );
                })}
            <div ref={scrollRef} />
        </MessageWrapper>
    );
};

// 성능 최적화. React.memo()를 사용, props 값이 변하지 않으면 리랜더링 되지 않음.
export default React.memo(ChatMessageBox);

const MessageWrapper = styled.div`
    width: 942px;
    height: 375px;
    margin-top: 19px;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #d3d3d3;
        border-radius: 50px;
    }
    &::-webkit-scrollbar-track {
        background-color: #08105d;
        border-radius: 50px;
    }

    @media only screen and (max-width: 420px) {
        width: 319px;
        height: 65vh;
        top: 0;
        left: 0;
        margin-top: 12px;
    }
`;
