import React, { useState } from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import { Notifications } from "../components/common";


const Header2 = () => {

    const navigate = useNavigate();
    const [isOpenNoti, setIsOpenNoti] = useState(false);
    const loginCheck = () => {
        //로그인 판별하기
    }
    return (
        <HeaderContainer>
            <Logo onClick={() => navigate('/')}>
                로고
            </Logo>
            <HeaderRightArea>
                <Point>
                    100 points
                </Point>
                <AlertIcon onClick={() => {
                    setIsOpenNoti(true);
                }}>
                    알림
                </AlertIcon>
                <Login onClick={loginCheck}>
                    로그인/회원가입
                </Login>
            </HeaderRightArea>
            {isOpenNoti && <Notifications closeModal={()=>setIsOpenNoti(false)}/>}
        </HeaderContainer>
    )
}

export default Header2;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
  width: 60%;
  font-weight: bold;
  font-size: 20px;
`;
const HeaderRightArea = styled.div`
  display: flex;
  justify-content: center;
  
`;
const Logo = styled.div`
  cursor: pointer;
`;
const Point = styled.div`
  margin-right: 20px;
`;
const AlertIcon = styled.div`
  margin-right: 20px;
  cursor: pointer;
`;
const Login = styled.div`
  cursor: pointer;
`;