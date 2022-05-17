import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { DiaryContent, CommentList, CommentContainer } from "../components/diary";
import { diaryApi } from "../apis/diaryApi";
import Header from "../shared/Header";
import Loading from "../shared/Loading";
import { useSelector } from "react-redux";
import CategoryBar from "../shared/CategoryBar";
import { convertDate } from "../utils/convertDate";
import { Layout } from "../components/common";
import { useQuery, useQueryClient } from "react-query";
import useStore from "../zustand/store";
import { color } from "../utils/designSystem";

DiaryDetail.propTypes = {};

function DiaryDetail() {
    const navigate = useNavigate();
    const params = useParams();
    const postId = params.id;

    const isLogin = useSelector((state) => state.userSlice.isLogin);

    const loginDetail = useQuery("diaryDetail", () => diaryApi.getOneDiary(postId), {
        refetchOnWindowFocus: false,
        enabled: isLogin
    });

    const nonLoginDetail = useQuery("diaryDetail2", () => diaryApi.getNotLoginUserDetail(), {
        enabled: !isLogin
    });
    const { setCurrentHeader } = useStore();


    useEffect(()=>{
       setCurrentHeader("고민상담");
    },[]);

    if (loginDetail.isLoading || nonLoginDetail.isLoading) {
        return <Loading />;
    }

    return (
        <Layout>
            <DetailContainer>
                <Header />
                <CategoryBar />
                <DetailContent BgColor={color.containerBoxColor}>
                    <TitleContainer>
                        <TitleLeft>
                            <BackButton onClick={() => navigate("/diarylist")}/>
                            <Title>고민 들어주기</Title>
                        </TitleLeft>
                        <Time>{convertDate(isLogin ? loginDetail.data.createdAt : nonLoginDetail.data.createdAt)}</Time>
                    </TitleContainer>
                    <ContentContainer>
                        <DiaryContent diary={isLogin ? loginDetail.data : nonLoginDetail.data} />
                        <CommentContainer diary={isLogin ? loginDetail.data : nonLoginDetail.data} postId={postId}/>
                    </ContentContainer>
                </DetailContent>
            </DetailContainer>
        </Layout>
    );
}

export default DiaryDetail;

const DetailContainer = styled.div`
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
`;
const DetailContent = styled.div`
    width: 950px;
    height: 530px;
    padding-right: 5px;
    background: ${props => props.BgColor};
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-sizing: border-box;
    box-shadow: 0 0 70px #465981;
    backdrop-filter: blur(80px);
    border-radius: 25px;
    margin: auto;
`;
const TitleContainer = styled.div`
    width: 100%;
    height: 52px;
    background-color: #2f3a5f;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 23px auto 0;
`;

const ContentContainer = styled.div`
    height: 433px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 0 32px 0 37px;
    overflow-x: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #d3d3d3;
        border-radius: 5px;
    }

    &::-webkit-scrollbar-track {
        background-color: #616b7d;
        border-radius: 5px;
    }
`;

const TitleLeft = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const BackButton = styled.div`
    cursor: pointer;
    margin: 0 23px 0 40px;
`;

const Title = styled.div`
    margin: auto;
    font-size: 18px;
    line-height: 22px;
    color: #d0cccc;
    font-weight: bold;
`;

const Time = styled.div`
    font-size: 13px;
    line-height: 16px;
    color: #c6d3ec;
    margin-right: 55px;
`;
