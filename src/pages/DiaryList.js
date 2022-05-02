import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { diaryApi } from "../apis/diaryApi";
import CategoryBar from "../shared/CategoryBar";
import useStore from "../zustand/store";

DiaryList.propTypes = {};

function DiaryList(props) {
  const navigate = useNavigate();
  const [diaryList, setDiaryList] = useState([]);

  // let diaryList = [
  //   {
  //     postId: 1,
  //     nickname: "랜덤 닉네임1",
  //     userId: 1,
  //     title: "게시글 제목1",
  //     content: "게시글 내용1",
  //     createdAt: "게시글 작성 시간1",
  //   },
  //
  //   {
  //     postId: 2,
  //     nickname: "랜덤 닉네임2",
  //     userId: 2,
  //     title: "게시글 제목2",
  //     content: "게시글 내용2",
  //     createdAt: "게시글 작성 시간2",
  //   },
  //
  //   {
  //     postId: 3,
  //     nickname: "랜덤 닉네임3",
  //     userId: 3,
  //     title: "게시글 제목3",
  //     content: "게시글 내용3",
  //     createdAt: "게시글 작성 시간3",
  //   },
  //
  //   {
  //     postId: 4,
  //     nickname: "랜덤 닉네임4",
  //     userId: 4,
  //     title: "게시글 제목4",
  //     content: "게시글 내용4",
  //     createdAt: "게시글 작성 시간4",
  //   },
  //
  //   {
  //     postId: 5,
  //     nickname: "랜덤 닉네임5",
  //     userId: 5,
  //     title: "게시글 제목5",
  //     content: "게시글 내용5",
  //     createdAt: "게시글 작성 시간5",
  //   },
  // ];

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 0,
    slideToShow: 1,
    slidesToScroll: 1,
  };

  const { currentHeader, setCurrentHeader } = useStore();


  useEffect(() => {
    diaryApi.getDiaryList(1).then((response) => {
      setDiaryList([response]);
    });

    setCurrentHeader('고민상담');
  }, []);


  return (
    <div style={{marginTop:'200px'}}>
      <CategoryBar/>
      <CardContainer {...settings}>
        {diaryList.map((diary) => {
          return (
            <DiaryCard
              onClick={() => navigate(`/diary/${diary.postId}`)}
              key={diary.postId}
            >
              <DiaryTitle>{diary.title}</DiaryTitle>
              <DiaryDesc>{diary.content}</DiaryDesc>
              <DiaryIcons>
                <IconsLeft>
                  <CommentIcon
                    onClick={(e) => {
                     e.preventDefault();
                     navigate(`/diary/${diary.postId}`)
                    }}
                  >
                    댓글
                  </CommentIcon>
                </IconsLeft>
                <ChattingIcon>채팅</ChattingIcon>
              </DiaryIcons>
            </DiaryCard>
          );
        })}
      </CardContainer>
      <DiaryWriteButton onClick={() => navigate("/post")}>
        다이어리 쓰기
      </DiaryWriteButton>
    </div>
  );
}

export default DiaryList;

const CardContainer = styled(Slider)`
  .slick-list {
    width: 509px;
    margin: auto;
  }
`;

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
  margin: 40px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 32px;
  line-height: 39px;
`;
