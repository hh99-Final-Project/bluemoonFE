import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import styled from "styled-components";

Popup.propTypes = {
    title: PropTypes.string,
    event: PropTypes.func,
    close: PropTypes.func,
};

function Popup(props) {

    const {title, event, close, width, height, padding} = props;

    const confirmHandler = (e) => {
        e.stopPropagation();
        event();
    };

    const returnBackHandler = (e) => {
        e.stopPropagation();
        close();
    };


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
                        zIndex: 99999
                    },
                    content: {
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        transform: "translate(-50%, -50%)",
                        width: width ? width : 365,
                        height: height ? height : 264,
                        boxSizing: "border-box",
                        border: "none",
                        background: "#CCD7EE",
                        borderRadius: "10px",
                        outline: "none",
                        padding: "20px",
                        zIndex: 99999
                    }
                }}>
                <Title paddingTop={padding}>
                    {
                        title.split("/").map((t, i) => {
                        return (
                            <div key={i}>{t}</div>
                        );
                    })
                }
                </Title>
                <ButtonArea>
                    <Confirm onClick={confirmHandler}>네</Confirm>
                    <Back onClick={returnBackHandler}>아니오</Back>
                </ButtonArea>
            </Modal>
        </React.Fragment>
    );
}

export default Popup;


const Title = styled.div`
    margin: auto;
    text-align: center;
    font-size: 18px;
    line-height: 23px;
    color: #08105D;
    margin-top: ${(props) => props.paddingTop ? props.paddingTop : "49px"};
    
`;

const ButtonArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 49px;
`;

const Confirm = styled.div`
    font-weight: bold;
    cursor: pointer;
    width: 150px;
    height: 47px;
    background-color: #354569;
    border-radius: 10px;
    color: rgba(255, 255, 255, 0.8);
    font-size: 17px;
    line-height: 21px;
  
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Back = styled(Confirm)`
    cursor: pointer;
    border: 1px solid #354569;
    background-color: transparent;
    color: #354569;
  

`;