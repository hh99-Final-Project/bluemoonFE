import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { diaryApi } from "../apis/diaryApi";
import { userApi } from "../apis/userApi";
import Loading from "../shared/Loading";
import CategoryBar from "../shared/CategoryBar";
import Header from "../shared/Header";
import { Layout } from "../components/common";
import useStore from "../zustand/store";
import { useSelector } from "react-redux";
import { useQuery, QueryClient } from "react-query";
import commentIcon from "../static/images/comment.png";
import chatIcon from "../static/images/message.png";
import prevButton from "../static/images/prevDiary.svg";
import nextButton from "../static/images/nextDiary.svg";

DiaryList.propTypes = {};

function DiaryList(props) {
    const navigate = useNavigate();
    const isLogin = useSelector((state) => state.userSlice.isLogin);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const { currentHeader, setCurrentHeader } = useStore();

    const getPrevDiary = () => {
        if (count !== 1) {
            setCount((count) => count - 1);
        } else {
            //count가 1이면 서버 요청
            if (page === 1) {
                window.alert("제일 첫번째 다이어리에요!");
            } else {
                if (!isPreviousData) {
                    setPage((prev) => prev - 1);
                    setCount(5);
                }
            }
        }
    };

    const getNextDiary = () => {
        if (data.data.length === 0) {
            window.alert("더이상 다이어리가 없어요😂😂");
            return;
        }
        if (count !== 5) {
            setCount((count) => count + 1);
        } else {
            //count가 5면 다음꺼 api 요청
            if (!isPreviousData) {
                setPage((prev) => prev + 1);
                setCount(1);
            }
        }
    };

    const { isLoading, data, isPreviousData } = useQuery(["diary", page], () => diaryApi.getDiaryList(page), {
        keepPreviousData: true,
    });

    useEffect(() => {
    //     if (isLogin) {
    //         diaryApi.getDiaryList(1).then((response) => {
    //             console.log(response.data);
    //             setDiaryList(response.data);
    //             setIsLoading(false);
    //         });
    //     } else {
    //         diaryApi.getNotLoginUserDiary().then((response) => {
    //             setDiaryList([response.data]);
    //             setIsLoading(false);
    //         });
    //     }
    //
        setCurrentHeader("고민상담");
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Layout>
            <DiaryListContainer>
                <Header />
                <CategoryBar />
                <CardContainer>
                    <CardContainerBackGround>
                        <PrevButton onClick={getPrevDiary} src={prevButton} />
                        <NextButton onClick={getNextDiary} src={nextButton} />
                        {/*다이어리 영역                    */}
                        <DiaryCard
                            onClick={() => navigate(`/diary/${data.data[count].postUuid}`)}
                            key={data.data[count]?.postUuid}
                        >
                            <CardLeftPage>
                                <CardBackground>
                                    <CardBorder>
                                        <DiaryTitle>{data.data[count]?.title}</DiaryTitle>
                                        <CommentIcon
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(`/diary/${data.data[count].postUuid}`);
                                            }}
                                        >
                                            <img src={commentIcon} alt={"comment"} />
                                        </CommentIcon>
                                    </CardBorder>
                                </CardBackground>
                            </CardLeftPage>

                            <CardRightPage>
                                <CardBackground>
                                    <CardBorderRight>
                                        <ContentBox>
                                            {/*<img src={voiceButton} alt={"voice-play"}/>*/}
                                            <DiaryDesc>{data.data[count]?.content}</DiaryDesc>
                                        </ContentBox>
                                        <ChattingIcon>
                                            <img src={chatIcon} alt={"chatIcon"} />
                                        </ChattingIcon>
                                    </CardBorderRight>
                                </CardBackground>
                            </CardRightPage>
                        </DiaryCard>

                        <DiaryWriteButton onClick={() => navigate("/write")}>다이어리 쓰기</DiaryWriteButton>
                    </CardContainerBackGround>
                </CardContainer>
            </DiaryListContainer>
        </Layout>
    );
}

export default DiaryList;

const DiaryListContainer = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
`;

const CardContainer = styled.div`
    width: 950px;
    height: 530px;
    margin: auto;
    background: linear-gradient(180deg, rgba(63, 75, 112, 0.79) 0%, rgba(100, 114, 152, 0.79) 100%);
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-sizing: border-box;
    box-shadow: 0 0 70px #465981;
    backdrop-filter: blur(80px);
    border-radius: 25px;
`;

const CardContainerBackGround = styled.div`
    margin: auto;
    width: 945px;
    height: 315px;
    background-color: #2f3a5f;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
`;

const PrevButton = styled.img`
    position: absolute;
    left: 123px;
    top: 111px;
    cursor: pointer;
`;
const NextButton = styled.img`
    position: absolute;
    right: 123px;
    top: 111px;
    cursor: pointer;
`;

const CardBackground = styled.div`
    background-color: #c6d3ec;
    width: 260px;
    height: 340px;
    padding: 5px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
`;

const ContentBox = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const CardBorder = styled.div`
    width: 250px;
    height: 321px;
    border: 1px solid #9cafb7;
    box-sizing: border-box;
    border-radius: 16px;
    padding: 9px 5px 10px;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
`;

const CardBorderRight = styled(CardBorder)`
    display: block;
`;

const DiaryCard = styled.div`
    width: 560px;
    height: 370px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: -40px;
    transform: translate(-50%, 0);
`;

const CardLeftPage = styled.div`
    border: 2px solid #464646;
    box-sizing: border-box;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    background-color: #08105e;
    width: 280px;
    height: 370px;
    padding: 14px 2px 15px 17px;
    position: relative;
`;

const CardRightPage = styled.div`
    border: 2px solid #464646;
    box-sizing: border-box;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    background-color: #08105e;
    width: 280px;
    height: 370px;
    padding: 15px 20px 15px 1.5px;
    position: relative;
`;

const DiaryTitle = styled.div`
    font-size: 18px;
    line-height: 22px;
`;

const DiaryDesc = styled.div`
    font-size: 17px;
    line-height: 21px;
    margin-top: 17px;
`;

const CommentIcon = styled.div`
    position: absolute;
    bottom: 37.5px;
    left: 31px;
    cursor: pointer;
`;

const ChattingIcon = styled.div`
    position: absolute;
    bottom: 32.5px;
    right: 34px;
    cursor: pointer;
`;

const DiaryWriteButton = styled.div`
    width: 461px;
    height: 52px;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid #84c8cc;
    box-sizing: border-box;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #91dddd;
    font-size: 20px;
    line-height: 24px;
    position: absolute;
    left: 50%;
    bottom: -90px;
    transform: translate(-50%, 0);

    &:hover {
        background-color: #cffdfd;
        border: 2px solid rgba(41, 50, 82, 0.71);
        box-shadow: inset 0px 4px 15px rgba(0, 0, 0, 0.5);
        color: #293252;
    }
`;
