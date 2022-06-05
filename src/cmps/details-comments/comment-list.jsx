import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { onRemoveComment, editComment } from "../../store/action/board-action.js";
import { CommentPreview } from "./comment-preview.jsx";
import { userService } from "../../services/user-service.js";
import { TimeAgo } from "../../services/time-ago.js";
export const CommentList = ({ board, box, task }) => {

    const [fieldsEdit, setFieldsEdit] = useState({ isEditOpen: false })
    const [editCommentId, setEditCommentId] = useState('')
    const [user, editUser] = useState(userService.getLoggedinUser())
    const [commentList, editCommentList] = useState(0)
    const dispatch = useDispatch()

    const { comments } = task;
    // useEffect(() => {
    //     setInterval(() => {
    //         editCommentList(commentList + 1)
    //     }, 60000)
    // }, [commentList])

    // console.log('userrrrrr', user)
    const isEditShownComment = () => {
        return fieldsEdit.isEditOpen;
    };
    const onEditComment = async (comment) => {
        dispatch(editComment(board._id, box, task, comment));
        setEditCommentId('')
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

    const getTimeStamp = (comment) => {
        const timeStamp = comment.createdAt
        const timeAgo = TimeAgo(timeStamp)
        return timeAgo
    }
    const onToggleEditComment = (comment) => {
        setEditCommentId((editCommentId) ? '' : comment.id)
        // onEditComment(comment)
    }
    if (!comments) return <h1>Loading..</h1>
    return <ul className="comments-container left-details-container">
        {isCommentsLength() &&
            comments.map((comment, idx) => {
                return <div key={idx} className="comment-container">
                    
                    <div 
                    className="comment-avatar"
                    >{(user && user.avatar && comment.createdBy) ? 
                     <img src={user.avatar} />
                        :
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUqOq31iJPIGiwT8if3AxZugFDpkNPz5YXTg&usqp=CAU" />
                    }</div>
                    <div className="comment-fullname-timestamp">
                    {(comment.createdBy) && 
                    <div className="comment-createdBy-timeStamp">
                        {(user) ? comment.createdBy : "Guest"}
                        <span className="comment-timeStamp"> {getTimeStamp(comment)}</span>
                        </div>}
                        
                    {(comment.id !== editCommentId) ?
                        <div>
                            <div className="comment-edit-delete-container">
                                {isEditShownComment() &&
                                    <input type="text" onChange={handleChange} className="edit-comment-txt" value={comment.txt} />}
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
                        : <CommentPreview comment={comment} editCommentId={editCommentId} onToggleEditComment={onToggleEditComment} onEditComment={onEditComment} />}
                </div></div>
            })}
    </ul>
}

