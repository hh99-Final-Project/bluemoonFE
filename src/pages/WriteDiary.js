import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CategoryBar from "../shared/CategoryBar";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import useRecordVoice from "../hooks/useRecordVoice";
import Popup from "../shared/Popup";
import { diaryApi } from "../apis/diaryApi";
import useStore from "../zustand/store";
import { useSelector, useDispatch } from "react-redux";
import { VoicePopup } from "../components/diary";
import { backIcon, saveIcon, recordIcon, listenIcon, listenVoiceIcon } from "../static/images/resources";
import { Layout, MobileTitleName } from "../components/common";
import { useMutation, useQueryClient } from "react-query";
import { color } from "../utils/designSystem";
import { useMediaQuery } from "react-responsive";
import { isModalOpen } from "../redux/modules/commonSlice";
import { timeFormatter, timeFormatter2 } from "../utils/convertDate";
import { MyTimer } from "../components/diary/Timer";
import { isMobile } from "react-device-detect";
import { setUserPoint } from "../redux/modules/userSlice";

function WriteDiary() {
    const navigate = useNavigate();
    const { setCurrentHeader } = useStore();

    const isLogin = useSelector((state) => state.userSlice.isLogin);
    const userInfo = useSelector((state) => state.userSlice.userInfo);
    useEffect(() => {
        if (isLogin && userInfo.nickname === "") {
            navigate("/signup");
        }
    }, []);

    const isMobile = useMediaQuery({
        query: "(max-width: 420px)",
    });

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
        playingHandler,
        toggleListening,
        isListening,
        playingStop,
        myAudio,
    } = useRecordVoice();

    const [title, setTitle] = useState("");
    const [diary, setDiary] = useState("");
    const [recordTime, setRecordTime] = useState();
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [isOpenSuccessPopup, setIsOpenSuccessPopup] = useState(false);
    const [isOpenVoicePopup, setIsOpenVoicePopup] = useState(false);
    const [expireTime, setExpireTime] = useState();

    // const userInfo = useSelector((state) => state.userSlice.userInfo);
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const isMobileQuery = useMediaQuery({
        query: "(max-width: 420px)",
    });

    const onChangeTitleHandler = (e) => {
        if (e.target.value.length > 30) {
            return;
        }
        setTitle(e.target.value);
    };

    const onChangeContentHandler = (e) => {
        //일단 최대 길이를 500자로만 설정했습니다. 기획에 따라 변동합니다.
        if (e.target.value.length > 500) {
            return;
        }
        setDiary(e.target.value);
    };

    const SaveRecordTime = (time) => {
        setRecordTime(time);
    };

    //useMutaion을 통해 등록 및 post가 일어나면 기존 쿼리 무효화
    const mutation = useMutation(() => diaryApi.createPost(title, diary, audioUrl, recordTime), {
        onSuccess: () => {
            // queryClient.invalidateQueries("diary");
        },
    });

    const onClickHandler = (e) => {
        if (!userInfo) {
            dispatch(isModalOpen(true));
            return;
        }

        if (title.length === 0) {
            window.alert("제목을 작성해주세요!");
            return;
        }
        if (diary.length === 0 && audioUrl === undefined) {
            window.alert("내용 혹은 음성 다이어리를 등록해주세요!");
            return;
        }

        setIsOpenPopup(true);
    };

    const successHandler = () => {
        mutation.mutate(
            { title, diary, audioUrl, recordTime },
            {
                onSuccess: async (data) => {
                    dispatch(setUserPoint(data.data.point));
                    navigate("/mypage");
                },
            },
        );
    };

    const closeVoicePopup = () => {
        setIsOpenVoicePopup(false);
    };

    const handler = (e) => {
        if (diary.length > 0) {
            e.preventDefault();
            e.returnValue = "작성 중인데 정말 나가시겠습니까?";
        }
    };

    const { timerSec, timerMin, TimerIsRunning, TimerRestart, TimerPause } = MyTimer(expireTime);

    useEffect(() => {
        setCurrentHeader("포스트");

        return () => {
            if (myAudio) {
                myAudio.pause();
            }
        };
    }, [myAudio]);

    useEffect(() => {
        window.addEventListener("beforeunload", handler);

        return () => {
            window.removeEventListener("beforeunload", handler);
        };
    }, [diary]);

    return (
        <Layout>
            <WriteContainer>
                <Header />
                {!isMobile ? (
                    <CategoryBar />
                ) : (
                    <MobileTitleName onClick={onClickHandler} title={"글*쓰기"} pos={6} type={"write"} />
                )}

                <PostAreaContainer BgColor={color.containerBoxColor}>
                    <PostHeader>
                        <BackToListButton onClick={() => navigate(-1)} src={backIcon} />
                        <SaveDiaryButton onClick={onClickHandler} src={saveIcon} />
                    </PostHeader>
                    <WriteArea>
                        <PostText placeholder="제목을 작성해주세요" onChange={onChangeTitleHandler} value={title} />
                        <PostContainer>
                            <PostArea
                                isShowSpeaker={isShowSpeaker}
                                placeholder={
                                    isShowSpeaker
                                        ? ""
                                        : "500자 내로 작성해주세요. 당신이 작성한 고민은 다른 주인들에게 보여집니다."
                                }
                                onChange={onChangeContentHandler}
                                value={diary}
                            />
                            <PostAreaBottomIcons>
                                <VoiceLeft>
                                    {!isMobile && !isMobileQuery && (
                                        <RecordArea isPlaying={isPlaying} onClick={() => setIsOpenVoicePopup(true)}>
                                            <img src={recordIcon} alt={"record"} />
                                            {isPlaying ? <div>듣는 중입니다</div> : <div>음성 등록</div>}
                                        </RecordArea>
                                    )}
                                </VoiceLeft>
                                <PostLength>{diary.length}/500</PostLength>
                            </PostAreaBottomIcons>
                        </PostContainer>

                        {isShowSpeaker && (
                            <SoundPlayIcon>
                                <SpeakerIcon
                                    onClick={() => {
                                        const now = new Date();
                                        let addedNow = now.setSeconds(now.getSeconds() + recordTime);
                                        setExpireTime(new Date(addedNow));

                                        //이미 재생중이라면 중지, 타이머 stop
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
                                />

                                <TimeArea>
                                    {TimerIsRunning
                                        ? timeFormatter2(timerMin) + ":" + timeFormatter2(timerSec)
                                        : timeFormatter(recordTime).min + ":" + timeFormatter(recordTime).sec}
                                </TimeArea>
                            </SoundPlayIcon>
                        )}
                    </WriteArea>
                </PostAreaContainer>

                {isOpenPopup && (
                    <Popup
                        title={"소중한 이야기를/다이어리에 기록할까요?"}
                        close={() => setIsOpenPopup(false)}
                        event={() => successHandler()}
                    />
                )}
                {isOpenSuccessPopup && (
                    <Popup
                        title={"당신의 이야기가/전해졌습니다"}
                        close={() => setIsOpenSuccessPopup(false)}
                        event={() => navigate("/mypage")}
                    />
                )}
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
                        playingHandler={playingHandler}
                        toggleListening={toggleListening}
                        isListening={isListening}
                        isOpenVoicePopup={isOpenVoicePopup}
                    />
                )}
            </WriteContainer>
            <Footer />
        </Layout>
    );
}

export default WriteDiary;

const WriteContainer = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;

    @media only screen and (max-width: 420px) {
        width: 320px;
        margin: auto;
        position: static;
    }
`;

const PostAreaContainer = styled.div`
    margin: auto;
    width: 950px;
    height: 530px;
    background: ${(props) => props.BgColor};
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-sizing: border-box;
    box-shadow: 0 0 70px #465981;
    backdrop-filter: blur(80px);
    border-radius: 25px;
    position: relative;
    z-index: 3;

    @media only screen and (max-width: 420px) {
        width: 320px;
        box-shadow: none;
        padding: 0;
        border: none;
        background: none;
        position: relative;
    }
`;

const PostHeader = styled.div`
    width: 100%;
    height: 52px;
    background-color: rgba(8, 17, 52, 0.3);
    margin: 23px 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media only screen and (max-width: 420px) {
        display: none;
    }
`;

const BackToListButton = styled.img`
    margin-left: 39px;
    cursor: pointer;
`;
const SaveDiaryButton = styled.img`
    margin-right: 34px;
    cursor: pointer;
`;

const WriteArea = styled.div`
    margin-bottom: 10px;
    padding: 0 34px 0 40px;
    position: relative;

    @media only screen and (max-width: 420px) {
        width: 320px;
        padding: 0;
    }
`;

const PostText = styled.input`
    width: 876px;
    height: 47px;
    background-color: #959ebe;
    outline: none;
    border: none;
    padding: 13px 27px;
    border-radius: 10px;
    box-sizing: border-box;
    margin-bottom: 10px;
    font-size: 18px;
    line-height: 23px;

    @media only screen and (max-width: 420px) {
        width: 320px;
        height: 43px;
        border: 1px solid #6b6b6b;
        padding: 13px 20px;
        margin-bottom: 16px;
        font-size: 14px;
        line-height: 18px;
        color: #08105d;
        background-color: #b1bbd6;
    }

    ::placeholder {
        font-size: 18px;
        line-height: 23px;
        color: rgba(8, 16, 93, 0.5);

        @media only screen and (max-width: 420px) {
            font-size: 15px;
            line-height: 18px;
            color: rgba(227, 229, 255, 0.5);
        }
    }
`;

const PostContainer = styled.div`
    @media only screen and (max-width: 420px) {
        position: relative;
    }
`;
const PostAreaBottomIcons = styled.div`
    @media only screen and (max-width: 420px) {
        position: absolute;
        bottom: 20px;
    }
`;

const PostArea = styled.textarea`
    width: 876px;
    height: 352px;
    box-sizing: border-box;
    padding: ${(props) => (props.isShowSpeaker ? "86px 27px 20px" : "20px 27px")};
    background-color: #959ebe;
    border: none;
    font-size: 14px;
    line-height: 18px;
    color: #000000;
    resize: none;
    outline: none;
    border-radius: 10px;
    overflow-y: auto;
    overflow-x: hidden;

    ::-webkit-scrollbar {
        display: none;
    }

    @media only screen and (max-width: 420px) {
        width: 320px;
        height: calc(100vh - 208px);
        border: 1px solid #6b6b6b;
        padding: 22px 20px;
        font-size: 14px;
        line-height: 17px;
        color: #08105d;
        background-color: #b1bbd6;
    }

    ::placeholder {
        font-size: 14px;
        line-height: 18px;
        color: rgba(8, 16, 93, 0.5);

        @media only screen and (max-width: 420px) {
            font-size: 15px;
            line-height: 18px;
            color: rgba(227, 229, 255, 0.5);
        }
    }
`;

const SoundPlayIcon = styled.div`
    position: absolute;
    left: 67px;
    top: 77px;
    display: flex;
`;

const SpeakerIcon = styled.img`
    cursor: pointer;
    width: 40px;
    height: 40px;
    margin-right: 9px;
`;

const TimeArea = styled.div`
    padding-top: 11px;
`;

const VoiceLeft = styled.div`
    display: flex;
    position: absolute;
    bottom: 30px;
    left: 67px;

    @media only screen and (max-width: 420px) {
        position: absolute;
        bottom: 0;
        left: 14px;
    }
`;

const RecordArea = styled.div`
    color: #08105d;
    font-size: 8px;
    line-height: 10px;
    margin-right: 19px;
    text-align: center;
    pointer-events: ${(props) => props.isPlaying && "none"};

    @media only screen and (max-width: 420px) {
        margin-right: 13px;
        font-size: 8px;
        line-height: 10px;
        color: #08105d;
    }

    img {
        cursor: pointer;
    }

    div {
        margin-top: 7px;

        @media only screen and (max-width: 420px) {
            width: 40px;
        }
    }
`;
const ListenArea = styled(RecordArea)``;

const PostLength = styled.div`
    position: absolute;
    bottom: 20px;
    right: 60px;
    font-size: 14px;
    line-height: 18px;
    color: #08105d;

    @media only screen and (max-width: 420px) {
        position: relative;
        bottom: 0;
        left: 248px;
        z-index: 999999;
        font-size: 14px;
        line-height: 17px;
        text-align: center;
    }
`;
