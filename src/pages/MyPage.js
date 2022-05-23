import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { userApi } from "../apis/userApi";
import { diaryApi } from "../apis/diaryApi";
import CategoryBar from "../shared/CategoryBar";
import Header from "../shared/Header";
import Loading from "../shared/Loading";
import useStore from "../zustand/store";
import _ from "lodash";
import { convertDate } from "../utils/convertDate";
import { Layout } from "../components/common";
import { color } from "../utils/designSystem";
import Popup from "../shared/Popup";
import { useMediaQuery } from "react-responsive";
import { MobileTitleName } from "../components/common";

function MyPage() {
    const navigate = useNavigate();
    const { setCurrentHeader } = useStore();

    // 무한스크롤 관련 state
    const [myDiary, setMyDiary] = useState([]);
    const InfinityScrollref = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(null);

    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [clickedDiary, setClickedDiary] = useState("");

    const isMobile = useMediaQuery({
        query: "(max-width: 420px)",
    });

    const deleteDiary = () => {
        diaryApi.deleteDiary(clickedDiary).then((res) => {
            if (res.status === 200) {
                setIsOpenPopup(false);
                setMyDiary(myDiary.filter((diary) => diary.postUuid !== clickedDiary));
                // navigate("/myDiary");
            } else {
                window.alert("에러처리");
            }
        });
    };

    // 무한스크롤
    const InfinityScroll = _.throttle((e) => {
        if (e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) <= 200 && hasNext) {
            userApi.getMyPage(page).then((response) => {
                setMyDiary([...myDiary, ...response]);
                setIsLoading(false);
                if (response.length < 10) {
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
            if (response.length < 10) {
                setHasNext(false);
            } else {
                setHasNext(true);
            }
            setPage(page + 1);
            setIsLoading(false);
        });

        setCurrentHeader("마이페이지");
    }, []);

    const PopupRef = useRef();

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
                {!isMobile ? <CategoryBar /> : <MobileTitleName title={"마이*페이지"} pos={6} />}

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
                                        ref={PopupRef}
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
                                                setClickedDiary(diary.postUuid);
                                            }}
                                            postUuid={diary.postUuid}
                                        >
                                            삭제
                                        </DeleteButton>
                                    </DiaryCard>
                                );
                            })}
                        {isOpenPopup && (
                            <Popup
                                title={"정말로/이야기를 지우시겠습니까?"}
                                close={() => setIsOpenPopup(false)}
                                event={() => {
                                    deleteDiary(clickedDiary);
                                }}
                            />
                        )}
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

    @media only screen and (max-width: 420px) {
        width: 320px;
        margin: auto;
    }
`;

const MobTitle = styled.div`
    width: 320px;
    height: 34px;
    color: #ffffff;
    text-align: center;
    margin: 0 auto;
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

    @media only screen and (max-width: 420px) {
        width: 320px;

        background: none;
        border: none;
        box-shadow: none;
        backdrop-filter: none;
    }
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

    @media only screen and (max-width: 420px) {
        display: none;
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

    @media only screen and (max-width: 420px) {
        width: 320px;
    }
`;

const DiaryWrapper = styled.div`
    width: 915px;
    height: 414px;
    position: absolute;
    top: 94px;
    left: 25px;
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

    @media only screen and (max-width: 420px) {
        width: 320px;
        height: 580px;

        top: 0;
        left: 0;
    }
`;

const DiaryCard = styled.div`
    position: relative;
    width: 889px;
    height: 65px;
    border-radius: 5px;
    background-color: #959ebe;

    // display: flex;
    // flex-direction: column;

    margin: 0 auto 5px;
    padding: 16px;
    box-sizing: border-box;
    cursor: pointer;

    @media only screen and (max-width: 420px) {
        width: 310px;
        height: 78px;
        border-radius: 3px;
    }
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

    @media only screen and (max-width: 420px) {
        top: 15px;
        left: 17px;

        font-weight: 700;
        font-size: 12px;
        line-height: 15px;
    }
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

    @media only screen and (max-width: 420px) {
        top: 17px;

        font-size: 8px;
        line-height: 10px;
    }
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

    @media only screen and (max-width: 420px) {
        top: 51px;
        left: 17px;

        font-size: 9px;
        line-height: 11px;
    }
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

    @media only screen and (max-width: 420px) {
        top: 52px;

        font-size: 8px;
        line-height: 10px;
    }
`;
