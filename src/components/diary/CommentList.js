import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import Comment from "./Comment";
import CommentInput from "./CommentInput";


CommentList.propTypes = {
    comments: PropTypes.array,
    postId: PropTypes.number
};

function CommentList(props) {

    const { comments, postId } = props;

    return (
        <React.Fragment>
            <CommentsContainer>
                {
                    comments.map((comment) => {
                        return <Comment key={comment.commentId} comment={comment}/>
                    })
                }
                <CommentInput postId={postId}/>
            </CommentsContainer>
        </React.Fragment>
    )
}

export default CommentList;

const CommentsContainer = styled.div`
    position: relative;
    width: 1164px;
    left: 50%;
    transform: translateX(-50%);
`;