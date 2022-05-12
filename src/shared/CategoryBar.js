import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useStore from "../zustand/store";
import HomeIcon from "../static/images/categoryBar/homeIcon.png";
import WriteIcon from "../static/images/categoryBar/writeIcon.png";
import ListIcon from "../static/images/categoryBar/diaryListIcon.png";
import MyPageIcon from "../static/images/categoryBar/mypageIcon.png";
import LotteryIcon from "../static/images/categoryBar/lotteryIcon.png";
import ChatIcon from "../static/images/categoryBar/chatIcon.png";
import {useSelector} from "react-redux";
import Login from "../components/user/Login";
import {isModalOpen} from "../redux/modules/commonSlice";



CategoryBar.propTypes = {};

function CategoryBar(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { currentHeader, setCurrentHeader } = useStore();
    const userInfo = useSelector((state) => state.userSlice.userInfo);
    const modalIsOpen = useSelector((state) => state.commonSlice.modalIsOpen);

    const loginCheck = () => {
        return !!userInfo
    }

    const closeModal = () => {
        dispatch(isModalOpen(false));
    };

    const openModal = () => {
        dispatch(isModalOpen(true));
    }

    return (
        <HeaderContainer>
            <Home
                header={currentHeader}
                onClick={() => {
                    setCurrentHeader("홈");
                    navigate("/");
                }}
            >
                {currentHeader === '홈' ? <div style={{paddingBottom:'18px'}}>기본 홈</div> :
                    <img style={{paddingBottom:'13px'}} src={HomeIcon} alt={"home"}/> }
            </Home>
            <DiaryList
                header={currentHeader}
                onClick={() => {
                    setCurrentHeader("고민상담");
                    navigate("/diarylist");
                }}
            >
                {currentHeader === '고민상담' ? <div>고민 들어주기</div> : <img src={ListIcon} alt={"ListIcon"}/> }

            </DiaryList>
            <Post
                header={currentHeader}
                onClick={() => {
                    setCurrentHeader("포스트");
                    navigate("/write");
                }}
            >
                {currentHeader === '포스트' ? <div>고민 작성하기</div> : <img src={WriteIcon} alt={"WriteIcon"}/> }

            </Post>
            <MyPage
                header={currentHeader}
                onClick={() => {
                    if(loginCheck()){
                        setCurrentHeader("마이페이지");
                        navigate("/mypage");
                    } else {
                        openModal(true);
                    }
                }}
            >
                {currentHeader === '마이페이지' ? <div>마이 페이지</div> : <img src={MyPageIcon} alt={"MyPageIcon"}/> }

            </MyPage>
            <ChattingList
                header={currentHeader}
                onClick={() => {
                    if(loginCheck()){
                        setCurrentHeader("채팅");
                        navigate("/chatlist");
                    } else {
                        openModal(true);
                    }
                }}
            >
                {currentHeader === '채팅' ? <div>1:1 채팅</div> : <img src={ChatIcon} alt={"ChatIcon"}/> }

            </ChattingList>
            <Lottery
                header={currentHeader}
                onClick={() => {
                    setCurrentHeader("추첨");
                    navigate("/lottery");
                }}
            >
                {currentHeader === '추첨' ? <div>오픈 이벤트</div> : <img src={LotteryIcon} alt={"LotteryIcon"}/> }

            </Lottery>
            {modalIsOpen && <Login />}
        </HeaderContainer>

    );
}

export default CategoryBar;

// Home div 에 적용한 것들이 나머지 div 에도 적용되는 현상 확인
// 어떻게 이런 일이 일어나는지 모르겠음.

const HeaderContainer = styled.div`
    width: 950px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    margin: 0 auto;
`;

const Home = styled.div`
    margin-right: 10px;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    
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
`;

const DiaryList = styled(Home)`
    top: 0;
    width: ${(props) => (props.header === "고민상담" ? "132px" : "58px")};
    height: ${(props) => (props.header === "고민상담" ? "46px" : "40px")};
    color: ${(props) => (props.header === "고민상담" ? "#08105D" : "#C6D3EC")};
    background-color: ${(props) => (props.header === "고민상담" ? "#C6D3EC" : "#354468")};
    box-shadow: ${(props) => (props.header === "고민상담" ? "0px 4px 4px rgba(0, 0, 0, 0.25)" : "")};
`;
const MyPage = styled(Home)`
    top: 0;
    width: ${(props) => (props.header === "마이페이지" ? "132px" : "58px")};
    height: ${(props) => (props.header === "마이페이지" ? "46px" : "40px")};
    color: ${(props) => (props.header === "마이페이지" ? "#08105D" : "#C6D3EC")};
    background-color: ${(props) => (props.header === "마이페이지" ? "#C6D3EC" : "#354468")};
    box-shadow: ${(props) => (props.header === "마이페이지" ? "0px 4px 4px rgba(0, 0, 0, 0.25)" : "")};
`;
const ChattingList = styled(Home)`
    top: 0;
    width: ${(props) => (props.header === "채팅" ? "132px" : "58px")};
    height: ${(props) => (props.header === "채팅" ? "46px" : "40px")};
    color: ${(props) => (props.header === "채팅" ? "#08105D" : "#C6D3EC")};
    background-color: ${(props) => (props.header === "채팅" ? "#C6D3EC" : "#354468")};
    box-shadow: ${(props) => (props.header === "채팅" ? "0px 4px 4px rgba(0, 0, 0, 0.25)" : "")};
`;
const Lottery = styled(Home)`
    top: 0;
    width: ${(props) => (props.header === "추첨" ? "132px" : "58px")};
    height: ${(props) => (props.header === "추첨" ? "46px" : "40px")};
    color: ${(props) => (props.header === "추첨" ? "#08105D" : "#C6D3EC")};
    background-color: ${(props) => (props.header === "추첨" ? "#C6D3EC" : "#354468")};
    box-shadow: ${(props) => (props.header === "추첨" ? "0px 4px 4px rgba(0, 0, 0, 0.25)" : "")};
`;
