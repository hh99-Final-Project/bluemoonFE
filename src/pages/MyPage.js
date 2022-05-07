import React, { useState, useEffect, useRef } from "react";
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
import useStore from "../zustand/store";
import _ from "lodash";

MyPage.propTypes = {};

function MyPage(props) {
    const navigate = useNavigate();
    const ref = useRef();
    const [myDiary, setMyDiary] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(null);
    const { setCurrentHeader } = useStore();

    //더보기 모달의 '삭제하기' 에 onClick으로 연결해준다.
    const deleteDiary = (postUuid) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            diaryApi.deleteDiary(postUuid).then((response) => {
                if (response.status === 200) {
                    window.alert("삭제 완료되었습니다.");
                    window.location.reload();
                }
            });
        }
    };

    // const { data } = useQuery('mypage', () => userApi.getMyPage(page),
    //     {
    //
    //     }
    //     );

    // 무한스크롤을 함수
    // Grid onScroll 이벤트에 넣어두어, Grid 스크롤 발생 시 실행됨
    const InfinityScroll = _.throttle((e) => {
        // // 실제 요소의 높이값
        // console.log(e.target.scrollHeight);

        //  // 스크롤 위치
        //  console.log(e.target.scrollTop);

        //  //현재 보여지는 요소의 높이 값 (border, scrollbar 크기 제외)
        // console.log(e.target.clientHeight);

        if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
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
        }
    }, 300);

    useEffect(() => {
        userApi.getMyPage(page).then((response) => {
            console.log(response);
            setMyDiary([...myDiary, ...response]);
            if (response.length < 5) {
                setHasNext(false);
            } else {
                setHasNext(true);
            }
            setPage(page + 1);
            setIsLoading(false);
        });

        setCurrentHeader("마이페이지");
    }, []);

    // 리랜더링이 되더라도 기능이 다른 아이들을 구분해서 useEffect 실행하는 게 낫다

    if (isLoading) {
        return <Loading />;
    }

    if (myDiary === []) {
        return <React.Fragment></React.Fragment>;
    }

    return (
        <Container>
            <Header2 />
            <CategoryBar />
            {/* <InfinityScroll callNext={MoreDiary} hasNext={hasNext} isLoading={isLoading}> */}
            {/* onscroll 적용 */}
            <MyPageBox>
                <MyPageTitle>
                    <p>내가 쓴 글</p>
                </MyPageTitle>
                <DiaryWrapper ref={ref} onScroll={InfinityScroll}>
                    {myDiary.length === 0 && <NoDiaryNotice>아직 작성한 글이 없습니다.</NoDiaryNotice>}
                    {myDiary.length > 0 &&
                        myDiary.map((diary) => {
                            return (
                                <DiaryCard
                                    id="diary"
                                    onClick={() => navigate(`/diary/${diary.postUuid}`)}
                                    key={diary.postUuid}
                                >
                                    <TiTleLine>
                                        <DiaryTitle>{diary.title}</DiaryTitle>
                                        <CreatedAt>{diary.createdAt}</CreatedAt>
                                    </TiTleLine>
                                    <ContentLine>
                                        <CommentCount>댓글 {diary.count}개</CommentCount>
                                        <DeleteButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteDiary(diary.postUuid);
                                            }}
                                        >
                                            게시물 삭제
                                        </DeleteButton>
                                    </ContentLine>
                                </DiaryCard>
                            );
                        })}
                </DiaryWrapper>
            </MyPageBox>
            {/* </InfinityScroll> */}
        </Container>
    );
}

export default MyPage;
const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #111b3f;
    overflow: hidden;
`;

const MyPageBox = styled.div`
    width: 950px;
    height: 530px;

    background: linear-gradient(180deg, rgba(63, 75, 112, 0.79) 0%, rgba(100, 114, 152, 0.79) 100%);
    border: 2px solid #ffffff4d;
    box-shadow: 0 0 70px #465981;
    backdrop-filter: blur(80px);

    border-radius: 25px;

    position: relative;
    margin: auto;
`;

const MyPageTitle = styled.div`
    position: absolute;
    width: 950px;
    height: 50px;
    top: 20px;

    background: #2f3a5f;

    display: flex;
    align-items: center;

    color: #ffffff;

    & p {
        margin-left: 20px;
        font-size: 20px;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0em;
        text-align: left;
    }
`;

const NoDiaryNotice = styled.div`
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translate(-50%, 0);

    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    text-align: center;

    color: #d7d7d7;
`;

const DiaryWrapper = styled.div`
    width: 950px;
    height: 420px;
    position: absolute;
    top: 80px;
    overflow-y: auto;
`;

const DiaryCard = styled.div`
    width: 881px;
    // 작성시간 값 뷰 조정한 뒤, height 값 수정 필요
    height: 100px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    background-color: #959ebe;
    border: 1px solid black;
    border-radius: 10px;
    margin: 10px auto;
    padding: 10px;
    cursor: pointer;
`;

const TiTleLine = styled.div`
    width: 860px;
    display: flex;
    justify-content: space-between;
    margin: 10px auto;
`;

const DiaryTitle = styled.div`
    font-family: Inter;
    font-size: 22px;
    font-weight: 700;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
    color: #373857;
`;

const CreatedAt = styled.div`
    width: 80px;
    overflow: hidden;
`;

const ContentLine = styled.div`
    width: 860px;
    display: flex;
    justify-content: space-between;
    margin: 10px auto;
`;

const CommentCount = styled.div``;

const DeleteButton = styled.button`
    width: 100px;
    height: 20px;
    cursor: pointer;
`;
