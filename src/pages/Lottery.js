import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useStore from "../zustand/store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userApi } from "../apis/userApi";

import { Layout } from "../components/common";
import Header from "../shared/Header";
import CategoryBar from "../shared/CategoryBar";
import Loading from "../shared/Loading";

import { color } from "../utils/designSystem";
import {
    lotteryMoon,
    lotteryhalfMoon,
    bananaMilkIcon,
    star,
    mobileLotteryMoon,
    mobileStar,
    mobileCircleIcon,
    mobileRecommendIcon,
    mobileBananaMilkIcon,
    mobileLotteryResultCresent,
} from "../static/images/resources";
import MobileTitleName from "../components/common/MobileTitleName";
import { useMediaQuery } from "react-responsive";
import { setUserPoint, setUserCount } from "../redux/modules/userSlice";

const Lottery = () => {
    const { setCurrentHeader } = useStore();
    const userInfo = useSelector((state) => state.userSlice.userInfo);
    const [isClick, setIsClick] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [isWin, setIsWin] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isMobile = useMediaQuery({
        query: "(max-width: 420px)",
    });

    useEffect(() => {
        setCurrentHeader("추첨");
    }, []);

    const isMobileQuery = useMediaQuery({
        query: "(max-width: 420px)",
    });

    const onClickHandler = (e) => {
        if (!userInfo) {
            window.alert("로그인 후 참여할 수 있습니다!");
            return;
        }

        userApi
            .tryLottery()
            .then((response) => {
                setIsClick(true);
                setTimeout(() => setIsLoading(true), 1000);
                setTimeout(() => setIsLoading(false), 4000);
                if (response.data.result === true) {
                    setTimeout(() => {
                        setIsWin(true);
                        dispatch(setUserPoint(response.data.point));
                        dispatch(setUserCount());
                    }, 5000);
                } else if (response.data.result === false) {
                    setTimeout(() => {
                        setIsWin(false);
                        dispatch(setUserPoint(response.data.point));
                        dispatch(setUserCount());
                    }, 5000);
                }
            })
            .catch((error) => {
                console.log(error);
                const result = error.response.data;
            });
    };

    return (
        <Layout>
            <Container>
                <Header />
                {isMobile || isMobileQuery ? <MobileTitleName title={"오픈*이벤트"} pos={6} /> : <CategoryBar />}
                <ContentBox BgColor={color.containerBoxColor}>
                    <MoonArea>
                        {!isMobile ? (
                            <img src={lotteryMoon} alt="lotteryMoon" />
                        ) : (
                            <img src={mobileLotteryMoon} alt="mobileLotteryMoon"></img>
                        )}
                    </MoonArea>
                    <LotteryArea>
                        {!isMobile && <LotteryhalfMoon src={lotteryhalfMoon} />}
                        {!isClick && <LotteryClick onClick={onClickHandler}>클릭하기</LotteryClick>}
                        {isLoading && <LotteryLoading>모습을 비추고 있어요..</LotteryLoading>}
                        {isClick && isWin === true && (
                            <LotteryResult isWin={isWin}>
                                당신에겐 달콤한 휴식을 선물할게요.
                                <BananaMilkIcon src={!isMobile ? bananaMilkIcon : mobileBananaMilkIcon} />
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
                                당신에게 편안한 밤을 선물할게요
                                <p>아쉽지만 다음 기회에 참여해주세요!</p>
                            </LotteryResult>
                        )}
                    </LotteryArea>
                    {!isMobile ? (
                        <>
                            <CountNoti>참여 가능 횟수</CountNoti>
                            <ClickCount>{userInfo ? userInfo.lottoCount : "0"}</ClickCount>
                        </>
                    ) : (
                        <>
                            <MobileLeftCount>{userInfo ? userInfo.lottoCount : "0"}</MobileLeftCount>
                            <MobileCircleIcon src={mobileCircleIcon}></MobileCircleIcon>
                            <MobileCountNoti>남은 기회</MobileCountNoti>
                        </>
                    )}

                    <Star>{!isMobile ? <img src={star}></img> : <img src={mobileStar}></img>}</Star>
                    <Title>블루문! 내게 말해줘</Title>
                    <Desc>
                        블루문의 세계에서 용기를 내주신 당신을 위해, <br />
                        푸른 빛이 담긴 선물을 준비했어요. <br />
                        지금 이 순간, 당신에게 가장 필요한 것을 줄게요. <br />
                        블루문을 향해 말을 걸어보시겠어요? <br />
                        어쩌면, 당신에게 특별한 행운이 찾아올지도 몰라요:)
                    </Desc>
                    {!isMobile ? (
                        <>
                            <RecommendDesc>1명 → +1회</RecommendDesc>
                            <RecommendIcons>친구 추천</RecommendIcons>
                        </>
                    ) : (
                        <>
                            <MobileRecommendIcon src={mobileRecommendIcon}></MobileRecommendIcon>
                            <MobileRecommendDesc>기회 추가</MobileRecommendDesc>
                        </>
                    )}
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

    @media only screen and (max-width: 420px) {
        width: 320px;
        margin: auto;
    }
`;

const MobTitle = styled.div`
    width: 320px;
    height: 34px;
    color: #ffffff;
    text-align: center;
    margin: 0 auto;
`;

const ContentBox = styled.div`
    box-sizing: border-box;
    width: 950px;
    height: 530px;

    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0px 0px 70px #465981;
    backdrop-filter: blur(80px);
    background: ${(props) => props.BgColor};
    border-radius: 25px;

    position: relative;
    margin: auto;

    @media only screen and (max-width: 420px) {
        width: 320px;
        height: 646px;

        border-radius: 15px;

        background: linear-gradient(180deg, rgba(14, 30, 80, 0.79) 0%, rgba(93, 102, 124, 0.79) 100%);
        border: 2px solid rgba(255, 255, 255, 0.3);
        box-shadow: 0px 0px 70px #465981;
        backdrop-filter: blur(80px);
    }
`;

const MoonArea = styled.div`
    position: absolute;
    width: 433px;
    height: 433px;
    top: 39px;
    left: 77px;

    @media only screen and (max-width: 420px) {
        width: 251px;
        height: 251px;
        top: 213px;
        left: 34px;
    }
`;

const LotteryArea = styled.div`
    position: absolute;
    width: 369px;
    height: 366px;
    top: 84px;
    left: 102px;

    @media only screen and (max-width: 420px) {
        width: 251px;
        height: 251px;
        top: 213px;
        left: 34px;
    }
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

    z-index: 9999;

    cursor: pointer;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;

    text-align: center;

    color: #ffffff;

    @media only screen and (max-width: 420px) {
        width: auto;
        height: 11px;
        top: 158px;
        left: 105px;

        font-size: 10px;
        line-height: 13px;
    }
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

    @media only screen and (max-width: 420px) {
        top: 158px;
        left: 75px;

        font-size: 10px;
        line-height: 13px;
    }
`;

const LotteryResult = styled(LotteryClick)`
    top: ${(props) => (props.isWin ? "199px" : "240px")};
    left: ${(props) => (props.isWin ? "88px" : "77px")};
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

    @media only screen and (max-width: 420px) {
        top: ${(props) => (props.isWin ? "180px" : "164px")};
        left: ${(props) => (props.isWin ? "44px" : "48px")};
        font-size: 10px;
        line-height: 13px;

        p {
            display: none;
        }
    }
`;

const BananaMilkIcon = styled.img`
    margin-top: 13px;
    @media only screen and (max-width: 420px) {
        position: absolute;
        top: -47px;
        margin-top: 0px;
    }
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

    @media only screen and (max-width: 420px) {
        top: 42px;
        left: 142px;
    }
`;

const Title = styled.div`
    position: absolute;
    top: 212px;
    left: 542px;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 30px;

    color: #ffffff;

    @media only screen and (max-width: 420px) {
        top: 100px;
        left: 70px;
        font-size: 20px;
        line-height: 25px;
    }
`;

const Desc = styled.div`
    position: absolute;
    top: 264px;
    left: 540px;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;

    color: #c6d3ec;

    @media only screen and (max-width: 420px) {
        top: 146px;
        left: 50px;

        font-size: 10px;
        line-height: 13px;
    }
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

const MobileCircleIcon = styled.img`
    position: absolute;
    width: 32px;
    height: 32px;
    left: 38px;
    top: 554px;
`;
const MobileLeftCount = styled.div`
    position: absolute;
    width: 32px;
    height: 32px;
    left: 38px;
    top: 554px;

    z-index: 1000;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 19px;
    display: flex;
    align-items: center;
    justify-content: center;

    color: #9aebe7;
`;

const MobileCountNoti = styled.div`
    position: absolute;

    height: 8px;
    left: 33px;
    top: 593px;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 8px;
    line-height: 10px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #c6d3ec;
`;
const MobileRecommendIcon = styled.img`
    position: absolute;
    width: 32px;
    height: 32px;
    left: 254px;
    top: 554px;
`;
const MobileRecommendDesc = styled.div`
    position: absolute;

    height: 10px;
    left: 248px;
    top: 593px;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 8px;
    line-height: 10px;

    display: flex;
    align-items: center;
    text-align: center;

    color: #c6d3ec;
`;
