import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
    microphone,
    onRecIcon,
    closeBtn,
    pauseIcon,
    stopIcon,
    playIcon,
    OnRecIconInActive,
    PlayInActive,
    BigPlay,
    smallPause,
} from "../../static/images/resources";
import PropTypes from "prop-types";
import { useStopwatch } from "react-timer-hook";
import { MyTimer } from "./Timer";
import {timeFormatter2} from "../../utils/convertDate";

const VoicePopup = (props) => {
    const {
        closePopup,
        play,
        onRec,
        recordVoice,
        stopRecord,
        deleteVoice,
        playingPause,
        finishRecord,
        isPlaying,
        isPaused,
        replay,
        recordPause,
        completeRecord,
        recordReset,
        playingHandler,
        toggleListening,
        isListening,
        SaveRecordTime,
    } = props;

    const [expireTime, setExpireTime] = useState(new Date());
    const { seconds, minutes, start, pause, reset } = useStopwatch({ autoStart: false });
    const { timerSec, timerMin, TimerRestart} = MyTimer(expireTime);

    // 녹음이 시작되면 OnRec은 false
    // 시작 전 (onRec = true && finishRecord false)
    // 녹음 중 (onRec = false)
    // 녹음 완료 (onRec true && finishRecord true)
    // 재생 중 ( play state를 따로 만들어야 함)

    const timeRef = useRef();

    useEffect(() => {
        return () => {
            recordReset();
        };
    }, []);

    return (
        <VoiceContainer>
            <CloseButton
                src={closeBtn}
                onClick={() => {
                    reset();
                    recordReset();
                    closePopup();
                }}
            />
            <RecordStatus>
                {!finishRecord && onRec && <div>녹음 하기</div>}
                {!onRec && !isPaused && <div>녹음중</div>}
                {isPaused && !onRec && <div>일시 정지</div>}
                {finishRecord && !isPlaying && <div>음성 녹음 완료</div>}
                {isPlaying && <div>재생 중</div>}
            </RecordStatus>
            <RecordImg>
                <img src={microphone} alt={"voiceIcon"} loading="lazy"/>
            </RecordImg>
            <RecordTime ref={timeRef}>

                {/*시작 전*/}
                { !finishRecord && onRec && "00 : 00" }

                {/*녹음중*/}
                {
                    (!onRec && !isPaused) && timeFormatter2(minutes) + " : " + timeFormatter2(seconds)
                }

                {/*음성녹음완료*/}
                {
                    (finishRecord && !isPlaying) && timeFormatter2(minutes) + " : " + timeFormatter2(seconds)
                }

                {isPaused && !onRec && timeFormatter2(minutes) + " : " + timeFormatter2(seconds)}

                {/*재생 중*/}
                {
                    isPlaying && timeFormatter2(timerMin) + " : " + timeFormatter2(timerSec)
                }
            </RecordTime>
            <IconArea>
                {/*처음 화면*/}
                {!finishRecord && onRec && (
                    <OnRecording
                        onClick={() => {
                            start();
                            recordVoice();
                        }}
                    >
                        <img src={onRecIcon} alt={"onRecIcon"} loading="lazy"/>
                    </OnRecording>
                )}

                {/*녹음중 & 일시정지*/}
                {!onRec && (
                    <RecIcons>
                        <PlayingButtonInActive>
                            <img src={PlayInActive} alt={"playIcon"} loading="lazy"/>
                        </PlayingButtonInActive>
                        {isPaused ? (
                            // 현재 일시정지 상태이니 다시 재개할 수 있는 버튼
                            <PlayingButton
                                onClick={() => {
                                    start();
                                    replay();
                                }}
                            >
                                <img src={BigPlay} alt={"BigPlay"} />
                            </PlayingButton>
                        ) : (
                            // 현재 녹음중인 상태이니 일시정지 할 수 있는 버튼
                            <PauseBtn
                                onClick={() => {
                                    recordPause();
                                    pause();
                                    SaveRecordTime(seconds + minutes * 60);
                                }}
                            >
                                <img src={pauseIcon} alt={"pauseIcon"} loading="lazy"/>
                            </PauseBtn>
                        )}
                        <StopBtn
                            onClick={() => {
                                //녹음 완료로 넘어간다. 타이머 중단
                                stopRecord();
                                pause();
                                SaveRecordTime(seconds + minutes * 60);

                            }}
                        >
                            <img src={stopIcon} alt={"stopIcon"} loading="lazy"/>
                        </StopBtn>
                    </RecIcons>
                )}

                {/*녹음 완료*/}
                {finishRecord && !isPlaying && (
                    <FinishRecord>
                        <RecIcons>
                            {/*방금 녹음한거 듣는 재생버튼 */}
                            <PlayingButton
                                onClick={() => {
                                    const now = new Date();
                                    let addedNow = now.setSeconds(now.getSeconds() + minutes * 60 + seconds);
                                    setExpireTime(new Date(addedNow));

                                    play();
                                    playingHandler(true);
                                    TimerRestart(new Date(addedNow));
                                }}
                            >
                                <img src={playIcon} alt={"playIcon"} loading="lazy"/>
                            </PlayingButton>

                            {/*재생 해 봤는데 다시 녹음하고 싶을 때*/}
                            <OnRecording2
                                onClick={() => {
                                    deleteVoice();
                                    recordVoice();
                                    reset();
                                    TimerRestart();
                                }}
                            >
                                <img src={onRecIcon} alt={"onRecIcon"} loading="lazy"/>
                            </OnRecording2>

                            {/*완전 녹음이 끝나서 이제 팝업 닫기*/}
                            <StopBtn
                                onClick={() => {
                                    completeRecord();
                                    // stopRecord();
                                    pause();
                                    closePopup();

                                    if (timeRef.current) {
                                        SaveRecordTime(seconds + minutes * 60);
                                    }
                                }}
                            >
                                <img src={stopIcon} alt={"stopIcon"} loading="lazy"/>
                            </StopBtn>
                        </RecIcons>
                    </FinishRecord>
                )}

                {/*재생중 & 재생 중 일시 정지*/}
                {isPlaying && (
                    <RecIcons>
                        {/*재생을 잠시 일시 정지*/}
                        {isListening ? (
                            <PlayingButton
                                onClick={() => {
                                    play();
                                    toggleListening();
                                }}
                            >
                                <img src={playIcon} alt={"playIcon"} loading="lazy"/>
                            </PlayingButton>
                        ) : (
                            // 재생 중 일시 정지
                            <PauseBtn
                                onClick={() => {
                                    playingPause();
                                    toggleListening();
                                }}
                            >
                                <img src={smallPause} alt={"pauseIcon"} loading="lazy"/>
                            </PauseBtn>
                        )}

                        <OnRecordingInActive>
                            <img src={OnRecIconInActive} alt={"onRecIcon"} loading="lazy"/>
                        </OnRecordingInActive>

                        {/*단순 녹음 종료*/}
                        <StopBtn
                            onClick={() => {
                                completeRecord();
                                // stopRecord();
                                pause();
                                SaveRecordTime(seconds + minutes * 60);
                                closePopup();
                            }}
                        >
                            <img src={stopIcon} alt={"stopIcon"} loading="lazy"/>
                        </StopBtn>
                    </RecIcons>
                )}
            </IconArea>
        </VoiceContainer>
    );
};

VoicePopup.propTypes = {
    closePopup: PropTypes.func,
    play: PropTypes.func,
    onRec: PropTypes.bool,
    recordVoice: PropTypes.func,
    stopRecord: PropTypes.func,
    SaveRecordTime: PropTypes.func,
    deleteVoice: PropTypes.func,
    playingPause: PropTypes.func,
    finishRecord: PropTypes.bool,
    isPlaying: PropTypes.bool,
    isPaused: PropTypes.bool,
    replay: PropTypes.func,
    recordPause: PropTypes.func,
    completeRecord: PropTypes.func,
    recordReset: PropTypes.func,
    playingHandler: PropTypes.func,
    toggleListening: PropTypes.func,
    isListening: PropTypes.bool,
};

export default VoicePopup;

const VoiceContainer = styled.div`
    width: 266px;
    height: 265px;
    background: rgba(198, 211, 236, 0.9);
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
`;

const CloseButton = styled.img`
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
`;

const RecordStatus = styled.div`
    font-size: 20px;
    line-height: 25px;
    text-align: center;
    color: #43567e;
    margin-top: 32px;
`;
const RecordImg = styled.div`
    text-align: center;
    margin-top: 17px;
    img {
        width: 58px;
        height: 83px;
    }
`;
const RecordTime = styled.div`
    font-size: 24px;
    line-height: 30px;
    text-align: center;
    color: #08105d;
    margin-top: 5px;
`;

const IconArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
`;
const OnRecording = styled.div`
    cursor: pointer;
`;

const OnRecording2 = styled(OnRecording)`
    img {
        margin-right: 13px;
    }
`;

const OnRecordingInActive = styled(OnRecording)`
    margin-right: 13px;
    pointer-events: none;
`;

const FinishRecord = styled.div``;

const RecIcons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PlayingButton = styled.div`
    margin-right: 13px;
    cursor: pointer;
`;

const PlayingButtonInActive = styled(PlayingButton)`
    pointer-events: none;
`;

const StartRecord = styled.div``;
const PlaySound = styled.div``;

const DeleteBtn = styled.div`
    cursor: pointer;
    margin: 0 10px;
`;

const UploadBtn = styled.div`
    cursor: pointer;
`;

const PauseBtn = styled.div`
    cursor: pointer;
    margin-right: 13px;
`;
const StopBtn = styled.div`
    cursor: pointer;
`;
