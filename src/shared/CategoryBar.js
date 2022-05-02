import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import useStore from "../zustand/store";


CategoryBar.propTypes = {

};

function CategoryBar(props) {

    const navigate = useNavigate();
    const { currentHeader, setCurrentHeader } = useStore();
    // const currentHeader = useStore((state) => state.currentHeader);

    return (
        <HeaderContainer>
            <Home header={currentHeader}
                  onClick={() => {
                      setCurrentHeader('홈')
                      navigate('/')
                  }}>
                홈
            </Home>
            <DiaryList header={currentHeader}
                onClick={() => {
                setCurrentHeader('고민상담')
                navigate('/diarylist')
            }}>
                고민상담
            </DiaryList>
            <Post header={currentHeader}
                  onClick={() => {
                      setCurrentHeader('포스트')
                      navigate('/post')
                  }}>
                작성
            </Post>
            <MyPage header={currentHeader}
                onClick={() => {
                    setCurrentHeader('마이페이지')
                    navigate('/mypage');
                }}>
                마이페이지
            </MyPage>
            <ChattingList header={currentHeader}
                onClick={()=>{
                setCurrentHeader('채팅')
                navigate('/chatlist');
            }}>
                채팅
            </ChattingList>
            <Lottery header={currentHeader}
                onClick={()=>{
                setCurrentHeader('추첨')
                navigate('/lottery');
            }}>
                추첨
            </Lottery>

        </HeaderContainer>
    );
}

export default CategoryBar;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px auto;
`;

const Home = styled.div`
  margin-right: 20px;
  font-size: 20px;
  cursor: pointer;
  color: ${(props) => (props.header === "홈" ? 'red' : 'black')};
`;

const Post = styled(Home)`
  font-size: 20px;
  cursor: pointer;
  color: ${(props) => (props.header === "포스트" ? 'red' : 'black')};
`;

const DiaryList = styled(Home)`
  color: ${(props) => (props.header === "고민상담" ? 'red' : 'black')};
`;
const MyPage = styled(Home)`
  color: ${(props) => (props.header === "마이페이지" ? 'red' : 'black')};
`
const ChattingList = styled(Home)`
  color: ${(props) => (props.header === "채팅" ? 'red' : 'black')};
`
const Lottery = styled(Home)`
  color: ${(props) => (props.header === "추첨" ? 'red' : 'black')};
`