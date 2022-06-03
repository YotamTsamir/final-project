
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onRemoveComment, editComment } from "../../store/action/board-action.js";
import { CommentPreview } from "./comment-preview.jsx";

export const CommentList = ({ board, box, task }) => {

    // const [fieldsEdit, setFieldsEdit] = useState({ isEditOpen: false })
    const [editCommentId, setEditCommentId] = useState('')

    const dispatch = useDispatch()

    const { comments } = task;
    // const isEditShownComment = () => {
    //     console.log(fieldsEdit.isEditOpen)
    //     return fieldsEdit.isEditOpen;
    // };
    const onEditComment = async (comment) => {
        console.log('box comment list', box)
        // comment.txt = newComment.comments
        dispatch(editComment(board._id, box, task, comment));
        setEditCommentId('')
        // setFieldsEdit({ ...fieldsEdit, isEditOpen: false });
    }
    const onDeleteComment = (ev, comment) => {
        dispatch(onRemoveComment(board._id, box.id, task, comment))
    }
    const handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'text'
        setEditCommentId((prevFields) => ({ ...prevFields, [field]: value }))
    }
    const isCommentsLength = () => {
        if (!comments) return
        return comments.length > 0;
    };

    const onToggleEditComment = (comment) => {
        setEditCommentId((editCommentId) ? '' : comment.id)
        // setFieldsEdit({ ...fieldsEdit, isEditOpen: true });
        onEditComment(comment)
    }

    return <ul className="comments-container">
        <CommentPreview board={board} box={box} task={task} />
        {isCommentsLength() &&
            comments.map((comment, idx) => {
                return <div key={idx} className="comment-container">
                    {(comment.id !== editCommentId) &&
                        <div>

                            <div className="comment-edit-delete-container">
                                <div className="comment-edit" onClick={() => (onToggleEditComment(comment))}>Edit</div>
                                {/* {isEditShownComment() &&
                                    <input type="text" onChange={handleChange} className="edit-comment-txt" value={comment.txt} />}
                                {!isEditShownComment() && */}
                                    <li className="comment left-details" key={idx}>
                                        {comment.txt}
                                    </li>
                                {/* } */}

                                <div className="edit-delete--">-</div>

                                <div className="comment-delete"
                                    onClick={(ev) => onDeleteComment(ev, comment)}>Delete</div>
                            </div>
                        </div>
                    }
                </div>
            })}
    </ul>
}
