import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { diaryApi } from "../../apis/diaryApi";
import useRecordVoice from "../../hooks/useRecordVoice";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useMutation, useQueryClient } from "react-query";
import { getCookie } from "../../utils/cookie";
import { lockIcon, microphoneBlue, listenIcon } from "../../static/images/resources";
import VoicePopup from "./VoicePopup";
import { useTimer } from "react-timer-hook";
import { timeFormatter, timeFormatter2 } from "../../utils/convertDate";
import { setLoginModalOpen } from "../../redux/modules/commonSlice";
import { isMobile } from "react-device-detect";
import { useMediaQuery } from "react-responsive";
import { MyTimer } from "./Timer";
import { setUserPoint } from "../../redux/modules/userSlice";
import Login from "../user/Login";

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
    const [recordTime, setRecordTime] = useState(0);
    const [time, setTime] = useState("");
    const [expireTime, setExpireTime] = useState(new Date());
    const token = localStorage.getItem("accessToken");
    const isModalOpen = useSelector((state) => state.commonSlice.isModalOpen);

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
        resetShowSpeaker,
        recordReset,
        playingPause,
        setIsPlaying,
        toggleListening,
        isListening,
        playingStop,
        playingHandler,
    } = useRecordVoice();

    const { timerSec, timerMin, TimerIsRunning, TimerRestart, TimerPause } = MyTimer(expireTime);

    const isMobileQuery = useMediaQuery({
        query: "(max-width: 420px)",
    });

    const lockHandler = () => {
        setIsLocked((prev) => !prev);
    };

    const queryClient = useQueryClient();
    const ws = useRef();
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.userSlice.isLogin);
    const userInfo = useSelector((state) => state.userSlice.userInfo);

    const mutation = useMutation(
        () => diaryApi.createComment(postId, comment, audioUrl, isLocked, parentCommentId, time),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("diaryDetail");
                setComment("");
                resetShowSpeaker();
            },
        },
    );

    const onChangeHandler = (e) => {
        if (e.target.value.length > 150) {
            return;
        }

        setComment(e.target.value);
    };

    const saveComment = () => {
        setParentId("");
        setComment("");
        deleteVoice();

        mutation.mutate(postId, comment, audioUrl, isLocked, parentCommentId, time, {
            onSuccess: async (data) => {
                dispatch(setUserPoint(data.data.point));
            },
        });
    };

    const onClick = async () => {
        if (!isLogin) {
            dispatch(setLoginModalOpen({ open: true }));
            return;
        }

        if (comment.length === 0 && audioUrl === undefined) {
            window.alert("내용 혹은 음성을 등록해주세요!");
            return;
        }

        saveComment();
        try {
            // 콘솔에 웹소켓 디버그 내용 안보이도록 처리
            ws.current.debug = function (str) {};
            ws.current.debug();
            // 보낼 메시지
            const message = {
                message: `[${diary.title}]에 댓글이 달렸어요!`,
                postUuid: postId,
                otherUserId: diary.userId, // 새 댓글 알람을 받을 사람
            };

            if (comment === "") {
                return;
            }

            if (userInfo.userId !== diary.userId) {
                ws.current.send("/pub/chat/alarm", { token: token }, JSON.stringify(message));
            }
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
        setTime(timeFormatter2(Math.floor(time / 60)) + ":" + timeFormatter2(time % 60));
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
                <Input
                    isShowSpeaker={isShowSpeaker}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    value={comment}
                    placeholder={isShowSpeaker ? "" : "댓글을 남겨주세요"}
                />
                <IconArea>
                    <ButtonArea>
                        {!isMobile && !isMobileQuery && (
                            <VoiceButton onClick={() => setIsOpenVoicePopup(true)} src={microphoneBlue} />
                        )}

                        {isShowSpeaker && (
                            <PlayArea>
                                <PlayButton />
                                <img
                                    onClick={() => {
                                        const now = new Date();
                                        let addedNow = now.setSeconds(now.getSeconds() + recordTime);
                                        setExpireTime(new Date(addedNow));

                                        if (isPlaying) {
                                            playingStop();
                                            playingHandler(false);
                                            TimerPause();
                                        } else {
                                            //중지라면 다시 재생, 타이머 재생
                                            play();
                                            TimerRestart(new Date(addedNow));
                                        }
                                    }}
                                    src={listenIcon}
                                    alt={"listenIcon"}
                                />
                                <TimeArea>
                                    {TimerIsRunning
                                        ? timeFormatter2(timerMin) + ":" + timeFormatter2(timerSec)
                                        : timeFormatter(recordTime).min + ":" + timeFormatter(recordTime).sec}
                                </TimeArea>
                            </PlayArea>
                        )}
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
                    recordTime={recordTime}
                    deleteVoice={deleteVoice}
                    playingPause={playingPause}
                    setIsPlaying={setIsPlaying}
                    toggleListening={toggleListening}
                    isListening={isListening}
                />
            )}
            {isModalOpen && <Login />}
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
        background: #c6d3ec;
        border-radius: 5px;
    }
`;

const Input = styled.input`
    outline: none;
    border: none;
    width: 842px;
    height: 43px;
    padding-left: ${(props) => (props.isShowSpeaker ? "90px" : "18px")};
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
    position: relative;
`;

const VoiceButton = styled.img`
    cursor: pointer;
    width: 12px;
    height: 16px;
`;

const PlayButton = styled.div`
    font-size: 12px;
    margin-left: 5px;
`;

const PlayArea = styled.div`
    position: absolute;
    bottom: 30px;
    left: 5px;
    background-color: rgba(198, 211, 236, 0.8);
    border-radius: 10px;
    width: 76px;
    height: 33px;
    display: flex;
    align-items: center;

    img {
        width: 26px;
        height: 26px;
        cursor: pointer;
    }

    @media only screen and (max-width: 420px) {
        width: 60px;
        height: 22px;
        font-size: 10px;

        img {
            width: 14px;
            height: 14px;
        }
    }
`;
const TimeArea = styled.div`
    font-size: 12px;
    line-height: 15px;
    color: #08105d;
    margin-left: 4px;

    @media only screen and (max-width: 420px) {
        font-size: 10px;
    }
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
