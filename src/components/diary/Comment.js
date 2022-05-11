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
import moreIcon from "../../static/images/diary/moreIcon.svg";
import Modal from "react-modal";
import { useMutation, useQueryClient } from "react-query";

Comment.propTypes = {
    comment: PropTypes.object
};

function Comment(props) {

    const { comment } = props;
    const navigate = useNavigate();
    const modalRef = useRef();
    const queryClient = useQueryClient();
    const [isOptionOpen, setIsOptionOpen] = useState(false);


    const audioPlay = (url) => {
        const audio = new Audio(url);
        if(audio){
            audio.volume = 1;
            audio.loop = false;
            audio.play();
        }
    }

    const mutation = useMutation((id) => diaryApi.deleteComment(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('diaryDetail');
            window.alert("댓글 삭제 완료입니다!")
        }
    });

    const deleteComment = (id) => {
        mutation.mutate(id);
    };

    const closeModal = () => {
        setIsOptionOpen(false);
    }

    const clickOutSideModal = (e) => {
        if(modalRef.current && !modalRef.current.contains(e.target)){
            closeModal();
        }
    }

    useEffect(()=>{
        window.addEventListener('mousedown', clickOutSideModal);

        return () => {
            window.removeEventListener('mousedown', clickOutSideModal);
        }
    },[])

    return (
        <OneCommentContainer>
            <TitleArea>
                <TitleLeft>
                    <NicknameArea>{comment.nickname}의 댓글</NicknameArea>
                    {comment.lock && <img src={lockIcon} alt={"lockIcon"}/>}
                </TitleLeft>
                <PostTimeArea>{convertDate(comment.createdAt)}</PostTimeArea>
            </TitleArea>
            <PostContent>
                {
                    comment.lock ? "비밀 댓글 입니다" : comment.content
                }
                {/*<img src={playVoice} alt={"playVoice"}/>*/}
            </PostContent>

            <IconArea onClick={() => setIsOptionOpen(true)}>
                <img src={moreIcon} alt={"moreIcon"}/>

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

            { isOptionOpen &&
                <OptionModal modalRef={modalRef}
                             deleteComment={deleteComment} commentId={comment.commentUuid}/>}

        </OneCommentContainer>

    );
}

export default Comment;

const OptionModal = ({modalRef, deleteComment, commentId}) => {
    return (
        <ModalContainer ref={modalRef}>
            <Reply>
                답글
            </Reply>
            <Chat>
                채팅
            </Chat>
            <Delete onClick={() => deleteComment(commentId)}>
                삭제
            </Delete>
        </ModalContainer>
    )
}

const ModalContainer = styled.div`
      width: 164px;
      height: 40px;
      background: rgba(198, 211, 236, 0.9);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      right: 31px;
`;


const Reply = styled.div`
  font-size: 14px;
  line-height: 17px;
  color: #08105D;
  cursor: pointer;

  &:after {
    content: "|";
    transform: rotate(90deg);
    width: 1px;
    height: 21px;
    color: #959EBE;
    margin: 0 9px;
  }

`;
const Chat = styled(Reply)``;
const Delete = styled(Reply)`
  &:after {
    content: "";
    transform: rotate(90deg);
    width: 0;
    height: 0;
    color: #959EBE;
    margin: 0;
  }
`;

const OneCommentContainer = styled.div`
    position: relative;  
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
    margin-top: 10px;
    cursor: pointer;
    position: absolute;
    right: 31px;
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