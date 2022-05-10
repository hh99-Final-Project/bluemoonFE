import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import _ from "lodash";
import styled from "styled-components";
import { Text } from "../elements/index";
import { userApi } from "../apis/userApi";
import Popup from "../shared/Popup";
import CategoryBar from "../shared/CategoryBar";
import useStore from "../zustand/store";
import Header from "../shared/Header";

SignUp.propTypes = {};

function SignUp(props) {
    const [nickName, setNickName] = useState("");
    const [isValidNickName, setIsValidNickName] = useState(null);
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const navigate = useNavigate();
    const { setCurrentHeader } = useStore();
    const [isLoading, setIsLoading] = useState(null);

    const onChange = (e) => {
        setNickName(e.target.value);
    };

    const debounce = _.debounce((nickName) => {
        if (nickName === "") {
            return;
        }
        // 정규 표현식 영문,한글,숫자 포함 1~10글자
        const result = /^[a-zA-zㄱ-힣0-9]{1,10}$/.test(nickName);
        //통과하지 않았을때의 에러처리에 대한것은 기획에 없을까용? 없다면 디자인과 의논해서 있어야할 것 같아용 else로
        if (result) {
            userApi.nickNameCheck(nickName).then((response) => {
                if (response.data === true) {
                    setIsValidNickName(true);
                } else {
                    setIsValidNickName(false);
                }
            });
        } else {
            setIsValidNickName(false);
        }
    }, 1000);

    //import React, {useCallback} ~ 을 추가하면 React 생략 가능해요~!
    const nickNameCheckDB = React.useCallback(debounce, []);

    const onClickHandler = () => {
        if (nickName === "") {
            window.alert("닉네임을 입력해주세요");
            return;
        }
        setIsOpenPopup(true);
    };

    const saveNickNameDB = () => {
        userApi.saveNickName(nickName).then((response) => {
            console.log(response);
        });
        navigate(-1);
    };

    useEffect(() => {
        setIsValidNickName(null);
        setCurrentHeader("홈");
    }, []);

    useEffect(() => {
        nickNameCheckDB(nickName);
    }, [nickName]);

    return (
        <React.Fragment>
            <Container>
                <Header />
                <CategoryBar />
                <SignUpBOx>
                    <SignUpBoxTitle>사용하실 닉네임을 입력해주세요</SignUpBoxTitle>

                    <NickNameInput
                        placeholder="1~10자 이내로 입력해주세요. (특수문자, 공백 불가)"
                        onChange={onChange}
                    ></NickNameInput>

                    {/* {!isValidNickName ? (
                        <NickNameCheckResult>사용 불가능한 닉네임입니다</NickNameCheckResult>
                    ) : (
                        <NickNameCheckResult>사용 가능한 닉네임입니다</NickNameCheckResult>
                    )} */}
                    {nickName === "" && <NickNameCheckResult>사용하실 닉네임을 입력해주세요</NickNameCheckResult>}
                    {isValidNickName === true && <NickNameCheckResult>사용 가능한 닉네임입니다</NickNameCheckResult>}
                    {isValidNickName === false && <NickNameCheckResult>사용 불가능한 닉네임입니다</NickNameCheckResult>}

                    <RecommendPerson>추천인 코드 입력(선택사항)</RecommendPerson>
                    <RecommendPersonInput></RecommendPersonInput>
                    <Button isvalid={isValidNickName} onClick={onClickHandler}>
                        시작하기
                    </Button>

                    <QuestionButton>?</QuestionButton>
                    <ServiceDescription>서비스 설명</ServiceDescription>
                </SignUpBOx>

                {isOpenPopup && (
                    <Popup
                        title={"닉네임은 한번 설정하면 바꿀 수 없습니다. 계속 진행하시겠습니까?"}
                        close={() => setIsOpenPopup(false)}
                        event={saveNickNameDB}
                    />
                )}
            </Container>
        </React.Fragment>
    );
}

export default SignUp;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #111b3f;
    overflow: hidden;
`;

const SignUpBOx = styled.div`
    width: 950px;
    height: 530px;

    background: linear-gradient(180deg, rgba(63, 75, 112, 0.79) 0%, rgba(100, 114, 152, 0.79) 100%);
    border: 2px solid #ffffff4d;
    box-shadow: 0 0 70px #465981;

    border-radius: 25px;

    position: relative;
    margin: auto;
`;

const SignUpBoxTitle = styled.div`
    width: 950px;
    height: 50px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin: 50px 0 0 0;
    color: #ffffff;
    background-color: #2f3a5f;

    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
`;

const NickNameInput = styled.input`
    height: 60px;
    width: 540px;
    border-radius: 5px;
    display: block;
    margin: 50px auto 0;
    box-sizing: border-box;
    border: 1px solid #bbb;
    background: #b2bad5;
    border-radius: 5px;

    &::placeholder {
        font-family: "Inter";
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
        text-align: center;

        color: #787878;
    }
    &:focus {
        border: 1px solid #333333;
    }
`;

const NickNameCheckResult = styled.div`
    margin: 10px auto;
    height: 60px;
    width: 540px;
    display: block;
    margin: 10px auto;

    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    color: #959ebe;
`;

const RecommendPerson = styled.div`
    width: 404.61px;
    height: 28.53px;
    display: block;
    margin: 10px auto;

    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;

    color: #ffffff;

    position: absolute;
    bottom: 200px;
    left: 204px;
`;

const RecommendPersonInput = styled.input`
    height: 40px;
    width: 540px;
    border-radius: 5px;
    display: block;
    box-sizing: border-box;
    border: 1px solid #bbb;
    background: #b2bad5;
    border-radius: 5px;

    &::placeholder {
        font-family: "Inter";
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
        text-align: center;

        color: #787878;
    }
    &:focus {
        border: 1px solid #333333;
    }

    position: absolute;
    bottom: 160px;
    left: 204px;
`;

const Button = styled.button`
    width: 461px;
    height: 52px;

    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.1);
    border: 2px solid #84c8cc;
    border-radius: 10px;
    // pointer-events: ${(props) => (props.isvalid === true ? "auto" : "none")};

    position: absolute;
    bottom: 20px;
    left: 50%;
    // 정확히 가운데로 옴
    transform: translate(-50%, 0);

    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #91dddd;

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
