import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {userApi} from "../apis/userApi";

MyPage.propTypes = {

};

function MyPage(props) {

    const navigate = useNavigate();
    const [myDiary, setMyDiary] = useState([]);

    useEffect(()=>{
        let page = 1
        userApi.getMyPage(page).then((response) => {
            setMyDiary(response.data);
        })
    },[])


    return (
        <React.Fragment>
            {/* 헤더는 일단 나중에 */}

            {myDiary.map((diary) => {
                return (
                    <DiaryCard
                        key={diary.postId}
                        onClick={() => navigate(`/diary/${diary.postId}`)} >
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