import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { onRemoveComment, editComment as editCommentAction } from "../../store/action/board-action.js";
import { CommentPreview } from "./comment-preview.jsx";
import { userService } from "../../services/user-service.js";
import { TimeAgo } from "../../services/time-ago.js";
import { useFormRegister } from "../../hooks/useFormRegister.js";

export const CommentList = ({ board, box, task }) => {
    const [fieldsEdit, setFieldsEdit] = useState({ isEditOpen: false })
    const [editComment, setEditComment] = useState(null)
    const [user, editUser] = useState(userService.getLoggedinUser())
    const [commentList, editCommentList] = useState(0)
    const dispatch = useDispatch()
    const { comments } = task;
    const [register, newComment, editNewComment] = useFormRegister({ comment: editComment?.txt || "" })

    useEffect(() => {
        editCommentList(commentList + 1)
    }, [])

    useEffect(() => {
        if (editComment) {
            editNewComment({comment: editComment.txt})
        }
    }, [editComment])

    const isEditShownComment = () => {
        return fieldsEdit.isEditOpen;
    };
    const onEditComment = async (comment) => {
        dispatch(editCommentAction(board._id, box, task, comment));
        setEditComment(null)
    }
    const onDeleteComment = (ev, comment) => {
        console.log('onDeleteComment comment list', comment)
        const newTask = { ...task, comments: [...task.comments, comment] }
        dispatch(onRemoveComment(board._id, box, newTask, comment))
    }
    const isCommentsLength = () => {
        if (!comments) return
        return comments.length > 0;
    };

    const getTimeStamp = (comment) => {
        const timeStamp = comment.createdAt
        const timeAgo = TimeAgo(timeStamp)
        return timeAgo
    }
    const onToggleEditComment = (comment) => {
        setEditComment((editComment) ? null : comment)
        // onEditComment(comment)
    }
    const { text, ...rest } = register("description")
    if (!comments) return <h1>Loading..</h1>
    return <ul className="comments-container left-details-container">
        {isCommentsLength() &&
            comments.map((comment, idx) => {
                return <div key={idx} className="comment-container">

                    <div className="comment-avatar">
                        {(comment.createdBy !== 'Guest') ?
                            <img src={comment.createdBy.avatar} />
                            :
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUqOq31iJPIGiwT8if3AxZugFDpkNPz5YXTg&usqp=CAU" />}
                    </div>
                    <div className="comment-fullname-timestamp">
                        <div className="comment-createdBy-timeStamp">
                        {comment.createdBy !== "Guest" ? 
                                <div>
                                <span>{comment.createdBy.fullname}</span>
                                <span className="comment-timeStamp"> {getTimeStamp(comment)}</span> 
                                </div>
                                :
                                <div> 
                                <span>Guest</span>
                                <span className="comment-timeStamp"> {getTimeStamp(comment)}</span>
                                </div>
                        } </div>

                        {!editComment || (comment.id !== editComment.id) ?
                            <div>
                                <div className="comment-edit-delete-container">
                                    {isEditShownComment() &&
                                        <input {...register('comment')} className="edit-comment-txt"  />}
                                    {!isEditShownComment() &&
                                        <li className="comment left-details" key={idx}>
                                            {comment.txt}
                                        </li>
                                    }
                                    <div className="comment-btn-container">
                                        <button className="comment-edit" onClick={() => (onToggleEditComment(comment))}>Edit</button>
                                        <div className="edit-delete--">-</div>
                                        <button className="comment-delete"
                                            onClick={(ev) => onDeleteComment(ev, comment)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                            : <CommentPreview comment={comment} editComment={editComment} onToggleEditComment={onToggleEditComment} onEditComment={onEditComment} />}
                    </div></div>
            })}
    </ul>
}

