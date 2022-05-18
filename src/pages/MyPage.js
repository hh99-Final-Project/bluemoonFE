import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { userApi } from "../apis/userApi";
import { diaryApi } from "../apis/diaryApi";
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
import Popup from "../shared/Popup";

MyPage.propTypes = {};

function MyPage() {
    const navigate = useNavigate();
    const { setCurrentHeader } = useStore();

    const [myDiary, setMyDiary] = useState([]);
    const InfinityScrollref = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(null);
    const [isOpenPopup, setIsOpenPopup] = useState(false);

    const userInfo = useSelector((state) => state.userSlice.userInfo);
    const isLogin = useSelector((state) => state.userSlice.isLogin);

    // 삭제하기

    const deleteDiary = (postUuid) => {
        diaryApi.deleteDiary(postUuid).then((res) => {
            if (res.status === 200) {
                setIsOpenPopup(false);
            } else {
                window.alert("에러처리");
            }
        });
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
                <MyPageBox BgColor={color.containerBoxColor}>
                    <MyPageTitle>
                        <p>내가 쓴 글</p>
                    </MyPageTitle>
                    {myDiary.length === 0 && <NoDiaryNotice>아직 작성한 글이 없습니다.</NoDiaryNotice>}
                    <DiaryWrapper ref={InfinityScrollref} onScroll={InfinityScroll}>
                        {myDiary.length > 0 &&
                            myDiary.map((diary) => {
                                return (
                                    <DiaryCard
                                        id="diary"
                                        onClick={() => navigate(`/diary/${diary.postUuid}`)}
                                        key={diary.postUuid}
                                    >
                                        <DiaryTitle>{diary.title}</DiaryTitle>
                                        <CreatedAt>{convertDate(diary.createdAt)}</CreatedAt>
                                        <CommentCount>댓글 {diary.count}개</CommentCount>
                                        <DeleteButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsOpenPopup(true);
                                            }}
                                        >
                                            삭제
                                        </DeleteButton>
                                        {/* <TiTleLine></TiTleLine>
                                        <ContentLine></ContentLine> */}
                                        {isOpenPopup && (
                                            <Popup
                                                title={"정말로/이야기를 지우시겠습니까?"}
                                                close={() => setIsOpenPopup(false)}
                                                event={() => {
                                                    deleteDiary(diary.postUuid);
                                                }}
                                            />
                                        )}
                                    </DiaryCard>
                                );
                            })}
                    </DiaryWrapper>
                </MyPageBox>
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
    background: ${(props) => props.BgColor};
    border: 2px solid #ffffff4d;
    box-shadow: 0 0 70px #465981;
    backdrop-filter: blur(80px);

    border-radius: 25px;

    position: relative;
    margin: auto;
`;

const MyPageTitle = styled.div`
    position: absolute;
    width: 100%;
    height: 52px;
    top: 23px;

    background: rgba(8, 17, 52, 0.4);

    display: flex;
    align-items: center;

    & p {
        margin-left: 29px;
        height: 24px;

        font-family: "Spoqa Han Sans Neo";
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;

        color: #ffffff;
    }
`;

const NoDiaryNotice = styled.div`
    position: absolute;
    top: 123px;
    left: 377px;
    width: 197px;
    height: 23px;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #c6d3ec;
`;

const DiaryWrapper = styled.div`
    width: 915px;
    height: 414px;
    position: absolute;
    top: 80px;
    left: 25px;
    margin-top: 19px;
    overflow-y: auto;

    &:: -webkit-scrollbar {
        width: 6px;
    }

    &:: -webkit-scrollbar-thumb {
        background-color: #d3d3d3;
        border-radius: 50px;
    }

    &:: -webkit-scrollbar-track {
        background-color: #08105d;
        border-radius: 50px;
    }
`;

const DiaryCard = styled.div`
    position: relative;
    width: 889px;
    height: 65px;
    border-radius: 5px;
    background-color: #959ebe;

    display: flex;
    flex-direction: column;

    margin: 0 0 5px;
    padding: 16px;
    box-sizing: border-box;
    cursor: pointer;
`;

const DiaryTitle = styled.div`
    position: absolute;
    top: 12px;
    left: 16px;
    height: 16px;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    display: flex;
    align-items: center;

    color: #354569;
`;

const CreatedAt = styled.div`
    position: absolute;
    top: 12px;
    right: 16px;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 13px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #354569;
`;

const CommentCount = styled.div`
    position: absolute;
    top: 41px;
    left: 16px;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #354569;
`;

const DeleteButton = styled.div`
    position: absolute;
    top: 45px;
    right: 16px;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 13px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #354569;
    cursor: pointer;
`;

// const TiTleLine = styled.div`
//     width: 860px;
//     display: flex;
//     justify-content: space-between;
//     // margin: 12px auto 13px;
// `;
// const ContentLine = styled.div`
//     width: 860px;
//     display: flex;
//     justify-content: space-between;
//     // margin: 0 auto;
// `;
