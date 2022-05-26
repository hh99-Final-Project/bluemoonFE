import React from "react";
import styled from "styled-components";
import { color } from "../utils/designSystem";
import { footerLogo } from "../static/images/resources";

Footer.propTypes = {};

function Footer() {
    return (
        <Container bgColor={color.backgroundColor}>
            <img src={footerLogo}></img>
            <div>
                <Fe>
                    Front-End
                    <a href="https://github.com/hyemigwak" target="_blank" rel="noopener noreferrer">
                        곽혜미
                    </a>
                    <a href="https://github.com/lee-chun-91" target="_blank" rel="noopener noreferrer">
                        이춘
                    </a>
                </Fe>
                <Be>
                    Back-End
                    <a href="https://github.com/TodayIsYolo" target="_blank" rel="noopener noreferrer">
                        김승민
                    </a>
                    <a href="https://github.com/jaeyoungjang2" target="_blank" rel="noopener noreferrer">
                        장재영
                    </a>
                    <a href="https://github.com/cbjjzzang" target="_blank" rel="noopener noreferrer">
                        최봉진
                    </a>
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
    //background-color: ${(props) => props.bgColor};
    width: 950px;
    height: 84px;
    overflow: hidden;
    margin: auto;
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: 0;
    z-index: 2;

    display: flex;
    align-items: center;
    justify-content: space-evenly;

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
