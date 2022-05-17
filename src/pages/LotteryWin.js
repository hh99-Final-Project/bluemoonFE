import React, { useEffect, useState } from "react";
import useStore from "../zustand/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Header from "../shared/Header";
import CategoryBar from "../shared/CategoryBar";
import { Layout } from "../components/common";
import { lotteryWinIcon } from "../static/images/resources";

const LotteryWin = () => {
    const { setCurrentHeader } = useStore();
    const userInfo = useSelector((state) => state.userSlice.userInfo);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [isChecked, setIsChecked] = useState(false);

    const onChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const onChangeCheck = (e) => {
        console.log(e.target.checked);
        setIsChecked(e.target.checked);
    };

    const debounce = _.debounce((phoneNumber) => {
        if (phoneNumber === "") {
            return;
        }
        // 정규 표현식 숫자 10~11글자
        const result = /^[0-9]{10,11}$/.test(phoneNumber);
        //통과하지 않았을 때 에러처리
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
                        placeholder="기프티콘을 전송받으실 연락처를 입력해주세요. (휴대전화 숫자만 입력)"
                        onChange={onChange}
                        value={phoneNumber}
                    ></Input>
                    <AgreeTitle>개인정보 수집 동의</AgreeTitle>
                    <AgreeCheck type="checkbox" checked={isChecked} onChange={onChangeCheck}></AgreeCheck>
                    <AgreeDesc>
                        ㆍ입력받은 연락처는 기프티콘 전송을 위한 목적으로만 수집되며, 절대 다른 용도로 사용되지
                        않습니다. ㆍ기프티콘 발송은 00월00일 일괄 전송될 예정이며, 전송 직후 연락처는 즉시 파기됩니다.
                    </AgreeDesc>

                    <SubmitButton>입력완료</SubmitButton>
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

    // position: relative;
    margin: auto;
`;

const LotteryWinIcon = styled.div`
    display: flex;
    justify-content: center;
    margin: 83px 0 0 0;
`;

const Title = styled.div`
    position: absolute;
    width: 198px;
    height: 31px;
    top: 141px;
    left: 385px;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    line-height: 31px;

    color: #ffffff;
`;

const Input = styled.input`
    width: 645px;
    height: 38px;
    margin: 50px 0 0 152px;
    background: #acb9d5;
    border-radius: 5px;

    &::placeholder {
        font-family: "Spoqa Han Sans Neo";
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 23px;

        color: #43567e;

        position: absolute;
        top: 8px;
        left: 21px;
    }
    &:focus {
        border: 1px solid #333333;
    }
`;

const AgreeTitle = styled.div`
    position: absolute;
    width: 119px;
    height: 17px;
    top: 328px;
    left: 153px;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 19px;

    color: #ffffff;
`;

const AgreeCheck = styled.input`
    position: absolute;
    width: 17px;
    height: 17px;
    top: 328px;
    left: 281px;
`;

const AgreeDesc = styled.div`
    position: absolute;
    width: 546px;
    height: 37px;
    top: 362px;
    left: 149px;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;

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
