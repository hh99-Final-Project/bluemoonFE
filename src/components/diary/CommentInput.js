import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";


CommentInput.propTypes = {

};

function CommentInput(props) {

    const [comment, setComment] = useState("");

    const onChangeHandler = (e) => {
        if(e.target.value.length > 150){
            return;
        }

        setComment(e.target.value);
    }

    const onClick = (e) => {
        //코멘트를 api로 보내준다.

        setComment("");
    }

    return (
        <React.Fragment>
            <InputContainer>
                <VoiceButton>음성녹음</VoiceButton>
                <input
                    onChange={onChangeHandler}
                    value={comment}
                    placeholder='댓글을 남겨주세요'/>
                <TextLength>{comment.length}/150</TextLength>
                <PostButton onClick={onClick}>등록</PostButton>
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