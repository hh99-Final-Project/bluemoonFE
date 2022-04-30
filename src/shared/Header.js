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
            <Post header={currentHeader}
                  onClick={() => {
                      setCurrentHeader('포스트')
                      navigate('/post')
                  }}>다이어리 쓰기</Post>
        </HeaderContainer>
    );
}

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  margin: 10px 0 20px 20px;
`;

const Home = styled.div`
  margin-right: 20px;
  font-size: 20px;
  cursor: pointer;
  color: ${(props) => (props.header === "홈" ? 'red' : 'black')};
`;

const Post = styled.div`
  font-size: 20px;
  cursor: pointer;
  color: ${(props) => (props.header === "포스트" ? 'red' : 'black')};
`;