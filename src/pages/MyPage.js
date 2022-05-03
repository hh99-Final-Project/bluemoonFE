import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { userApi } from "../apis/userApi";
import { diaryApi } from "../apis/diaryApi";
import { Button } from "../elements/index";
import { useQuery } from "react-query";
import CategoryBar from "../shared/CategoryBar";
import Header2 from "../shared/Header2";
import Loading from "../shared/Loading";
import InfinityScroll from "../shared/InfinityScroll";

MyPage.propTypes = {};

function MyPage(props) {
    const navigate = useNavigate();
    const [myDiary, setMyDiary] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(null);

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

    // 무한스크롤을 위한 세팅 작업
    // 일단은 더 보기 버튼으로 구현
    const MoreDiary = () => {
        console.log("next!");
        userApi.getMyPage(page).then((response) => {
            setMyDiary([...myDiary, ...response]);
            setIsLoading(false);
            if (response.length < 5) {
                setHasNext(false);
            } else {
                setHasNext(true);
            }
            setPage(page + 1);
        });
    };

    useEffect(() => {
        userApi.getMyPage(page).then((response) => {
            setMyDiary([...myDiary, ...response]);
            setIsLoading(false);
            if (response.length < 5) {
                setHasNext(false);
            } else {
                setHasNext(true);
            }
            setPage(page + 1);
        });
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <Header2 />
            <CategoryBar />
            <Grid>
                {/* <Select>
                    <button onClick={() => navigate("/mypage")}>내가 쓴 고민</button>
                    <button onClick={() => navigate("/mypage/temp")}>임시저장본 </button>
                </Select> */}
                <InfinityScroll callNext={MoreDiary} hasNext={hasNext} isLoading={isLoading}>
                    {myDiary.map((diary) => {
                        return (
                            <DiaryCard onClick={() => navigate(`/diary/${diary.postId}`)} key={diary.postId}>
                                <Text>{diary.title}</Text>
                                <div>{diary.content}</div>
                                <Text>댓글 {diary.count}개</Text>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteDiary(diary.postId);
                                        navigate("/mypage");
                                    }}
                                >
                                    게시물 삭제
                                </button>
                            </DiaryCard>
                        );
                    })}
                </InfinityScroll>
                {/* <button onClick={MoreDiary}>더 보기</button> */}
            </Grid>
        </div>
    );
}

export default MyPage;

const Grid = styled.div`
    width: 80vw;
    height: 80vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    background-color: lightgray;
`;

// const Select = styled.div`
//     height: 10%;
//     align-items: flex-end;
// `;

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

const Text = styled.p``;

const DeleteButton = styled.button`
    margin-right: 20px;
    cursor: pointer;
`;
