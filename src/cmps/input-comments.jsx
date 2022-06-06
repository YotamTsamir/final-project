import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormRegister } from "../hooks/useFormRegister";
import { editTask, setTask } from "../store/action/board-action";
import { boardService } from "../services/board.service";
import { useNavigate, useParams } from "react-router-dom";
import { utilService } from '../services/util.service.js'
import { userService } from "../services/user-service";
import { TimeAgo } from "../services/time-ago";

export const InputComments = ({ board, box, task }) => {

  const dispatch = useDispatch();

  const [register, entity, editEntity] = useFormRegister({ comment: "" });

  const [fieldsEdit, setFieldsEdit] = useState({ isCommentEdit: false });
  const { user } = useSelector((storeState) => storeState.userModule)
  const { comments } = task;
  const isEditShownCom = () => {
    return !comments.length > 0 || !fieldsEdit.isCommentEdit;
  };
  const onEditField = () => {
    setFieldsEdit({ isCommentEdit: !fieldsEdit.isCommentEdit });
  };


  const onEditTaskEntity = (ev) => {
    ev.preventDefault();
    const currUser = userService.getMiniUser()
    const newTask = {
      ...task, comments:
        [{
          txt: entity.comment,
          id: utilService.makeId(),
          createdAt: Date.now(),
          createdBy: currUser ? currUser : 'Guest'
        }, ...task.comments]
    };
    dispatch(editTask(board._id, box.id, newTask));
    dispatch(setTask(newTask, box))
    onEditField()
    entity.comment = "";
  };
  if (!comments || !box) return <h1>Loading...</h1>
  return (
    <div className="input-comment">
      <div className="avatar-comment-cmp-edit">
      <div className="comment-cmp-avatar">
        {(userService.getLoggedinUser().fullname !== 'Guest') ?
          <img className="comment-avatar-img" src={user.avatar} />
          :
          <img className="comment-avatar-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUqOq31iJPIGiwT8if3AxZugFDpkNPz5YXTg&usqp=CAU" />}
      </div></div>
      {fieldsEdit.isCommentEdit ?
        <form className="left-details-container form-comment-details"
          onSubmit={(ev) => {
            onEditTaskEntity(ev);
          }}
        >
          <div className="new-comment-container">
          <textarea
            placeholder="Write a comment..."
            className="task-comment-input"
            {...register("comment")}
            autoFocus
          ></textarea>
          <button className="save-comment-btn comment">Save</button>
        </div>
        </form>
        :
        <textarea onClick={onEditField}
          placeholder="Write a comment..."
          className="comment-cmp"
        ></textarea>
      }
    </div>

  );
};
