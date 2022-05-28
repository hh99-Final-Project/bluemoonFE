import React, { useEffect, useState } from "react";
import useStore from "../zustand/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userApi } from "../apis/userApi";
import styled from "styled-components";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import CategoryBar from "../shared/CategoryBar";
import { Layout } from "../components/common";
import { lotteryWinIcon, check } from "../static/images/resources";
import { isMobile } from "react-device-detect";
import { useMediaQuery } from "react-responsive";
import {Helmet} from "react-helmet";

const LotteryWin = () => {
    const { setCurrentHeader } = useStore();
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState();
    const [isChecked, setIsChecked] = useState(false);

    const isMobileQuery = useMediaQuery({
        query: "(max-width: 420px)",
    });

    let phoneNumberCheck = /^[0-9]*$/;

    const onChange = (e) => {
        if (!phoneNumberCheck.test(e.target.value)) {
            return;
        }
        setPhoneNumber(e.target.value);
    };

    const onChangeCheck = (e) => {
        setIsChecked(e.target.checked);
    };

    const EnterInfo = () => {
        userApi.EnterInfo(phoneNumber, isChecked).then((response) => {
            if (response.status === 200) {
                navigate("/lottery");
            }
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
            <Helmet>
                <title>Bluemoon 이벤트 당첨</title>
                <meta name="description" content="bluemoon 이벤트 당첨" />
                <meta property="og:url" content="https://bluemoondiary.com/lotterywin"/>
            </Helmet>
            <Container>
                <Header />
                <CategoryBar />
                <ContentBox>
                    <LotteryWinIcon>
                        <img src={lotteryWinIcon} alt={"lottery-win-icon"} />
                    </LotteryWinIcon>
                    <Title>당첨을 축하합니다!</Title>
                    <Input
                        onChange={onChange}
                        value={phoneNumber}
                        placeholder={
                            isMobile || isMobileQuery
                                ? "휴대전화번호 11자리를 입력해주세요(숫자만)"
                                : "기프티콘을 받으실 휴대전화번호 11자리를 입력해주세요. (숫자 11자리 입력)"
                        }
                    />
                    <AgreementBox>
                        <AgreeTitle>개인정보 수집 및 이용 동의</AgreeTitle>

                        <StyledLabel checked={isChecked} htmlFor="checkbox">
                            <AgreeCheckbox
                                type="checkbox"
                                checked={isChecked}
                                onChange={onChangeCheck}
                                id="checkbox"
                                name="checkbox"
                            />
                        </StyledLabel>
                    </AgreementBox>

                    <AgreeDesc>
                        <div>
                            ㆍ입력받은 연락처는 기프티콘 전송을 위한 목적으로만 수집되며, 다른 용도로 사용되지 않습니다.
                        </div>
                        <br />
                        <div>ㆍ기프티콘 발송은 6월 2일 일괄 전송될 예정이며, 전송 직후 연락처는 즉시 파기됩니다.</div>
                    </AgreeDesc>

                    <SubmitButton onClick={onClick}>입력완료</SubmitButton>
                </ContentBox>
            </Container>
            <Footer />
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
    position: relative;
    z-index: 3;
    background: linear-gradient(180deg, rgba(63, 75, 112, 0.79) 0%, rgba(100, 114, 152, 0.79) 100%);
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0px 0px 70px #465981;
    backdrop-filter: blur(80px);
    border-radius: 25px;
    margin: auto;

    @media only screen and (max-width: 420px) {
        background: linear-gradient(180deg, rgba(14, 30, 80, 0.79) 0%, rgba(93, 102, 124, 0.79) 100%);
        border: 2px solid rgba(255, 255, 255, 0.3);
        box-shadow: 0px 0px 70px #465981;
        backdrop-filter: blur(80px);
        border-radius: 15px;

        width: 320px;
        height: 80vh;
    }
`;

const LotteryWinIcon = styled.div`
    margin: 83px 0 0 436px;

    @media only screen and (max-width: 420px) {
        margin: 100px auto 20px;
        text-align: center;

        img {
            width: 100px;
            margin: auto;
        }
    }
`;

const Title = styled.div`
    width: 190px;
    height: 30px;
    margin: 15px 0 0 385px;
    font-size: 24px;
    line-height: 30px;

    color: #ffffff;

    @media only screen and (max-width: 420px) {
        margin: auto;
    }
`;

const Input = styled.input`
    width: 645px;
    height: 38px;
    margin: 51px 0 0 152px;
    font-size: 18px;
    line-height: 23px;
    color: #08105d;
    padding-left: 21px;
    box-sizing: border-box;
    outline: none;
    border: none;
    background: #c6d3ec;
    border-radius: 5px;

    &::placeholder {
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        color: #43567e;
    }

    @media only screen and (max-width: 420px) {
        width: 280px;
        height: 30px;
        margin: 30px auto 40px;
        outline: none;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;

        &::placeholder {
            font-style: normal;
            font-weight: 400;
            font-size: 8px;
            line-height: 12px;
            color: #43567e;
        }
    }
`;

const AgreementBox = styled.div`
    width: 645px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 66px auto 17px;

    @media only screen and (max-width: 420px) {
        width: 280px;
        margin: 0 auto 20px;
    }
`;

const AgreeTitle = styled.div`
    font-size: 15px;
    line-height: 19px;
    color: #ffffff;
    margin-right: 6px;

    @media only screen and (max-width: 420px) {
        font-size: 14px;
        line-height: 16px;
        margin-right: 10px;
        text-align: center;
    }
`;

const AgreeCheckbox = styled.input`
    appearance: none;
    width: 17px;
    height: 17px;
    background-color: white;

    &:checked {
        background-image: url(${check});
        background-size: auto;
        background-position: 50%;
        background-repeat: no-repeat;
        background-color: white;
    }

    @media only screen and (max-width: 420px) {
        width: 14px;
        height: 14px;
    }
`;

const StyledLabel = styled.label`
    width: 17px;
    height: 17px;
`;

const AgreeDesc = styled.div`
    font-size: 12px;
    line-height: 15px;
    color: rgba(198, 211, 236, 0.8);
    width: 650px;
    margin: auto;

    @media only screen and (max-width: 420px) {
        font-size: 10px;
        width: 280px;
        text-align: left;
        margin: auto;
    }
`;

const SubmitButton = styled.div`
    box-sizing: border-box;

    position: absolute;
    width: 179px;
    height: 49px;
    left: 387px;
    bottom: 35px;

    border: 1px solid #c4c4c4;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex;
    color: #c4c4c4;

    @media only screen and (max-width: 420px) {
        left: 70px;
        bottom: 40px;
    }
`;
