import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { diaryApi } from "../../apis/diaryApi";
import useRecordVoice from "../../hooks/useRecordVoice";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useMutation, useQueryClient } from "react-query";
import { getCookie } from "../../utils/cookie";
import {recordIcon, lockIcon, microphone, microphoneBlue} from "../../static/images/resources";
import VoicePopup from "./VoicePopup";

CommentInput.propTypes = {
    postId: PropTypes.string,
    diary: PropTypes.object,
    parentCommentId: PropTypes.string,
    setParentId: PropTypes.func,
};

function CommentInput(props) {
    const { diary, postId, parentCommentId, setParentId } = props;
    const [comment, setComment] = useState("");
    const [isLocked, setIsLocked] = useState(false);

    const [isOpenVoicePopup, setIsOpenVoicePopup] = useState(false);
    const [recordTime, setRecordTime] = useState("");
    const token = getCookie("authorization");

    const {
        recordVoice,
        stopRecord,
        recordPause,
        replay,
        play,
        audioUrl,
        deleteVoice,
        onRec,
        finishRecord,
        isPlaying,
        isPaused,
        completeRecord,
        isShowSpeaker,
        recordReset,
        playingPause,
        setIsPlaying,
        toggleListening,
        isListening,
    } = useRecordVoice();

    const lockHandler = () => {
        setIsLocked((prev) => !prev);
    };

    const queryClient = useQueryClient();
    const ws = useRef();

    const mutation = useMutation(() => diaryApi.createComment(postId, comment, audioUrl, isLocked, parentCommentId), {
        onSuccess: () => {
            queryClient.invalidateQueries("diaryDetail");
            setComment("");
        },
    });

    // if(mutation.isSuccess){
    //     setComment("");
    //     window.alert("댓글 저장 성공!");
    // } else if (mutation.isError) {
    //     window.alert("오류가 발생했어요! 다시 시도해주세요 😂");
    // }

    const onChangeHandler = (e) => {
        if (e.target.value.length > 150) {
            return;
        }

        setComment(e.target.value);
    };

    const saveComment = () => {
        setParentId("");
        mutation.mutate(postId, comment, audioUrl, isLocked, parentCommentId);
    };

    const onClick = async () => {
        saveComment();
        try {
            // 보낼 메시지
            const message = {
                message: `[${diary.title}]에 댓글이 달렸어요!`,
                postUuid: postId,
                otherUserId: diary.userId, // 새 댓글 알람을 받을 사람
                type: "ENTER",
            };

            if (comment === "") {
                return;
            }
            ws.current.send("/pub/chat/alarm", { token: token }, JSON.stringify(message));
            setText("");
        } catch (error) {
            console.log(error);
        }
    };

    const onKeyPressHandler = (e) => {
        if (e.key === "Enter") {
            onClick();
        }
    };

    const closeVoicePopup = () => {
        setIsOpenVoicePopup(false);
    };

    const SaveRecordTime = (time) => {
        setRecordTime(time);
    };

    useEffect(() => {
        let sock = new SockJS(`${process.env.REACT_APP_BASE_URL}/stomp/chat`);
        let client = Stomp.over(sock);
        ws.current = client;

        return () => {
            ws.current = null;
        };
    }, []);

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
                    <ButtonArea>
                        <VoiceButton onClick={() => setIsOpenVoicePopup(true)} src={microphoneBlue}/>
                        {isShowSpeaker && <PlayButton onClick={play}>듣기</PlayButton>}
                    </ButtonArea>
                    <IconRightArea>
                        <LockIcon>
                            <img src={lockIcon} alt={"lockIcon"} />
                            <input checked={isLocked} onChange={lockHandler} type={"checkbox"} />
                        </LockIcon>
                        <TextLength>{comment.length}/150</TextLength>
                        <PostButton onClick={onClick}>등록하기</PostButton>
                    </IconRightArea>
                </IconArea>
            </InputContainer>
            {isOpenVoicePopup && (
                <VoicePopup
                    closePopup={closeVoicePopup}
                    play={play}
                    recordVoice={recordVoice}
                    recordPause={recordPause}
                    stopRecord={stopRecord}
                    finishRecord={finishRecord}
                    isPlaying={isPlaying}
                    onRec={onRec}
                    isPaused={isPaused}
                    replay={replay}
                    completeRecord={completeRecord}
                    recordReset={recordReset}
                    SaveRecordTime={SaveRecordTime}
                    deleteVoice={deleteVoice}
                    playingPause={playingPause}
                    setIsPlaying={setIsPlaying}
                    toggleListening={toggleListening}
                    isListening={isListening}
                />
            )}
        </React.Fragment>
    );
}

export default CommentInput;

const InputContainer = styled.div`
    width: 884px;
    height: 87px;
    border-radius: 5px;
    background-color: #bcc4de;

  @media only screen and (max-width: 420px) {
    width: 320px;
    height: 75px;
    background: #C6D3EC;
    border-radius: 5px;
  }
  
`;

const Input = styled.input`
    outline: none;
    border: none;
    width: 842px;
    height: 43px;
    padding-left: 18px;
    margin: 13px 21px 9px;
    border-radius: 3px;
    box-sizing: border-box;

  @media only screen and (max-width: 420px) {
    width: 303px;
    height: 30px;
    padding: 7px 10px;
    margin: 10px 9px;
  }
  
    ::placeholder {
        font-size: 13px;
        line-height: 16px;
        color: #a59f9f;
    }
`;

const ButtonArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const VoiceButton = styled.img`
    cursor: pointer;
    width: 12px;
    height: 16px;
`;

const PlayButton = styled.div`
    cursor: pointer;
    font-size: 13px;
`;

const TextLength = styled.div`
      margin-right: 21px;
      font-size: 10px;
      line-height: 13px;
      color: #354569;
      padding-top: 3px;
`;

const PostButton = styled.div`
    cursor: pointer;
    background-color: #08105d;
    border-radius: 3px;
    font-size: 10px;
    line-height: 13px;
    text-align: center;
    color: #ffffff;
    height: 17px;
    width: 56px;
    padding-top: 3px;
    box-sizing: border-box;
`;

const IconArea = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0 21px;

  @media only screen and (max-width: 420px) {
    padding: 0 9px;
  }
`;

const IconRightArea = styled.div`
    display: flex;
    align-items: flex-start;
`;

const LockIcon = styled.div`
    img {
        margin-right: 9px;
    }

    input {
        width: 15px;
        height: 15px;
        margin-right: 21px;
    }
`;
