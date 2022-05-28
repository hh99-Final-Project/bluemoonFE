import React, {useCallback} from "react";
import styled from "styled-components";

const WriteDiaryInput = ({setValue, value}) => {

    const onChangeTitleHandler = useCallback((e) => {
        if (e.target.value.length > 30) {
            return;
        }
        setValue(e.target.value);
    },[]);

    return(
        <PostText onChange={onChangeTitleHandler} value={value} placeholder={"제목을 입력해주세요"}/>
    );

};

export default React.memo(WriteDiaryInput);


const PostText = styled.input`
    width: 876px;
    height: 47px;
    background-color: #959ebe;
    outline: none;
    border: none;
    padding: 13px 27px;
    border-radius: 10px;
    box-sizing: border-box;
    margin-bottom: 10px;
    font-size: 18px;
    line-height: 23px;
    color: #08105D;

    @media only screen and (max-width: 420px) {
        width: 320px;
        height: 43px;
        border: 1px solid #6b6b6b;
        padding: 13px 20px;
        margin-bottom: 16px;
        font-size: 14px;
        line-height: 18px;
        color: #08105d;
        background-color: #b1bbd6;
    }

    ::placeholder {
        font-size: 18px;
        line-height: 23px;
        color: rgba(8, 16, 93, 0.5);

        @media only screen and (max-width: 420px) {
            font-size: 15px;
            line-height: 18px;
          color: rgba(8, 16, 93, 0.5);
        }
    }
`;