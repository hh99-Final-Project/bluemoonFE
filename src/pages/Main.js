import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryBar from "../shared/CategoryBar";
import Header from "../shared/Header";
import { logo, mainMoonIcon, doubleQuoteLeft, doubleQuoteRight, moonIconTransparent } from "../static/images/resources";
import { Layout } from "../components/common";
import { color } from "../utils/designSystem";
import Intro from "../pages/Intro";
import { useMediaQuery } from "react-responsive";

const Main = () => {
    const navigate = useNavigate();

    const isAlreadyCheckIntro = localStorage.getItem("isShowIntro");

    const isMobile = useMediaQuery({
        query: "(max-width: 420px)"
    });

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

    if(isAlreadyCheckIntro !== "true") {
        return <Intro/>;
    }

    return (
        <Layout>
            <Container>
                <Header />
                {!isMobile && <CategoryBar />}
                <IntroContainer BgColor={color.containerBoxColor}>
                    <ServiceStart>
                        <Logo>
                            <img src={logo}/>
                        </Logo>
                        <ServiceTitle>Blue Moon</ServiceTitle>
                        <DiaryWriteButton>
                            <div onClick={() => navigate("/write")}>다이어리 쓰기</div>
                        </DiaryWriteButton>
                        <DiaryListButton onClick={() => navigate("/diarylist")}>다이어리 읽기</DiaryListButton>
                    </ServiceStart>
                    <ServiceIntro>
                        <Slider2 {...settings}>
                            <FirstSlide>
                                <BorderCard>
                                    <SubTitle>블/루/문 다/이/어/리/의</SubTitle>
                                    <Border/>
                                    <Border2/>
                                    <MainTitle>
                                        <span>주</span>
                                        <span>인</span>
                                        <span>에</span>
                                        <span>게</span>
                                    </MainTitle>
                                    <Border/>
                                    <Border2/>
                                    <MoonIcon src={mainMoonIcon}/>
                                </BorderCard>
                            </FirstSlide>
                            <SecondSlide>
                                <BorderCard2>
                                    <span>
                                        <Quote src={doubleQuoteLeft}/>
                                        푸른 달빛이 깃든 이 다이어리는 <br/>
                                        당신을 주인으로 선택했습니다. <br/>
                                        환영합니다.
                                        <Quote src={doubleQuoteRight}/>
                                    </span>
                                    <MoonIcon2 src={moonIconTransparent}/>
                                </BorderCard2>
                            </SecondSlide>
                            <ThirdSlide>
                                <BorderCard2>
                                    <span>
                                        <Quote src={doubleQuoteLeft}/>
                                        이 다이어리를 통해 <br/>
                                        또 다른 주인들과 서로의 이야기를<br/>
                                        공유하거나 소통할 수 있습니다.
                                        <Quote src={doubleQuoteRight}/>
                                        <MoonIcon2 src={moonIconTransparent}/>
                                    </span>
                                </BorderCard2>
                            </ThirdSlide>
                            <FourthSlide>
                                <BorderCard2>
                                    <span>
                                        <Quote src={doubleQuoteLeft}/>
                                        당신이 원한다면,<br/>
                                        원하는 사람과 깊이 있는 대화를<br/>
                                        나눌 수 있습니다.
                                        <Quote src={doubleQuoteRight}/>
                                        <MoonIcon2 src={moonIconTransparent}/>
                                    </span>
                                </BorderCard2>
                            </FourthSlide>
                            <FifthSlide>
                                <BorderCard2>
                                    <span>
                                        <Quote src={doubleQuoteLeft}/>
                                        주인들과 소통하지 않으면<br/>
                                        다이어리는 빛을 잃게 됩니다.<br/>
                                        꼭 명심하세요.
                                        <Quote src={doubleQuoteRight}/>
                                        <MoonIcon2 src={moonIconTransparent}/>
                                    </span>
                                </BorderCard2>
                            </FifthSlide>

                        </Slider2>

                    </ServiceIntro>
                </IntroContainer>
            </Container>
        </Layout>
    );
};

export default Main;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
  
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
    background: ${props => props.BgColor};
    display: flex;
    justify-content: space-between;
    padding: 45px 53px;
    position: relative;
    z-index: 2;

  @media only screen and (max-width: 420px) {
    width: 320px;
    height: calc(100% - 98px);
    margin: 20px auto 0;
    padding: 0;
  }
`;

const ServiceStart = styled.div`
    margin-right: 26px;
    width: 477px;
    height: 440px;
    background-color: rgba(31, 36, 73, 0.8);
    border: 2px solid #43567e;
    box-sizing: border-box;
    border-radius: 20px;

  @media only screen and (max-width: 420px) {
    width: 320px;
    height: 100%;
    margin-right: 0;
  }
`;

const ServiceIntro = styled.div`
    width: 341px;
    height: 440px;
    box-sizing: border-box;
    border-radius: 20px;
    margin: auto;
    background-color: rgba(31, 36, 73, 0.8);

  @media only screen and (max-width: 420px) {
     display: none;
  }
`;

const Logo = styled.div`
    margin: 74px auto 0;
    text-align: center;
  
    img {
      width: 141px;
    }

  @media only screen and (max-width: 420px) {
    margin: 186px auto 0;
  }
`;

const ServiceTitle = styled.div`
    font-size: 30px;
    line-height: 35px;
    text-align: center;
    color: #ffffff;
    font-family: 'Jura';
    width: 151px;
    margin: 0 auto 83px;

      @media only screen and (max-width: 420px) {
        margin: 0 auto 184px;
      }
  
`;


const Border = styled.div`
  width: 208px;
  border: 1px solid #9AEBE7;
  margin: 0 auto 5px;
  border-collapse: collapse;
`;

const Border2 = styled(Border)`
  margin: auto;
`;

const SubTitle = styled.div`
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.19em;
  margin-bottom: 6px;
  margin-top: 135px;
`;

const MoonIcon = styled.img`
  margin: 135px auto;
`;

const MoonIcon2 = styled.img`
  margin: 100px auto 0;
`;

const BorderCard = styled.div`
  width: 310px;
  height: 410px;
  box-sizing: border-box;
  font-size: 18px;
  line-height: 22px;
  background-color: rgba(31, 36, 73, 0.8);
  border: 1px solid #9AEBE7;
  border-radius: 15px;
  margin-top: 15px;
  margin-left: 15px;
`;

const BorderCard2 = styled(BorderCard)`
  background-color: rgba(198, 211, 236, 0.8);
  border: 1px solid #1F2449;
  padding: 113px 28px 100px 28px;
`;

const Quote = styled.img`
  margin: 17px auto;
`;

const MainTitle = styled.div`
  border-collapse: collapse;
  display: table;
  text-align: center;
  margin: 8px auto;
  span {
    width: 40px;
    height: 40px;
    border-right: 1px solid #9AEBE7;
    border-left: 1px solid #9AEBE7;
    box-sizing: border-box;
    font-size: 18px;
    line-height: 18px;
    padding: 9px 11px;
    border-collapse: collapse;
  }
`;

const Slider2 = styled(Slider)`
  width: 341px;
  height: 440px;
  box-sizing: border-box;
  
  .slick-dots {
    top: 396px;
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
`;



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
  font-size: 18px;
  line-height: 23px;
  color: #08105D;
  height: 440px;
  width: 341px !important;
`;

const ThirdSlide = styled(SecondSlide)``;
const FourthSlide = styled(SecondSlide)``;
const FifthSlide = styled(SecondSlide)``;


const DiaryWriteButton = styled.div`
    width: 395px;
    height: 46px;
    margin: auto;
    border: 2px solid #91DDDD;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 9px;
    box-sizing: border-box;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    font-size: 18px;
    line-height: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #9AEBE7;

  @media only screen and (max-width: 420px) {
    width: 181px;
    height: 30px;
    font-size: 16px;
    line-height: 19px;
  }
`;

const DiaryListButton = styled(DiaryWriteButton)`
    margin: 15px auto 0;
    color: #84c8cc;
    background-color: #293252;
    border: 2px solid #84c8cc;
`;
