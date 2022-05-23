import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import styled from "styled-components";
import Popup from "../../shared/Popup";

Popup.propTypes = { title: PropTypes.string, close: PropTypes.func };

const ResultPopup = (props) => {
    const { title, close, width, height, margin } = props;

    return (
        <React.Fragment>
            <Modal
                isOpen={true}
                onRequestClose={close}
                shouldCloseOnOverlayClick={true}
                ariaHideApp={false}
                style={{
                    overlay: {
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(33, 33, 33, 0.5)",
                        zIndex: 30,
                    },
                    content: {
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        transform: "translate(-50%, -50%)",
                        width: width ? width : 402,
                        height: height ? height : 137,
                        boxSizing: "border-box",
                        border: "none",
                        background: "#CCD7EE",
                        borderRadius: "10px",
                        outline: "none",
                        padding: "none",
                        zIndex: 30,
                    },
                }}
            >
                <Title>{title}</Title>
            </Modal>
        </React.Fragment>
    );
};

export default ResultPopup;

const Title = styled.div`
    margin: 57px auto 0;

    font-family: "Spoqa Han Sans Neo";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 23px;
    text-align: center;

    color: #08105d;
`;
