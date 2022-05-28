import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { diaryApi } from "../apis/diaryApi";
import Loading from "../shared/Loading";
import CategoryBar from "../shared/CategoryBar";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import { Layout } from "../components/common";
import useStore from "../zustand/store";
import { useSelector, useDispatch } from "react-redux";
import { color } from "../utils/designSystem";
import { DiaryListMobile } from "../components/diary";
import { isMobile } from "react-device-detect";
import { useMediaQuery } from "react-responsive";
import { commentIcon, chatIcon, prevButton, nextButton, voicePlayIcon } from "../static/images/resources";
import { chatApi } from "../apis/chatApi";
import Login from "../components/user/Login";
import {setLoginModalOpen} from "../redux/modules/commonSlice";
import { userApi } from "../apis/userApi";
import { Helmet } from "react-helmet";

function DiaryList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.userSlice.isLogin);
    const [count, setCount] = useState(1);
    const [page, setPage] = useState(1);
    const [diaryList, setDiaryList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { setCurrentHeader } = useStore();
    const audioRef = useRef();

    const userInfo = useSelector((state) => state.userSlice.userInfo);
    const isMobileQuery = useMediaQuery({
        query: "(max-width: 420px)",
    });


    const getPrevDiary = (e) => {
        e.stopPropagation();

        if (audioRef.current) {
            audioRef.current.pause();
        }

        if (count === 1) {
            setCount(diaryList.length);
            return;
        }

        setCount((count) => count - 1);
    };

    const getNextDiary = (e) => {
        e.stopPropagation();

        if(!isLogin) {
            dispatch(setLoginModalOpen({open: true}));
            return;
        }

        if (audioRef.current) {
            audioRef.current.pause();
        }

        if (count === diaryList.length) {
            setCount(1);
            return;
        }

        setCount((count) => count + 1);

        if (count + 1 === diaryList.length) {
            //마지막 슬라이드 전일때 Api 요청
            diaryApi.getDiaryList(page + 1).then((res) => {
                //가져온 다음 페이지가 비었다면, 페이지를 처음으로 되돌리지 않는다.
                if (res.length === 0) {
                    setCount(1);
                    return;
                }

                if (res.length !== 0) {
                    setIsLoading(false);
                    setDiaryList((prevList) => [...prevList, ...res]);
                    setPage((page) => page + 1);
                } else {
                    console.log("error");
                }
            });
        }
    };

    const getAnonymousListApi = () => {
        diaryApi.getNotLoginUserDiary().then((res) => {
            if (res) {
                console.log("6");
                // setIsLoading(false);
                setDiaryList([res.data]);
            } else {
                console.log("error");
            }
        });
    };

    const createChat = (userId) => {
        chatApi
            .createChat(userId)
            .then((response) => {
                navigate(`/chat/${response.data}`);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(()=>{
        const authCheck = async () => {
            const data = await userApi.isLogin();
            if(data.userId){
                diaryApi.getDiaryList(page).then((res) => {
                    if (res) {
                        setIsLoading(false);
                        setDiaryList(res);
                    }
                });
            } else {
                diaryApi.getNotLoginUserDiary().then((res) => {
                    if (res) {
                        setIsLoading(false);
                        setDiaryList([res.data]);
                    } else {
                        console.log("error");
                    }
                });
            }
        };

        authCheck();

    },[isLogin]);

    useEffect(() => {
        setCurrentHeader("고민상담");

        if (isLogin && userInfo.nickname === "") {
            navigate("/signup");
        }
    }, []);


    const togglePlayVoice = (e) => {
        e.stopPropagation();
        if (audioRef.current.paused) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Layout>
            <Helmet>
                <title>Bluemoon 고민 상담소</title>
                <meta name="description" content="bluemoon 고민 상담소" />
                <meta property="og:url" content="https://bluemoondiary.com/diarylist"/>
            </Helmet>
            {isMobileQuery || isMobile ? (
                <DiaryListMobile
                    togglePlayVoice={togglePlayVoice}
                    diary={diaryList[count - 1]}
                    diaryList={diaryList}
                    createChat={createChat}
                    setPage={setPage}
                    setCount={setCount}
                    count={count}
                    setDiaryList={setDiaryList}
                    page={page}
                />
            ) : (
                <DiaryListContainer>
                    <Header />
                    <CategoryBar />
                    <CardContainer BgColor={color.containerBoxColor}>
                        <CardContainerBackGround>
                            {/*다이어리 영역*/}
                            <DiaryCard
                                onClick={() => {
                                    if (diaryList.length !== 0) {
                                        if (isLogin) {
                                            navigate(`/diary/${diaryList[count - 1].postUuid}`);
                                        } else {
                                            navigate(`/diary/${diaryList[0].postUuid}`);
                                        }
                                    }
                                }}
                                key={
                                    diaryList.length === 0
                                        ? 0
                                        : isLogin
                                        ? diaryList[count - 1].postUuid
                                        : diaryList[0].postUuid
                                }
                            >
                                <CardLeftPage>
                                    {isLogin && diaryList.length !== 0 && (
                                        <PrevButton onClick={getPrevDiary} src={prevButton} />
                                    )}
                                    <CardBackground>
                                        <CardBorder>
                                            <DiaryTitle>
                                                {diaryList.length === 0
                                                    ? "아직 작성된 다이어리가 없어요!"
                                                    : isLogin
                                                    ? diaryList[count - 1].title
                                                    : diaryList[0].title}
                                            </DiaryTitle>
                                            {diaryList.length !== 0 && (
                                                <CommentIcon
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        navigate(`/diary/${diaryList[count - 1].postUuid}`);
                                                    }}
                                                >
                                                    <img src={commentIcon} alt={"comment"} />
                                                </CommentIcon>
                                            )}
                                        </CardBorder>
                                    </CardBackground>
                                </CardLeftPage>

                                <CardRightPage>
                                    {diaryList.length !== 0 && (
                                        <NextButton onClick={getNextDiary} src={nextButton} />
                                    )}
                                    <CardBackground>
                                        <CardBorderRight>
                                            <ContentBox>
                                                {diaryList.length !== 0 && diaryList[count - 1].voiceUrl && (
                                                    <div>
                                                        <VoicePlayIcon onClick={togglePlayVoice} src={voicePlayIcon} />
                                                        <audio ref={audioRef} src={diaryList[count - 1].voiceUrl} />
                                                    </div>
                                                )}
                                                <DiaryDesc>
                                                    {diaryList.length === 0
                                                        ? "다이어리를 작성해주세요!"
                                                        : isLogin
                                                        ? diaryList[count - 1].content
                                                        : diaryList[0].content}
                                                </DiaryDesc>
                                            </ContentBox>
                                            {diaryList.length !== 0 && (
                                                <ChattingIcon
                                                    onClick={() => {
                                                        if (isLogin) {
                                                            createChat(diaryList[count - 1].userId);
                                                        } else {
                                                            createChat(diaryList[0].userId);
                                                        }
                                                    }}
                                                >
                                                    <img src={chatIcon} alt={"chatIcon"} />
                                                </ChattingIcon>
                                            )}
                                        </CardBorderRight>
                                    </CardBackground>
                                </CardRightPage>
                            </DiaryCard>
                        </CardContainerBackGround>
                        <DiaryWriteButton onClick={() => navigate("/write")}>다이어리 쓰기</DiaryWriteButton>
                    </CardContainer>
                    <Login/>
                </DiaryListContainer>
            )}
            <Footer />
        </Layout>
    );
}

export default DiaryList;

const DiaryListContainer = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
`;

const CardContainer = styled.div`
    width: 950px;
    height: 530px;
    margin: auto;
    background: ${(props) => props.BgColor};
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-sizing: border-box;
    box-shadow: 0 0 70px #465981;
    backdrop-filter: blur(80px);
    border-radius: 25px;
    position: relative;
    z-index: 3;
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
    left: -71px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
`;
const NextButton = styled.img`
    position: absolute;
    right: -71px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
`;

const CardBackground = styled.div`
    background: #c6d3ec;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.5);
    border-radius: 2px;
    width: 260px;
    height: 340px;
    padding: 10px;
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
    top: -50px;
    transform: translate(-50%, 0);
`;

const CardLeftPage = styled.div`
    background-color: #08105e;
    box-sizing: border-box;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    width: 280px;
    height: 370px;
    padding: 15px 5px 15px 15px;
    position: relative;
`;

const CardRightPage = styled.div`
    background-color: #08105e;
    box-sizing: border-box;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    width: 280px;
    height: 370px;
    padding: 15px 14px 15px 6px;
    position: relative;
`;

const DiaryTitle = styled.div`
    font-size: 18px;
    line-height: 23px;
    color: #08105d;
`;

const VoicePlayIcon = styled.img`
    cursor: pointer;
`;

const DiaryDesc = styled.div`
    margin-top: 9px;
    font-size: 12px;
    line-height: 15px;
    color: #08105d;
    width: 178px;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const CommentIcon = styled.div`
    position: absolute;
    bottom: 33px;
    left: 33px;
    cursor: pointer;
`;

const ChattingIcon = styled.div`
    position: absolute;
    bottom: 25px;
    right: 32px;
    cursor: pointer;
`;

const DiaryWriteButton = styled.div`
    width: 462px;
    height: 52px;
    border: 2px solid #9aebe7;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 9px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #9aebe7;
    font-size: 18px;
    line-height: 23px;
    position: absolute;
    left: 50%;
    bottom: 27px;
    transform: translate(-50%, 0);

    &:hover {
        background-color: #cffdfd;
        border: 2px solid rgba(41, 50, 82, 0.71);
        box-shadow: inset 0px 4px 15px rgba(0, 0, 0, 0.5);
        color: #293252;
    }
`;
