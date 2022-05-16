import React from "react";
import styled from "styled-components";
import { halfMoon } from "../static/images/resources";
import { Layout } from "../components/common";

const Intro = () => {

    return (
        <Layout>
            <IntroContainer>
                <MoonImage src={halfMoon}/>
                    <Desc>
                        <div>달빛이 유난히도 푸른 어느날, 나는 의문의 다이어리를 주웠다.</div>
                        <div>[당신은 블루문의 기운을 담은 다이어리를 주우셨습니다.]</div>
                    </Desc>
            </IntroContainer>
        </Layout>
    )
}

export default Intro;


const IntroContainer = styled.div`
  width: 100%;
  height: 100vh;
`;
const MoonImage = styled.img`
  position: relative;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
`;
const Desc = styled.div`
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: #FFFFFF;
  margin-top: 30px;
  div {
    margin-bottom: 30px;
    margin-top: 20px;
  }
`;