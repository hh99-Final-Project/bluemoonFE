import React from "react";
import styled from "styled-components";

const Text = (props) => {
    const { children, bold, size, font, color, margin, padding } = props;

    const styles = {
        bold,
        size,
        font,
        color,
        margin,
        padding,
    };
    return <P {...styles}>{children}</P>;
};

Text.defaultProps = {
    children: null,
    bold: false,
    font: "AppleSDGothicNeoB",
    size: "1em",
    color: "#222831",
    margin: false,
    padding: false,
};

const P = styled.p`
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  font-size: ${(props) => props.size};
  font-family: ${(props) => props.family};
  color: ${(props) => props.color};
  margin: ${(props) => (props.margin ? `${props.margin}` : "0px")};
  padding: ${(props) => (props.padding ? `${props.padding};` : "")};
  box-sizing: border-box;
`;

export default Text;