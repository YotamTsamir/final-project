
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {onRemoveComment } from "../../store/action/board-action.js";

export const CommentList = () => {
    const { board, box, task } = useSelector(
        (storeState) => storeState.boardModule
    );
    const [editCommentId, setEditCommentId] = useState('')

    const dispatch = useDispatch()

    const { comments } = task;
    const onDeleteComment = (ev, commentId) => {
        dispatch(onRemoveComment(board._id, box.id, task.id, commentId))
    }

    const isCommentsLength = () => {
        if (!comments) return
        return comments.length > 0;
    };

    const onToggleEditComment = (commentId) => {
        setEditCommentId((editCommentId) ? '' : commentId)
    }


    return <ul className="comments left-details-container">
        {isCommentsLength() &&
            comments.map((comment, idx) => {
                return <div key={idx} className="comment-container">
                    {(comment.id !== editCommentId) &&
                        <div>
                            <li className="comment left-details" key={idx}>
                                {comment.txt}
                            </li>
                            <div className="comment-edit-delete-container">
                                <div className="comment-edit" onClick={() => (onToggleEditComment(comment.id))}>Edit</div><div className="edit-delete--">-</div>
                                <div className="comment-delete"
                                    onClick={(ev) => onDeleteComment(ev, comment.id)}>Delete</div>
                            </div>
                        </div>
                    }
                </div>
            })}
    </ul>
}
