import React from "react";
import styled from "styled-components";

import { Text } from "./index";

const Input = (props) => {
    const {
        label,
        type,
        placeholder,
        _onChange,
        width,
        height,
        display,
        margin,
        padding,
    } = props;

    const styles = {
        width,
        height,
        display,
        margin,
        padding,
    };

    return (
        <React.Fragment>
            {label && <Text margin="5px">{label}</Text>}
            <ElInput
                {...styles}
                type={type}
                placeholder={placeholder}
                onChange={_onChange}
            ></ElInput>
        </React.Fragment>
    );
};

Input.defaultProps = {
    label: false,
    type: "text",
    placeholder: "텍스트를 입력하시오.",
    _onChange: () => {},
    // width: "45%",
    // height: "4%",
    display: "inline-block",
    margin: false,
    padding: false,
};

const ElInput = styled.input`
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 3px;
  outline: none;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  ${(props) => (props.display ? `display: ${props.display}` : "")};
  margin: ${(props) => (props.margin ? `${props.margin}` : "8px 8px")};
  padding: ${(props) => (props.padding ? `${props.padding};` : "16px 16px;")};
  &::placeholder {
    color: #bbb;
    font-size: 14px;
    font-family: "AppleSDGothicNeoB";
  }
  &:focus {
    border: 1px solid #333333;
  }
`;

export default Input;