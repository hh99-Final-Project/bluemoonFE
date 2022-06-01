import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useStore from "../zustand/store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userApi } from "../apis/userApi";

import { Layout } from "../components/common";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
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
import Popup from "../shared/Popup";
import { Helmet } from "react-helmet";

const Lottery = () => {
    const { setCurrentHeader } = useStore();
    const userInfo = useSelector((state) => state.userSlice.userInfo);
    const [isClick, setIsClick] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [isWin, setIsWin] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLogin = useSelector((state) => state.userSlice.isLogin);
    useEffect(() => {
        if (isLogin && userInfo.nickname === "") {
            navigate("/signup");
        }
    }, []);

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
        window.alert("오픈 이벤트가 종료되었습니다! 감사합니다😄");
        // if (!userInfo) {
        //     window.alert("로그인 후 참여할 수 있습니다!");
        //     return;
        // }
        //
        // userApi
        //     .tryLottery()
        //     .then((response) => {
        //         setIsClick(true);
        //         setTimeout(() => setIsLoading(true), 1000);
        //         setTimeout(() => setIsLoading(false), 4000);
        //         if (response.data.result === true) {
        //             setTimeout(() => {
        //                 setIsWin(true);
        //                 dispatch(setUserPoint(response.data.point));
        //                 dispatch(setUserCount());
        //             }, 5000);
        //         } else if (response.data.result === false) {
        //             setTimeout(() => {
        //                 setIsWin(false);
        //                 dispatch(setUserPoint(response.data.point));
        //                 dispatch(setUserCount());
        //             }, 5000);
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         const result = error.response.data;
        //     });
    };

    // url 공유
    const copyUrl = (e) => {
        e.stopPropagation();

        navigator.clipboard.writeText("https://bluemoondiary.com/").then(function () {
            setIsOpenPopup(true);
        });
    };

    const [isOpenPopup, setIsOpenPopup] = useState(false);

    return (
        <Layout>
            <Helmet>
                <title>Bluemoon 오픈 이벤트</title>
                <meta name="description" content="bluemoon 오픈 이벤트" />
                <meta property="og:url" content="https://bluemoondiary.com/lottery" />
            </Helmet>
            <Container>
                <Header />
                {isMobile || isMobileQuery ? <MobileTitleName title={"오픈*이벤트"} pos={6} /> : <CategoryBar />}
                <ContentBox BgColor={color.containerBoxColor}>
                    <MoonArea>
                        {!isMobile ? (
                            <img src={lotteryMoon} alt="lotteryMoon" loading="lazy"/>
                        ) : (
                            <img src={mobileLotteryMoon} alt="mobileLotteryMoon" loading="lazy"/>
                        )}
                    </MoonArea>
                    <LotteryArea>
                        {!isMobile && <LotteryhalfMoon src={lotteryhalfMoon} loading="lazy"/>}
                        {!isClick && <LotteryClick onClick={onClickHandler}>클릭하기</LotteryClick>}
                        {isLoading && <LotteryLoading>모습을 비추고 있어요..</LotteryLoading>}
                        {isClick && isWin === true && (
                            <LotteryResult isWin={isWin}>
                                당신에겐 달콤한 휴식을 선물할게요.
                                <BananaMilkIcon loading="lazy" src={!isMobile ? bananaMilkIcon : mobileBananaMilkIcon} />
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
                                당신에겐 달빛을 담은 용기를 드릴게요.
                                {/* <p>아쉽지만 다음 기회에 참여해주세요!</p> */}
                            </LotteryResult>
                        )}
                    </LotteryArea>
                    {!isMobile ? (
                        <>
                            <CountNoti>참여 가능 횟수</CountNoti>
                            <LeftCount>{userInfo ? userInfo.lottoCount : "0"}</LeftCount>
                        </>
                    ) : (
                        <>
                            <MobileLeftCount>{userInfo ? userInfo.lottoCount : "0"}</MobileLeftCount>
                            <MobileCircleIcon src={mobileCircleIcon}/>
                            <MobileCountNoti>남은 기회</MobileCountNoti>
                        </>
                    )}

                    <Star>
                        {!isMobile ? <img src={star} alt={"starIcon"} loading="lazy"/> : <img src={mobileStar} alt={"starIcon"} loading="lazy"/>}
                    </Star>
                    <Title>블루문! 내게 말해줘</Title>
                    <Desc>
                        다른 주인들에게 지혜로 고민을 들어준 당신을 위해, <br />
                        푸른 빛이 담긴 선물을 준비했어요. <br />
                        블루문을 향해 말을 걸어보시겠어요? <br />
                        어쩌면, 당신에게 특별한 행운이 찾아올지도 몰라요:)
                    </Desc>
                    <SubDesc>
                        1000룬을 모으면 하루 한 번, 이벤트에 참여할 수 있습니다. <br />
                        게시글 500룬(하루 1번), 댓글 100룬(하루 5번)
                    </SubDesc>
                    {!isMobile ? (
                        <>
                            <RecommendDesc>
                                추천인은 1000p <br />
                                회원가입한 사람은 500p
                            </RecommendDesc>
                            <RecommendIcons onClick={copyUrl}>친구 추천</RecommendIcons>
                        </>
                    ) : (
                        <>
                            <MobileRecommendIcon onClick={copyUrl}>
                                <img src={mobileRecommendIcon} alt={"recommend-friend"} loading="lazy"/>
                            </MobileRecommendIcon>
                            <MobileRecommendDesc>
                                추천인은 1000p <br />
                                회원가입한 사람은 500p
                            </MobileRecommendDesc>
                        </>
                    )}
                    {isOpenPopup && (
                        <Popup
                            title={"URL 복사가 완료되었습니다."}
                            close={() => setIsOpenPopup(false)}
                            event={() => {
                                setIsOpenPopup(false);
                            }}
                        />
                    )}
                </ContentBox>
            </Container>
            <Footer />
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

const ContentBox = styled.div`
    box-sizing: border-box;
    width: 950px;
    height: 530px;
    z-index: 3;
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0px 0px 70px #465981;
    backdrop-filter: blur(80px);
    background: ${(props) => props.BgColor};
    border-radius: 25px;
    position: relative;
    margin: auto;

    @media only screen and (max-width: 420px) {
        width: 320px;
        height: 80vh;

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

    img {
        width: 433px;
        height: 433px;
    }

    @media only screen and (max-width: 420px) {
        width: 251px;
        height: 251px;
        top: 213px;
        left: 34px;

        img {
            width: 251px;
            height: 251px;
        }
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
    width: 377px;
    height: 191px;
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
    font-size: 16px;
    line-height: 20px;
    text-align: center;

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
    top: 415px;

    font-size: 13px;
    line-height: 16px;
    text-align: center;

    color: #c6d3ec;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const LeftCount = styled.div`
    position: absolute;
    width: 77px;
    height: 34px;
    left: 50px;
    bottom: 50px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: transparant;
    border: 1.5px solid #c6d3ec;
    border-radius: 5px;

    font-size: 15px;
    line-height: 19px;
    text-align: center;

    color: #ffffff;
`;

const Star = styled.div`
    position: absolute;
    top: 114px;
    right: 333px;

    img {
        width: 74px;
        height: 92px;
    }

    @media only screen and (max-width: 420px) {
        top: 42px;
        left: 142px;

        img {
            width: 40px;
            height: 48px;
        }
    }
`;

const Title = styled.div`
    position: absolute;
    top: 212px;
    left: 540px;
    width: 220px;

    font-size: 24px;
    line-height: 30px;

    color: #ffffff;

    @media only screen and (max-width: 420px) {
        top: auto;
        left: auto;
        font-size: 20px;
        line-height: 25px;
        margin: 100px 0 0 80px;
    }
`;

const Desc = styled.div`
    position: absolute;
    top: 264px;
    left: 540px;

    font-family: "Spoqa";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;

    color: #c6d3ec;

    @media only screen and (max-width: 420px) {
        top: auto;
        left: auto;
        margin: 146px 0 0 50px;

        font-size: 10px;
        line-height: 13px;
    }
`;

const SubDesc = styled.div`
    position: absolute;
    width: auto;
    height: 30px;
    top: 360px;
    left: 539px;

    font-size: 10px;
    line-height: 15px;

    color: #c6d3ec;

    @media only screen and (max-width: 420px) {
        top: auto;
        left: auto;
        width: 320px;
        height: 24px;
        margin: 456px auto 0;
        text-align: center;
    }
`;

const RecommendIcons = styled.button`
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
    font-size: 14px;
    line-height: 18px;

    color: #ffffff;
    background-color: transparent;

    cursor: pointer;
`;

const RecommendDesc = styled.div`
    position: absolute;
    height: 15px;
    top: 407px;
    right: 50px;
    text-align: right;

    font-size: 12px;
    line-height: 15px;

    color: #c6d3ec;
`;

const MobileCircleIcon = styled.img`
    position: absolute;
    width: 32px;
    height: 32px;
    left: 38px;
    top: 544px;
`;
const MobileLeftCount = styled.div`
    position: absolute;
    width: 32px;
    height: 32px;
    left: 38px;
    top: 544px;

    z-index: 1000;
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
    top: 583px;
    font-size: 8px;
    line-height: 10px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #c6d3ec;
`;
const MobileRecommendIcon = styled.div`
    position: absolute;
    width: 32px;
    height: 32px;
    right: 34px;
    top: 544px;

    img {
        width: 32px;
        height: 32px;
    }
`;
const MobileRecommendDesc = styled.div`
    position: absolute;
    width: auto;
    height: 10px;
    right: 34px;
    top: 590px;

    font-size: 8px;
    line-height: 10px;

    display: flex;
    align-items: center;
    text-align: right;

    color: #c6d3ec;
`;
