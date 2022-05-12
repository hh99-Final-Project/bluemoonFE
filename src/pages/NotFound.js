import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/common";
import RocketImg from "../static/images/common/notFoundImg.svg";
import Header from "../shared/Header";

const NotFound = (props) => {
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <Layout>
                <Header/>
                <Container>
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
                                <BackButton onClick={() => navigate(-1)}>이전 화면으로</BackButton>
                                <HomeButton onClick={() => navigate("/")}>홈으로 가기</HomeButton>
                            </ButtonBox>
                        </ContentBox>
                        <ImageBox src={RocketImg}/>
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
    height: 380px;
    margin: 198px auto 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContentBox = styled.div`
    width: 372px;
    color: white;
`;

const ButtonBox = styled.div`
    display: flex;
    flex-direction: row;
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


const HomeButton = styled(BackButton)`
    margin-left: 29px;
`;

const Title = styled.p`
    margin: 50px 0 0 0;
    font-size: 32px;
    justify-content: left;
    color: white;
`;

const ImageBox = styled.img`
    margin-left: 93px;
`;

const Description = styled.div`
    margin: 59px 0 36px;
    width: 372px;
    color: #FFFAFA;
    font-size: 20px;
    line-height: 30px;
    
`;
