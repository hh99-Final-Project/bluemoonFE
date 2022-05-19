import React, { useEffect, useState } from "react";
import useStore from "../zustand/store";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { userApi } from "../apis/userApi";

import styled from "styled-components";

import Header from "../shared/Header";
import CategoryBar from "../shared/CategoryBar";
import { Layout } from "../components/common";
import { lotteryWinIcon, check } from "../static/images/resources";

const LotteryWin = () => {
    const { setCurrentHeader } = useStore();
    const userInfo = useSelector((state) => state.userSlice.userInfo);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const onChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const onChangeCheck = (e) => {
        console.log(e.target.checked);
        setIsChecked(e.target.checked);
    };

    console.log(typeof phoneNumber);
    // console.log(phoneNumber);
    // console.log(phoneNumber.length);
    // console.log(phoneNumber.length !== 11);
    console.log(isChecked);

    const EnterInfo = () => {
        userApi.EnterInfo(phoneNumber, isChecked).then((response) => {
            console.log(response);
            Navigate(-1);
        });
    };

    const onClick = () => {
        if (phoneNumber.length !== 11) {
            window.alert("전화번호 11자리를 모두 입력해주세요");
            return;
        }
        if (isChecked === false) {
            window.alert("개인정보 수집 및 이용 동의는 필수입니다");
            return;
        }
        EnterInfo();
    };

    useEffect(() => {
        setCurrentHeader("추첨");
    }, []);

    return (
        <Layout>
            <Container>
                <Header />
                <CategoryBar />
                <ContentBox>
                    <LotteryWinIcon>
                        <img src={lotteryWinIcon}></img>
                    </LotteryWinIcon>
                    <Title>당첨을 축하합니다!</Title>
                    <Input
                        onChange={onChange}
                        value={phoneNumber}
                        placeholder="기프티콘을 받으실 휴대전화번호 11자리를 입력해주세요. (숫자 11자리 입력)"
                    />
                    <AgreeTitle>개인정보 수집 및 이용 동의</AgreeTitle>

                    <StyledLabel checked={isChecked} htmlFor="checkbox">
                        <AgreeCheckbox
                            type="checkbox"
                            checked={isChecked}
                            onChange={onChangeCheck}
                            id="checkbox"
                            name="checkbox"
                        ></AgreeCheckbox>
                    </StyledLabel>

                    <AgreeDesc>
                        ㆍ입력받은 연락처는 기프티콘 전송을 위한 목적으로만 수집되며, 다른 용도로 사용되지 않습니다.
                        <br />
                        ㆍ기프티콘 발송은 4월00일 일괄 전송될 예정이며, 전송 직후 연락처는 즉시 파기됩니다.
                    </AgreeDesc>

                    <SubmitButton onClick={onClick}>입력완료</SubmitButton>
                </ContentBox>
            </Container>
        </Layout>
    );
};

export default LotteryWin;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
`;

const ContentBox = styled.div`
    width: 950px;
    height: 530px;

    background: linear-gradient(180deg, rgba(63, 75, 112, 0.79) 0%, rgba(100, 114, 152, 0.79) 100%);
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0px 0px 70px #465981;
    backdrop-filter: blur(80px);

    border-radius: 25px;

    margin: auto;
`;

const LotteryWinIcon = styled.div`
    margin: 83px 0 0 436px;
`;

const Title = styled.div`
    width: 190px;
    height: 30px;
    margin: 15px 0 0 385px;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 30px;

    color: #ffffff;
`;

const Input = styled.input`
    width: 645px;
    height: 38px;
    margin: 51px 0 0 152px;

    background: #c6d3ec;
    border-radius: 5px;

    &::placeholder {
        font-family: "Spoqa Han Sans Neo";
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;

        color: #43567e;

        position: absolute;
        top: 9px;
        left: 21px;
    }
    &:focus {
        border: 1px solid #333333;
    }
`;

const AgreeTitle = styled.div`
    position: absolute;
    top: 328px;
    left: 153px;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 19px;

    color: #ffffff;
`;

const AgreeCheckbox = styled.input`
    appearance: none;
    // position: absolute;
    width: 17px;
    height: 17px;
    // top: 328px;
    // left: 330px;
    background-color: white;

    &:checked {
        background-image: url(${check});
        background-size: auto;
        background-position: 50%;
        background-repeat: no-repeat;
        background-color: white;
    }
`;

const StyledLabel = styled.label`
    position: absolute;
    width: 17px;
    height: 17px;
    top: 328px;
    left: 330px;
`;

const AgreeDesc = styled.div`
    position: absolute;
    top: 362px;
    left: 149px;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;

    color: rgba(198, 211, 236, 0.8);
`;

const SubmitButton = styled.div`
    box-sizing: border-box;

    position: absolute;
    width: 179px;
    height: 49px;
    left: 387px;
    bottom: 35px;

    // background: #444d69;
    border: 1px solid #c4c4c4;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex;
    color: #c4c4c4;
`;
