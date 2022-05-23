import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useStore from "../zustand/store";
import {
    categoryWrite,
    categoryChatList,
    categoryHome,
    categoryLottery,
    categoryMyPage,
    categoryDiaryList,
} from "../static/images/resources";
import { useDispatch, useSelector } from "react-redux";
import Login from "../components/user/Login";
import { isModalOpen } from "../redux/modules/commonSlice";
import useMovePage from "../hooks/useMovePage";
import star from "../static/images/categoryBar/Star.svg";

CategoryBar.propTypes = {};

function CategoryBar(props) {
    const dispatch = useDispatch();

    const { currentHeader, setCurrentHeader } = useStore();
    const { moveToPage } = useMovePage();
    const userInfo = useSelector((state) => state.userSlice.userInfo);
    const isLogin = useSelector((state) => state.userSlice.isLogin);
    const modalIsOpen = useSelector((state) => state.commonSlice.modalIsOpen);

    const path = window.location.pathname;

    const loginCheck = () => {
        return !!userInfo;
    };

    const closeModal = () => {
        dispatch(isModalOpen(false));
    };

    const openModal = () => {
        dispatch(isModalOpen(true));
    };

    const unreadCountList = useSelector((state) => state.chatSlice.unreadCountList);

    return (
        <HeaderContainer>
            <CategoryLeft>
                <Home
                    header={currentHeader}
                    onClick={() => {
                        moveToPage("/");
                        // setCurrentHeader("홈");
                        // navigate("/");
                    }}
                >
                    {currentHeader === "홈" ? <span>기본 홈</span> : <img src={categoryHome} alt={"home"} />}
                </Home>
                <DiaryList
                    header={currentHeader}
                    onClick={() => {
                        // setCurrentHeader("고민상담");
                        moveToPage("/diarylist");
                    }}
                >
                    {currentHeader === "고민상담" ? (
                        <div>고민 상담소</div>
                    ) : (
                        <img src={categoryDiaryList} alt={"ListIcon"} />
                    )}
                </DiaryList>
                <Post
                    header={currentHeader}
                    onClick={() => {
                        // setCurrentHeader("포스트");
                        // navigate("/write");
                        moveToPage("/write");
                    }}
                >
                    {currentHeader === "포스트" ? <div>고민 접수</div> : <img src={categoryWrite} alt={"writeIcon"} />}
                </Post>
                <MyPage
                    header={currentHeader}
                    onClick={() => {
                        if (loginCheck()) {
                            moveToPage("/mypage");
                        } else {
                            openModal(true);
                        }
                    }}
                >
                    {currentHeader === "마이페이지" ? (
                        <div>마이 페이지</div>
                    ) : (
                        <img src={categoryMyPage} alt={"MyPageIcon"} />
                    )}
                </MyPage>
                <ChattingList
                    header={currentHeader}
                    onClick={() => {
                        if (loginCheck()) {
                            // setCurrentHeader("채팅");
                            // navigate("/chatlist");
                            moveToPage("/chatlist");
                        } else {
                            openModal(true);
                        }
                    }}
                    // ref={ChattingRef}
                >
                    {currentHeader === "채팅" ? <div>1:1 채팅</div> : <img src={categoryChatList} alt={"ChatIcon"} />}
                    {unreadCountList.length > 0 && <Unread src={star} />}
                </ChattingList>
                <Lottery
                    header={currentHeader}
                    onClick={() => {
                        // setCurrentHeader("추첨");
                        // navigate("/lottery");
                        moveToPage("/lottery");
                    }}
                >
                    {currentHeader === "추첨" ? (
                        <div>오픈 이벤트</div>
                    ) : (
                        <img src={categoryLottery} alt={"LotteryIcon"} />
                    )}
                </Lottery>
            </CategoryLeft>

            <CategoryRight>
                {isLogin ? (
                    <div>
                        <span> {userInfo.nickname} </span>님의 다이어리
                    </div>
                ) : (
                    <span></span>
                )}
            </CategoryRight>

            {modalIsOpen && <Login />}
        </HeaderContainer>
    );
}

export default CategoryBar;

const HeaderContainer = styled.div`
    width: 950px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin: 0 auto;

    @media only screen and (max-width: 420px) {
        display: none;
    }
`;

const CategoryLeft = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
`;
const CategoryRight = styled.div`
    color: #9aebe7;
    margin-bottom: 9px;
    cursor: default;

    span {
        color: #ffffff;
    }
`;

const Home = styled.div`
    margin-right: 10px;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    span {
        padding-bottom: 18px;
    }

    img {
        padding-bottom: 18px;
    }

    border-radius: 5px 5px 0 0;
    border: 2px solid #cbcfdc47;
    box-sizing: border-box;
    z-index: 0;
    position: relative;
    top: ${(props) => (props.header === "홈" ? "22px" : "19px")};
    width: ${(props) => (props.header === "홈" ? "124px" : "58px")};
    height: ${(props) => (props.header === "홈" ? "66px" : "59px")};
    color: ${(props) => (props.header === "홈" ? "#08105D" : "#C6D3EC")};
    background-color: ${(props) => (props.header === "홈" ? "#C6D3EC" : "#354468")};
    box-shadow: ${(props) => (props.header === "홈" ? "0px 4px 4px rgba(0, 0, 0, 0.25)" : "")};
`;

const Post = styled(Home)`
    font-size: 20px;
    cursor: pointer;
    top: 0;
    width: ${(props) => (props.header === "포스트" ? "132px" : "58px")};
    height: ${(props) => (props.header === "포스트" ? "46px" : "40px")};
    color: ${(props) => (props.header === "포스트" ? "#08105D" : "#C6D3EC")};
    background-color: ${(props) => (props.header === "포스트" ? "#C6D3EC" : "#354468")};
    box-shadow: ${(props) => (props.header === "포스트" ? "0px 4px 4px rgba(0, 0, 0, 0.25)" : "")};

    img {
        padding-bottom: 0;
    }
`;

const DiaryList = styled(Post)`
    top: 0;
    width: ${(props) => (props.header === "고민상담" ? "132px" : "58px")};
    height: ${(props) => (props.header === "고민상담" ? "46px" : "40px")};
    color: ${(props) => (props.header === "고민상담" ? "#08105D" : "#C6D3EC")};
    background-color: ${(props) => (props.header === "고민상담" ? "#C6D3EC" : "#354468")};
    box-shadow: ${(props) => (props.header === "고민상담" ? "0px 4px 4px rgba(0, 0, 0, 0.25)" : "")};
`;
const MyPage = styled(Post)`
    top: 0;
    width: ${(props) => (props.header === "마이페이지" ? "132px" : "58px")};
    height: ${(props) => (props.header === "마이페이지" ? "46px" : "40px")};
    color: ${(props) => (props.header === "마이페이지" ? "#08105D" : "#C6D3EC")};
    background-color: ${(props) => (props.header === "마이페이지" ? "#C6D3EC" : "#354468")};
    box-shadow: ${(props) => (props.header === "마이페이지" ? "0px 4px 4px rgba(0, 0, 0, 0.25)" : "")};
`;
const ChattingList = styled(Post)`
    top: 0;
    width: ${(props) => (props.header === "채팅" ? "132px" : "58px")};
    height: ${(props) => (props.header === "채팅" ? "46px" : "40px")};
    color: ${(props) => (props.header === "채팅" ? "#08105D" : "#C6D3EC")};
    background-color: ${(props) => (props.header === "채팅" ? "#C6D3EC" : "#354468")};
    box-shadow: ${(props) => (props.header === "채팅" ? "0px 4px 4px rgba(0, 0, 0, 0.25)" : "")};
    position: relative;
`;

const Unread = styled.img`
    position: absolute;
    top: 5px;
    right: 10px;
`;
const Lottery = styled(Post)`
    top: 0;
    width: ${(props) => (props.header === "추첨" ? "132px" : "58px")};
    height: ${(props) => (props.header === "추첨" ? "46px" : "40px")};
    color: ${(props) => (props.header === "추첨" ? "#08105D" : "#C6D3EC")};
    background-color: ${(props) => (props.header === "추첨" ? "#C6D3EC" : "#354468")};
    box-shadow: ${(props) => (props.header === "추첨" ? "0px 4px 4px rgba(0, 0, 0, 0.25)" : "")};
`;
