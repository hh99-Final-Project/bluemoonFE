import React from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

MyPage.propTypes = {

};

function MyPage(props) {

    const navigate = useNavigate();

    let myDiary = [
        {
            postId: 1,
            nickname: "랜덤 닉네임1",
            userId: 1,
            title: "게시글 제목1",
            content: "게시글 내용1",
            createdAt: "게시글 작성 시간1",
        },

        {
            postId: 2,
            nickname: "랜덤 닉네임2",
            userId: 2,
            title: "게시글 제목2",
            content: "게시글 내용2",
            createdAt: "게시글 작성 시간2",
        },

        {
            postId: 3,
            nickname: "랜덤 닉네임3",
            userId: 3,
            title: "게시글 제목3",
            content: "게시글 내용3",
            createdAt: "게시글 작성 시간3",
        },
    ];


    return (
        <React.Fragment>
            {/* 헤더는 일단 나중에 */}

            {myDiary.map((diary) => {
                return (
                    <DiaryCard onClick={() => navigate(`/diary/${diary.postId}`)} key={diary.postId}>
                        <DiaryTitle>{diary.title}</DiaryTitle>
                        <DiaryDesc>{diary.content}</DiaryDesc>
                        <DiaryIcons>
                            <IconsLeft>
                                <LikeIcon>좋아용</LikeIcon>
                                <CommentIcon>댓글</CommentIcon>
                            </IconsLeft>
                            <ChattingIcon>채팅</ChattingIcon>
                        </DiaryIcons>
                    </DiaryCard>
                );
            })}

            <DiaryWriteButton onClick={() => navigate('/post')}>다이어리 쓰기</DiaryWriteButton>
        </React.Fragment>
    );
}

export default MyPage;

const DiaryCard = styled.div`
  width: 509px;
  height: 507px;
  background-color: rgba(155, 155, 155, 0.9);
  border-radius: 20px;
  margin: auto;
`;

const DiaryTitle = styled.div`
  margin: 120px auto 64px;
  text-align: center;
  font-size: 32px;
  line-height: 39px;
  padding-top: 30px; ;
`;

const DiaryDesc = styled.div`
  font-size: 17px;
  line-height: 21px;
  text-align: start;
  width: 392px;
  height: 79px;
  margin: 0 auto 136px;
`;

const DiaryIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
`;

const IconsLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LikeIcon = styled.div`
  margin-right: 20px;
  cursor: pointer;
`;

const CommentIcon = styled.div`
  cursor: pointer;
`;

const ChattingIcon = styled.div`
  cursor: pointer;
`;

const DiaryWriteButton = styled.div`
  width: 600px;
  height: 76px;
  background: #c4c4c4;
  border-radius: 9px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 32px;
  line-height: 39px;
`;