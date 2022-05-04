import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import moment from "moment";
import { diaryApi } from "../../apis/diaryApi";
import useStore from "../../zustand/store";
import { useNavigate } from "react-router-dom";
import { convertDate } from "../../utils/convertDate";

Comment.propTypes = {
    comment: PropTypes.object
};

function Comment(props) {

    const { comment } = props;
    const navigate = useNavigate();

    // props는 이렇게 생겼어요
    // let comments = [
    //     {
    //         "commentUuid": 1,
    //         "nickname": "",
    //         "content": "하이하이",
    //         "createdAt": null,
    //         "voiceUrl": "",
    //         "show": true
    //     }
    // ]

    const audioPlay = (url) => {
        const audio = new Audio(url);
        if(audio){
            audio.volume = 1;
            audio.loop = false;
            audio.play();
        }
    }

    const deleteComment = (id) => {
        diaryApi.deleteComment(id).then((response) => {
            console.log(response);
            if(response.status === 200) {
                window.alert("댓글 삭제 완료!")
            }
        })
    };




    return (
        <React.Fragment>
            <OneCommentContainer>
                <NickNameTimeArea>
                    <NicknameArea>{comment.nickname}의 댓글</NicknameArea>
                    <PostTimeArea>{convertDate(comment.createdAt)}</PostTimeArea>
                </NickNameTimeArea>
                <PostContent>{comment.content}</PostContent>

                <IconArea>
                    {comment.show && <DeleteIcon
                        onClick={() => deleteComment(comment.commentUuid)}>
                        삭제
                    </DeleteIcon>}
                    {comment.show && <LockIcon>자물쇠</LockIcon>}
                    <ChatIcon>채팅</ChatIcon>
                    {
                        comment.voiceUrl !== "" &&
                        <PlayIcon
                            onClick={(e) => {
                                e.preventDefault();
                                audioPlay(comment.voiceUrl)}}>
                        보이스 듣기
                    </PlayIcon>
                    }
                </IconArea>
            </OneCommentContainer>
        </React.Fragment>
    );
}

export default Comment;


const OneCommentContainer = styled.div`
    width: 1164px;
    height: 180px;
    background-color: rgba(205, 205, 205, 0.9);
    border-radius: 20px;
    padding: 15px;
    margin: 30px auto 0;
`

const NickNameTimeArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const NicknameArea = styled.div``
const PostTimeArea = styled.div``
const PostContent = styled.div`
    margin: 10px 0 30px;
`

const IconArea = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 10px;
`
const DeleteIcon = styled.div`
    margin-right: 20px;
    cursor: pointer;
    font-weight: bold;
`
const LockIcon = styled(DeleteIcon)`
`

const ChatIcon = styled(DeleteIcon)`
`

const PlayIcon = styled(DeleteIcon)`
`