import React from "react";
import styled from "styled-components";

const Grid = (props) => {
    const {
        children,
        width,
        height,
        shadow,
        border_top,
        border_bottom,
        border_radius,
        scroll,
        fixed,
        top,
        bottom,
        color,
        bg,
        margin,
        padding,
        is_flex,
        flex_direction,
        space_between,
        space_around,
        center,
        _onClick,
    } = props;

    const styles = {
        width,
        height,
        shadow,
        border_top,
        border_bottom,
        border_radius,
        scroll,
        fixed,
        top,
        bottom,
        color,
        bg,
        margin,
        padding,
        is_flex,
        flex_direction,
        space_between,
        space_around,
        center,
    };
    return (
        <React.Fragment>
            <GridBox {...styles} onClick={_onClick}>
                {children}
            </GridBox>
        </React.Fragment>
    );
};

Grid.defaultProps = {
    children: null,
    width: "100%",
    height: "100%",
    border_top: false,
    border_bottom: false,
    border_radius: false,
    scroll: false,
    fixed: false,
    top: false,
    bottom: false,
    color: false,
    bg: false,
    padding: false,
    margin: false,
    is_flex: false,
    flex_direction: false,
    space_between: false,
    space_around: false,
    center: false,
    _onClick: () => {},
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-sizing: border-box;
  // box-shadow: ${(props) => props.shadow};
  border-top: ${(props) => (props.border_top ? `${props.border_top};` : "")};
  border-bottom: ${(props) =>
    props.border_bottom ? `${props.border_bottom};` : ""};
  border-radius: ${(props) =>
    props.border_radius ? `${props.border_radius};` : ""};
  overflow: ${(props) => (props.scroll ? `scroll;` : "")};
  // 위치
  position: ${(props) => (props.fixed ? `fixed;` : "")};
  top: ${(props) => (props.top ? `${props.top};` : "")};
  bottom: ${(props) => (props.bottom ? `${props.bottom};` : "")};
  ${(props) => (props.color ? `color: ${props.color};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) =>
    props.is_flex
        ? `display: flex; align-items: center; justify-content: center;`
        : ""};
  ${(props) =>
    props.flex_direction ? `fles-direction: ${props.flex_direction};` : ""};
  ${(props) => (props.center ? `text-align: center;` : "")};
`;

export default Grid;