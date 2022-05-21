import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Notifications } from "../components/common";
import { deleteCookie, getCookie } from "../utils/cookie";
import { getUserInfo, isLogined } from "../redux/modules/userSlice";
import { isModalOpen, getNewCommentAlert, deleteNewCommentAlert } from "../redux/modules/commonSlice";
import { newAlertIcon, moonPoint, mobMoreIcon, mobAlertIcon, newAlertNumber } from "../static/images/resources";

import Login from "../components/user/Login";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Popup from "../shared/Popup";
import useStore from "../zustand/store";
import { getUnreadCount } from "../redux/modules/chatSlice";
import { useMediaQuery } from "react-responsive";
import MobileCategoryBar from "./MobileCategoryBar";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.userSlice.userInfo);
    const modalOpen = useSelector((state) => state.commonSlice.modalIsOpen);
    const newCommentAlert = useSelector((state) => state.commonSlice.newCommentAlert);

    const [isOpenNoti, setIsOpenNoti] = useState(false);
    const [logoutPopup, setLogoutPopup] = useState(false);

    const AlertTabRef = useRef();
    const ws = useRef();
    const { setCurrentHeader, setMobileHeader, isHeaderMenuOpen } = useStore();
    const token = getCookie("authorization");
    const path = window.location.pathname;

    const isMobile = useMediaQuery({
        query: "(max-width: 420px)",
    });

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

    const toggleHeaderMenu = () => {
        setMobileHeader();
    };

    useEffect(() => {
        if (userInfo) {
            let sock = new SockJS(`${process.env.REACT_APP_BASE_URL}/stomp/chat`);
            let client = Stomp.over(sock);
            ws.current = client;
        }
    }, []);

    useEffect(() => {
        if (userInfo) {
            wsConnect();
            return () => {
                wsDisConnect();
                console.log("새로고침 시에도 cleanup 실행되나요?");
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
                            dispatch(getNewCommentAlert(newAlert));
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

    const alertOpen = () => {
        setIsOpenNoti(true);
        dispatch(deleteNewCommentAlert());
    };

    return (
        <React.Fragment>
            {isMobile ? (
                <MobileHeaderContainer>
                    <MobMoreIcon onClick={toggleHeaderMenu} src={mobMoreIcon}/>
                    <MobLogo>Blue Moon</MobLogo>
                    <MobAlert onClick={() => setIsOpenNoti(true)}
                              src={mobAlertIcon}/>
                    { isHeaderMenuOpen && <MobileCategoryBar/>}
                </MobileHeaderContainer>

            ) : (
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
                                    alertOpen();
                                }}
                            >
                                <img src={newAlertIcon} alt={"NewAlertIcon"} />
                                {newCommentAlert.length > 0 && (
                                    <>
                                        <NewAlertNumberArea
                                            src={newAlertNumber}
                                            alt={"NewAlertNumber"}
                                        ></NewAlertNumberArea>
                                        <NewAlertNumber> {newCommentAlert.length}</NewAlertNumber>
                                    </>
                                )}
                            </AlertIcon>
                            <Logout onClick={() => setLogoutPopup(true)}>로그아웃</Logout>
                        </HeaderRightArea>
                    ) : (
                        <LoginArea onClick={() => loginCheck()}>로그인 / 회원가입</LoginArea>
                    )}
                </HeaderContainer>
            )}

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
    font-family: "Jura";
`;
const Point = styled.div`
    margin-right: 20px;
    width: 96px;
    height: 35px;
    border: 2px solid rgba(255, 255, 255, 0.8);
    border-radius: 23px;
    font-size: 15px;
    line-height: 18px;
    box-sizing: border-box;
    color: #9aebe7;
    display: flex;
    cursor: default;
    span {
        margin: 6px 0 13px;
    }

    img {
        margin: 7px 8px 0 11px;
        width: 15px;
        height: 15px;
    }
`;
const AlertIcon = styled.div`
    position: relative;
    margin-right: 20px;
    cursor: pointer;
    img {
        vertical-align: middle;
        height: 35px;
    }
`;

const NewAlertNumberArea = styled.img`
    z-index: 1;
    position: absolute;
    left: 24px;
    bottom: 14px;
    width: 17px;
`;

const NewAlertNumber = styled.div`
    z-index: 2;
    position: absolute;
    bottom: 24px;
    left: 29px;
    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 13px;
    display: flex;
    align-items: center;

    color: #08105d;
`;

const LoginArea = styled.div`
    cursor: pointer;
    margin-top: 13px;
    font-size: 14px;
    line-height: 18px;
    color: #9aebe7;
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
    width: 97px;
    box-sizing: border-box;
`;

const MobileHeaderContainer = styled.div`
    width: 320px;
    height: 30px;
    margin: 0 auto 18px;
    padding-top: 31px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const MobMoreIcon = styled.img`
    cursor: pointer;
`;
const MobLogo = styled.div`
    font-family: "Jura";
    font-size: 24px;
    line-height: 28px;
    color: #ffffff;
`;
const MobAlert = styled.img`
    cursor: pointer;
`;
