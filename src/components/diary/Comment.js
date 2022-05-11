import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import moment from "moment";
import { diaryApi } from "../../apis/diaryApi";
import useStore from "../../zustand/store";
import { useNavigate } from "react-router-dom";
import { convertDate } from "../../utils/convertDate";
import lockIcon from "../../static/images/lockIcon.svg";
// import playVoice from "../../static/images/voicePlayButton.svg";

Comment.propTypes = {
    comment: PropTypes.object
};

function Comment(props) {
    lockIcon
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
        <OneCommentContainer>
            <TitleArea>
                <TitleLeft>
                    <NicknameArea>{comment.nickname}의 댓글</NicknameArea>
                    {comment.show && <img src={lockIcon} alt={"lockIcon"}/>}
                </TitleLeft>
                <PostTimeArea>{convertDate(comment.createdAt)}</PostTimeArea>
            </TitleArea>
            <PostContent>
                {
                    comment.lock ? "비밀 댓글 입니다" : comment.content
                }
                {/*<img src={playVoice} alt={"playVoice"}/>*/}
            </PostContent>

            <IconArea>
                {!comment.show && <DeleteIcon
                    onClick={() => deleteComment(comment.commentUuid)}>
                    삭제
                </DeleteIcon>}
                {/*<ChatIcon>채팅</ChatIcon>*/}
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
    );
}

export default Comment;


const OneCommentContainer = styled.div`
    width: 876px;
    height: 110px;
    background-color: #959EBE;
    border-radius: 5px;
    padding: 18px 44px 0 44px;
    box-sizing: border-box;
    margin-top: 8px;
`

const TitleArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TitleLeft = styled.div`
  display: flex;
  align-items: center;
  
  img {
    width: 16px;
    height: 17px;
    margin-left: 5px;
    padding-bottom: 2px;
  }
`;
const NicknameArea = styled.div`
  font-size: 17px;
  line-height: 21px;
`
const PostTimeArea = styled.div`
  font-size: 13px;
  line-height: 16px;
`
const PostContent = styled.div`
    margin: 9px 0 0;
    font-size: 13px;
    line-height: 16px;
    display: flex;
    align-items: center;
    
    img {
      width: 18px;
      height: 18px;
      margin-left: 5px;
    }
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