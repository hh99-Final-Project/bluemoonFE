import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

DiaryContent.propTypes = {

};

function DiaryContent(props) {

    return (
        <React.Fragment>
            <DiaryContainer>
                <TitleContainer>
                    <TitleContainerLeft>
                        <Title>
                            이름
                        </Title>
                        <NewBadge/>
                    </TitleContainerLeft>
                    <TitleContainerRight>
                        <DateArea>
                            2022-04-26 12:00
                        </DateArea>
                        <NicknameArea>
                            oo님의 고민
                        </NicknameArea>
                    </TitleContainerRight>
                </TitleContainer>
                <ContentsContainer>
                    나의 고민은 다이어트를 하는데 살이 안빠진다는 것이다.. 글른 것 같다
                </ContentsContainer>
                <VoiceButton>
                    듣기
                </VoiceButton>
                <IconArea>
                    <IconAreaLeft>
                        <LikeButton>
                            좋아요
                        </LikeButton>
                        <CommentButton>
                            댓글 남기기
                        </CommentButton>
                    </IconAreaLeft>

                    <ChattingButton>
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
    background-color: #C4C4C4;
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
    background-color: #C4C4C4;
    border-radius: 50%;
    margin-bottom: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor:pointer;
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
const LikeButton = styled.div`
    margin-right: 20px;
    cursor:pointer;
`;
const CommentButton = styled.div`
    cursor:pointer;
`;
const ChattingButton = styled.div`
    cursor:pointer;
`;