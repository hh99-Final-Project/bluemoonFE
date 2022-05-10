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
import logo from "../static/images/common/logo.svg";

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
        speed: 3000,
        autoplay: true,
        autoplaySpeed: 5000,
        slideToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Container>
            <Header />
            <CategoryBar />
            <IntroContainer>
                <ServiceStart>
                    <Logo>
                        <img src={logo}/>
                    </Logo>
                    <ServiceTitle>Blue Moon</ServiceTitle>
                    <DiaryWriteButton>
                        <div onClick={() => navigate("/write")}>고민 털어놓기</div>
                    </DiaryWriteButton>
                    <DiaryListButton onClick={() => navigate("/diarylist")}>고민 둘러보기</DiaryListButton>
                </ServiceStart>
                <ServiceIntro>
                    <Slider2 {...settings}>
                        <FirstSlide>
                            <BorderCard>
                                <Border/>
                                <span>블루문 다이어리 주인께</span>
                                <Border/>
                            </BorderCard>
                        </FirstSlide>
                        <SecondSlide>
                            <BorderCard2>
                                <span>
                                    달빛이 깃든 이 다이어리는 당신을 <br/>
                                    주인으로 선택했습니다. 환영합니다.
                                </span>
                            </BorderCard2>
                        </SecondSlide>
                        <ThirdSlide>
                            <BorderCard2>
                                <span>
                                    이 다이어리를 통해 또 다른 주인들과
                                    서로 글을 공유하거나, 댓글로 소통할 수 있습니다.
                                </span>
                            </BorderCard2>
                        </ThirdSlide>
                        <FourthSlide>
                            <BorderCard2>
                                <span>
                                    당신이 원한다면, 원하는 사람과 진중한 대화를 나눌 수 있습니다.
                                </span>
                            </BorderCard2>
                        </FourthSlide>
                        <FifthSlide>
                            <BorderCard2>
                                <span>
                                    이 다이어리는 주인들과 소통하지 않으면, 빛을 잃게 됩니다.<br/>
                                    꼭 명심하세요.
                                </span>
                            </BorderCard2>
                        </FifthSlide>

                    </Slider2>

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
    padding: 51px 48px 39px 51px;
    position: relative;  
    z-index: 2;
`;

const ServiceStart = styled.div`
    margin-right: 20px;
    width: 479px;
    height: 440px;
    background-color: #1f2449;
    border: 2px solid #43567e;
    box-sizing: border-box;
    border-radius: 20px;
`;

const ServiceIntro = styled.div`
    width: 342px;
    height: 440px;
    box-sizing: border-box;
    border-radius: 20px;
    margin: auto;
`;

const Logo = styled.div`
    margin: 100px auto 0;
    width: 141px;
`;

const ServiceTitle = styled.div`
    width: 300px;
    font-size: 24px;
    line-height: 28px;
    font-weight: bold;
    margin: -40px auto 90px;
    text-align: center;
    color: #ffffff;
`;


const Border = styled.div`
  width: 212px;
  border: 1px solid #91A6A8;
  margin: 9px auto;
`;

const BorderCard = styled.div`
  width: 312px;
  height: 414px;
  margin: 7px auto 0;
  box-sizing: border-box;
  border: 1px solid #91A6A8;
  border-radius: 15px;
  padding-top: 40%;
  font-size: 18px;
  line-height: 22px;
`;

const BorderCard2 = styled(BorderCard)`
  margin: 13px auto 0;
  border: 1px solid #91A6A8;
  color: #000000;
  padding: 50% 13px;

`;

const Slider2 = styled(Slider)`
  width: 342px;
  height: 440px;
  box-sizing: border-box;
  
  .slick-dots {
    top: 368px;
  }
  .slick-dots li {
    margin: 0 -6px;
    width: 25px;
    height: 25px;
  }

  .slick-dots li button:before {
    color: #ffffff;
  }
  
  .slick-dots li.slick-active button:before {
    color: #9aebe7;
  }
`



const FirstSlide = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 19px;
  line-height: 23px;
  color: #FFFFFF;
  width: 342px;
  height: 440px;
  box-sizing: border-box;
  border-radius: 20px;

  .slick-dots li button:before {
    color: #ffffff;
  }
`;

const SecondSlide = styled(FirstSlide)`
  background-color: #C0CDE7;
`;

const ThirdSlide = styled(SecondSlide)``;
const FourthSlide = styled(SecondSlide)``;
const FifthSlide = styled(SecondSlide)``;


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
