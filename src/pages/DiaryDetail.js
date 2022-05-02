import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { DiaryContent } from "../components/diary";
import { CommentList } from "../components/diary";
import { diaryApi } from "../apis/diaryApi";
import Header from "../shared/Header";

DiaryDetail.propTypes = {};

function DiaryDetail(props) {
    const navigate = useNavigate();
    const params = useParams();
    const postId = params.id;

    const [diary, setDiary] = useState(null);

    // let diary = {
    //     isShow: true,
    //     postId: 1,
    //     nickname: "랜덤 닉네임",
    //     userId: 1,
    //     title: "게시글 제목",
    //     content: "게시글 내용",
    //     createdAt: "2022-05-01 23:00",
    //     comments: [
    //         {
    //             isShow: true,
    //             commentId: 1,
    //             nickname: "랜덤 닉네임",
    //             content: "댓글 내용",
    //             createdAt: "2022-05-01 23:00",
    //         },
    //         {
    //             isShow: false,
    //             commentId: 2,
    //             nickname: "랜덤 닉네임",
    //             content: "댓글 내용",
    //             createdAt: "2022-05-01 23:00",
    //         },
    //     ],
    // };

    useEffect(() => {
        diaryApi.getOneDiary(postId).then((response) => {
            console.log(response);
            setDiary(response);
        });
    }, []);

    if (diary === null) {
        return;
    } else {
        return (
            <React.Fragment>
                <TitleContainer>
                    <BackButton onClick={() => navigate("/diarylist")}>뒤로가기</BackButton>
                    <Title>고민 들어주기</Title>
                </TitleContainer>
                <Header />
                <DiaryContent diary={diary} />
                <CommentList comments={diary.comments} postId={diary.postId} />
                {/* <CommentList comments={diary.comments.commentList} postId={diary.postId} /> */}
            </React.Fragment>
        );
    }
}

export default DiaryDetail;

const TitleContainer = styled.div`
    width: 1224px;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 161px auto 56px;
`;

const BackButton = styled.div`
    width: 184px;
    height: 65px;
    background-color: #787878;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const Title = styled.div`
    width: 1040px;
    height: 54px;
    margin: auto;
    background-color: #c4c4c4;
    font-size: 32px;
    line-height: 39px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;
