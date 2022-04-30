import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { DiaryContent } from "../components/diary";
import { CommentList } from "../components/diary";
import { diaryApi } from "../apis/diaryApi";

DiaryDetail.propTypes = {};

function DiaryDetail(props) {
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.id;

  const [diary, setDiary] = useState();
  //   console.log(diary);

  useEffect(() => {
    diaryApi.getOneDiary(postId).then((response) => {
      setDiary(response);
      //   console.log(response);
    });
  }, []);

  return (
    <React.Fragment>
      <TitleContainer>
        <BackButton onClick={() => navigate("/diarylist")}>뒤로가기</BackButton>
        <Title>고민 들어주기</Title>
      </TitleContainer>
      <DiaryContent diary={diary} />
      <CommentList />
    </React.Fragment>
  );
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
