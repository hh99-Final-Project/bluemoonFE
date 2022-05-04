import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import { diaryApi } from "../../apis/diaryApi";
import useRecordVoice from "../../hooks/useRecordVoice";


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
                <VoiceButton onClick={recordVoice}>음성녹음</VoiceButton>
                <StopButton onClick={stopRecord}>중지</StopButton>
                <input
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    value={comment}
                    placeholder='댓글을 남겨주세요'/>
                <TextLength>{comment.length}/150</TextLength>
                <PostButton
                    onClick={onClick}>등록</PostButton>
            </InputContainer>
        </React.Fragment>
    );
}

export default CommentInput;


const InputContainer = styled.div`
    position: relative;
    margin: 40px auto;
    width: 1164px;
    height: 193px;
    border-radius: 12px;
    background-color: #CDCDCD;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
        outline: none;
        border: none;
        width: 966px;
        height: 142px;
        padding: 20px;
        box-sizing: border-box;
        ::placeholder {
            font-size: 20px;
            line-height: 24px;
        }
    }
`;

const VoiceButton = styled.div`
    cursor:pointer;
    margin-right: 20px;
`;

const StopButton = styled(VoiceButton)`
  
`;

const TextLength = styled.div`
    position: absolute;
    bottom:10px;
    right: 10px;
`;

const PostButton = styled.div`
    cursor:pointer;
    padding-left: 10px;
`;