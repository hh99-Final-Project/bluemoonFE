import React from "react";
import styled from "styled-components";
import { feedbackHammer } from "../../static/images/resources";

const Feedback = () => {
    return (
        <FeedBackArea
            onClick={() =>
                window.open("https://docs.google.com/forms/d/e/1FAIpQLScXhuS3JBOySC6_YMlJOc98xew2pYAwUyPYRE_Qms2NGrdKfw/viewform")}>
            <img src={feedbackHammer} alt={"service-feedback"} loading="lazy"/>
            <div>피드백</div>
        </FeedBackArea>
    );
};

export default Feedback;

const FeedBackArea = styled.div`
  
  position: fixed;
  right: calc((100vw - 920px) / 2 - 109px);
  top: 604px;
  cursor: pointer;
  width: 56px;
  z-index: 9999999;

  @media only screen and (max-width: 420px) {
    display: none;
  }
  
  
  div {
    font-size: 15px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.8);
  }
`;


