import React from "react";
import styled from "styled-components";
import { color } from "../utils/designSystem";
import { footerLogo } from "../static/images/resources";

Footer.propTypes = {};

function Footer(props) {
    return (
        <Container bgColor={color.backgroundColor}>
            <img src={footerLogo}></img>
            <div>
                <Fe>
                    Front-End
                    <a href="https://github.com/hyemigwak">곽혜미</a>
                    <a href="https://github.com/lee-chun-91">이춘</a>
                </Fe>
                <Be>
                    Back-End
                    <a href="https://github.com/TodayIsYolo">김승민</a>
                    <a href="https://github.com/jaeyoungjang2">장재영</a>
                    <a href="https://github.com/cbjjzzang">최봉진</a>
                </Be>
                <Ui>
                    UI/UX Designer
                    <a href="mailto:dl3279@naver.com">김지희</a>
                    <a href="mailto:pyl7284@gmail.com">박유리</a>
                </Ui>
            </div>

            <Copyright>Copyright 2022 bluemoon All rights Reserved.</Copyright>
        </Container>
    );
}

export default Footer;

const Container = styled.div`
    background-color: ${(props) => props.bgColor};
    width: 960px;
    height: 84px;

    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: 84px;

    display: flex;
    align-items: center;
    justify-content: space-evenly;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;

    color: #ffffff;

    img {
        margin: 0 30px 0 0;
    }

    div {
        display: flex;
        flex-direction: row;
    }

    @media only screen and (max-width: 420px) {
        display: none;
    }
`;

const Fe = styled.div`
    display: flex;
    flex-direction: row;
    width: 114px;

    a {
        margin-left: 5px;
        text-decoration: none;
        color: white;
    }
`;

const Be = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 20px;
    width: 156px;

    a {
        margin-left: 5px;
        text-decoration: none;
        color: white;
    }
`;

const Ui = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 20px;
    width: 148px;
    a {
        margin-left: 5px;
        text-decoration: none;
        color: white;
    }
`;

const Copyright = styled.div`
    width: 234px;
    margin-left: 30px;
`;
