import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { diaryApi } from "../apis/diaryApi";
import { userApi } from "../apis/userApi";
import Loading from "../shared/Loading";
import CategoryBar from "../shared/CategoryBar";
import Header2 from "../shared/Header2";
import useStore from "../zustand/store";
import {useSelector} from "react-redux";

DiaryList.propTypes = {};

function DiaryList(props) {
    const navigate = useNavigate();
    const [diaryList, setDiaryList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const isLogin = useSelector((state) => state.userSlice.isLogin)


    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 0,
        slideToShow: 1,
        slidesToScroll: 1,
    };

    const { currentHeader, setCurrentHeader } = useStore();

    console.log(isLogin,"isLogin")

  useEffect(() => {

      if(isLogin) {
          diaryApi.getDiaryList(1).then((response) => {
             console.log(response);
              setDiaryList(response);
              setIsLoading(false);
          });
      } else {
          setDiaryList([]);
          setIsLoading(false);
          // diaryApi.getNotLoginUserDiary().then((response) => {
          //     console.log(response,"response");
          //     setDiaryList([response.data]);
          //     setIsLoading(false);
          // })
      }

        setCurrentHeader("고민상담");
    }, [isLogin]);

    if (isLoading) {
        return <Loading />;
    }

  return (
    <div>
      <Header2/>
      <CategoryBar/>
      <CardContainer {...settings}>
        {diaryList.map((diary) => {
          return (
            <DiaryCard
              onClick={() => navigate(`/diary/${diary.postUuid}`)}
              key={diary.postUuid}
            >
              <DiaryTitle>{diary.title}</DiaryTitle>
              <DiaryDesc>{diary.content}</DiaryDesc>
              <DiaryIcons>
                <IconsLeft>
                  <CommentIcon
                    onClick={(e) => {
                     e.preventDefault();
                     navigate(`/diary/${diary.postUuid}`)
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
