import {  useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editComment } from "../../store/action/board-action.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

export const CommentPreview = ({board, box, task}) => {

    const [editCommentId, setEditCommentId] = useState('')
    const dispatch = useDispatch()
    const { comments } = task;
    const isCommentsLength = () => {
        if (!comments) return
        return comments.length > 0;
    };
    
    const handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'text'
        setEditCommentId((prevFields) => ({ ...prevFields, [field]: value }))
    }
    const onEditComment = async (comment) => {
        // comment.txt = newComment.comments
        dispatch(editComment(board._id, box.id, task.id, comment))
        setEditCommentId('')
    }

    const onToggleEditComment = (commentId) => {
        setEditCommentId((editCommentId) ? '' : commentId)
    }


    return <ul className="comments left-details-container">
        {isCommentsLength() &&
            comments.map((comment, idx) => {
                return <div key={idx} className="comment-container">
                    {(comment.id === editCommentId) &&
                        <div className="edit-comment-container">
                            <input type="text" onChange={handleChange} className="edit-comment-txt" value={comment.txt} />
                            <div className="save-x-btn-container">
                                <button className="edit-save-btn" onClick={() => (onEditComment(comment))}>Save</button>
                                <button className="edit-x-btn" onClick={() => (onToggleEditComment(comment.id))}>
                                    <FontAwesomeIcon className="fa-solid fa-xmark" icon={faXmark} />
                                </button>
                            </div>
                        </div>}
                </div>
            })}

    </ul>
}