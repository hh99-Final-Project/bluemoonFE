import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { userApi } from "../apis/userApi";
import { diaryApi } from "../apis/diaryApi";
import { useQuery } from "react-query";


MyPage.propTypes = {};

function MyPage(props) {
    const navigate = useNavigate();
    const [myDiary, setMyDiary] = useState([]);
    const [page, setPage] = useState(1);

    //더보기 모달의 '삭제하기' 에 onClick으로 연결해준다.
    const deleteDiary = (postId) => {
        diaryApi.deleteDiary(postId).then((response) => {
            console.log(response);
        });
    };

    // const { data } = useQuery('mypage', () => userApi.getMyPage(page),
    //     {
    //
    //     }
    //     );

    useEffect(() => {
      userApi.getMyPage(1).then((response) => {
          setMyDiary(response);
      });
    }, []);

    // const myDiary = [
    //     {
    //         postId: 1,
    //         title: "타이틀1",
    //         count: 2,
    //     },
    //     {
    //         postId: 2,
    //         title: "타이틀2",
    //         count: 1,
    //     },
    // ];

    return (
        <React.Fragment>
            {/* 헤더는 일단 나중에 */}

            <Grid>
                <Select>
                    <button onClick={() => navigate("/mypage")}>내가 쓴 고민</button>
                    <button onClick={() => navigate("/mypage/temp")}>임시저장본 </button>
                </Select>
                {myDiary.map((diary) => {
                    return (
                        <DiaryCard onClick={() => navigate(`/diary/${diary.postId}`)} key={diary.postId}>
                            <Text>{diary.title}</Text>
                            <div>{diary.content}</div>
                            <Text>댓글 {diary.count}개</Text>
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

const Select = styled.div`
    height: 10%;
    align-items: flex-end;
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
