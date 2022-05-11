import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Notifications } from "../components/common";
import { deleteCookie, getCookie } from "../utils/cookie";
import { getUserInfo, isLogined } from "../redux/modules/userSlice";
import { isModalOpen, getAlertList } from "../redux/modules/commonSlice";
import MoonPoint from "../static/images/header/MoonPoint.svg";
import NewAlertIcon from "../static/images/header/NewAlertIcon.svg";
import Login from "../components/user/Login";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Popup from "../shared/Popup";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.userSlice.userInfo);
    const modalOpen = useSelector((state) => state.commonSlice.modalIsOpen);

    const [isOpenNoti, setIsOpenNoti] = useState(false);
    const [logoutPopup, setLogoutPopup] = useState(false);

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
        setLogoutPopup(false);
    };

    const closeNotiModal = () => {
        console.log("close!");
        setIsOpenNoti(false);
    };

    useEffect(() => {
        if (userInfo) {
            wsConnect();
            return () => {
                wsDisConnect();
            };
        }
    }, []);

    // 1. stomp 프로토콜 위에서 sockJS 가 작동되도록 클라이언트 생성
    let sock = new SockJS("http://121.139.34.35:8080/stomp/chat");
    let ws = Stomp.over(sock);

    // // 연결 및 구독. 파라메터로 토큰 넣어야 함
    function wsConnect() {
        try {
            ws.connect({}, () => {
                ws.subscribe(
                    `/sub/chat/room/${userInfo.userId}`,
                    (response) => {
                        const newAlert = JSON.parse(response.body);
                        console.log(response);
                        console.log(newAlert);
                        dispatch(getAlertList(newAlert));
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
            ws.disconnect(() => {
                ws.unsubscribe("sub-0");
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <React.Fragment>
            <HeaderContainer>
                <Logo onClick={() => navigate("/")}>
                    Blue Moon
                </Logo>
                {
                    userInfo ? (
                        <HeaderRightArea>
                            <Point>
                                <img src={MoonPoint} alt={"point"}/>
                                <span>{userInfo.myPoint}</span>
                            </Point>
                        <AlertIcon
                            ref={AlertTabRef}
                            onClick={() => {
                                setIsOpenNoti(true);
                            }}
                        >
                            <img src={NewAlertIcon} alt={"NewAlertIcon"}/>
                        </AlertIcon>
                            <Logout onClick={()=>setLogoutPopup(true)}>로그아웃</Logout>
                        </HeaderRightArea>
                    ) : (
                    <LoginArea onClick={() => loginCheck()}>로그인/회원가입</LoginArea>
                    )
                }
            </HeaderContainer>
            {isOpenNoti && <Notifications AlertTabRef={AlertTabRef} closeModal={closeNotiModal} />}
            {
                logoutPopup && <Popup
                title={"정말 로그아웃 하시겠습니까?"}
                desc={""}
                event={logout}
                close={() => setLogoutPopup(false)}
            />
            }
            {modalOpen && <Login />}
        </React.Fragment>
    );
};

export default Header;

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
    color: #D2FFFD;
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
    vertical-align:middle
  }
  
`;
const LoginArea = styled.div`
    cursor: pointer;
    margin-right: 20px;
    margin-top: 9px;
    font-size: 16px;
    line-height: 19px;
    color: #9AEBE7;
`;

const Logout = styled(LoginArea)`
    margin-top: 0;
`;