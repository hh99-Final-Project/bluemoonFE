import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Notifications } from "../components/common";
import { deleteCookie, getCookie } from "../utils/cookie";
import { getUserInfo, isLogined } from "../redux/modules/userSlice";
import { isModalOpen } from "../redux/modules/commonSlice";
import Login from "../components/user/Login";

const Header2 = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.userSlice.userInfo);
    const modalOpen = useSelector((state) => state.commonSlice.modalIsOpen);

    const [isOpenNoti, setIsOpenNoti] = useState(false);

    const AlertTabRef = useRef();

    const loginCheck = () => {
        //로그인 판별하기
        if (userInfo) {
            window.alert("이미 로그인 되어있습니다");
        } else {
            dispatch(isModalOpen(true));
        }
    };

    const logout = () => {
        deleteCookie("authorization");
        dispatch(getUserInfo(null));
        dispatch(isLogined(false));
    };

    const closeNotiModal = () => {
        console.log("close!")
        setIsOpenNoti(false);
    }

    return (
        <HeaderContainer>
            <Logo onClick={() => navigate("/")}>로고</Logo>
            <HeaderRightArea>
                {/*{userInfo ? <NickName>{userInfo.nickname}님</NickName> : <div>로그아웃 되었습니다.</div>}*/}
                <Point>
                    100
                </Point>
                <AlertIcon
                    ref={AlertTabRef}
                    onClick={() => {
                        setIsOpenNoti(true);
                    }}>
                    알림
                </AlertIcon>
                <LoginArea onClick={() => loginCheck()}>로그인/회원가입</LoginArea>
                <Logout onClick={logout}>로그아웃</Logout>
            </HeaderRightArea>
            {isOpenNoti && <Notifications AlertTabRef={AlertTabRef} closeModal={closeNotiModal} />}
            {modalOpen && <Login />}
        </HeaderContainer>
    );
};

export default Header2;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: auto;
    padding-top: 15px;
    width: 950px;
    font-weight: bold;
    font-size: 20px;
    background-color: #081134;
`;
const HeaderRightArea = styled.div`
    display: flex;
    justify-content: center;
    color: #9aebe7;
`;

const NickName = styled.div`
    margin-right: 20px;
`;

const Logo = styled.div`
    cursor: pointer;
    color: #9aebe7;
    width: 99px;
    height: 75px;
`;
const Point = styled.div`
    margin-right: 20px;
    width: 96px;
    height: 31px;
    background-color: #DFDFDF;
    border-radius: 23px;
    font-size: 15px;
    line-height: 18px;
    color: #000000;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const AlertIcon = styled.div`
    margin-right: 20px;
    cursor: pointer;
`;
const LoginArea = styled.div`
    cursor: pointer;
    margin-right: 20px;
`;

const Logout = styled(LoginArea)``;
