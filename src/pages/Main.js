import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import * as modalActions from "../store/modules/modal";
// import LoginPopup from "../components/LoginPopup";
// import { getInfo } from "../store/modules/modal";


const Main = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const thunkHandler = () => {
    //     dispatch(getInfo())
    //     .then((res) => {
    //         console.log(res.payload, "res");
    //     })
    //     .catch((err) => console.log(err));
    // };


    return (
        <React.Fragment>
            <ServiceIntro>Bluemoon</ServiceIntro>
            <StartButton onClick={() => navigate('/select')}>
                시작하기
            </StartButton>
            {/* <button onClick={thunkHandler}>thunk Test</button> */}
            {/* <button onClick={() => dispatch(modalActions.isModalOpen(true))}> */}
            {/* 로그인 */}
            {/* </button> */}
            {/* <LoginPopup /> */}
        </React.Fragment>
    );

}

export default Main;


const ServiceIntro = styled.div`
  width: 300px;
  font-size: 50px;
  font-weight: bold;
  margin: 300px auto;
  text-align: center;
`;

const StartButton = styled.div`
  margin: auto;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
`;