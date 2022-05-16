import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CategoryBar from "../shared/CategoryBar";
import Header from "../shared/Header";
import useStore from "../zustand/store";
import loterryMoon from "../static/images/Lottery/lotteryMoon.png";
import lotteryResult from "../static/images/Lottery/lotteryResult.png";
import bananaMilkIkon from "../static/images/Lottery/bananaMilkIcon.png";
import { Layout } from "../components/common";
import { useSelector } from "react-redux";
import { userApi } from "../apis/userApi";
import Loading from "../shared/Loading";
import { isWindows } from "react-device-detect";

const Lottery = () => {
    const { setCurrentHeader } = useStore();
    const userInfo = useSelector((state) => state.userSlice.userInfo);
    const [isClick, setIsClick] = useState(false);
    const [isWin, setIsWin] = useState(null);

    useEffect(() => {
        setCurrentHeader("추첨");
    }, []);

    const onClickHandler = (e) => {
        // if (!userInfo) {
        //     window.alert("로그인 후 참여할 수 있습니다!");
        //     return;
        // }
        // userApi.tryLottery().then((response) => {
        //     // if (response.status === 400) {
        //     // }
        //     console.log(response);
        // });
        setIsClick(true);
        setTimeout(setIsWin(true), 5000);
    };

    // if (!userInfo) {
    //     return <Loading></Loading>;
    // }
    return (
        <Layout>
            <Container>
                <Header />
                <CategoryBar />
                <ContentBox>
                    <DiaryName>
                        {userInfo ? userInfo.nickname : ""} <span>님 다이어리</span>
                    </DiaryName>
                    <LotteryArea>
                        <img src={loterryMoon} />
                    </LotteryArea>
                    <LotteryResultArea>
                        <img src={lotteryResult} />
                        {!isClick && <LotteryClick onClick={onClickHandler}>클릭하기</LotteryClick>}
                    </LotteryResultArea>

                    {isWin === true && (
                        <LotteryResult>
                            <p>당신에겐 달콤한 여유를 드릴게요.</p>
                        </LotteryResult>
                    )}
                    {isWin === false && (
                        <LotteryResult>
                            <p>당신에겐 달빛을 담은 용기를 드릴게요</p>
                        </LotteryResult>
                    )}

                    <CountNoti>참여 가능 횟수</CountNoti>
                    <ClickCount>{userInfo ? userInfo.lottoCount : "0"}</ClickCount>
                    <Title>블루문! 내게 말해줘</Title>
                    <Desc>
                        블루문의 세계에서 용기를 내주신 당신을 위해, <br />
                        푸른 빛이 담긴 선물을 준비했어요. <br />
                        지금 이 순간, 당신에게 가장 필요한 것을 줄게요. <br />
                        블루문을 향해 말을 걸어보시겠어요? <br />
                        어쩌면, 당신에게 특별한 행운이 찾아올지도 몰라요:)
                    </Desc>
                    <RecommendIcons>친구 추천하기</RecommendIcons>
                    <RecommendDesc>친구 추천 1명 → +1회</RecommendDesc>
                </ContentBox>
            </Container>
        </Layout>
    );
};

export default Lottery;

const Container = styled.div`
    width: 100%;
    height: 100vh;
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

const DiaryName = styled.div`
    position: absolute;
    right: 0;
    bottom: calc(100% + 10px);
    color: rgba(255, 255, 255, 0.9);
    font-size: 16px;
    line-height: 19px;

    span {
        color: #9aebe7;
    }
`;

const LotteryArea = styled.div`
    position: absolute;
    width: 433px;
    height: 433px;
    top: 39px;
    left: 77px;
`;

const LotteryResultArea = styled.div`
    position: absolute;
    width: 377px;
    height: 191px;
    top: 264px;
    left: 95px;
`;

const LotteryClick = styled.div`
    position: absolute;
    // width: 377px;
    width: 377px;
    height: 20px;

    top: 69px;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: center;

    color: #ffffff;

    z-index: 1;

    cursor: pointer;
`;

const LotteryResult = styled.div`
    position: absolute;
    width: 377px;
    height: 191px;
    left: 70px;
    top: 270px;

    align-items: center;
    justify-content: center;

    color: #ffffff;

    z-index: 1;

    display: relative;

    &: p {
        position: absolute;
        top: 18px;
    }
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

const Title = styled.div`
    position: absolute;
    width: 203px;
    height: 25px;
    top: 212px;
    right: 205px;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 30px;

    color: #ffffff;
`;
const Desc = styled.div`
    position: absolute;
    width: 300px;
    height: 102px;
    top: 264px;
    right: 110px;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;

    color: #c6d3ec;
`;

const RecommendIcons = styled.div`
    position: absolute;
    width: 110px;
    height: 25px;
    top: 430px;
    right: 50px;

    background: #c6d3ec;
    border-radius: 9px;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const RecommendDesc = styled.div`
    position: absolute;
    width: 110px;
    height: 15px;
    right: 50px;
    bottom: 50px;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;

    color: #c6d3ec;
`;
