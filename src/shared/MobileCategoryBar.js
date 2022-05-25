import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import useStore from "../zustand/store";
import Modal from "react-modal";
import {
    mobHomeIcon,
    mobListIcon,
    mobWriteIcon,
    mobMyPageIcon,
    mobChatIcon,
    mobEventIcon,
    mobFeedbackIcon,
    mobHeaderBackIcon,
    mobMyPointBluemoon,
    closeBtn
} from "../static/images/resources";
import useMovePage from "../hooks/useMovePage";
import Login from "../components/user/Login";
import { isModalOpen } from "../redux/modules/commonSlice";
import Popup from "./Popup";
import { logout } from "../redux/modules/userSlice";

const MobileCategoryBar = () => {
    const { setMobileHeader, isHeaderMenuOpen } = useStore();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { moveToPage } = useMovePage();
    const popupRef = useRef();
    const isLogin = useSelector((state) => state.userSlice.isLogin);
    const userInfo = useSelector((state) => state.userSlice.userInfo);
    const modalIsOpen = useSelector((state) => state.commonSlice.modalIsOpen);
    const [logoutPopup, setLogoutPopup] = useState(false);
    const [isPointPopup, setPointPopup] = useState(false);

    const logoutAction = () => {
        dispatch(logout());
        setLogoutPopup(false);
        navigate("/");
        setMobileHeader();
    };

    const loginCheck = () => {
        return userInfo;
    };

    return (
        <React.Fragment>
            <Modal
                isOpen={true}
                onRequestClose={() => setMobileHeader()}
                shouldCloseOnOverlayClick={true}
                ariaHideApp={false}
                style={{
                    overlay: {
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        zIndex: 99999,
                    },
                    content: {
                        position: "relative",
                        zIndex: 99999,
                        top: "20px",
                        left: 0,
                        right: "auto",
                        bottom: "auto",
                        width: "197px",
                        height: "calc(100vh - 40px)",
                        border: "none",
                        boxSizing: "border-box",
                        background: "#C6D3EC",
                        borderRadius: "0px 25px 25px 0px",
                        outline: "none",
                        padding: 0,
                        overflow: "visible",
                        // transition: "all 3s linear"
                    },
                }}
            >
                <MenuContentBox>
                    <MenuArea>
                        <div>메뉴</div>
                        <img onClick={() => setMobileHeader()} src={mobHeaderBackIcon} />
                    </MenuArea>
                    <LoginArea>
                        { isLogin ? (
                            <UserInfoArea>
                                <NickNameArea>{userInfo.nickname}님</NickNameArea>
                                <LogoutButton
                                    onClick={() => {
                                        setLogoutPopup(true);
                                    }}
                                >
                                    로그아웃
                                </LogoutButton>
                            </UserInfoArea>
                        ) : (
                            <NotLogined onClick={() => dispatch(isModalOpen(true))}>로그인/회원가입</NotLogined>
                        )
                        }
                    </LoginArea>
                    <HeaderContent>
                        <Home>
                            <img src={mobHomeIcon} />
                            <div onClick={() => moveToPage("/")}>시작 홈</div>
                        </Home>
                        <DiaryList>
                            <img src={mobListIcon} />
                            <div onClick={() => moveToPage("/diarylist")}>고민 상담소</div>
                        </DiaryList>
                        <DiaryWrite>
                            <img src={mobWriteIcon} />
                            <div onClick={() => moveToPage("/write")}>고민 접수</div>
                        </DiaryWrite>
                        <MyPageIcon>
                            <img src={mobMyPageIcon} />
                            <div
                                onClick={() => {
                                    if (loginCheck()) {
                                        moveToPage("/mypage");
                                    } else {
                                        dispatch(isModalOpen(true));
                                    }
                                }}
                            >
                                마이 페이지
                            </div>
                        </MyPageIcon>
                        <ChattingIcon>
                            <img src={mobChatIcon} />
                            <div
                                onClick={() => {
                                    if (loginCheck()) {
                                        moveToPage("/chatlist");
                                    } else {
                                        dispatch(isModalOpen(true));
                                    }
                                }}
                            >
                                1:1 대화
                            </div>
                        </ChattingIcon>
                        <EventIcon>
                            <img src={mobEventIcon} />
                            <div onClick={() => moveToPage("/lottery")}>이벤트</div>
                            { userInfo && (
                                <div>
                                    <MyPoint>
                                        <img src={mobMyPointBluemoon} />
                                        <div onClick={() => setPointPopup(true)}>{userInfo.myPoint}</div>
                                    </MyPoint>
                                    { isPointPopup &&
                                    <PointPopup ref={popupRef}>
                                        <img onClick={() => setPointPopup(false)} src={closeBtn}/>
                                        <div>댓글은 개당 100p, 다이어리 작성시 500p가 적립됩니다.(하루 최대 댓글 5개, 다이어리 1개)</div>
                                        <div>1000p가 있으면 이벤트 페이지에서 추첨을 할 수 있습니다. (하루 1번)</div>
                                    </PointPopup>
                                    }
                                </div>
                            )}
                        </EventIcon>
                    </HeaderContent>
                    <FeedbackIcon>
                        <img src={mobFeedbackIcon} />
                        <div
                            onClick={() =>
                                window.open(
                                    "https://docs.google.com/forms/d/e/1FAIpQLScXhuS3JBOySC6_YMlJOc98xew2pYAwUyPYRE_Qms2NGrdKfw/viewform",
                                )
                            }
                        >
                            피드백 주기
                        </div>
                    </FeedbackIcon>
                </MenuContentBox>
            </Modal>
            {modalIsOpen && <Login />}
            {logoutPopup && (
                <Popup
                    title={"정말 로그아웃 하시겠습니까?"}
                    event={logoutAction}
                    close={() => setLogoutPopup(false)}
                    height={"180px"}
                />
            )}
        </React.Fragment>
    );
};

export default MobileCategoryBar;

const MenuContentBox = styled.div`
    position: relative;
    height: 100%;
`;
const MenuArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom:27px;
    padding: 37px 21px 0 18px;

    div {
        font-size: 20px;
        line-height: 24px;
        color: #354569;
    }

    img {
        cursor: pointer;
    }
`;
const LoginArea = styled.div`
    width: 100%;
    height: 65px;
    background-color: #959ebe;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 36px;
`;

const UserInfoArea = styled.div`
    display: flex;
    align-items: center;
`;

const NickNameArea = styled.div`
    font-size: 16px;
    line-height: 19px;
    color: #354569;
    margin-right: 20px;
    padding-top: 2px;
`;

const LogoutButton = styled.div`
    width: 69px;
    height: 25px;
    font-size: 10px;
    line-height: 13px;
    color: #08105d;
    border: 2px solid rgba(255, 255, 255, 0.8);
    border-radius: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const NotLogined = styled.div`
    width: 130px;
    height: 25px;
    border: 2px solid rgba(255, 255, 255, 0.8);
    border-radius: 23px;
    font-size: 12px;
    line-height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #08105d;
    cursor: pointer;
`;

const HeaderContent = styled.div`
    margin-left: 6px;
`;
const Home = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 185px;
    height: 56px;
    border-bottom: 1px solid #959ebe;
    cursor: pointer;

    img {
        margin: 0 23px 0 10px;
    }
    div {
        font-size: 16px;
        line-height: 19px;

        color: #354569;
    }
`;
const DiaryList = styled(Home)``;
const DiaryWrite = styled(DiaryList)``;
const MyPageIcon = styled(DiaryList)``;
const ChattingIcon = styled(DiaryList)``;
const EventIcon = styled(DiaryList)``;

const MyPoint = styled.span`
    width: 60px;
    height: 22px;
    background: #ffffff;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 6px;

    div {
        color: #36466b;
        font-size: 12px;
        line-height: 15px;
    }

    img {
        margin: 0 3px;
        width: 14px;
    }
`;

const PointPopup = styled.div`
  width: 200px;
  position: absolute;
  margin-top: 3px;
  background-color: #959ebe;
  padding: 18px 10px 10px;
  border-radius: 5px;
  div {
    font-size: 7px; 
    line-height: 13px;
  }
  
  img {
    width: 10px;
    position: absolute;
    right: -15px;
    top: 6px;
  }
    
    
  
`;
const FeedbackIcon = styled(DiaryList)`
    border: none;
    margin-left: 6px;
`;
