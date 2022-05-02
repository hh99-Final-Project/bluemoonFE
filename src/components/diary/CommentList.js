import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import Comment from "./Comment";
import CommentInput from "./CommentInput";


CommentList.propTypes = {
    comments: PropTypes.array
};

function CommentList(props) {

    // const { comments } = props;

    let comments = [
        {
            "isShow": true,
            "commentId": 1,
            "nickname": "햄",
            "content": "나의 댓글입니다",
            "createAt": "2022-05-02",
            "file": "file"
        },
        {
            "isShow": true,
            "commentId": 2,
            "nickname": "햄2",
            "content": "나의 댓글입니다2",
            "createAt": "2022-05-01",
            "file": "file"
        },
    ]

    return (
        <React.Fragment>
            <CommentsContainer>
                {
                    comments.map((comment) => {
                        return <Comment key={comment.commentId} comment={comment}/>
                    })
                }
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