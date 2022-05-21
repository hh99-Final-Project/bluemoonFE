import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import useStore from "../zustand/store";
import Modal from "react-modal";
import {
    mobHomeIcon, mobListIcon, mobWriteIcon, mobMyPageIcon,
    mobChatIcon, mobEventIcon, mobFeedbackIcon, mobHeaderBackIcon, mobMyPointBluemoon
} from "../static/images/resources";
import useMovePage from "../hooks/useMovePage";


const MobileCategoryBar = () => {

    const { setMobileHeader, isHeaderMenuOpen } = useStore();
    const { moveToPage } = useMovePage();
    const isLogin = useSelector(((state) => state.userSlice.isLogin));
    const userInfo = useSelector(((state) => state.userSlice.userInfo));


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
                        overflow: "hidden"
                        // transition: "all 3s linear"

                    },
                }}>
                <MenuContentBox>
                    <MenuArea>
                        <div>메뉴</div>
                        <img onClick={() => setMobileHeader()} src={mobHeaderBackIcon}/>
                    </MenuArea>
                    <LoginArea>
                        {isLogin ?
                            <UserInfoArea>
                                <NickNameArea>{userInfo.nickname}님</NickNameArea>
                                <PointArea>
                                    <img src={mobMyPointBluemoon}/>
                                    <span>{userInfo.myPoint}</span>
                                </PointArea>
                            </UserInfoArea>
                            : <NotLogined>로그인을 해주세요</NotLogined>
                        }

                    </LoginArea>
                    <HeaderContent>
                        <Home>
                            <img src={mobHomeIcon}/>
                            <div onClick={() => moveToPage("/")}>시작 홈</div>
                        </Home>
                        <DiaryList>
                            <img src={mobHomeIcon}/>
                            <div onClick={() => moveToPage("/diarylist")}>고민 상담소</div>
                        </DiaryList>
                        <DiaryWrite>
                            <img src={mobHomeIcon}/>
                            <div onClick={() => moveToPage("/write")}>고민 접수</div>
                        </DiaryWrite>
                        <MyPageIcon>
                            <img src={mobHomeIcon}/>
                            <div onClick={() => moveToPage("/mypage")}>마이 페이지</div>
                        </MyPageIcon>
                        <ChattingIcon>
                            <img src={mobHomeIcon}/>
                            <div onClick={() => moveToPage("/chatlist")}>1:1 대화</div>
                        </ChattingIcon>
                        <EventIcon>
                            <img src={mobHomeIcon}/>
                            <div onClick={() => moveToPage("/lottery")}>이벤트</div>
                        </EventIcon>
                    </HeaderContent>
                    <FeedbackIcon>
                        <img src={mobHomeIcon}/>
                        <div>피드백 주기</div>
                    </FeedbackIcon>

                </MenuContentBox>
            </Modal>
        </React.Fragment>
    );
};


export default MobileCategoryBar;

const MenuContentBox  = styled.div`
  position: relative;
  height: 100%;
`;
const MenuArea  = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 37px 0 27px;
  padding: 0 21px 0 18px;
  
  div {
    font-size: 20px;
    line-height: 24px;
    color: #354569;
  }
  
  img {
    cursor: pointer;
  }
`;
const LoginArea  = styled.div`
  width: 100%;
  height: 65px;
  background-color: #959EBE;
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
  font-size: 20px;
  line-height: 24px;
  color: #354569;
  margin-right: 7px;
  padding-top: 2px;
`;

const PointArea = styled.div`
  width: 72px;
  height: 24px;
  background: #FFFFFF;
  border-radius: 5px;
  font-size: 15px;
  line-height: 19px;
  color: #9AEBE7;
  display: flex;
  align-items: center;
  justify-items: center;
  padding-left: 10px;
  box-sizing: border-box;
  
  img {
    margin-right: 10px;
  }
`;

const NotLogined = styled.div`
  font-size: 20px;
  line-height: 24px;
  color: #354569;
`;

const HeaderContent  = styled.div`
  margin-left: 6px;
`;
const Home = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 185px;
  height: 56px;
  border-bottom: 1px solid #959EBE;
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
const DiaryList = styled(Home)`
    
`;
const DiaryWrite = styled(DiaryList)``;
const MyPageIcon = styled(DiaryList)``;
const ChattingIcon = styled(DiaryList)``;
const EventIcon = styled(DiaryList)``;
const FeedbackIcon = styled(DiaryList)`
  border: none;
  position: absolute;
  height: 24px;
  bottom: 80px;
  left: 6px;
`;
