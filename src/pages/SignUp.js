import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Text } from "../elements/index";
import _ from "lodash";
import { userApi } from "../apis/userApi";
import Popup from "../shared/Popup";

SignUp.propTypes = {};

function SignUp(props) {
  const [nickName, setNickName] = useState("");
  const [isValidNickName, setIsValidNickName] = useState(null);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    setNickName(e.target.value);
  };

  const debounce = _.debounce((nickName) => {
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
    navigate("/select");
  };

  useEffect(() => {
    // if (nickName === "") {
    //   return;
    // }
    setIsValidNickName(null);
    nickNameCheckDB(nickName);
  }, [nickName]);

  return (
    <React.Fragment>
      <Grid>
        <Title>사용하실 닉네임을 입력해주세요</Title>
        <Input
          placeholder="1~10자 이내로 입력(특수문자, 공백 불가)"
          onChange={onChange}
        ></Input>
        {isValidNickName === true && (
          <Text margin="0 auto" color="blue">
            사용 가능한 닉네임입니다
          </Text>
        )}
        {isValidNickName === false && (
          <Text margin="0 auto" color="red">
            사용 불가능한 닉네임입니다
          </Text>
        )}
        {nickName === "" && (
          <Text margin="0 auto" color="blue">
            닉네임을 입력하지 않으면 랜덤으로 닉네임을 정해드립니다.
          </Text>
        )}
        {/* 사용 가능 시 닉네임 버튼 활성화 설정 필요*/}
        <Button onClick={onClickHandler}>닉네임 저장하고 시작하기</Button>
      </Grid>

      {isOpenPopup && (
        <Popup
          title={
            "닉네임은 한번 설정하면 바꿀 수 없습니다. 계속 진행하시겠습니까?"
          }
          // desc={""}
          close={() => setIsOpenPopup(false)}
          event={saveNickNameDB}
        />
      )}
    </React.Fragment>
  );
}

export default SignUp;

const Grid = styled.div`
  width: 80vw;
  height: 80vh;
  margin: 20vh auto 0;
  display: flex;
  flex-direction: column;
  background-color: lightgray;
`;

const Title = styled.p`
  font-size: 150%;
  font-weight: 600;
  margin: 10% auto;
`;

const Input = styled.input`
  width: 70%;
  margin: 0 auto;
  box-sizing: border-box;
  border: 1px solid #bbb;
  border-radius: 3px;
  outline: none;
  padding: 1% 3%;
  &::placeholder {
    color: #bbb;
    font-size: 14px;
  }
  &:focus {
    border: 1px solid #333333;
  }
`;

const Button = styled.button`
  background-color: blue;
  color: #ffffff;

  border: none;
  border-radius: 10px;
  width: 50%;
  margin: 10% auto;
  padding: 3% 3%;
`;
