import React, { useState } from "react";
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

    return (
        <HeaderContainer>
            <Logo onClick={() => navigate("/")}>로고</Logo>
            <HeaderRightArea>
                {userInfo ? <NickName>{userInfo.nickname}님</NickName> : <div>로그아웃 되었습니다.</div>}
                <Point>100 points</Point>
                <AlertIcon
                    onClick={() => {
                        setIsOpenNoti(true);
                    }}
                >
                    알림
                </AlertIcon>
                <LoginArea onClick={() => loginCheck()}>로그인/회원가입</LoginArea>
                <Logout onClick={logout}>로그아웃</Logout>
            </HeaderRightArea>
            {isOpenNoti && <Notifications closeModal={() => setIsOpenNoti(false)} />}
            {modalOpen && <Login />}
        </HeaderContainer>
    );
};

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
    color: #9aebe7;
`;

const NickName = styled.div`
    margin-right: 20px;
`;

const Logo = styled.div`
    cursor: pointer;
    color: #9aebe7;
`;
const Point = styled.div`
    margin-right: 20px;
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
