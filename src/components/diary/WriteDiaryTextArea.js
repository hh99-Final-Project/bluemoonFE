import React, {useCallback} from "react";
import styled from "styled-components";

const WriteDiaryTextArea = ({isShowSpeaker, diary, setDiary}) => {

    const onChangeContentHandler = useCallback((e) => {
        //일단 최대 길이를 500자로만 설정했습니다. 기획에 따라 변동합니다.
        if (e.target.value.length > 500) {
            return;
        }
        setDiary(e.target.value);
    },[]);

    return(
        <PostArea
            onChange={onChangeContentHandler}
            isShowSpeaker={isShowSpeaker}
            placeholder={isShowSpeaker ? "" : "500자 내로 작성해주세요"}
            value={diary}
        />
    );

};

export default React.memo(WriteDiaryTextArea);

const PostArea = styled.textarea`
    width: 876px;
    height: 352px;
    box-sizing: border-box;
    padding: ${(props) => (props.isShowSpeaker ? "86px 27px 20px" : "20px 27px")};
    background-color: #959ebe;
    border: none;
    font-size: 14px;
    line-height: 18px;
    color: #000000;
    resize: none;
    outline: none;
    border-radius: 10px;
    overflow-y: auto;
    overflow-x: hidden;

    ::-webkit-scrollbar {
        display: none;
    }

    @media only screen and (max-width: 420px) {
        width: 320px;
        height: calc(100vh - 208px);
        border: 1px solid #6b6b6b;
        padding: 22px 20px;
        font-size: 14px;
        line-height: 17px;
        color: #08105d;
        background-color: #b1bbd6;
    }

    ::placeholder {
        font-size: 14px;
        line-height: 18px;
        color: rgba(8, 16, 93, 0.5);

        @media only screen and (max-width: 420px) {
            font-size: 15px;
            line-height: 18px;
            color: rgba(227, 229, 255, 0.5);
        }
    }
`;
