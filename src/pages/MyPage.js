import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { userApi } from "../apis/userApi";

MyPage.propTypes = {};

function MyPage(props) {
  const navigate = useNavigate();
  const [myDiary, setMyDiary] = useState([]);
  console.log(myDiary);

  useEffect(() => {
    let page = 1;
    userApi.getMyPage(page).then((response) => {
      setMyDiary(response.data);
    });
  }, []);

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
              {/*<Text>댓글 {diary.count}개</Text>*/}
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
