import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import useStore from "../zustand/store";


Header.propTypes = {

};

function Header(props) {

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
            <DiaryList>
                고민상담
            </DiaryList>
            <Post header={currentHeader}
                  onClick={() => {
                      setCurrentHeader('포스트')
                      navigate('/post')
                  }}>
                작성
            </Post>
            <MyPage
                onClick={() => {
                    setCurrentHeader('포스트')
                    navigate('/mypage');
                }}>
                마이페이지
            </MyPage>
            <ChattingList onClick={()=>{
                navigate('/chatlist');
            }}>
                채팅
            </ChattingList>
            <Lottery onClick={()=>{
                navigate('/lottery');
            }}>
                추첨
            </Lottery>

        </HeaderContainer>
    );
}

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 10px 0 20px 10px;
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
`;
const MyPage = styled(Home)``
const ChattingList = styled(Home)``
const Lottery = styled(Home)``