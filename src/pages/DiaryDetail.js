import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { DiaryContent, CommentList } from "../components/diary";
import { diaryApi } from "../apis/diaryApi";
import CommentInput from "../components/diary/CommentInput";
import Header from "../shared/Header";
import Loading from "../shared/Loading";
import { useSelector } from "react-redux";
import CategoryBar from "../shared/CategoryBar";
import { convertDate } from "../utils/convertDate";

DiaryDetail.propTypes = {};

function DiaryDetail(props) {
    const navigate = useNavigate();
    const params = useParams();
    const postId = params.id;

    const [diary, setDiary] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const isLogin = useSelector((state) => state.userSlice.isLogin);

    useEffect(() => {
        if (isLogin) {
            diaryApi.getOneDiary(postId).then((response) => {
                console.log(response);
                setDiary(response);
                setIsLoading(false);
            });
        } else {
            diaryApi.getNotLoginUserDetail(postId).then((response) => {
                console.log(response);
                setDiary(response.data);
                setIsLoading(false);
            });
        }
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <DetailContainer>
            <Header />
            <CategoryBar />
            <DetailContent>
                <TitleContainer>
                    <TitleLeft>
                        <BackButton onClick={() => navigate("/diarylist")}>
                            {/*<img src={} />*/}
                        </BackButton>
                        <Title>고민 들어주기</Title>
                    </TitleLeft>
                    <Time>{convertDate(diary.createdAt)}</Time>
                </TitleContainer>
                <ContentContainer>
                    <DiaryContent diary={diary} />
                    <CommentInput diary={diary} postId={postId} />
                    <CommentList comments={diary.comments} postId={diary.postId} />
                </ContentContainer>
            </DetailContent>
        </DetailContainer>
    );
}

export default DiaryDetail;

const DetailContainer = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #081134;
    overflow-x: hidden;
`;
const DetailContent = styled.div`
    width: 950px;
    height: 530px;
    padding-right: 5px;
    background: linear-gradient(180deg, rgba(63, 75, 112, 0.79) 0%, rgba(100, 114, 152, 0.79) 100%);
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
