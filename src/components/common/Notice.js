import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ChatOutModal from "./ChatOutModal";
import { Navigate, useNavigate } from "react-router-dom";
import useStore from "../../zustand/store";

Notice.propTypes = {
    alert: PropTypes.object.isRequired,
};

function Notice(props) {
    const { alert } = props;
    console.log(alert.message,"alert.message");
    const contentName = alert.message.split("]")[0].length > 22 ?
        alert.message.split("]")[0].substring(0, 20) + "...] " + alert.message.split("]")[1] : alert.message;

    const { setCurrentHeader } = useStore();
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <React.Fragment>
            <AlertSliceContainer
                onClick={() => {
                    setCurrentHeader("마이페이지");
                    navigate(`/diary/${alert.postUuid}`);
                }}
            >
                <TitleArea>
                    <CreatedAt>{alert.createdAt}</CreatedAt>
                </TitleArea>
                <ContentArea>
                    <Desc>{contentName}</Desc>
                </ContentArea>
            </AlertSliceContainer>
        </React.Fragment>
    );
}

export default Notice;

const AlertSliceContainer = styled.div`
    //width: 213px;
    height: 59px;
    box-sizing: border-box;
    background-color: #d0d5e3;
    margin-bottom: 8px;
    border-radius: 5px;
    padding: 10px 17px;
    cursor: pointer;
`;
const TitleArea = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 6px;
    font-size: 10px;
    line-height: 12px;
`;

const CreatedAt = styled.div`
      font-size: 8px;
      line-height: 10px;
      color: rgba(53, 69, 105, 0.8);
`;
const ContentArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Desc = styled.div`
      font-size: 10px;
      line-height: 13px;
      color: #354569;
  
`;

const MoreIcon = styled.div``;
