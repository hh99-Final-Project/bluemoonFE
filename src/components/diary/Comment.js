import React, {useState, useRef, useEffect} from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { diaryApi } from "../../apis/diaryApi";
import useStore from "../../zustand/store";
import { useNavigate } from "react-router-dom";
import { convertDate } from "../../utils/convertDate";
import lockIcon from "../../static/images/diary/lockIcon.svg";
import Modal from "react-modal";
import { useMutation, useQueryClient } from "react-query";
import {chatApi} from "../../apis/chatApi";
import ReplyComment from "./ReplyComment";
import Popup from "../../shared/Popup";
import ErrorModal from "../../shared/ErrorModal";

Comment.propTypes = {
    comment: PropTypes.object,
    setParentId: PropTypes.func,
    replyClickHandler: PropTypes.func,
    parentCommentId: PropTypes.string

};

function Comment(props) {

    const { comment, setParentId, parentCommentId } = props;
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const userInfo = useSelector((state) => state.userSlice.userInfo);

    const [isOpenPopup, setIsOpenPopup] = useState(false);


    const audioPlay = (url) => {
        const audio = new Audio(url);
        if(audio){
            audio.volume = 1;
            audio.loop = false;
            audio.play();
        }
    };

    const mutation = useMutation((id) => diaryApi.deleteComment(id), {
        onSuccess: () => {
            queryClient.invalidateQueries("diaryDetail");
        }
    });

    const deleteHandler = (id) => {
        mutation.mutate(id);
    };

    const reReplyComment = (commentId) => {
        setParentId(commentId);
    };



    const createChat = (userId) => {
        chatApi
            .createChat(userId)
            .then((response) => {
                console.log(response);
                navigate(`/chat/${response.data}`);
            })
            .catch((error) => {
                console.log(error);
            });
    };




    return (
        <React.Fragment>
            <OneCommentContainer parentCommentId={parentCommentId} commentUuid={comment.commentUuid}>
                <TitleArea>
                    <TitleLeft>
                        <NicknameArea>{comment.nickname}의 댓글</NicknameArea>
                        {comment.lock && <img src={lockIcon} alt={"lockIcon"}/>}
                    </TitleLeft>
                    <PostTimeArea>{convertDate(comment.createdAt)}</PostTimeArea>
                </TitleArea>
                <PostContent>
                    {
                        (comment.lock && !comment.show) ? "비밀 댓글입니다" : comment.content
                    }
                </PostContent>

                {
                    comment.voiceUrl !== "" &&
                    <PlayIcon
                        onClick={(e) => {
                            e.preventDefault();
                            audioPlay(comment.voiceUrl);
                        }}>
                        듣기
                    </PlayIcon>
                }

                <OptionBox>
                    <Reply onClick={() => {
                        if(comment.commentUuid === parentCommentId ){
                            reReplyComment("");
                        } else {
                            reReplyComment(comment.commentUuid);
                        }
                    }}>
                        답글
                    </Reply>
                    {
                        userInfo.userId !== comment.userId &&
                        <Chat onClick={() => createChat(comment.userId)}>
                        채팅
                    </Chat>
                    }
                    { comment.show &&
                        <Delete
                            onClick={() => setIsOpenPopup(true)}>
                            삭제
                        </Delete>
                    }

                </OptionBox>
                {
                    isOpenPopup &&
                        <Popup
                            title={"정말로/메모를 지우시겠습니까?"}
                            close={() => setIsOpenPopup(false)}
                            event={() => {
                                deleteHandler(comment.commentUuid);
                            }}/>
                }

            </OneCommentContainer>
            <ReplyComment replyComments={comment.children} />

        </React.Fragment>

    );
}

export default Comment;


const OptionBox = styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      right: 31px;
      bottom: 15px;
      font-size: 10px;
      line-height: 12px;
      color: #36466B;
`;


const Reply = styled.div`
  font-size: 14px;
  line-height: 17px;
  color: #08105D;
  cursor: pointer;
  margin-right: 10px;
`;
const Chat = styled(Reply)``;
const Delete = styled(Reply)``;

const OneCommentContainer = styled.div`
    position: relative;  
    width: 876px;
    height: 110px;
    background-color: ${(props) => props.parentCommentId === props.commentUuid? "rgba(149, 158, 190, 0.9)" : "rgba(198, 211, 236, 0.7)"};
    border-radius: 5px;
    padding: 18px 44px 0 44px;
    box-sizing: border-box;
    margin-top: 8px;
    
`;

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
`;
const PostTimeArea = styled.div`
  font-size: 13px;
  line-height: 16px;
`;
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
`;

const DeleteIcon = styled.div`
    margin-right: 20px;
    cursor: pointer;
    font-weight: bold;
`;
const LockIcon = styled(DeleteIcon)`
`;

const ChatIcon = styled(DeleteIcon)`
`;

const PlayIcon = styled.div`
    position: absolute;
    left: 31px;
    bottom: 15px;
    cursor: pointer;
    font-size: 13px;
  
`;