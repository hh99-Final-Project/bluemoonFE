import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Comment from "./Comment";


CommentList.propTypes = {
    comments: PropTypes.array,
    setParentId: PropTypes.func,
    isReplyClicked: PropTypes.bool,
    replyClickHandler: PropTypes.func,
    parentCommentId: PropTypes.string
};

function CommentList(props) {

    const { comments, setParentId, isReplyClicked, replyClickHandler, parentCommentId } = props;

    return (
        <React.Fragment>
            <CommentsContainer>
                {
                    comments.map((comment) => {
                        return (
                            <Comment key={comment.commentUuid} comment={comment} replyClickHandler={replyClickHandler}
                                     setParentId={setParentId} isReplyClicked={isReplyClicked} parentCommentId={parentCommentId}/>
                        );
                    })
                }
            </CommentsContainer>
        </React.Fragment>
    );
}

export default CommentList;

const CommentsContainer = styled.div`
    width: 876px;
`;