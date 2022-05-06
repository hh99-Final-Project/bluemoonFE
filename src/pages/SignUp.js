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
import Header2 from "../shared/Header2";

SignUp.propTypes = {};

function SignUp(props) {
    const [nickName, setNickName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isValidNickName, setIsValidNickName] = useState(null);
    const [isOpenPopup, setIsOpenPopup] = useState(false);

    const navigate = useNavigate();
    const { currentHeader, setCurrentHeader } = useStore();

    const onChange = (e) => {
        setNickName(e.target.value);
    };

    const debounce = _.debounce((nickName) => {
        setIsLoading(true);
        // 정규 표현식 영문,한글,숫자 포함 1~10글자
        const result = /^[a-zA-zㄱ-힣0-9]{1,10}$/.test(nickName);
        if (result) {
            userApi.nickNameCheck(nickName).then((response) => {
                console.log(response.data);
                console.log(typeof response.data);
                if (response.data === true) {
                    setIsValidNickName(true);
                } else {
                    setIsValidNickName(false);
                }
            });
            setIsLoading(false);
        }
    }, 1000);

    const nickNameCheckDB = React.useCallback(debounce, []);

    const onClickHandler = () => {
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
        nickNameCheckDB(nickName);

        setCurrentHeader("홈");
    }, [nickName]);

    return (
        <React.Fragment>
            <Container>
                <Header2 />
                <CategoryBar />
                <SignUpBOx>
                    <SignUpBOxTitle>사용하실 닉네임을 입력해주세요</SignUpBOxTitle>

                    <Input placeholder="1~10자 이내로 입력해주세요. (특수문자, 공백 불가)" onChange={onChange}></Input>
                    {nickName === "" && <NickNameCheckResult>사용하실 닉네임을 입력해주세요</NickNameCheckResult>}
                    {isLoading === true && <NickNameCheckResult></NickNameCheckResult>}
                    {isValidNickName === true && <NickNameCheckResult>사용 가능한 닉네임입니다</NickNameCheckResult>}
                    {isValidNickName === false && <NickNameCheckResult>사용 불가능한 닉네임입니다</NickNameCheckResult>}
                    <Button isvalid={isValidNickName} onClick={onClickHandler}>
                        닉네임 저장하고 시작하기
                    </Button>
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
    margin: auto;
    // display: flex;
    // flex-direction: column;

    align-items: center;
    background: linear-gradient(180deg, rgba(63, 75, 112, 0.79) 0%, rgba(100, 114, 152, 0.79) 100%);
    border: 2px solid #ffffff4d;
    border-radius: 25px;
    box-shadow: 0 0 70px #465981;

    position: relative;
`;

const SignUpBOxTitle = styled.div`
    width: 946px;
    height: 52px;

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

const Input = styled.input`
    height: 60px;
    width: 539px;
    border-radius: 5px;

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
    margin: 10px 0;
    height: 60px;
    width: 539px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    color: #959ebe;
`;

const Button = styled.button`
    background-color: ${(props) => (props.isvalid === true ? "blue" : "gray")};
    pointer-events: ${(props) => (props.isvalid === true ? "auto" : "none")};
    color: #ffffff;
    border: none;
    border-radius: 10px;
    position: absolute;
    bottom: 20px;
    left: 50%;
    // 정확히 가운데로 옴
    transform: translate(-50%, 0);
`;
