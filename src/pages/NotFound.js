import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/common";

const NotFound = (props) => {
    const navigate = useNavigate();

    return (
        <Layout>
            <Container>
                <Grid>
                    <ContentBox>
                        <Title>
                            앗! 막다른 길로 오셨군요! <br /> (404 Error){" "}
                        </Title>
                        <Description>
                            방문을 원하신 페이지의 주소가 잘못되었거나, 변경 혹은 삭제되어 찾을 수 없어요. 찾아오신
                            주소가 정확한지 확인해주세요:)
                        </Description>
                        <ButtonBox>
                            <BackButton onClick={() => navigate(-1)}>이전 화면으로</BackButton>
                            <HomeButton onClick={() => navigate("/")}>홈으로 가기</HomeButton>
                        </ButtonBox>
                    </ContentBox>

                    <ImageBox>이미지 영역</ImageBox>
                </Grid>
            </Container>
    </Layout>
    );
};

export default NotFound;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
`;

const Grid = styled.div`
    width: 946px;
    height: 300px;
    margin: 300px auto;
    display: flex;
    justify-content: space-between;
`;

const ContentBox = styled.div`
    width: 700px;
    color: white;
`;

const ButtonBox = styled.div`
    display: flex;
    flex-direction: row;
`;

const BackButton = styled.div`
    margin: 40px 0 0 0;
    background-color: #455277;
    color: #9aebe7;

    height: 51px;
    width: 172px;
    left: 370px;
    top: 438px;
    border-radius: 10px;

    display: flex;
    align-items: center;
    font-size: 24px;
    justify-content: center;
    cursor: pointer;
`;

const HomeButton = styled.div`
    margin: 40px 0 0 60px;
    background-color: #455277;
    color: #9aebe7;

    height: 51px;
    width: 172px;
    left: 370px;
    top: 438px;
    border-radius: 10px;

    display: flex;
    align-items: center;
    font-size: 24px;
    justify-content: center;
    cursor: pointer;
`;

const Title = styled.p`
    margin: 50px 0 0 0;
    font-size: 32px;
    justify-content: left;
    color: white;
`;

const ImageBox = styled.div`
    width: 246px;
    color: white;
    background-color: gray;
`;

const Description = styled.div`
    margin: 30px 0 0 0;
`;
