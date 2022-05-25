import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../../shared/Header";
import { useSelector } from "react-redux";
import { spring, chatIcon, commentIcon, voicePlayIcon } from "../../static/images/resources";

import Slider from "react-slick";
import { color } from "../../utils/designSystem";
import { MobileTitleName } from "../common";

const DiaryListMobile = (props) => {
    const { getMoreDiaryAPI, count, diary, togglePlayVoice, diaryList, createChat, setCount } = props;
    const navigate = useNavigate();
    const scrollRef = useRef();
    const isLogin = useSelector((state) => state.userSlice.isLogin);

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 1000,
        autoplay: false,
        slideToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        afterChange: (current) => {
            setCount((prev) => prev + 1);
            // scrollRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
            if (count + 1 === diaryList.length) {
                getMoreDiaryAPI();
            }
        },
    };

    return (
        <ListContainer ref={scrollRef} BgColor={color.backgroundColor}>
            <TopParts BgColor={color.backgroundColor}>
                <Header />
                <MobileTitleName title={"고민*상담소"} pos={6} />
            </TopParts>
            <Container BgColor={color.backgroundColor}>
                <Slider2 {...settings}>
                    {diaryList.map((diary) => {
                        return (
                            <Slide onClick={() => navigate(`/diary/${diary.postUuid}`)} key={diary.postUuid}>
                                <FirstSlide>
                                    <Title>{diary.title}</Title>
                                </FirstSlide>
                                <Spring src={spring} />
                                <SecondSlide>
                                    {/*{diary.voiceUrl && <VoicePlayIcon onClick={togglePlayVoice} src={voicePlayIcon}/>}*/}
                                    <Desc>
                                        {diaryList.length === 0
                                            ? "다이어리를 작성해주세요!"
                                            : isLogin
                                            ? diary.content
                                            : diaryList[0].content}
                                    </Desc>
                                    <ButtonArea>
                                        <ReplyCommentButton
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (isLogin) {
                                                    navigate(`/diary/${diary.postUuid}`);
                                                } else {
                                                    navigate(diaryList[0].postUuid);
                                                }
                                            }}
                                            src={commentIcon}
                                        />
                                        <ChattingButton
                                            onClick={() => {
                                                if (isLogin) {
                                                    createChat(diary.userId);
                                                } else {
                                                    createChat(diaryList[0].userId);
                                                }
                                            }}
                                            src={chatIcon}
                                        />
                                    </ButtonArea>
                                </SecondSlide>
                            </Slide>
                        );
                    })}
                </Slider2>
            </Container>
        </ListContainer>
    );
};

export default DiaryListMobile;

const ListContainer = styled.div`
    background-color: ${(props) => props.BgColor};
`;

const TopParts = styled.div`
    //position: fixed;
    width: 100%;
    background-color: ${(props) => props.BgColor};
    z-index: 9;
`;

const Container = styled.div`
    width: 100%;
    margin: auto;
    background-color: ${(props) => props.BgColor};
    position: relative;
    //top: 125px;
`;

const Slider2 = styled(Slider)`
    .slick-list {
        height: 600px;
    }
`;

const Slide = styled.div`
    margin: auto;
`;
const FirstSlide = styled.div`
    width: 300px;
    height: 284px;
    margin: 0 auto 12px;
    background-color: #c6d3ec;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
`;

const Spring = styled.img`
    position: relative;
    z-index: 99999;
    bottom: 30px;
    margin: auto;
`;

const Title = styled.div`
    font-size: 20px;
    line-height: 25px;
    color: #08105d;
    width: 260px;
    text-align: center;
`;

const SecondSlide = styled.div`
    width: 300px;
    height: 284px;
    margin: 0 auto 20px;
    background-color: #c6d3ec;
    border-radius: 15px;
    position: relative;
    bottom: 55px;
    padding: 20px;
    box-sizing: border-box;
`;

const Desc = styled.div`
    font-size: 14px;
    line-height: 18px;
    color: #08105d;
    width: 260px;
    max-height: 54px;
    margin-top: 20px;
    margin-left: 2px;
`;

const ButtonArea = styled.div`
    width: 260px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 51px;
`;
const ReplyCommentButton = styled.img`
    cursor: pointer;
`;
const ChattingButton = styled(ReplyCommentButton)``;
const VoicePlayIcon = styled(ReplyCommentButton)`
    margin-top: 75px;
    margin-left: 4px;
`;
