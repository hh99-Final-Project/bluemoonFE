import React, {useEffect} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Comment from "./Comment";


const CommentList = (props) => {

    const { comments, setParentId, parentCommentId } = props;

    return (
        <React.Fragment>
            <CommentsContainer>
                {
                    comments.map((comment) => {
                        return (
                            <Comment key={comment.commentUuid} comment={comment}
                                     setParentId={setParentId} parentCommentId={parentCommentId}/>
                        );
                    })
                }
            </CommentsContainer>
        </React.Fragment>
    );
};

CommentList.propTypes = {
    comments: PropTypes.array,
    setParentId: PropTypes.func,
    isReplyClicked: PropTypes.bool,
    replyClickHandler: PropTypes.func,
    parentCommentId: PropTypes.string
};

export default CommentList;

const CommentsContainer = styled.div`
    width: 876px;
`;