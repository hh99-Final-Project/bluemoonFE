import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import { diaryApi } from "../../apis/diaryApi";
import useRecordVoice from "../../hooks/useRecordVoice";
import recordIcon from "../../static/images/microphone.svg";
import lockIcon from "../../static/images/lockIcon.svg";


CommentInput.propTypes = {
    postId: PropTypes.string
};

function CommentInput(props) {
    const { postId } = props;
    const [comment, setComment] = useState("");

    const {
        recordVoice,
        stopRecord,
        pause,
        replay,
        play,
        audioUrl
    } = useRecordVoice();

    const onChangeHandler = (e) => {
        if(e.target.value.length > 150){
            return;
        }

        setComment(e.target.value);
    }

    const saveComment = () => {
        diaryApi.createComment(postId, comment, audioUrl).then((response) => {
            if(response.status === 200) {
                setComment("");
            }
        })
    }

    const onClick = () => {
        saveComment();
    }

    const onKeyPressHandler = (e) => {
        if(e.key === "Enter") {
            saveComment();
        }
    }

    return (
        <React.Fragment>
            <InputContainer>
                {/*<VoiceButton onClick={recordVoice}>음성녹음</VoiceButton>*/}
                {/*<StopButton onClick={stopRecord}>중지</StopButton>*/}
                <Input
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    value={comment}
                    placeholder='댓글을 남겨주세요'/>
                <IconArea>
                    <VoiceButton>
                        <img src={recordIcon} alt={"recordIcon"}/>
                    </VoiceButton>
                    <IconRightArea>
                        <LockIcon>
                            <img src={lockIcon} alt={"lockIcon"}/>
                            <input type={"checkbox"}/>
                        </LockIcon>
                        <TextLength>
                            {comment.length}/150
                        </TextLength>
                        <PostButton
                            onClick={onClick}>
                            등록하기
                        </PostButton>
                    </IconRightArea>

                </IconArea>
            </InputContainer>
        </React.Fragment>
    );
}

export default CommentInput;


const InputContainer = styled.div`
    margin-top: 10px;
    width: 877px;
    height: 86px;
    border-radius: 5px;
    background-color: #BCC4DE;
`;

const Input = styled.input`
    outline: none;
    border: none;
    width: 856px;
    height: 40px;
    padding: 13px;
    margin: 11px 10px 8px;
    border-radius: 3px;
    box-sizing: border-box;
    ::placeholder {
      font-size: 13px;
      line-height: 16px;
      color: #A59F9F;
    }
`;

const VoiceButton = styled.div`
    cursor:pointer;
    margin-right: 20px;
`;

const TextLength = styled.div`
    margin: 0 10px;
    font-size: 10px;
    line-height: 12px;
`;

const PostButton = styled.div`
    cursor: pointer;
    background-color: #08105D;
    border-radius: 3px;
    font-size: 10px;
    line-height: 12px;
    text-align: center;
    color: #FFFFFF;
    padding: 7px 10px 6px;
`;

const IconArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;
const IconRightArea = styled.div`
  display: flex;
  align-items: center;
`;

const LockIcon = styled.div`
  img {
    margin-right: 4px;
  }
  
  input {
    width: 15px;
    height: 15px;
  }
`;