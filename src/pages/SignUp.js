import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import styled from "styled-components";
import { userApi } from "../apis/userApi";
import Popup from "../shared/Popup";
import CategoryBar from "../shared/CategoryBar";
import useStore from "../zustand/store";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import { Layout, ResultPopup, MobileTitleName } from "../components/common";
import { color } from "../utils/designSystem";
import Main from "./Main";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { crescent, line } from "../static/images/resources";
import { setUserNickname, setUserPoint } from "../redux/modules/userSlice";
import SignUpInput from "../components/user/SignUpInput";
import RecommendInput from "../components/user/RecommendInput";

function SignUp() {
    const [nickName, setNickName] = useState("");
    const [isValidNickName, setIsValidNickName] = useState(null);
    const [recommender, setRecommender] = useState("");

    const { setCurrentHeader } = useStore();
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [isOpenResultPopup, setIsOpenResultPopup] = useState(false);

    const userInfo = useSelector((state) => state.userSlice.userInfo);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isMobile = useMediaQuery({
        query: "(max-width: 420px)",
    });

    const debounce = _.debounce((nickName) => {
        userApi.nickNameCheck(nickName).then((response) => {
            if (response.data === true) {
                setIsValidNickName(true);
            } else {
                setIsValidNickName(false);
            }
        });
    }, 50);

    const nickNameCheckDB = useCallback(debounce, []);

    const onClickHandler = () => {
        if (nickName === "") {
            window.alert("닉네임을 입력해주세요");
            return;
        }
        setIsOpenPopup(true);
    };


    const saveNickNameDB = () => {
        userApi.saveNickName(nickName, recommender).then((response) => {
            if (response.status === 200) {
                setIsOpenPopup(false);
                setIsOpenResultPopup(true);
                dispatch(setUserNickname(nickName));
                dispatch(setUserPoint(response.data.myPoint));
            }
        });
    };

    const closeResultPopup = () => {
        setIsOpenResultPopup(false);
        navigate("/");
    };

    useEffect(() => {
        setIsValidNickName(null);
        setCurrentHeader("홈");
    }, []);

    // if (userInfo?.nickname !== "") {
    //     return <Main />;
    // }

    return (
        <Layout>
            <Container>
                <Header />
                {!isMobile ? <CategoryBar /> : <MobileTitleName title={"회원가입"} />}

                <SignUpBox BgColor={color.containerBoxColor}>
                    {isMobile && <Crescent src={crescent}/>}
                    <SignUpBoxTitle>사용하실 닉네임을 적어주세요</SignUpBoxTitle>
                    {isMobile && <TitleLine/>}
                    <SignUpInput
                        nickName={nickName}
                        setIsValidNickName={setIsValidNickName}
                        setNickName={setNickName}
                        nickNameCheckDB={nickNameCheckDB}
                    />
                    {isValidNickName === null && (
                        <NickNameCheckResult>사용하실 닉네임을 입력해주세요</NickNameCheckResult>
                    )}
                    {isValidNickName === true && <NickNameCheckResult>사용 가능한 닉네임입니다</NickNameCheckResult>}
                    {isValidNickName === false && <NickNameCheckResult>사용 불가능한 닉네임입니다</NickNameCheckResult>}

                    <RecommendPerson>추천인 닉네임 입력(선택사항)</RecommendPerson>

                    {isMobile && <RecommendPersonLine/>}
                    <RecommendInput recommender={recommender} setRecommender={setRecommender}/>
                    <Button isValid={isValidNickName} onClick={onClickHandler}>
                        시작하기
                    </Button>
                </SignUpBox>

                {isOpenPopup && (
                    <Popup
                        title={"한 번 적은 닉네임은/수정할 수 없습니다./이 닉네임이 맞습니까?"}
                        close={() => setIsOpenPopup(false)}
                        event={saveNickNameDB}
                        padding={"30px"}
                    />
                )}
                {isOpenResultPopup && <ResultPopup title={"닉네임 저장에 성공했습니다!"} close={closeResultPopup} />}
            </Container>
            <Footer />
        </Layout>
    );
}

export default SignUp;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;

    @media only screen and (max-width: 420px) {
        width: 320px;
        margin: auto;
    }
`;

const SignUpBox = styled.div`
    box-sizing: border-box;
    width: 950px;
    height: 530px;
    background: ${(props) => props.BgColor};
    border: 2px solid #ffffff4d;
    box-shadow: 0 0 70px #465981;
    backdrop-filter: blur(80px);
    z-index: 3;
    border-radius: 25px;

    position: relative;
    margin: auto;

    @media only screen and (max-width: 420px) {
        width: 320px;
        height: 77vh;

        border-radius: 15px;
    }
`;

const Crescent = styled.img`
    margin: 15vh auto 0;
    display: block;
`;

const SignUpBoxTitle = styled.div`
    position: absolute;
    width: 100%;
    height: 52px;
    top: 54px;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #2f3a5f;
    font-size: 20px;
    line-height: 25px;
    text-align: center;

    color: #ffffff;

    @media only screen and (max-width: 420px) {
        position: static;
        width: auto;
        height: auto;
        margin: 8vh auto 0;

        background-color: transparent;

        font-size: 14px;
        line-height: 18px;
    }
`;

const TitleLine = styled.div`
    border: 1px solid #ffffff;
    width: 185px;
    margin: 0.1vh auto 0;
`;

const NickNameCheckResult = styled.div`
    position: absolute;
    width: 250px;
    height: 18px;
    top: 222px;
    left: 232px;
    display: block;
    font-size: 16px;
    line-height: 19px;
    color: #959ebe;

    @media only screen and (max-width: 420px) {
        width: 187px;
        height: auto;
        position: static;
        margin: 0.4vh auto 0;

        font-size: 8px;
        line-height: 10px;

        color: #9aebe7;
    }
`;

const RecommendPerson = styled.div`
    position: absolute;
    width: 280px;
    height: 22px;
    display: flex;
    top: 284px;
    left: 205px;
    font-size: 18px;
    line-height: 23px;

    color: #ffffff;

    display: flex;
    flex-direction: column;

    p {
        font-style: normal;
        font-weight: 200;
        font-size: 12px;
        line-height: 15px;
    }

    @media only screen and (max-width: 420px) {
        width: auto;
        height: auto;
        top: 340px;
        left: 68px;
        background-color: transparent;
        font-size: 14px;
        line-height: 18px;

        position: static;
        margin: 5vh auto 0;
        justify-content: center;
    }
`;

const RecommendPersonLine = styled.div`
    border: 1px solid #ffffff;
    width: 185px;
    margin: 0.1vh auto 0;
`;

const RecommendPersonInput = styled.input`
    position: absolute;
    width: 539.47px;
    height: 40.85px;
    display: block;
    top: 315px;
    left: 205px;
    outline: none;
    border: none;
    padding-left: 21px;

    background: rgba(198, 211, 236, 0.8);
    border-radius: 5px;

    &::placeholder {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        text-align: center;
        color: #43567e;
    }

    @media only screen and (max-width: 420px) {
        width: 164px;
        height: 41px;
        position: static;
        margin: 2vh auto 0;
    }
`;

const Button = styled.button`
    width: 395px;
    height: 40px;

    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.1);
    border: ${(props) => (props.isValid ? "1px solid #9AEBE7" : "2px solid #08105D")};
    border-radius: 10px;
    pointer-events: ${(props) => (props.isValid ? "auto" : "none")};

    position: absolute;
    bottom: 54px;
    left: 278px;

    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: ${(props) => (props.isValid ? "#91dddd" : "#08105D")};
    cursor: pointer;

    &:hover {
        background-color: #cffdfd;
        border: 2px solid rgba(41, 50, 82, 0.71);
        box-shadow: inset 0px 4px 15px rgba(0, 0, 0, 0.5);
        color: #293252;
    }

    @media only screen and (max-width: 420px) {
        width: 150px;
        height: 35px;
        position: static;
        margin: 8vh auto 0;

        border-radius: 9px;

        font-size: 14px;
        line-height: 18px;
    }
`;

const QuestionButton = styled.button`
    box-sizing: border-box;

    position: absolute;
    width: 51.29px;
    height: 51.29px;
    bottom: 30px;
    right: -100px;

    background: #91dddd;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 25px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5);

    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 48px;
    text-align: center;
    color: #ffffff;

    cursor: pointer;
`;
