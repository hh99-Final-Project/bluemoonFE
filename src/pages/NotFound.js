import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/common";
import { notFoundImg, mobBackButton, mobHomeButton } from "../static/images/resources";
import Header from "../shared/Header";
import { isMobile } from "react-device-detect";
import { useMediaQuery } from "react-responsive";


const NotFound = () => {
    const navigate = useNavigate();

    const isMobileQuery = useMediaQuery({
        query: "(max-width: 420px)",
    });

    return (
        <React.Fragment>
            <Layout>
                <Container>
                    <Header/>
                    <Grid>
                        <ContentBox>
                            <Title>
                                앗! 막다른 길로 오셨군요. <br /> (404 Error){" "}
                            </Title>
                            <Description>
                                방문을 원하신 페이지의 주소가 잘못되었거나, <br/>
                                변경 혹은 삭제되어 찾을 수 없어요. <br/>
                                찾아오신 주소가 정확한지 확인해주세요!
                            </Description>
                            <ButtonBox>
                                {
                                    isMobile || isMobileQuery ?
                                        <ButtonMobBox>
                                            <MobileBackButton onClick={() => navigate(-1)}>
                                                <img src={mobBackButton}/>
                                                <div>이전화면</div>
                                            </MobileBackButton>
                                            <MobileHomeButton  onClick={() => navigate("/")}>
                                                <img src={mobHomeButton}/>
                                                <div>홈 화면</div>
                                            </MobileHomeButton>
                                        </ButtonMobBox>
                                        :
                                        <ButtonBox>
                                            <BackButton onClick={() => navigate(-1)}>이전 화면으로</BackButton>
                                            <HomeButton onClick={() => navigate("/")}>홈으로 가기</HomeButton>
                                        </ButtonBox>
                                }



                            </ButtonBox>
                        </ContentBox>
                        <ImageBox src={notFoundImg}/>
                    </Grid>
                </Container>
            </Layout>
        </React.Fragment>
    );
};

export default NotFound;

const Container = styled.div`
    width: 100%;
    overflow: hidden;
`;

const Grid = styled.div`
    width: 794px;
    margin: 198px auto 0;
    display: flex;
    justify-content: center;
    align-items: center;

  @media only screen and (max-width: 420px) {
    width: 320px;
    margin: 123px auto 0;
    display: flex;
    flex-direction: column-reverse;
    
  }
`;

const ContentBox = styled.div`
    width: 372px;
    color: white;
`;

const ButtonBox = styled.div`
    display: flex;
    flex-direction: row;
`;

const ButtonMobBox = styled.div`
  display: flex;
  margin: auto;
`;


const BackButton = styled.div`
    height: 51px;
    width: 172px;
    border: 1px solid #9AEBE7;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #9AEBE7;
    font-size: 20px;
    line-height: 25px;
`;

const MobileBackButton = styled.div`
  margin: auto;
  
  div {
    font-size: 10px;
    line-height: 13px;
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
  }
  
`;


const HomeButton = styled(BackButton)`
    margin-left: 29px;
`;

const MobileHomeButton = styled(MobileBackButton)`
  margin-left: 21px;
`;

const Title = styled.p`
    margin: 50px 0 0 0;
    font-size: 32px;
    justify-content: left;
    color: white;

  @media only screen and (max-width: 420px) {
    font-size: 20px;
    line-height: 25px;
    margin-top: 55px;
    text-align: center;
  }
`;

const ImageBox = styled.img`
    margin-left: 93px;

  @media only screen and (max-width: 420px) {
    margin-left: 0;
    width: 133px;
    height: 146px;
  }
`;

const Description = styled.div`
    margin: 59px 0 36px;
    width: 372px;
    color: #FFFAFA;
    font-size: 20px;
    line-height: 30px;

  @media only screen and (max-width: 420px) {
    font-size: 11px;
    line-height: 14px;
    color: #C6D3EC;
    text-align: center;
    margin: 25px 0 70px;
  }
`;
