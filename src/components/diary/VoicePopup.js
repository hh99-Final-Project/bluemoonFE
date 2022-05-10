import React from "react";
import styled from "styled-components";
import microphone from "../../static/images/diary/microphone.svg";
import onRecIcon from "../../static/images/diary/onRecording.svg";
import closeBtn from "../../static/images/diary/closePopup.svg";
import pauseIcon from "../../static/images/diary/voicePause.svg";
import stopIcon from "../../static/images/diary/voiceStop.svg";
import playIcon from "../../static/images/diary/voicePlay.svg";

const VoicePopup = (props) => {

    const { closePopup, play, onRec, recordVoice, stopRecord, finishRecord, isPlaying } = props;
    console.log(onRec,"onRec")

    // 녹음이 시작되면 OnRec은 false
    // 시작 전 (onRec = true && finishRecord false)
    // 녹음 중 (onRec = false)
    // 녹음 완료 (onRec true && finishRecord true)
    // 재생 중 ( play state를 따로 만들어야 함)

    return (
        <VoiceContainer>
            {/*<CloseButton src={closeBtn} onClick={closePopup}/>*/}
            <RecordStatus>
                {
                    (!finishRecord && onRec) && <div>녹음하기</div>
                }
                {
                    !onRec && <div>녹음중</div>
                }
                {
                    (finishRecord && !isPlaying) && <div>음성 녹음 완료</div>
                }
                {
                    isPlaying && <div>재생 중</div>
                }
            </RecordStatus>
            <RecordImg>
                <img src={microphone} alt={"voiceIcon"}/>
            </RecordImg>
            <RecordTime>
                00 : 00
            </RecordTime>
            <IconArea>

                {
                    (!finishRecord && onRec) &&
                    <OnRecording onClick={recordVoice}>
                        <img src={onRecIcon} alt={"onRecIcon"}/>
                    </OnRecording>
                }

                {
                    !onRec &&
                        <RecIcons>
                            <PauseBtn>
                                <img src={pauseIcon} alt={"pauseIcon"}/>
                            </PauseBtn>
                            <StopBtn onClick={stopRecord}>
                                <img src={stopIcon} alt={"stopIcon"}/>
                            </StopBtn>
                        </RecIcons>
                }
                {
                    (finishRecord && !isPlaying) &&
                        <FinishRecord>
                            <RecIcons>
                                <PlayingButton onClick={play}>
                                    <img src={playIcon} alt={"playIcon"}/>
                                </PlayingButton>
                                <div style={{marginRight:5}}>삭제</div>
                                <div>업로드</div>
                            </RecIcons>
                        </FinishRecord>
                }

                {
                    isPlaying &&
                        <RecIcons>
                            <StopBtn onClick={stopRecord}>
                                <img src={stopIcon} alt={"stopIcon"}/>
                            </StopBtn>
                            <div style={{marginRight:5}}>삭제</div>
                            <div>업로드</div>
                        </RecIcons>
                }




                {/*{*/}
                {/*    !onRec ? finishRecord ? (*/}
                {/*        <FinishRecord>*/}
                {/*            <RecIcons>*/}
                {/*                <OnRecording onClick={recordVoice}>*/}
                {/*                    <img src={onRecIcon} alt={"onRecIcon"}/>*/}
                {/*                </OnRecording>*/}
                {/*                <StopBtn onClick={stopRecord}>*/}
                {/*                    <img src={stopIcon} alt={"stopIcon"}/>*/}
                {/*                </StopBtn>*/}
                {/*                <div>삭제</div>*/}
                {/*            </RecIcons>*/}
                {/*        </FinishRecord>*/}
                {/*    ) : (*/}
                {/*        <RecIcons>*/}
                {/*            <PauseBtn>*/}
                {/*                <img src={pauseIcon} alt={"pauseIcon"}/>*/}
                {/*            </PauseBtn>*/}
                {/*            <StopBtn onClick={stopRecord}>*/}
                {/*                <img src={stopIcon} alt={"stopIcon"}/>*/}
                {/*            </StopBtn>*/}
                {/*        </RecIcons>*/}

                {/*    ) : (*/}
                {/*            <OnRecording onClick={recordVoice}>*/}
                {/*                <img src={onRecIcon} alt={"onRecIcon"}/>*/}
                {/*            </OnRecording>*/}
                {/*        )*/}

                {/*}*/}
                {/*<PlaySound>*/}
                {/*    <img src={playIcon} alt={"playIcon"}/>*/}
                {/*</PlaySound>*/}
            </IconArea>
        </VoiceContainer>
    );
};


export default VoicePopup;


const VoiceContainer = styled.div`
  width: 266px;
  height: 265px;
  background: rgba(198, 211, 236, 0.9);
  border-radius: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const CloseButton = styled.img`
  position: absolute;
  right: 16px;
  top: 19px;
  cursor: pointer;
`;

const RecordStatus = styled.div`
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #43567E;
  margin-top: 37px;
`;
const RecordImg = styled.div`
  text-align: center;
  margin-top: 17px;
  img {
    width: 74px;
    height: 74px;
  }
`;
const RecordTime = styled.div`
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  color: #000000;
  margin-top: 5px;
  font-weight: 400;
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

const FinishRecord = styled.div`
  
`;

const RecIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayingButton = styled.div``;

const StartRecord = styled.div``;
const PlaySound = styled.div``;
const PauseBtn = styled.div`
  margin-right: 10px;
`;
const StopBtn = styled.div``;
