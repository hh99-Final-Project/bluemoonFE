import React, {useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { chatApi } from "../../apis/chatApi";
import { chatIcon, voicePlayIcon } from "../../static/images/resources";
import { isMobile } from "react-device-detect";
import { useMediaQuery } from "react-responsive";

DiaryContent.propTypes = {
    diary: PropTypes.object,
};

function DiaryContent(props) {
    const { diary } = props;
    const navigate = useNavigate();

    const [audio, setAudio] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const buttonRef = useRef();

    const isMobileQuery = useMediaQuery({
        query: "(max-width: 420px)",
    });

    const createChat = (userId) => {
        chatApi
            .createChat(userId)
            .then((response) => {
                if(response.status === 200){
                    navigate(`/chat/${response.data}`);
                }


            })
            .catch((error) => {
                console.log(error);
                if(error.response.data.code === "R005"){
                    window.alert(error.response.data.message);
                }
            });
    };


    const playAudio = () => {
        if(audio.paused) {
            audio.play();
            setIsPlaying(true);
        } else {
            audio.pause();
            setIsPlaying(false);
        }

    };

    useEffect(()=>{
        if(diary.voiceUrl.length > 0) {
            let tmpAudio = new Audio(diary.voiceUrl);
            tmpAudio.volume = 1;
            tmpAudio.loop = false;
            setAudio(tmpAudio);
        }
           return () => {
               if(audio){
                   audio.pause();
               }
           };
        },[]);

    useEffect(()=>{
        if( (isMobile || isMobileQuery) && buttonRef.current){
            buttonRef.current.addEventListener("touchstart", playAudio, false);
        }


        return () => {
            if( (isMobile || isMobileQuery) && buttonRef.current){
                buttonRef.current.removeEventListener("touchstart", playAudio, false);
            }

        };
    },[buttonRef.current]);


        return (
            <React.Fragment>
                <DiaryContainer>
                    <ContentsContainer>
                        <Content>{diary.content}</Content>
                        { diary.voiceUrl.length > 0 && !isMobile && !isMobileQuery &&
                            <VoiceArea>
                                <VoiceButton ref={buttonRef} isPlaying={isPlaying} onClick={playAudio} src={voicePlayIcon}/>
                                <TooltipBox>
                                    { !isPlaying ? "클릭하면 재생합니다" : "한번 더 누르면 멈춥니다!"}
                                </TooltipBox>
                            </VoiceArea>
                        }

                </ContentsContainer>
                <NicknameArea>{diary.nickname}님의 고민</NicknameArea>
                <ChattingButton
                    onClick={(e) => {
                        e.stopPropagation();
                        createChat(diary.userId);
                    }}
                >
                    <img src={chatIcon} alt={"chatIcon"} />
                    <div>대화 신청</div>
                </ChattingButton>

            </DiaryContainer>
            <DottedLine />
        </React.Fragment>
    );
}

export default DiaryContent;

const DiaryContainer = styled.div`
    width: 876px;
    height: 202px;
    background-color: #959ebe;
    border-radius: 5px;
    padding-left: 44px;
    box-sizing: border-box;
    position: relative;

  @media only screen and (max-width: 420px) {
    width: 320px;
    background: linear-gradient(180deg, #394877 0%, #49526C 100%);
    border: 1px solid #6B6B6B;
    border-radius: 5px;
    padding: 16px 9px 0 11px;
  }
`;

const ContentsContainer = styled.div`
    width: 100%;
`;

const Content = styled.div`
    font-size: 14px;
    line-height: 18px;
    color: #08105D;
    padding-top: 21px;
    max-width: 791px;
    max-height: 216px;

    @media only screen and (max-width: 420px) {
      font-size: 12px;
      line-height: 15px;
      color: #C6D3EC;
      padding-top: 0;
    }
`;

const VoiceArea = styled.div`
    display: flex;
    align-items: center;
    margin-top: 12px;
`;

const TooltipBox = styled.div`
  visibility: hidden;
  font-size: 12px;
  color: #08105D;
  margin-left: 4px;
  
`;

const VoiceButton = styled.img`
    cursor: pointer;
  
    &:hover + ${TooltipBox}  {
      visibility: visible;
    }
`;

const TimeArea = styled.div`
  
`;


const NicknameArea = styled.div`
    font-size: 10px;
    line-height: 12px;
    color: #373737;
    position: absolute;
    bottom: 21px;
    left: 48px;

  @media only screen and (max-width: 420px) {
    font-size: 8px;
    line-height: 10px;
    color: #959EBE;
    bottom: 16px;
    left: 14px;
  }
`;

const ChattingButton = styled.div`
    position: absolute;
    bottom: 21px;
    right: 48px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;

  @media only screen and (max-width: 420px) {
    bottom: 16px;
    right: 13px;
  }
  

    div {
      font-size: 10px;
      line-height: 13px;
      margin-top: 2px;
      color: #354569;

      @media only screen and (max-width: 420px) {
        font-size: 8px;
        line-height: 10px;
        text-align: center;
        color: #C6D3EC;
        margin-top: 4px;
      }
    }
  
    img {
      width: 23px;
      height: 23px;
    }
`;

const DottedLine = styled.div`
    border: 1px dashed #c6d3ec;
    margin: 12px 0 11px;
    width: 876px;
`;
