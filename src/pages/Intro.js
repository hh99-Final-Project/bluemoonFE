import React, {useRef, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import { halfMoon, building, starBG } from "../static/images/resources";

const Intro = () => {

    const animationRef = useRef();
    const navigate = useNavigate();

    // useEffect(()=>{
    //
    //     if(localStorage.getItem("isShowIntro") === "true") {
    //         navigate("/");
    //         return;
    //     }
    //
    //     animationRef.current.addEventListener("animationend", () => {
    //         localStorage.setItem("isShowIntro", JSON.stringify(true));
    //         setTimeout(()=>{
    //             navigate("/");
    //         },1500);
    //
    //     });
    // },[]);

    return (
        <IntroContainer>
            <Desc>
                <First>
                    달빛이 유난히도 푸른 어느날, 나는 의문의 다이어리를 주웠다.
                </First>
                <Second>
                    <FirstDiv>
                        [이 다이어리는 블루문의 빛을 담아 마음을 위로해주는 다이어리입니다]
                    </FirstDiv>
                    <div>
                        [블루문을 통해, 당신의 가장 솔직한 이야기를 공유해보세요.]
                    </div>

                </Second>
                <Third ref={animationRef}>
                    세계 곳곳의 다이어리 주인들과 연결되고 있습니다....
                </Third>
            </Desc>
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
`;
const MoonImage = styled.img`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
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


