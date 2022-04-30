import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NotFound = (props) => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Grid>
        <Title>앗! 막다른 길로 오셨군요!</Title>
        <BackButton onClick={() => navigate("/select")}>홈으로 가기</BackButton>
      </Grid>
    </React.Fragment>
  );
};

export default NotFound;

const Grid = styled.div`
  width: 80vw;
  height: 50vh;
  margin: 20vh auto;
  display: flex;
  flex-direction: column;
  background-color: lightgray;
`;

const BackButton = styled.div`
  width: 20%;
  height: 10%;
  margin: 10% 0 0 10%;
  background-color: #787878;
  display: flex;
  align-items: center;
  font-size: 24px;
  justify-content: center;
  cursor: pointer;
`;

const Title = styled.p`
  margin: 20% 0 0 10%;
  background-color: #c4c4c4;
  font-size: 32px;
  justify-content: left;
`;
