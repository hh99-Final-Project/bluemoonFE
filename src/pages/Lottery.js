import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useStore from "../zustand/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isWindows } from "react-device-detect";
import { userApi } from "../apis/userApi";

import { Layout } from "../components/common";
import Header from "../shared/Header";
import CategoryBar from "../shared/CategoryBar";
import Loading from "../shared/Loading";

import { color } from "../utils/designSystem";
import { lotteryMoon, lotteryhalfMoon, bananaMilkIcon, star } from "../static/images/resources";

const Lottery = () => {
    const { setCurrentHeader } = useStore();
    const userInfo = useSelector((state) => state.userSlice.userInfo);
    const [isClick, setIsClick] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [isWin, setIsWin] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentHeader("추첨");
    }, []);

    const onClickHandler = (e) => {
        // if (!userInfo) {
        //     window.alert("로그인 후 참여할 수 있습니다!");
        //     return;
        // }

        // userApi
        //     .tryLottery()
        //     .then((response) => {
        setIsClick(true);
        setTimeout(() => setIsLoading(true), 1000);
        setTimeout(() => setIsLoading(false), 4000);
        // if (response.result === true) {
        setTimeout(() => setIsWin(true), 5000);
        // } else if (response.result === false) {
        // setTimeout(() => setIsWin(false), 5000);
        //     }
        // })
        // .catch((error) => {
        //     console.log(error);
        //     const result = error.response.data;
        //     if (result.status === 400) {
        //         if (result.message === "오늘 참여가능 횟수 부족") {
        //             window.alert("오늘 참여 가능 횟수가 부족합니다");
        //         } else if (result.message === "포인트 부족") {
        //             window.alert("포인트가 부족합니다");
        //         }
        //     }
        // });
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
                    <MoonArea>
                        <img src={lotteryMoon} alt="lotteryMoon" />
                    </MoonArea>
                    <LotteryArea>
                        <LotteryhalfMoon src={lotteryhalfMoon} />
                        {!isClick && <LotteryClick onClick={onClickHandler}>클릭하기</LotteryClick>}
                        {isLoading && <LotteryLoading>모습을 비추고 있어요..</LotteryLoading>}
                        {isClick && isWin === true && (
                            <LotteryResult isWin={isWin}>
                                당신에겐 달콤한 여유를 드릴게요.
                                <BananaMilkIcon src={bananaMilkIcon}></BananaMilkIcon>
                                <GetBananaMilkButton
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate("/lotterywin");
                                    }}
                                >
                                    받으러 가기
                                </GetBananaMilkButton>
                            </LotteryResult>
                        )}
                        {isClick && isWin === false && (
                            <LotteryResult isWin={isWin}>
                                당신에겐 달빛을 담은 용기를 드릴게요
                                <p>다음 기회에 도전해주세요!</p>
                            </LotteryResult>
                        )}
                    </LotteryArea>

                    <CountNoti>참여 가능 횟수</CountNoti>
                    <ClickCount>{userInfo ? userInfo.lottoCount : "0"}</ClickCount>
                    <Star>
                        <img src={star}></img>
                    </Star>
                    <Title>블루문! 내게 말해줘</Title>
                    <Desc>
                        블루문의 세계에서 용기를 내주신 당신을 위해, <br />
                        푸른 빛이 담긴 선물을 준비했어요. <br />
                        지금 이 순간, 당신에게 가장 필요한 것을 줄게요. <br />
                        블루문을 향해 말을 걸어보시겠어요? <br />
                        어쩌면, 당신에게 특별한 행운이 찾아올지도 몰라요:)
                    </Desc>
                    <RecommendDesc>1명 → +1회</RecommendDesc>
                    <RecommendIcons>친구 추천</RecommendIcons>
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
    background: ${(props) => props.BgColor};
    border-radius: 25px;

    position: relative;
    margin: auto;
`;

const MoonArea = styled.div`
    position: absolute;
    width: 433px;
    height: 433px;
    top: 39px;
    left: 77px;
`;

const LotteryArea = styled.div`
    position: absolute;
    width: 369px;
    height: 366px;
    top: 84px;
    left: 102px;
`;

const LotteryhalfMoon = styled.img`
    position: absolute;
    top: 182px;
    left: -4px;
`;

const LotteryClick = styled.div`
    position: absolute;
    top: 248px;
    left: 153px;

    display: flex;
    align-items: center;
    justify-content: center;

    color: #ffffff;

    z-index: 1;

    cursor: pointer;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;

    text-align: center;

    color: #ffffff;
`;

const LotteryLoading = styled(LotteryClick)`
    position: absolute;
    top: 250px;
    left: 110px;
    cursor: default;

    animation-name: loading;
    animation-duration: 3s;
    animation-timingfunction: linear;
    opacity: 0;

    @keyframes loading {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
`;

const LotteryResult = styled(LotteryClick)`
    top: ${(props) => (props.isWin ? "199px" : "240px")};
    left: ${(props) => (props.isWin ? "101px" : "57px")};
    font-size: ${(props) => (props.isWin ? "12px" : "16px")};
    line-height: ${(props) => (props.isWin ? "15px" : "20px")};
    display: flex;
    flex-direction: column;

    p {
        margin-top: 8px;
        font-family: "Spoqa Han Sans Neo";
        font-style: normal;
        font-weight: 400;
        font-size: 10px;
        line-height: 13px;
        text-align: center;

        color: rgba(255, 255, 255, 0.8);
    }

    cursor: default;

    animation-name: result;
    animation-duration: 3s;
    animation-timingfunction: linear;

    @keyframes result {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }
`;

const BananaMilkIcon = styled.img`
    margin-top: 13px;
`;

const GetBananaMilkButton = styled.div`
    box-sizing: border-box;

    width: 84px;
    height: 20px;
    margin-top: 13px;

    border: 1px solid #fffafa;
    border-radius: 5px;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 8px;
    line-height: 10px;
    text-align: center;

    color: #ffffff;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
`;

const CountNoti = styled.div`
    position: absolute;
    height: 24px;
    left: 50px;
    top: 420px;

    font-family: "Spoqa Han Sans Neo";
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
    bottom: 50px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #c6d3ec;
    border-radius: 5px;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 19px;
    text-align: center;

    color: #000000;
`;

const Star = styled.div`
    position: absolute;
    top: 114px;
    right: 333px;
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
    width: 77px;
    height: 34px;
    top: 443px;
    right: 50px;

    border: 1.5px solid #c6d3ec;
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;

    color: #ffffff;
`;

const RecommendDesc = styled.div`
    position: absolute;
    height: 15px;
    top: 426px;
    right: 59px;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;

    color: #c6d3ec;
`;
