import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import moment from "moment";
import { diaryApi } from "../../apis/diaryApi";
import useStore from "../../zustand/store";

Comment.propTypes = {
    comment: PropTypes.object
};

function Comment(props) {

    const { comment } = props;

    const { audioFile, setAudioFile } = useStore();
    const [audio, setAudio] = useState();

    // console.log(audioFile,"audioFile")

    // useEffect(()=>{
    //     let audio = new Audio(URL.createObjectURL(audioFile))
    //     audio.loop = false;
    //     audio.volume = 1;
    //     setAudio(audio);
    // },[])


    // const audioPlay = () => {
    //     // audioUrl은 commnet의 data로 올 예정
    //     if(audio){
    //         console.log(audio.paused,"audio.paused")
    //         if(!audio.paused) {
    //             audio.pause();
    //         } else {
    //             audio.play();
    //         }
    //     }
    // }



    const deleteComment = () => {
        diaryApi.deleteComment(comment.commentId).then((response) => {
            console.log(response);
        })
    };

    return (
        <React.Fragment>
            <OneCommentContainer>
                <NickNameTimeArea>
                    <NicknameArea>{comment.nickname}의 댓글</NicknameArea>
                    <PostTimeArea>{comment.createdAt}</PostTimeArea>
                </NickNameTimeArea>
                <PostContent>{comment.content}</PostContent>

                <IconArea>
                    {comment.isShow && <DeleteIcon onClick={deleteComment}>삭제</DeleteIcon>}
                    <LockIcon>자물쇠</LockIcon>
                    <ChatIcon>채팅</ChatIcon>
                    {/*<PlayIcon onClick={audioPlay}>*/}
                    {/*    보이스 듣기*/}
                    {/*</PlayIcon>*/}
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