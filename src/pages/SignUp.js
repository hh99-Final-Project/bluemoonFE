import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import { Text } from "../elements/index";
import _ from "lodash";

SignUp.propTypes = {

};

function SignUp(props) {

    const [nickName, setNickName] = useState("");
    const [isValidnickName, setIsValidNickName] = useState(null);
    // 정규 표현식 영문,한글,숫자,특수문자(-_.) 포함 2~12글자

    const debounce = _.debounce((nickName) => {
        const result = /^[a-zA-zㄱ-힣0-9-_.]{2,12}$/.test(nickName);
        if (result) {
            setIsValidNickName(true);
        } else {
            setIsValidNickName(false);
        }
    }, 500);
    const nickNameCheckDB = React.useCallback(debounce, []);

    const onChange = (e) => {
        setNickName(e.target.value);
        nickNameCheckDB(nickName);
    };

    console.log(nickName);
    console.log(isValidnickName);


    return (
        <React.Fragment>
            <Grid>
                <Title>닉네임 설정</Title>
                <Input placeholder="닉네임을 입력해주세요" onChange={onChange}></Input>
                {isValidnickName === true && (
                    <Text color="blue">사용할 수 있는 닉네임입니다</Text>
                )}
                {isValidnickName === false && (
                    <Text color="red">사용할 수 없는 닉네임입니다</Text>
                )}
                {/* <Button
          width="40%"
          margin="0 1%"
          bg="#FF9F57"
          color="#ffffff"
          _onClick={() => IsValidatenickName(nickName)}
        >
          닉네임 중복 체크
        </Button> */}
                {}
            </Grid>
        </React.Fragment>
    );
}

export default SignUp;

const Grid = styled.div`
  width: 250px;
  height: 90%;
  margin: 30% auto;
  display: flex;
  flex-direction: column;
`;

const Title = styled.text`
  font-size: 150%;
  font-weight: 600;
  margin: 0 auto 10%;
`;

const Input = styled.input`
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
  background-color: #ff9f57;
  color: #ffffff;
  border: none;
  margin: 10%;
  padding: 1% 3%;
`;