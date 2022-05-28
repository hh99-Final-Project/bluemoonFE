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
        <PostContainer>
            <PostArea
                onChange={onChangeContentHandler}
                isShowSpeaker={isShowSpeaker}
                placeholder={isShowSpeaker ? "" : "500자 내로 작성해주세요"}
                value={diary}
            />
        </PostContainer>
    );

};

export default React.memo(WriteDiaryTextArea);

const PostContainer = styled.div`
  width: 876px;
  height: 352px;
  box-sizing: border-box;
  padding: ${(props) => (props.isShowSpeaker ? "86px 27px 20px" : "20px 27px")};
  background-color: #959ebe;
  font-size: 14px;
  line-height: 18px;
  border-radius: 10px;
  overflow: hidden;

  @media only screen and (max-width: 420px) {
    width: 320px;
    height: calc(100vh - 208px);
    border: 1px solid #6b6b6b;
    padding: 22px 20px 28px;
    font-size: 14px;
    line-height: 17px;
    background-color: #b1bbd6;
  }
  
  
`;

const PostArea = styled.textarea`
    width: 822px;
    height: 230px;
    overflow-y: auto;
    resize: none;
    outline: none;
    background-color: #959ebe;
    border-radius: 10px;
    border: none;
    color: #08105D;
  

    ::-webkit-scrollbar {
        display: none;
    }

    @media only screen and (max-width: 420px) {
        width: 280px;
        height: calc(100vh - 278px);
        font-size: 14px;
        line-height: 17px;
        color: #08105D;
        background-color: #b1bbd6;
    }

    ::placeholder {
        font-size: 14px;
        line-height: 18px;
        color: rgba(8, 16, 93, 0.5);
        

        @media only screen and (max-width: 420px) {
            font-size: 15px;
            line-height: 18px;
            color: rgba(8, 16, 93, 0.5);
        }
    }
`;
