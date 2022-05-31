import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormRegister } from "../hooks/useFormRegister";
import { editTask, getBoard, setTask } from "../store/action/board-action";
import { boardService } from "../services/board.service";
import { useNavigate, useParams } from "react-router-dom";
import { utilService } from '../services/util.service.js'
export const InputComments = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { board, box, task } = useSelector(
    (storeState) => storeState.boardModule
  );



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
    const newTask = { ...task, comments: [...task.comments, {
      txt: entity.comments,
      id: utilService.makeId(),
      createdAt: Date.now(),
    
    }] };
    dispatch(editTask(board._id, box.id, newTask));
    dispatch(setTask(task, box));
    setFieldsEdit({ isComments: false });
    entity.comments = "";
  };

  const {text, ...rest} = register("comments")

  if(!comments) return <h1>Loading...</h1>
  return (
    <div className="comment-cmps">
      {isEditShownCom() && (
        <form className="left-details-container form-comment-details"
          onSubmit={(ev) => {
            onEditTaskEntity(ev);
          }}
        >
          <textarea
            placeholder="Write a comment..."
            className="comment-input left-details"
            rows="2"
            cols="50"
            {...register("comments")}
          ></textarea>
          <button className="save-btn">Save</button>
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
