import React, { useEffect } from "react";
import styled from "styled-components";
import CategoryBar from "../shared/CategoryBar";
import Header2 from "../shared/Header2";
import useStore from "../zustand/store";
import loterryMoon from "../static/images/Lottery/lotteryMoon.png";
import lotteryResult from "../static/images/Lottery/lotteryResult.png";
import bananaMilkIkon from "../static/images/Lottery/bananaMilkIcon.png";

const Lottery = () => {
    const { setCurrentHeader } = useStore();

    useEffect(() => {
        setCurrentHeader("추첨");
    }, []);

    return (
        <Container>
            <Header2 />
            <CategoryBar />
            <ContentBox>
                <Title>블루문! 내게 말해줘</Title>
                <Desc>
                    추첨을 통해 바나나 우유 기프티콘을 드립니다. <br />
                    200포인트로 참여 가능합니다. <br />
                    포인트는 다이어리 작성 혹은 댓글 작성으로 모을 수 있습니다.
                </Desc>
                <LotteryArea>
                    <img src={loterryMoon} />
                </LotteryArea>
                <LotteryResultArea>
                    <img src={lotteryResult} />
                </LotteryResultArea>
                <LotteryClick>클릭하기</LotteryClick>
                <CountNoti>참여 가능 횟수</CountNoti>
                <ClickCount>1</ClickCount>
                <RecommendIcons>친구 추천하기</RecommendIcons>
                <RecommendDesc>친구 추천 1명 → +2회</RecommendDesc>
            </ContentBox>
        </Container>
    );
};

export default Lottery;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #111b3f;
    overflow: hidden;
`;

const ContentBox = styled.div`
    width: 950px;
    height: 530px;

    background: linear-gradient(180deg, rgba(63, 75, 112, 0.79) 0%, rgba(100, 114, 152, 0.79) 100%);
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0px 0px 70px #465981;
    backdrop-filter: blur(80px);

    border-radius: 25px;

    position: relative;
    margin: auto;
`;

const Title = styled.div`
    position: absolute;
    width: 474px;
    height: 19px;
    left: 550px;
    top: 200px;

    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 29px;

    color: #ffffff;
`;
const Desc = styled.div`
    position: absolute;
    width: 312px;
    height: 23px;
    left: 550px;
    top: 250px;

    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    color: #c6d3ec;
`;
const LotteryArea = styled.div`
    position: absolute;
    width: 433px;
    height: 433px;
    left: 50px;
    top: 40px;
`;

const LotteryResultArea = styled.div`
    position: absolute;
    width: 377px;
    height: 191px;
    left: 70px;
    top: 270px;
`;

const LotteryClick = styled.div`
    position: absolute;
    width: 377px;
    height: 191px;
    left: 70px;
    top: 270px;

    display: flex;
    align-items: center;
    justify-content: center;

    color: #ffffff;

    z-index: 1;
`;

const CountNoti = styled.div`
    position: absolute;
    height: 24px;
    left: 45px;
    top: 420px;

    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    text-align: center;

    color: #c6d3ec;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const ClickCount = styled.div`
    position: absolute;
    width: 77px;
    height: 34px;
    left: 50px;
    top: 450px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #c6d3ec;
    border-radius: 5px;
`;
const RecommendIcons = styled.div`
    position: absolute;
    width: 110px;
    height: 25px;
    left: 770px;
    top: 420px;

    background: #c6d3ec;
    border-radius: 9px;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const RecommendDesc = styled.div`
    position: absolute;
    width: 168px;
    height: 25px;
    left: 765px;
    top: 450px;

    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;

    color: #c6d3ec;
`;
