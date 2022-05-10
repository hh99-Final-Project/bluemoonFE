import React, { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { diaryApi } from "../../apis/diaryApi";
import useRecordVoice from "../../hooks/useRecordVoice";
// import recordIcon from "../../static/images/microphone.svg";
import lockIcon from "../../static/images/lockIcon.svg";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

CommentInput.propTypes = {
    postId: PropTypes.string,
};

function CommentInput(props) {
    const { diary, postId } = props;
    const [comment, setComment] = useState("");

    const { recordVoice, stopRecord, pause, replay, play, audioUrl } = useRecordVoice();

    const onChangeHandler = (e) => {
        if (e.target.value.length > 150) {
            return;
        }

        setComment(e.target.value);
    };

    const saveComment = () => {
        diaryApi.createComment(postId, comment, audioUrl).then((response) => {
            if (response.status === 200) {
                setComment("");
            }
        });
    };

    const userInfo = useSelector((state) => state.userSlice.userInfo);
    console.log(userInfo);

    let sock = new SockJS("http://121.139.34.35:8080/stomp/chat");
    let ws = Stomp.over(sock);

    const onClick = async () => {
        saveComment();
        try {
            // send할 데이터
            const message = {
                message: `[${diary.title}]에 댓글이 달렸어요!`,
                postUuid: postId,
                userId: diary.userId, // 새 댓글 알람을 받을 사람 입력
                type: "ENTER",
            };

            if (comment === "") {
                return;
            }
            // 로딩 중
            waitForConnection(ws, function () {
                ws.send(`/pub/chat/message/${diary.userId}`, {}, JSON.stringify(message));
                console.log(ws.ws.readyState);
                // setText("");
            });
        } catch (error) {
            console.log(error);
            console.log(ws.ws.readyState);
        }
    };

    // const onSend = async () => {
    //     try {
    //         // send할 데이터
    //         const message = {
    //             roomId: roomId,
    //             message: text,
    //             userId: userInfo.userId, // 메시지 보내는 사람
    //             type: "ENTER",
    //         };

    //         if (text === "") {
    //             return;
    //         }
    //         // 로딩 중
    //         waitForConnection(ws, function () {
    //             ws.send("/pub/chat/message", {}, JSON.stringify(message));
    //             // ws.send("/pub/chat/message", {});
    //             console.log(ws.ws.readyState);
    //             // setText("");
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         console.log(ws.ws.readyState);
    //     }
    // };

    // // 웹소켓이 연결될 때 까지 실행
    function waitForConnection(ws, callback) {
        setTimeout(
            function () {
                // 연결되었을 때 콜백함수 실행
                if (ws.ws.readyState === 1) {
                    callback();
                    // 연결이 안 되었으면 재호출
                } else {
                    waitForConnection(ws, callback);
                }
            },
            10, // 밀리초 간격으로 실행
        );
    }

    const onKeyPressHandler = (e) => {
        if (e.key === "Enter") {
            // saveComment();
            onClick();
        }
    };

    return (
        <React.Fragment>
            <InputContainer>
                {/*<VoiceButton onClick={recordVoice}>음성녹음</VoiceButton>*/}
                {/*<StopButton onClick={stopRecord}>중지</StopButton>*/}
                <Input
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    value={comment}
                    placeholder="댓글을 남겨주세요"
                />
                <IconArea>
                    <VoiceButton>
                        {/*<img src={recordIcon} alt={"recordIcon"} />*/}
                    </VoiceButton>
                    <IconRightArea>
                        <LockIcon>
                            <img src={lockIcon} alt={"lockIcon"} />
                            <input type={"checkbox"} />
                        </LockIcon>
                        <TextLength>{comment.length}/150</TextLength>
                        <PostButton onClick={onClick}>등록하기</PostButton>
                    </IconRightArea>
                </IconArea>
            </InputContainer>
        </React.Fragment>
    );
}

export default CommentInput;

const InputContainer = styled.div`
    margin-top: 10px;
    width: 877px;
    height: 86px;
    border-radius: 5px;
    background-color: #bcc4de;
`;

const Input = styled.input`
    outline: none;
    border: none;
    width: 856px;
    height: 40px;
    padding: 13px;
    margin: 11px 10px 8px;
    border-radius: 3px;
    box-sizing: border-box;
    ::placeholder {
        font-size: 13px;
        line-height: 16px;
        color: #a59f9f;
    }
`;

const VoiceButton = styled.div`
    cursor: pointer;
    margin-right: 20px;
`;

const TextLength = styled.div`
    margin: 0 10px;
    font-size: 10px;
    line-height: 12px;
`;

const PostButton = styled.div`
    cursor: pointer;
    background-color: #08105d;
    border-radius: 3px;
    font-size: 10px;
    line-height: 12px;
    text-align: center;
    color: #ffffff;
    padding: 7px 10px 6px;
`;

const IconArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
`;
const IconRightArea = styled.div`
    display: flex;
    align-items: center;
`;

const LockIcon = styled.div`
    img {
        margin-right: 4px;
    }

    input {
        width: 15px;
        height: 15px;
    }
`;
