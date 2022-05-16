import React, {useState} from "react";
import CommentInput from "./CommentInput";
import {CommentList} from "./index";
import {useQuery} from "react-query";
import {diaryApi} from "../../apis/diaryApi";


const CommentContainer = (props) => {

    const {diary, postId} = props;

    const [parentCommentId, setParentCommentId] = useState("");
    const [isReplyClicked, setIsReplyClicked] = useState(false);

    const setParentId = (id) => {
        setParentCommentId(id);
    };

    const replyClickHandler = (bool) => {
        setIsReplyClicked(bool);
    };



    return (
        <React.Fragment>
            <CommentInput diary={diary} postId={postId} parentCommentId={parentCommentId}
                          replyClickHandler={replyClickHandler} setParentId={setParentId} />
            <CommentList comments={diary.comments} postId={diary.postId} replyClickHandler={replyClickHandler}
                         setParentId={setParentId} isReplyClicked={isReplyClicked} parentCommentId={parentCommentId} />
        </React.Fragment>
    );
};

export default CommentContainer;