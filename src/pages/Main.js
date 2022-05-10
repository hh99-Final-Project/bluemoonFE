import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as commonActions from "../redux/modules/commonSlice";
import Login from "../components/user/Login";
import { userApi } from "../apis/userApi";
import CategoryBar from "../shared/CategoryBar";
import Header from "../shared/Header";

const Main = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const thunkHandler = () => {
    //     dispatch(getInfo())
    //     .then((res) => {
    //         console.log(res.payload, "res");
    //     })
    //     .catch((err) => console.log(err));
    // };

    const settings = {
        dots: true,
        arrows: false,
        infinite: false,
        speed: 0,
        slideToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Container>
            <Header />
            <CategoryBar />
            <IntroContainer>
                <ServiceStart>
                    <Logo>로고</Logo>
                    <ServiceTitle>Blue Moon</ServiceTitle>
                    <DiaryWriteButton>
                        <div onClick={() => navigate("/write")}>고민 털어놓기</div>
                    </DiaryWriteButton>
                    <DiaryListButton onClick={() => navigate("/diarylist")}>고민 둘러보기</DiaryListButton>
                </ServiceStart>
                <ServiceIntro>
                    <IntroTitle>블루문 사용 설명서</IntroTitle>
                    <IntroImage>
                        <Slider {...settings}>
                            <div>누구에게 털어놓지 못하는 고민이 있으신가요?</div>
                            <div>그렇다면, 당신을 블루문에 초대할게요</div>
                            <div>
                                푸른 달이 뜨는 이 곳은 아무도 당신을 알지 못하고, 그 누구보다도 솔직해 질 수 있는
                                공간이에요
                            </div>
                            <div>모두가 솔직해지는 신비한 공간인 블루문으로 오세요.</div>
                        </Slider>
                    </IntroImage>
                </ServiceIntro>
            </IntroContainer>
        </Container>
    );
};

export default Main;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #111b3f;
    overflow: hidden;
`;

const IntroContainer = styled.div`
    width: 950px;
    height: 530px;
    margin: auto;
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-sizing: border-box;
    box-shadow: 0 0 70px #465981;
    backdrop-filter: blur(80px);
    border-radius: 25px;
    background: linear-gradient(180deg, rgba(63, 75, 112, 0.79) 0%, rgba(100, 114, 152, 0.79) 100%);
    display: flex;
    justify-content: space-between;
    padding: 40px 60px;
    position: relative;  
    z-index: 2;
`;

const ServiceStart = styled.div`
    margin-right: 20px;
    width: 428px;
    background-color: #1f2449;
    border: 2px solid #43567e;
    box-sizing: border-box;
    border-radius: 20px;
`;

const ServiceIntro = styled.div`
    width: 284px;
    background-color: #1f2449;
    border: 2px solid #43567e;
    box-sizing: border-box;
    border-radius: 20px;
`;

const Logo = styled.div`
    width: 120px;
    height: 80px;
    margin: 100px auto 20px;
    background-color: rgba(182, 233, 230, 0.7);
`;

const ServiceTitle = styled.div`
    width: 300px;
    font-size: 24px;
    line-height: 28px;
    font-weight: bold;
    margin: auto;
    text-align: center;
    color: #ffffff;
`;

const DiaryWriteButton = styled.div`
    width: 355px;
    height: 45px;
    background-color: #c0cde6;
    margin: 50px auto 0;
    border: 2px solid #43567e;
    box-sizing: border-box;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 9px;
    font-size: 19px;
    line-height: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #060e32;
`;

const DiaryListButton = styled(DiaryWriteButton)`
    margin: 15px auto 0;
    color: #84c8cc;
    background-color: #293252;
    border: 2px solid #84c8cc;
`;

const IntroTitle = styled.div`
    margin: 75px auto 30px;
    font-weight: bold;
    font-size: 15px;
    line-height: 18px;
    text-align: center;
    color: #ffffff;
`;
const IntroImage = styled.div`
    width: 250px;
    height: 195px;
    background: #111b3f;
    border: 2px solid #43567e;
    box-sizing: border-box;
    backdrop-filter: blur(20px);
    border-radius: 9px;
    margin: auto;
    text-align: center;
    color: #ffffff;
    padding: 30px;

    div {
        margin: 10px auto;
        font-size: 14px;
    }

    .slick-dots {
        bottom: -70px;
    }
    .slick-dots li {
        margin: 0 -3px;
    }
    .slick-dots li button:before {
        color: #dddddd;
    }
    .slick-dots li.slick-active button:before {
        color: #9aebe7;
    }
`;
