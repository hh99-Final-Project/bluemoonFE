import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { chatApi } from "../../apis/chatApi";
import { convertDate } from "../../utils/convertDate";
import chatIcon from "../../static/images/message.png";

DiaryContent.propTypes = {
    diary: PropTypes.object,
};

function DiaryContent(props) {
    const { diary } = props;

    const createChat = (roomname, userId) => {
        chatApi.createChat(roomname, userId).then((response) => {
            console.log(response);
        });
    };

    const playAudio = () => {
        //diary.voiceUrl
        let audio = new Audio(diary.voiceUrl);
        if (audio) {
            audio.volume = 1;
            audio.loop = false;
            audio.play();
        }
    };

    return (
        <React.Fragment>
            <DiaryContainer>
                <ContentsContainer>
                    <Content>{diary.content}</Content>
                    <VoiceButton onClick={playAudio}>
                        {/*<img style={{ width: "40px", height: "40px" }} src={voiceButton} />*/}
                    </VoiceButton>
                </ContentsContainer>
                <IconArea>
                    <NicknameArea>{diary.nickname}님의 고민</NicknameArea>
                    <ChattingButton
                        onClick={(e) => {
                            e.stopPropagation();
                            createChat(diary.nickname, diary.userId);
                        }}
                    >
                        <img style={{ width: "23px", height: "23px" }} src={chatIcon} alt={"chatIcon"} />
                        <div>대화 신청</div>
                    </ChattingButton>
                </IconArea>
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
`;

const NewBadge = styled.div`
    width: 113px;
    height: 41px;
    background-color: #c4c4c4;
`;

const ContentsContainer = styled.div`
    width: 100%;
`;

const Content = styled.div`
    font-size: 15px;
    line-height: 18px;
    padding-top: 37px;
    margin-bottom: 10px;
`;

const VoiceButton = styled.div`
    cursor: pointer;
`;
const IconArea = styled.div`
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const NicknameArea = styled.div`
    font-size: 10px;
    line-height: 12px;
    color: #373737;
`;

const ChattingButton = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 25px;

    div {
        font-size: 11px;
        margin-top: 3px;
    }
`;

const DottedLine = styled.div`
    border: 1px dashed #c6d3ec;
    margin: 14px 0 0;
    width: 876px;
`;
