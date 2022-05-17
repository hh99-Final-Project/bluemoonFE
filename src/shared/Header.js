import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Notifications } from "../components/common";
import { deleteCookie, getCookie } from "../utils/cookie";
import { getUserInfo, isLogined } from "../redux/modules/userSlice";
import { isModalOpen, getNewAlert } from "../redux/modules/commonSlice";
import { newAlertIcon, moonPoint } from "../static/images/resources";

import Login from "../components/user/Login";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Popup from "../shared/Popup";
import useStore from "../zustand/store";
import { getUnreadCount } from "../redux/modules/chatSlice";



const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.userSlice.userInfo);
    const modalOpen = useSelector((state) => state.commonSlice.modalIsOpen);

    const [isOpenNoti, setIsOpenNoti] = useState(false);
    const [logoutPopup, setLogoutPopup] = useState(false);

    const AlertTabRef = useRef();
    const ws = useRef();
    const { setCurrentHeader } = useStore();
    const token = getCookie("authorization");
    const path = window.location.pathname;



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
        setLogoutPopup(false);
        navigate("/");
        setCurrentHeader("홈");
    };

    const closeNotiModal = () => {
        setIsOpenNoti(false);
    };

    useEffect(()=>{
        let sock = new SockJS(`${process.env.REACT_APP_BASE_URL}/stomp/chat`);
        let client = Stomp.over(sock);
         ws.current = client;
    },[]);

    useEffect(() => {
        if (userInfo) {
            wsConnect();
            return () => {
                wsDisConnect();
            };
        }
    }, []);


    // // 연결 및 구독. 파라메터로 토큰 넣어야 함
    function wsConnect() {
        try {
            ws.current.connect({ token: token }, () => {
                ws.current.subscribe(
                    `/sub/chat/room/${userInfo.userId}`,
                    (response) => {
                        const newAlert = JSON.parse(response.body);
                        if (newAlert.type === "ALARM") {
                            dispatch(getNewAlert(newAlert));
                        } else if (newAlert.type === "UNREAD") {
                            dispatch(getUnreadCount(newAlert));
                        }
                    },
                    // {},
                );
            });
        } catch (error) {
            console.log(error);
        }
    }

    function wsDisConnect() {
        try {
            ws.current.disconnect(() => {
                ws.current.unsubscribe("sub-0");
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <React.Fragment>
            <HeaderContainer>
                {path === "/" ? <div></div> : <Logo onClick={() => navigate("/")}>Blue Moon</Logo>}
                {userInfo ? (
                    <HeaderRightArea>
                        <Point>
                            <img src={moonPoint} alt={"point"} />
                            <span>{userInfo.myPoint}</span>
                        </Point>
                        <AlertIcon
                            ref={AlertTabRef}
                            onClick={() => {
                                setIsOpenNoti(true);
                            }}
                        >
                            <img src={newAlertIcon} alt={"NewAlertIcon"} />
                        </AlertIcon>
                        <Logout onClick={() => setLogoutPopup(true)}>로그아웃</Logout>
                    </HeaderRightArea>
                ) : (
                    <LoginArea onClick={() => loginCheck()}>로그인 / 회원가입</LoginArea>
                )}
            </HeaderContainer>
            {isOpenNoti && <Notifications AlertTabRef={AlertTabRef} closeModal={closeNotiModal} />}
            {logoutPopup && (
                <Popup
                    title={"정말 로그아웃 하시겠습니까?"}
                    event={logout}
                    close={() => setLogoutPopup(false)}
                    height={"220px"}
                />
            )}
            {modalOpen && <Login />}
        </React.Fragment>
    );
};

export default React.memo(Header);

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    top: 26px;
    margin-bottom: 46px;
    width: 950px;
    font-weight: bold;
    font-size: 20px;
`;
const HeaderRightArea = styled.div`
    display: flex;
    justify-content: center;
    color: #9aebe7;
    height: 39px;
    align-items: center;
`;

const Logo = styled.div`
    cursor: pointer;
    color: rgba(255, 255, 255, 0.8);
    font-size: 32px;
    line-height: 38px;
`;
const Point = styled.div`
    margin-right: 13px;
    width: 96px;
    height: 31px;
    border: 2px solid rgba(255, 255, 255, 0.8);
    border-radius: 23px;
    font-size: 15px;
    line-height: 18px;
    box-sizing: border-box;
    color: #d2fffd;
    display: flex;
    cursor: default;
    span {
        margin: 5px 0 13px;
    }

    img {
        margin: 7px 8px 0 11px;
        width: 15px;
        height: 15px;
    }
`;
const AlertIcon = styled.div`
    margin-right: 15px;
    cursor: pointer;
    line-height: 34px;

    img {
        vertical-align: middle;
    }
`;
const LoginArea = styled.div`
    cursor: pointer;
    margin-top: 13px;
    font-size: 14px;
    line-height: 18px;
    color: #9AEBE7;
    width: 150px;
    height: 35px;
    border: 2px solid rgba(255, 255, 255, 0.8);
    border-radius: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Logout = styled(LoginArea)`
    margin-top: 0;
`;
