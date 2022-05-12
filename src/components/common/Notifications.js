import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Notice from "./Notice";
import Modal from "react-modal";
import closeButton from "../../static/images/close_24px.svg";
import { useSelector } from "react-redux";

Notifications.propTypes = {};

function Notifications(props) {
    const { closeModal, AlertTabRef } = props;
    const alertList = useSelector((state) => state.commonSlice.alertList);

    // let alertList = [
    //     {
    //         title: "곽혜미",
    //         desc: "라라라",
    //         createdAt: "2022-04-21 11:23",
    //         id: 1,
    //     },

    //     {
    //         title: "김김김",
    //         desc: "김김22",
    //         createdAt: "2022-01-21 11:23",
    //         id: 2,
    //     },
    //     {
    //         title: "원숭이",
    //         desc: "재주부리다 넘어짐",
    //         createdAt: "2022-03-21 11:23",
    //         id: 3,
    //     },
    //     {
    //         title: "원숭이",
    //         desc: "재주부리다 넘어짐",
    //         createdAt: "2022-03-21 11:23",
    //         id: 4,
    //     },
    //     {
    //         title: "원숭이",
    //         desc: "재주부리다 넘어짐",
    //         createdAt: "2022-03-21 11:23",
    //         id: 5,
    //     },
    //     {
    //         title: "원숭이",
    //         desc: "재주부리다 넘어짐",
    //         createdAt: "2022-03-21 11:23",
    //         id: 6,
    //     },
    //     {
    //         title: "원숭이",
    //         desc: "재주부리다 넘어짐",
    //         createdAt: "2022-03-21 11:23",
    //         id: 7,
    //     },
    //     {
    //         title: "원숭이",
    //         desc: "재주부리다 넘어짐",
    //         createdAt: "2022-03-21 11:23",
    //         id: 8,
    //     },
    // ];

    // console.log(AlertTabRef.current.getBoundingClientRect().top,"AlertTabRef")
    // console.log(AlertTabRef.current.getBoundingClientRect().left,"AlertTabRef")

    return (
        <div>
            <Modal
                isOpen={true}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={false}
                ariaHideApp={false}
                style={{
                    overlay: {
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(65, 65, 65, 0.5)",
                        zIndex: 10,
                    },
                    content: {
                        position: "absolute",
                        zIndex: 10,
                        top: AlertTabRef.current.getBoundingClientRect().top - 10,
                        left: AlertTabRef.current.getBoundingClientRect().left - 80,
                        right: "auto",
                        bottom: "auto",
                        width: "248px",
                        height: "610px",
                        border: "none",
                        boxSizing: "border-box",
                        background: "#99A5BC",
                        borderRadius: "10px",
                        outline: "none",
                        padding: alertList.length > 7 ? "0 7px 26px 13px" : "0 9px 26px 13px",
                        overflowY: "hidden",
                    },
                }}
            >
                <NotiHeader>
                    <Title>알림창</Title>
                    <CloseButton onClick={closeModal}>
                        <img src={closeButton} alt={"close_alert"} />
                    </CloseButton>
                </NotiHeader>
                <Content length={alertList.length}>
                    {alertList.length > 0 &&
                        alertList.map((alert) => {
                            return <Notice key={alert.messageId} alert={alert} />;
                        })}
                </Content>
            </Modal>
        </div>
    );
}

export default Notifications;

const NotiHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 8px 0 20px;
`;

const Title = styled.div`
    font-size: 18px;
    line-height: 22px;
    color: #000000;
    margin: 5px 0 19px;
`;

const CloseButton = styled.div`
    cursor: pointer;
`;

const Content = styled.div`
    height: 530px;
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: ${(props) => (props.length > 7 ? "6px" : "4px")};
    box-sizing: border-box;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #d3d3d3;
        border-radius: 5px;
    }

    &::-webkit-scrollbar-track {
        background-color: #616b7d;
        border-radius: 5px;
    }
`;
