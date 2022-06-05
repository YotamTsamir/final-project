import { useState } from "react";
import { useDispatch } from "react-redux";
import { editComment } from "../../store/action/board-action.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useFormRegister } from "../../hooks/useFormRegister.js";

export const CommentPreview = ({ comment, editComment, onToggleEditComment, onEditComment }) => {
    const [register, newComment, setNewComment] = useFormRegister({ editComment: editComment?.txt })

    const emitEditComment = (comment) => {
        comment.txt = newComment.editComment
        onEditComment(comment)
    }



    return <div className="comment-container">
        {editComment && (comment.id === editComment.id) &&
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