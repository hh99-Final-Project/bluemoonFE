import React, { useState, useEffect, useRef } from "react";
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
import { color } from "../utils/designSystem";
import { useQuery, QueryClient } from "react-query";

import { commentIcon, chatIcon,
    prevButton, nextButton, voicePlayIcon
} from "../static/images/resources";

DiaryList.propTypes = {};

function DiaryList() {
    const navigate = useNavigate();
    const isLogin = useSelector((state) => state.userSlice.isLogin);
    const [count, setCount] = useState(1);
    const [page, setPage] = useState(1);
    const [audio, setAudio] = useState();
    const [diaryList, setDiaryList] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { currentHeader, setCurrentHeader } = useStore();

    const getPrevDiary = () => {
        if(audio){
            audio.pause();
        }

        if (count !== 1) {
            setCount((count) => count - 1);
            //이 와중에 page가 1이면?
        } else {
           //count가 1일때
            if(page === 1) {
                window.alert("제일 첫번째 다이어리에요!");
            } else {
                getDiaryListAPI(page - 1);
                setPage(page => page - 1);
                setCount(5);
            }

        }

        // setAudio(new Audio(diaryList[count - 1].voiceUrl));
        // audio.loop = false;
        // audio.volume = 1;
    };

    const getNextDiary = () => {
        if(audio){
            audio.pause();
        }

        if (diaryList.length === 0) {
            window.alert("더이상 다이어리가 없어요😂😂");
            return;
        }

        if (diaryList.length === count) {
            getDiaryListAPI(page + 1);
            setPage((page) => page + 1);
            setCount(1);
        } else {
            //list가 아직 남아있으면 cnt++
            setCount((count) => count + 1);
        }

        // setAudio(new Audio(diaryList[count - 1].voiceUrl));
        // audio.loop = false;
        // audio.volume = 1;
    };

    // const { isLoading, data, isPreviousData } = useQuery(["diary", page], () => diaryApi.getDiaryList(page), {
    //     keepPreviousData: true,
    // });

    const getDiaryListAPI = (page) => {
        diaryApi.getDiaryList(page).then((res) => {
            if(res){
                setIsLoading(false);
                setDiaryList(res);
            } else {
                console.log("error");
            }
        });
    };

    const getAnonymousListApi = () => {
        diaryApi.getNotLoginUserDiary().then((res) =>{
            if(res){
                setIsLoading(false);
                let tmp = [];
                tmp.push(res.data);
                setDiaryList(tmp);
            } else {
                console.log("error");
            };
        });
    };

    useEffect(()=>{
        setCurrentHeader("고민상담");

        if(isLogin) {
            console.log("isLogin");
            getDiaryListAPI(page);
        } else {
            console.log("not isLogin");
            getAnonymousListApi();
        }
    },[]);


    const togglePlayVoice = (e) => {
        e.stopPropagation();
        if(audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Layout>
            <DiaryListContainer>
                <Header />
                <CategoryBar />
                <CardContainer BgColor={color.containerBoxColor}>
                    <CardContainerBackGround>
                        {isLogin && <PrevButton onClick={getPrevDiary} src={prevButton} />}
                        {isLogin && <NextButton onClick={getNextDiary} src={nextButton} />}
                        {/*다이어리 영역*/}
                        <DiaryCard
                            onClick={
                                () => {
                                    if(isLogin) {
                                        navigate(`/diary/${diaryList[count - 1].postUuid}`);
                                    } else {
                                        navigate(`/diary/${diaryList[0].postUuid}`);
                                    }
                                }}
                                key={isLogin ? diaryList[count - 1].postUuid : diaryList[0].postUuid}
                        >
                            <CardLeftPage>
                                <CardBackground>
                                    <CardBorder>

                                        <DiaryTitle>
                                            { diaryList.length === 0 ?
                                                "아직 작성된 다이어리가 없어요!"
                                                :
                                                isLogin ? diaryList[count - 1].title : diaryList[0].title
                                            }
                                        </DiaryTitle>
                                        <CommentIcon
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(`/diary/${diaryList[count - 1].postUuid}`);
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
                                            { diaryList[count - 1].voiceUrl &&
                                                <VoicePlayIcon onClick={togglePlayVoice} src={voicePlayIcon}/>
                                            }
                                            <DiaryDesc>
                                                {   diaryList.length === 0 ? "다이어리를 작성해주세요!" :
                                                    isLogin ? diaryList[count - 1].content : diaryList[0].content
                                                }
                                            </DiaryDesc>
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
    background: ${props => props.BgColor};
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

const VoicePlayIcon = styled.img`
    cursor: pointer;
`;

const DiaryDesc = styled.div`
    font-size: 17px;
    line-height: 21px;
    margin-top: 8px;
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
