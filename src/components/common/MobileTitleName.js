import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {mobTitleBackButton, mobWriteDiaryButton} from "../../static/images/resources";


const MobileTitleName = (props) => {

    const { title, pos, type, onClick } = props;
    const navigate = useNavigate();


    return (
        <React.Fragment>
            <FirstBorder/>
            <SecondBorder/>
            <BoxContainer >
                {
                    Array(12).fill().map((box, idx) => {
                        if(title.length > 5) {
                            return (
                                <Box text={pos} key={idx}>
                                    {idx === 0 &&
                                        <BackIcon onClick={() => navigate(-1)}
                                              src={mobTitleBackButton}/>
                                    }

                                    {idx === 3 && title[0]}
                                    {idx === 4 && title[1]}
                                    {idx === 5 && title[2]}
                                    {idx === 6 && title[3]}
                                    {idx === 7 && title[4]}
                                    {idx === 8 && title[5]}
                                </Box>
                            );
                        }
                        if(title.length < 5) {
                            return (
                                <Box text={pos} key={idx}>
                                    {idx === 0 &&
                                    <BackIcon onClick={() => navigate(-1)}
                                              src={mobTitleBackButton}/>
                                    }

                                    {idx === 4 && title[0]}
                                    {idx === 5 && title[1]}
                                    {idx === 6 && title[2]}
                                    {idx === 7 && title[3]}
                                    {type === "write" && idx === 11 &&  <SaveDiary
                                        onClick={onClick}
                                        src={mobWriteDiaryButton}/>}
                                </Box>
                            );
                        }

                    })
                }
            </BoxContainer>
            <FirstBorder/>
            <BottomBorder/>
        </React.Fragment>

    );
};


export default MobileTitleName;

const FirstBorder = styled.div`
  width: 320px;
  border-bottom: 1px solid #868B9D;
  margin: auto;
  
`;
const SecondBorder = styled(FirstBorder)`
  margin-top: 3px;
`;
const BottomBorder = styled(FirstBorder)`
  margin-top: 3px;
  margin-bottom: 16px;
`;

const BoxContainer = styled.div`
  width: 313px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  box-sizing: border-box;
  
`;

const Box = styled.div`
      width: 27px;
      height: 27px;
      border-right: 1px solid #85899B;
      box-sizing: border-box;
      border-collapse: collapse;
    
      font-size: 14px;
      line-height: 17px;
      align-items: center;
      text-align: center;
      letter-spacing: 0.355em;
      color: #FFFFFF;
      padding-top: 6px;
      padding-left: 5px;
  
    
      &:first-child {
        border-left: 1px solid #85899B;
        padding-left: 0;
      }
  
      &:nth-child(${props => props.text}) {
        padding-top: 9px;
      }
  
`;

const BackIcon = styled.img`
  cursor: pointer;
`;


const SaveDiary = styled.img`
    margin-right: 4px;
    box-sizing: border-box;
    cursor: pointer;
`;

