import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AlertPopup from "./AlertPopup";

AlertList.propTypes = {

};

function AlertList(props) {

    let alertList = [
        {
            title: "곽혜미",
            desc: "라라라",
            createdAt: "2022-04-21 11:23",
            id: 1,
        },

        {
            title: "김김김",
            desc: "김김22",
            createdAt: "2022-01-21 11:23",
            id: 2,
        },
        {
            title: "원숭이",
            desc: "재주부리다 넘어짐",
            createdAt: "2022-03-21 11:23",
            id: 3,
        },
    ];


    return (
        <AlertContainer>
            {
                alertList.map((alert) => {
                    return <AlertPopup key={alert.id} alert={alert}/>
                })
            }
        </AlertContainer>
    );
}

export default AlertList;

const AlertContainer = styled.div`
    width: 800px;
    height: 1000px;
    background-color: #CBCBCB;
    margin: 100px auto;
    padding: 30px 20px 0;
    box-sizing: border-box;
`;