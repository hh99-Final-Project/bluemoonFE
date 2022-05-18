import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import styled from "styled-components";
import { userApi } from "../apis/userApi";
import Popup from "../shared/Popup";
import CategoryBar from "../shared/CategoryBar";
import useStore from "../zustand/store";
import Header from "../shared/Header";
import { Layout } from "../components/common";
import { color } from "../utils/designSystem";
import ResultPopup from "../components/common/ResultPopup";
import Main from "./Main";
import { useSelector } from "react-redux";

function SignUp() {
    const [nickName, setNickName] = useState("");
    const [isValidNickName, setIsValidNickName] = useState(null);
    const [recommender, setRecommender] = useState("");

    const { setCurrentHeader } = useStore();
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [isOpenResultPopup, setIsOpenResultPopup] = useState(false);

    const userInfo = useSelector((state) => state.userSlice.userInfo);

    const navigate = useNavigate();

    const onChange = (e) => {
        setNickName(e.target.value);
    };

    const onChangeRecommender = (e) => {
        setRecommender(e.target.value);
    };

    const debounce = _.debounce((nickName) => {
        if (nickName === "") {
            setIsValidNickName(null);
            return;
        }
        // 정규 표현식 영문,한글,숫자 포함 1~10글자
        const result = /^[a-zA-zㄱ-힣0-9]{1,10}$/.test(nickName);
        //통과하지 않았을 때는 사용할 수 없는 닉네임이라고 안내하고, 시작하기 버튼 비활성화
        if (result) {
            userApi.nickNameCheck(nickName).then((response) => {
                console.log(response);

                if (response.data === true) {
                    setIsValidNickName(true);
                } else {
                    setIsValidNickName(false);
                }
            });
        } else {
            setIsValidNickName(false);
        }
    }, 200);

    // useCallback 은 ?
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
            console.log(response);
            setIsOpenPopup(false);
            setIsOpenResultPopup(true);
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

    useEffect(() => {
        nickNameCheckDB(nickName);
    }, [nickName]);

    // nickname 있는 유저가 signup 들어올 경우 Main 으로 이동시킴
    if (userInfo?.nickname !== "") {
        return <Main />;
    }

    return (
        <Layout>
            <Container>
                <Header />
                <CategoryBar />
                <SignUpBox BgColor={color.containerBoxColor}>
                    <SignUpBoxTitle>사용하실 닉네임을 입력해주세요</SignUpBoxTitle>
                    <NickNameInput
                        placeholder="1~10자 이내로 입력해주세요. (특수문자, 공백 불가)"
                        onChange={onChange}
                        value={nickName}
                        required
                    ></NickNameInput>
                    {/* 삼항연산자를 사용하려 했으나, nickname 값이 없을 때 '사용하실 닉네임 입력해주세요' 와 '사용 불가능한 닉네임입니다' 2개 모두 띄워지는 문제 발생 */}
                    {nickName === "" && <NickNameCheckResult>사용하실 닉네임을 입력해주세요</NickNameCheckResult>}
                    {isValidNickName && <NickNameCheckResult>사용 가능한 닉네임입니다</NickNameCheckResult>}
                    {isValidNickName === false && <NickNameCheckResult>사용 불가능한 닉네임입니다</NickNameCheckResult>}
                    ;<RecommendPerson>추천인 닉네임 입력(선택사항)</RecommendPerson>
                    <RecommendPersonInput onChange={onChangeRecommender} value={recommender}></RecommendPersonInput>
                    <Button isValid={isValidNickName} onClick={onClickHandler}>
                        시작하기
                    </Button>
                    <QuestionButton>?</QuestionButton>
                    <ServiceDescription>서비스 설명</ServiceDescription>
                </SignUpBox>

                {isOpenPopup && (
                    <Popup
                        title={"한 번 적은 닉네임은/수정할 수 없습니다./이 닉네임이 맞습니까?"}
                        close={() => setIsOpenPopup(false)}
                        event={saveNickNameDB}
                        padding={"30px"}
                    />
                )}
                {isOpenResultPopup && (
                    <ResultPopup title={"다이어리에 닉네임을 성공적으로 적었습니다!"} close={closeResultPopup} />
                )}
            </Container>
        </Layout>
    );
}

export default SignUp;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
`;

const SignUpBox = styled.div`
    width: 950px;
    height: 530px;
    background: ${(props) => props.BgColor};
    border: 2px solid #ffffff4d;
    box-shadow: 0 0 70px #465981;

    border-radius: 25px;

    position: relative;
    margin: auto;
`;

const SignUpBoxTitle = styled.div`
    position: absolute;
    width: 946px;
    height: 52px;
    top: 54px;
    left: 2px;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #2f3a5f;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    text-align: center;

    color: #ffffff;
`;

const NickNameInput = styled.input`
    position: absolute;
    width: 539.47px;
    height: 40.85px;
    display: block;
    top: 173px;
    left: 205px;

    background: rgba(198, 211, 236, 0.8);
    border-radius: 5px;

    &::placeholder {
        font-family: "Spoqa Han Sans Neo";
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;

        text-align: center;

        color: #43567e;
    }

    &::value {
        position: absolute;
        padding-top: 12px;
        padding-left: 23px;
    }

    &:focus {
        border: 1px solid #333333;
    }
`;

const NickNameCheckResult = styled.div`
    position: absolute;
    width: 250px;
    height: 18px;
    top: 222px;
    left: 232px;

    display: block;

    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    color: #959ebe;
`;

const RecommendPerson = styled.div`
    position: absolute;
    width: 255px;
    height: 22px;
    display: flex;
    top: 284px;
    left: 205px;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 23px;

    color: #ffffff;
`;

const RecommendPersonInput = styled.input`
    position: absolute;
    width: 539.47px;
    height: 40.85px;
    display: block;
    top: 314px;
    left: 205px;

    background: rgba(198, 211, 236, 0.8);
    border-radius: 5px;
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
    // // 정확히 가운데로 옴
    // transform: translate(-50%, 0);

    font-family: "Inter";
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

const ServiceDescription = styled.div`
    position: absolute;
    width: 173.02px;
    height: 31.46px;
    bottom: -10px;
    right: -160px;

    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    text-align: center;

    color: #ffffff;
`;
