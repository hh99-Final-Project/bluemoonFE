import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

MyPage.propTypes = {};

function MyPage(props) {
  const navigate = useNavigate();

  let myDiary = [
    {
      postId: 1,
      nickname: "랜덤 닉네임1",
      userId: 1,
      title: "게시글 제목1",
      content: "게시글 내용1",
      commentCount: "4",
      createdAt: "12:43",
    },

    {
      postId: 2,
      nickname: "랜덤 닉네임2",
      userId: 2,
      title: "게시글 제목2",
      content: "게시글 내용2",
      commentCount: "2",
      createdAt: "09:02",
    },

    {
      postId: 3,
      nickname: "랜덤 닉네임3",
      userId: 3,
      title: "게시글 제목3",
      content: "게시글 내용3",
      commentCount: "3",
      createdAt: "00:20",
    },
  ];

  return (
    <React.Fragment>
      {/* 헤더는 일단 나중에 */}

      <Grid>
        {myDiary.map((diary) => {
          return (
            <DiaryCard
              onClick={() => navigate(`/diary/${diary.postId}`)}
              key={diary.postId}
            >
              <Text>{diary.title}</Text>
              <Text>댓글 {diary.commentCount}개</Text>
            </DiaryCard>
          );
        })}
      </Grid>
    </React.Fragment>
  );
}

export default MyPage;

const Grid = styled.div`
  width: 80vw;
  height: 80vh;
  margin: 20vh auto 0;
  display: flex;
  flex-direction: column;
  background-color: lightgray;
`;

const DiaryCard = styled.div`
  width: 90%;
  height: 15%;
  display: flex;
  flex-direction: column;
  background-color: #999;
  border: 1px solid black;
  border-radius: 10px;
  margin: 1% auto;
  padding: 10px;
`;

const Text = styled.text``;
