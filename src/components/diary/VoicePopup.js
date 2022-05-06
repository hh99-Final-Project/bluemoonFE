import React from "react";
import styled from "styled-components";
import voiceIcon from "../../static/images/microphone.svg";
import playIcon from "../../static/images/voicePlayButton.svg";

const VoicePopup = () => {
    return (
        <VoiceContainer>
            <RecordStatus>
                녹음중
            </RecordStatus>
            <RecordImg>
                <img src={voiceIcon} alt={"voiceIcon"}/>
            </RecordImg>
            <RecordTime>
                00 : 13
            </RecordTime>
            <IconArea>
                <PlaySound>
                    <img src={playIcon} alt={"playIcon"}/>
                </PlaySound>
                <PauseBtn>

                </PauseBtn>
                <StopBtn>

                </StopBtn>
            </IconArea>
        </VoiceContainer>
    );
};


export default VoicePopup;


const VoiceContainer = styled.div`
  width: 266.05px;
  height: 265px;
  background: rgba(198, 211, 236, 0.9);
  border-radius: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const RecordStatus = styled.div`
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #43567E;
  margin-top: 39px;
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
  margin-top: 11px;
`;
const IconArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StartRecord = styled.div``;
const PlaySound = styled.div``;
const PauseBtn = styled.div``;
const StopBtn = styled.div``;
