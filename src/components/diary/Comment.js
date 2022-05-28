import React, {useState, useRef, useEffect} from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { diaryApi } from "../../apis/diaryApi";
import { useNavigate } from "react-router-dom";
import {convertDate, stringToSeconds, timeFormatter2} from "../../utils/convertDate";
import lockIcon from "../../static/images/diary/lockIcon.svg";
import { useMutation, useQueryClient } from "react-query";
import {chatApi} from "../../apis/chatApi";
import ReplyComment from "./ReplyComment";
import Popup from "../../shared/Popup";
import {voicePlayIcon} from "../../static/images/resources";
import { MyTimer } from "./Timer";
import {isMobile} from "react-device-detect";
import {useMediaQuery} from "react-responsive";

Comment.propTypes = {
    comment: PropTypes.object,
    setParentId: PropTypes.func,
    replyClickHandler: PropTypes.func,
    parentCommentId: PropTypes.string

};

function Comment(props) {
    const { comment, setParentId, parentCommentId } = props;
    const today = new Date();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const userInfo = useSelector((state) => state.userSlice.userInfo);
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [expireTime, setExpireTime] = useState(today);
    const audioRef = useRef();

    const isMobileQuery = useMediaQuery({
        query: "(max-width: 420px)"
    });


    const { timerSec, timerMin, TimerIsRunning, TimerRestart, TimerPause} = MyTimer(expireTime);

    const audioPlay = (timer) => {

        if(audioRef.current){
            if(audioRef.current.paused){
                audioRef.current.play();
                TimerRestart(timer);
            } else {
                audioRef.current.currentTime = 0;
                audioRef.current.pause();
                TimerPause();
            }
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
                        comment.isDeleted === "Y" ?
                            "삭제된 댓글입니다." :
                        (comment.lock && !comment.show) ? "비밀 댓글입니다." : comment.content
                    }
                </PostContent>

                {
                    comment.voiceUrl !== "" && (comment.show || !comment.lock) && !isMobile && !isMobileQuery &&
                        <PlayVoiceArea
                            onClick={(e) => {
                                e.preventDefault();
                                const now = new Date();
                                let addedNow = now.setSeconds(now.getSeconds() + stringToSeconds(comment.timer));
                                setExpireTime(new Date(addedNow));
                                audioPlay(new Date(addedNow));

                        }}>
                            <img src={voicePlayIcon} alt={"listen-voice"}/>
                            <PlayIcon>
                                음성 듣기
                            </PlayIcon>
                            <Timer>
                                {
                                    TimerIsRunning ? timeFormatter2(timerMin) + ":" + timeFormatter2(timerSec)
                                        : comment.timer
                                }
                            </Timer>
                            <audio ref={audioRef} src={comment.voiceUrl}/>
                        </PlayVoiceArea>
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
                        userInfo && userInfo.userId !== comment.userId &&
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
            <ReplyComment replyComments={comment.children} deleteHandler={deleteHandler} />

        </React.Fragment>

    );
}

export default Comment;


const OptionBox = styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      right: 48px;
      bottom: 15px; 
  
      @media only screen and (max-width: 420px) {
        right: 14px;
      }
`;


const Reply = styled.div`
  font-size: 10px;
  line-height: 13px;
  color: #36466B;
  cursor: pointer;
`;
const Chat = styled(Reply)`
  margin-left: 10px;
`;
const Delete = styled(Reply)`
  margin-left: 10px;
`;

const OneCommentContainer = styled.div`
    position: relative;  
    width: 884px;
    background-color: ${(props) => props.parentCommentId === props.commentUuid? "rgba(149, 158, 190, 0.9)" : "rgba(198, 211, 236, 0.7)"};
    border-radius: 5px;
    padding: 15px 48px;
    box-sizing: border-box;
    margin-top: 8px;

  @media only screen and (max-width: 420px) {
    width: 320px;
    padding: 9px 14px;
  }
    
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
    
    @media only screen and (max-width: 420px) {
      width: 8px;
      height: 10px;
    }
    
  }
`;
const NicknameArea = styled.div`
      font-size: 14px;
      line-height: 18px;
      color: #08105D;

  @media only screen and (max-width: 420px) {
        font-size: 12px;
        line-height: 15px;
  }
`;
const PostTimeArea = styled.div`
      font-size: 10px;
      line-height: 13px;
      color: #354569;
  
      @media only screen and (max-width: 420px) {
        font-size: 7px;
        line-height: 9px;
      }
`;
const PostContent = styled.div`
      margin: 15px 0;
      font-size: 10px;
      line-height: 13px;
      color: #08105D;
      display: flex;
      align-items: center;
      max-width: 664px;
      word-break: break-all;
    
    img {
      width: 18px;
      height: 18px;
      margin-left: 5px;
    }
`;
const PlayVoiceArea = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  
  img {
    width: 18px;
    height: 18px;
    margin-right: 3px;
  }
`;
const PlayIcon = styled.div`
    
    font-size: 8px;
    line-height: 10px;
    color: #08105D;
`;

const Timer = styled.div`
  font-size: 8px;
  line-height: 10px;
  color: #08105D;
  margin-left: 6px;
`;

