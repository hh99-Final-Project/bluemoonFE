import React, {useRef, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import { halfMoon, building, starBG } from "../static/images/resources";
import { isMobile } from "react-device-detect";
import { useMediaQuery } from "react-responsive";
import {getCookie, introCookie} from "../utils/cookie";

const Intro = () => {

    const animationRef = useRef();
    const navigate = useNavigate();

    const isMobileQuery = useMediaQuery({
        query: "(max-width: 420px)",
    });

    useEffect(()=>{

        if(localStorage.getItem("isShowIntro") === "true" || getCookie("isSeenIntro")) {
            navigate("/");
            return;
        }

        animationRef.current.addEventListener("animationend", () => {
            localStorage.setItem("isShowIntro", JSON.stringify(true));
            if(isMobile || isMobileQuery) {
                introCookie(true);
            }
            setTimeout(()=>{
                navigate("/");
            },1500);

        });
    },[]);

    return (
        <IntroContainer>
            { (isMobileQuery || isMobile) ?
                <Desc>
                    <First>
                        달빛이 푸른 어느날, 의문의 다이어리를 주웠다.
                    </First>
                    <Second>
                        [이 다이어리는 블루문의 빛을 담아 <br/> 마음을 위로해주는 다이어리입니다]
                    </Second>
                    <MobileThird>
                        [블루문을 통해, <br/> 당신의 가장 솔직한 이야기를 공유해보세요.]

                    </MobileThird>
                    <Fourth ref={animationRef}>
                        세계 곳곳의 다이어리 주인들과 연결되고 있습니다....
                    </Fourth>
                </Desc>
                :
                <Desc>
                    <First>
                        달빛이 유난히도 푸른 어느날, 나는 의문의 다이어리를 주웠다.
                    </First>
                    <Second>
                        <FirstDiv>
                            [이 다이어리는 블루문의 빛을 담아 마음을 위로해주는 다이어리입니다]
                        </FirstDiv>
                        <SecondDiv>
                            [블루문을 통해, 당신의 가장 솔직한 이야기를 공유해보세요.]
                        </SecondDiv>
                    </Second>
                    <Third ref={animationRef}>
                        세계 곳곳의 다이어리 주인들과 연결되고 있습니다....
                    </Third>
                </Desc>
            }
            <MoonImage src={halfMoon}/>
            <BuildingBg src={building}/>
            <StarBackGround src={starBG}/>
        </IntroContainer>
    );
};

export default Intro;


const IntroContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(180deg, #081134 0%, #12163E 56.45%, #382963 100%);

  @media only screen and (max-width: 420px) {
    background: linear-gradient(180deg, #081134 0%, #382963 100%);
  }
`;
const MoonImage = styled.img`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);

  @media only screen and (max-width: 420px) {
    width: 387px;
    height: 217px;
  }
  
`;

const StarBackGround = styled.img`
  position: absolute;
  top: 0;
  width: 100%;
  object-fit: contain;
`;

const BuildingBg = styled.img`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  object-fit: cover;
`;

const Desc = styled.div`
  z-index: 999999;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #FFFFFF;
  position: relative;
  top: 312px;
  left: 50%;
  transform: translate(-50%, 0);

  @media only screen and (max-width: 420px) {
    font-size: 12px;
    line-height: 15px;
    top: 334px;
  }
`;

const First = styled.div`
  animation-name: fadein;
  animation-duration: 5s;
  animation-timing-function: linear;
  opacity: 0;
  
   @keyframes fadein{
       0% {
           opacity: 0;
           transform: translateY(20px);
      }
       50% {
           opacity: 1;
           transform: none;
       }
         100% {
           opacity: 0;
           transform: none;
         }
   }
`;
const Second = styled.div`
  animation-name: fadein;
  animation-delay: 5s;
  animation-duration:5s;
  animation-timing-function: linear;
  opacity: 0;
  margin-top: -20px;

  @keyframes fadein{
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    50% {
      opacity: 1;
      transform: none;
    }
    100% {
      opacity: 0;
      transform: none;
    }
  }
`;

const FirstDiv = styled.div`
    margin-bottom: 10px;
`;

const SecondDiv = styled.div`
  
`;

const Third = styled.div`
  transform: translate(-50%, 0);
  animation-name: fadein;
  animation-delay: 10s;
  animation-duration:5s;
  animation-timing-function: linear;
  opacity: 0;
  animation-fill-mode: forwards;
  margin-top: -40px;

  @keyframes fadein{
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }
`;

const MobileThird = styled(Second)`
  animation-delay: 10s;
  margin-top: -40px;
`;

const Fourth = styled.div`
      transform: translate(-50%, 0);
      animation-name: fadein;
      animation-delay: 15s;
      animation-duration:5s;
      animation-timing-function: linear;
      opacity: 0;
      animation-fill-mode: forwards;
      margin-top: -60px;
    
      @keyframes fadein{
        0% {
          opacity: 0;
          transform: translateY(20px);
        }
        100% {
          opacity: 1;
          transform: none;
        }
      }
`;


