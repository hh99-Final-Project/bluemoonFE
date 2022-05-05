import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useStore from "../zustand/store";

CategoryBar.propTypes = {};

function CategoryBar(props) {
    const navigate = useNavigate();
    const { currentHeader, setCurrentHeader } = useStore();
    // const currentHeader = useStore((state) => state.currentHeader);

    return (
        <HeaderContainer>
            <Home
                header={currentHeader}
                onClick={() => {
                    setCurrentHeader("홈");
                    navigate("/");
                }}
            >
                홈
            </Home>
            <DiaryList
                header={currentHeader}
                onClick={() => {
                    setCurrentHeader("고민상담");
                    navigate("/diarylist");
                }}
            >
                고민상담
            </DiaryList>
            <Post
                header={currentHeader}
                onClick={() => {
                    setCurrentHeader("포스트");
                    navigate("/write");
                }}
            >
                작성
            </Post>
            <MyPage
                header={currentHeader}
                onClick={() => {
                    setCurrentHeader("마이페이지");
                    navigate("/mypage");
                }}
            >
                마이페이지
            </MyPage>
            <ChattingList
                header={currentHeader}
                onClick={() => {
                    setCurrentHeader("채팅");
                    navigate("/chatlist");
                }}
            >
                채팅
            </ChattingList>
            <Lottery
                header={currentHeader}
                onClick={() => {
                    setCurrentHeader("추첨");
                    navigate("/lottery");
                }}
            >
                추첨
            </Lottery>
        </HeaderContainer>
    );
}

export default CategoryBar;

// Home div 에 적용한 것들이 나머지 div 에도 적용되는 현상 확인
// 어떻게 이런 일이 일어나는지 모르겠음.

const HeaderContainer = styled.div`
    width: 946px;
    display: flex;
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
    height: 50px;
    border-radius: 5px 5px 0px 0px;

    width: ${(props) => (props.header === "홈" ? "132px" : "80px")};
    color: ${(props) => (props.header === "홈" ? "#08105D" : "#C6D3EC")};
    background-color: ${(props) => (props.header === "홈" ? "#C6D3EC" : "#354468")};
`;

const Post = styled(Home)`
    font-size: 20px;
    cursor: pointer;
    width: ${(props) => (props.header === "포스트" ? "132px" : "80px")};
    color: ${(props) => (props.header === "포스트" ? "#08105D" : "#C6D3EC")};
    background-color: ${(props) => (props.header === "포스트" ? "#C6D3EC" : "#354468")};
`;

const DiaryList = styled(Home)`
    width: ${(props) => (props.header === "고민상담" ? "132px" : "80px")};
    color: ${(props) => (props.header === "고민상담" ? "#08105D" : "#C6D3EC")};
    background-color: ${(props) => (props.header === "고민상담" ? "#C6D3EC" : "#354468")};
`;
const MyPage = styled(Home)`
    width: ${(props) => (props.header === "마이페이지" ? "132px" : "100px")};
    color: ${(props) => (props.header === "마이페이지" ? "#08105D" : "#C6D3EC")};
    background-color: ${(props) => (props.header === "마이페이지" ? "#C6D3EC" : "#354468")};
`;
const ChattingList = styled(Home)`
    width: ${(props) => (props.header === "채팅" ? "132px" : "80px")};
    color: ${(props) => (props.header === "채팅" ? "#08105D" : "#C6D3EC")};
    background-color: ${(props) => (props.header === "채팅" ? "#C6D3EC" : "#354468")};
`;
const Lottery = styled(Home)`
    width: ${(props) => (props.header === "추첨" ? "132px" : "80px")};
    color: ${(props) => (props.header === "추첨" ? "#08105D" : "#C6D3EC")};
    background-color: ${(props) => (props.header === "추첨" ? "#C6D3EC" : "#354468")};
`;
