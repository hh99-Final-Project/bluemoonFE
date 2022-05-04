import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { chatApi } from "../../apis/chatApi";
import { convertDate } from "../../utils/convertDate";

DiaryContent.propTypes = {
    diary: PropTypes.object,
};

function DiaryContent(props) {
    const { diary } = props;
    console.log(diary);

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
        <TitleContainer>
          <TitleContainerLeft>
            <Title>{diary.nickname}</Title>
            <NewBadge />
          </TitleContainerLeft>
          <TitleContainerRight>
            <DateArea>{convertDate(diary.createdAt)}</DateArea>
            <NicknameArea>{diary.nickname}님의 고민</NicknameArea>
          </TitleContainerRight>
        </TitleContainer>
        <ContentsContainer>{diary.content}</ContentsContainer>
        <VoiceButton onClick={playAudio}>듣기</VoiceButton>
        <IconArea>
          <IconAreaLeft>
            <CommentButton>댓글 남기기</CommentButton>
          </IconAreaLeft>

                    <ChattingButton
                        onClick={(e) => {
                            e.stopPropagation();
                            createChat(diary.nickname, diary.userId);
                        }}
                    >
                        대화 신청하기
                    </ChattingButton>
                </IconArea>
            </DiaryContainer>
        </React.Fragment>
    );
}

export default DiaryContent;

const DiaryContainer = styled.div`
    width: 1164px;
    height: 507px;
    background-color: rgba(155, 155, 155, 0.9);
    border-radius: 20px;
    margin: auto;
    padding: 20px 30px;
    box-sizing: border-box;
`;
const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 60px;
`;
const TitleContainerLeft = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const TitleContainerRight = styled.div`
    font-size: 20px;
    line-height: 24px;
`;
const Title = styled.div`
    font-size: 32px;
    line-height: 39px;
    margin-right: 15px;
`;
const NewBadge = styled.div`
    width: 113px;
    height: 41px;
    background-color: #c4c4c4;
`;
const DateArea = styled.div``;
const NicknameArea = styled.div``;
const ContentsContainer = styled.div`
    width: 457px;
    height: 116px;
    font-size: 24px;
    line-height: 29px;
`;
const VoiceButton = styled.div`
    width: 62px;
    height: 62px;
    background-color: #c4c4c4;
    border-radius: 50%;
    margin-bottom: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;
const IconArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const IconAreaLeft = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CommentButton = styled.div`
    cursor: pointer;
`;
const ChattingButton = styled.div`
    cursor: pointer;
`;
