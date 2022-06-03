import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormRegister } from "../hooks/useFormRegister";
import { editTask } from "../store/action/board-action";
import { boardService } from "../services/board.service";
import { useNavigate, useParams } from "react-router-dom";
import { utilService } from '../services/util.service.js'
export const InputComments = ({board, box, task}) => {

  const dispatch = useDispatch();

  const [register, entity, editEntity] = useFormRegister({ comment: "" });

  const [fieldsEdit, setFieldsEdit] = useState({ isComments: false });

  const { comments } = task;
  const isEditShownCom = () => {
    return !comments.length > 0 || !fieldsEdit.isComments;
  };
  const onEditField = () => {
    setFieldsEdit({ ...fieldsEdit, isComments: true });
  };


  const onEditTaskEntity = async (ev) => {
    ev.preventDefault();
    const newTask = { ...task, comments: 
      [...task.comments, {
      txt: entity.comment,
      id: utilService.makeId(),
      createdAt: Date.now(),
      
    }] };
    
    dispatch(editTask(board._id, box.id, newTask));
    setFieldsEdit({ isComments: false });
    entity.comment = "";
    console.log('enityty', entity.comment)
  };



  if(!comments || !box) return <h1>Loading...</h1>
  return (
    <div className="comment-cmp">
      {isEditShownCom() && (
        <form className="left-details-container form-comment-details"
          onSubmit={(ev) => {
            onEditTaskEntity(ev);
          }}
        >
          <textarea
            placeholder="Write a comment..."
            className="task-comment-input"
            {...register("comment")}
          ></textarea>
          <button className="save-comment-btn comment">Save</button>
        </form>
      )}
      {!isEditShownCom() && (
        <div
          className="curr-comment"
          onClick={() => onEditField("isComments")}
        ></div>
      )}
    </div>
  );
};
