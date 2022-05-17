import React, {useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { chatApi } from "../../apis/chatApi";
import { chatIcon, voicePlayIcon } from "../../static/images/resources";

DiaryContent.propTypes = {
    diary: PropTypes.object,
};

function DiaryContent(props) {
    const { diary } = props;
    const navigate = useNavigate();
    const audioRef = useRef(new Audio(diary.voiceUrl));



    const createChat = (userId) => {
        chatApi
            .createChat(userId)
            .then((response) => {
                console.log(response);
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
        if (audioRef.current) {
            audioRef.current.volume = 1;
            audioRef.current.loop = false;

            if(audioRef.current.paused) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    };

    useEffect(()=>{
       return () => {
           audioRef.current.pause();
       };
    },[]);

    return (
        <React.Fragment>
            <DiaryContainer>
                <ContentsContainer>
                    <Content>{diary.content}</Content>
                    { diary.voiceUrl.length > 0 &&
                        <VoiceButton onClick={playAudio} src={voicePlayIcon}/>
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
`;

const VoiceButton = styled.img`
    cursor: pointer;
    margin-top: 21px;
`;


const NicknameArea = styled.div`
    font-size: 10px;
    line-height: 12px;
    color: #373737;
    position: absolute;
    bottom: 21px;
    left: 48px;
`;

const ChattingButton = styled.div`
    position: absolute;
    bottom: 21px;
    right: 48px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
  

    div {
      font-size: 10px;
      line-height: 13px;
      margin-top: 2px;
      color: #354569;
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
