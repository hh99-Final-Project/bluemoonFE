import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import styled from "styled-components";
import { DiaryContent } from '../components/diary';
import { CommentList } from "../components/diary";

DiaryDetail.propTypes = {

};

function DiaryDetail(props) {

    const navigate = useNavigate();

    return (
        <React.Fragment>
            <TitleContainer>
                <BackButton onClick={()=>navigate('/diarylist')}>뒤로가기</BackButton>
                <Title>
                    고민 들어주기
                </Title>
            </TitleContainer>
            <DiaryContent/>
            <CommentList/>
        </React.Fragment>
    )
}

export default DiaryDetail;


const TitleContainer = styled.div`
    width: 1224px;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 161px auto 56px;
`;

const BackButton = styled.div`
    width: 184px;
    height: 65px;
    background-color: #787878;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const Title = styled.div`
    width: 1040px;
    height: 54px;
    margin: auto;
    background-color: #C4C4C4;
    font-size: 32px;
    line-height: 39px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;