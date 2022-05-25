import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Notice from "./Notice";
import Modal from "react-modal";
import { closeButton, mobAlertCloseBtn } from "../../static/images/resources";
import { deleteNewCommentAlert } from "../../redux/modules/commonSlice";
import { diaryApi } from "../../apis/diaryApi";
import { isMobile } from "react-device-detect";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";

Notifications.propTypes = {
    closeModal: PropTypes.func,
    AlertTabRef: PropTypes.shape({ current: PropTypes.any }),
};

function Notifications(props) {
    const { closeModal, AlertTabRef } = props;
    const [commentAlertList, setCommentAlertList] = useState([]);
    const dispatch = useDispatch();

    const InfinityScrollref = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(null);

    // 무한스크롤
    const InfinityScroll = _.throttle((e) => {
        if (e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) <= 200 && hasNext === true) {
            diaryApi
                .getCommentAlertList(page)
                .then((response) => {
                    setCommentAlertList([...commentAlertList, ...response.data]);
                    setIsLoading(false);
                    if (response.data.length < 10) {
                        setHasNext(false);
                    } else {
                        setHasNext(true);
                    }
                    setPage(page + 1);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, 300);

    useEffect(() => {
        diaryApi
            .getCommentAlertList(page)
            .then((response) => {
                if (page === 1) {
                    setCommentAlertList(response.data);
                } else {
                    setCommentAlertList([...commentAlertList, ...response.data]);
                }
                setIsLoading(false);
                if (response.length < 10) {
                    setHasNext(false);
                } else {
                    setHasNext(true);
                }
                setPage(page + 1);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // 카테고리바에 새 알람 표시 삭제
    useEffect(() => {
        dispatch(deleteNewCommentAlert());
    }, []);

    const isMobileQuery = useMediaQuery({
        query: "(max-width: 420px)",
    });

    return (
        <div>
            <Modal
                isOpen={true}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={true}
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
                        top: isMobile || isMobileQuery ? "53px" : AlertTabRef.current.getBoundingClientRect().top + 38,
                        left: isMobile || isMobileQuery ? "50%" : AlertTabRef.current.getBoundingClientRect().left,
                        right: "auto",
                        bottom: "auto",
                        transform: "translate(-50%, 0)",
                        width: isMobile || isMobileQuery ? "320px" : "248px",
                        height: isMobile || isMobileQuery ? "calc(100% - 100px)" : "586px",
                        border: "none",
                        boxSizing: "border-box",
                        background: "rgba(198, 211, 236, 0.8)",
                        borderRadius: "10px",
                        outline: "none",
                        padding: isMobile || isMobileQuery ? "0 7px 18px 0" : "0 7px 26px 0",
                        overflowY: "hidden",
                    },
                }}
            >
                <NotiHeader>
                    <Title>알림</Title>
                    <CloseButton onClick={closeModal}>
                        {isMobile || isMobileQuery ? (
                            <img src={mobAlertCloseBtn} alt={"mobAlertCloseBtn"} />
                        ) : (
                            <img src={closeButton} alt={"close_alert"} />
                        )}
                    </CloseButton>
                </NotiHeader>
                <Content length={commentAlertList.length} ref={InfinityScrollref} onScroll={InfinityScroll}>
                    {commentAlertList.length > 0 ? (
                        commentAlertList.map((alert) => {
                            return <Notice key={alert.messageId} alert={alert} />;
                        })
                    ) : (
                        <NoContent>아직 도착한 알림이 없어요:)</NoContent>
                    )}
                </Content>
            </Modal>
        </div>
    );
}

export default Notifications;

const NotiHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Title = styled.div`
    font-size: 14px;
    line-height: 18px;
    color: #08105d;
    margin: 18px 0 18px 14px;

    @media only screen and (max-width: 420px) {
        font-size: 20px;
        line-height: 25px;
        color: #53648b;
        margin-left: 19px;
    }
`;

const CloseButton = styled.div`
    cursor: pointer;
    margin: 16px 9px 0 0;
`;

const Content = styled.div`
    height: 530px;
    overflow-y: auto;
    overflow-x: hidden;
    padding-left: 15px;
    padding-right: 7px;
    box-sizing: border-box;

    @media only screen and (max-width: 420px) {
        height: calc(100% - 59px);
    }

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #d3d3d3;
        border-radius: 5px;
    }

    &::-webkit-scrollbar-track {
        background-color: #08105d;
        border-radius: 5px;
    }
`;
const NoContent = styled.div`
    font-size: 15px;
    line-height: 19px;
    color: #08105d;
    text-align: center;
    margin-top: 223px;
`;
