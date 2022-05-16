import React, {useState} from "react";
import CommentInput from "./CommentInput";
import {CommentList} from "./index";
import {useQuery} from "react-query";
import {diaryApi} from "../../apis/diaryApi";
import PropTypes from "prop-types";

const CommentContainer = (props) => {

    const { diary, postId } = props;

    const [parentCommentId, setParentCommentId] = useState("");

    const setParentId = (id) => {
        setParentCommentId(id);
    };


    return (
        <React.Fragment>
            <CommentInput diary={diary} postId={postId} parentCommentId={parentCommentId}
                          setParentId={setParentId} />
            <CommentList comments={diary.comments} postId={diary.postId}
                         setParentId={setParentId} parentCommentId={parentCommentId} />
        </React.Fragment>
    );
};

CommentContainer.propTypes = {
    diary: PropTypes.object,
    postId: PropTypes.string
};

export default CommentContainer;