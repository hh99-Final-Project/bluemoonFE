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
import { color } from "../utils/designSystem";

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
        setIsWin(true);
    };

    // if (!userInfo) {
    //     return <Loading></Loading>;
    // }
    return (
        <Layout>
            <Container>
                <Header />
                <CategoryBar />
                <ContentBox BgColor={color.containerBoxColor}>
                    <DiaryName>
                        {userInfo ? userInfo.nickname : ""} <span>님 다이어리</span>
                    </DiaryName>
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
                    {!isClick && <LotteryClick onClick={onClickHandler}>클릭하기</LotteryClick>}

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

    
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0px 0px 70px #465981;
    backdrop-filter: blur(80px);
    background: ${props => props.BgColor};
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
