import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PropTypes from 'prop-types';


SelectToDiary.propTypes = {

};

function SelectToDiary(props){

    const navigate = useNavigate();

    return (
        <React.Fragment>
            <Logo/>
            <ServiceDesc>
                말 못할 고민이 있으신가요? <br/>
                서비스 이름에서 함께 털어놔요:)
            </ServiceDesc>
            <MoveToDiary>
                <div onClick={() => navigate('/post')}>고민 털어놓기</div>
            </MoveToDiary>

            <MoveToDiary onClick={() => navigate('/diarylist')}>
                고민 상담하기
            </MoveToDiary>
        </React.Fragment>
    );

}

export default SelectToDiary;


const Logo = styled.div`
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background-color: pink;
    margin: 100px auto 40px;
`;

const ServiceDesc = styled.div`
    text-align: center;
    font-size: 32px;
    font-weight: bold;
`;

const MoveToDiary = styled.div`
    width: 120px;
    height: 60px;
    padding: 10px 20px;
    font-size: 20px;
    font-weight: bold;
    background-color: rgba(201, 235, 52);
    margin: 40px auto;
    display:flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    cursor: pointer;
    text-decoration: none;
    color: black;
`;