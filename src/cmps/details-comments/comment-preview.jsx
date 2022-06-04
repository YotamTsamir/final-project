import { useState } from "react";
import { useDispatch } from "react-redux";
import { editComment } from "../../store/action/board-action.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useFormRegister } from "../../hooks/useFormRegister.js";

export const CommentPreview = ({ comment, editCommentId, onToggleEditComment, onEditComment }) => {
    const [register, newComment, setNewComment] = useFormRegister({ editComment: '' })

    const emitEditComment = (comment) => {
        console.log('COMMENT',comment)
        comment.txt = newComment.editComment
        onEditComment(comment)
    }



    return <div className="comment-container">
        {(comment.id === editCommentId) &&
            <div className="edit-comment-container">
                <input {...register('editComment')} className="edit-comment-txt" />
                <div className="save-x-btn-container">
                    <button className="edit-save-btn" onClick={() => emitEditComment(comment)}>Save</button>
                    <button className="edit-x-btn" onClick={() => (onToggleEditComment(comment.id))}>
                        <FontAwesomeIcon className="fa-solid fa-xmark" icon={faXmark} />
                    </button>
                </div>
            </div>}
    </div>
}