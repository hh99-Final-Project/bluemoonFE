import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { userApi } from "../apis/userApi";
import { diaryApi } from "../apis/diaryApi";
import { Button } from "../elements/index";
import { useQuery } from "react-query";
import CategoryBar from "../shared/CategoryBar";
import Header from "../shared/Header";
import Loading from "../shared/Loading";
import useStore from "../zustand/store";
import _ from "lodash";
import { convertDate } from "../utils/convertDate";
import { Layout } from "../components/common";
import { isLogined } from "../redux/modules/userSlice";
import { color } from "../utils/designSystem";

MyPage.propTypes = {};

function MyPage() {
    const navigate = useNavigate();
    const { setCurrentHeader } = useStore();

    const [myDiary, setMyDiary] = useState([]);
    const InfinityScrollref = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(null);

    // console.log(myDiary);
    // console.log(isLoading);
    // console.log(page);
    // console.log(hasNext);

    const userInfo = useSelector((state) => state.userSlice.userInfo);
    const isLogin = useSelector((state) => state.userSlice.isLogin);

    //더보기 모달의 '삭제하기' 에 onClick으로 연결해준다.
    const deleteDiary = (postUuid) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            diaryApi.deleteDiary(postUuid).then((response) => {
                if (response.status === 200) {
                    window.alert("삭제 완료되었습니다.");
                    // window.location.reload();
                }
            });
        }
    };

    // 무한스크롤을 함수
    // Grid onScroll 이벤트에 넣어두어, Grid 스크롤 발생 시 실행됨
    const InfinityScroll = _.throttle((e) => {
        // // 실제 요소의 높이값
        // console.log(e.target.scrollHeight);

        //  // 스크롤 위치
        // console.log(e.target.scrollTop);

        //  //현재 보여지는 요소의 높이 값 (border, scrollbar 크기 제외)
        // console.log(e.target.clientHeight);

        console.log(e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight));

        if (e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) <= 200 && hasNext) {
            userApi.getMyPage(page).then((response) => {
                console.log(response);
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
        <Layout>
            <Container>
                <Header />
                <CategoryBar />
                {/* <InfinityScroll callNext={MoreDiary} hasNext={hasNext} isLoading={isLoading}> */}
                {/* onscroll 적용 */}
                <MyPageBox BgColor={color.containerBoxColor}>
                    <DiaryName>
                        {userInfo.nickname} <span>님 다이어리</span>
                    </DiaryName>
                    <MyPageTitle>
                        <p>내가 쓴 글</p>
                    </MyPageTitle>
                    <DiaryWrapper ref={InfinityScrollref} onScroll={InfinityScroll}>
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
                                            <CreatedAt>{convertDate(diary.createdAt)}</CreatedAt>
                                        </TiTleLine>
                                        <ContentLine>
                                            <CommentCount>댓글 {diary.count}개</CommentCount>
                                            <DeleteButton
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteDiary(diary.postUuid);
                                                }}
                                            >
                                                삭제
                                            </DeleteButton>
                                        </ContentLine>
                                    </DiaryCard>
                                );
                            })}
                    </DiaryWrapper>
                </MyPageBox>
                {/* </InfinityScroll> */}
            </Container>
        </Layout>
    );
}

export default MyPage;
const Container = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
`;

const MyPageBox = styled.div`
    width: 950px;
    height: 530px;
    background: ${props => props.BgColor};
    border: 2px solid #ffffff4d;
    box-shadow: 0 0 70px #465981;
    backdrop-filter: blur(80px);

    border-radius: 25px;

    position: relative;
    margin: auto;
`;

const DiaryName = styled.div`
    position: absolute;
    right: 0;
    bottom: calc(100% + 10px);
    color: rgba(255, 255, 255, 0.9);
    font-size: 16px;
    line-height: 19px;

    span {
        color: #9aebe7;
    }
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
        margin-left: 24px;

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
    width: 889px;
    // 작성시간 값 뷰 조정한 뒤, height 값 수정 필요
    height: 65px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    background-color: #959ebe;
    // border: 1px solid black;
    border-radius: 10px;
    margin: 10px auto;
    padding: 10px;
    cursor: pointer;
`;

const TiTleLine = styled.div`
    width: 860px;
    display: flex;
    justify-content: space-between;
    margin: 10px auto 14px;
`;

const DiaryTitle = styled.div`
    font-family: Inter;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 15px;
    letter-spacing: 0em;
    text-align: left;
    color: #373857;
`;

const CreatedAt = styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 13px;
    display: flex;
    overflow: hidden;
`;

const ContentLine = styled.div`
    width: 860px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
`;

const CommentCount = styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
`;

const DeleteButton = styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 13px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #000000;
    cursor: pointer;
`;
