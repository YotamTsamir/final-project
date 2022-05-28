import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormRegister } from "../hooks/useFormRegister";
import { editTask, getBoard, setTask } from "../store/action/board-action";
import { boardService } from "../services/board.service";
import { useNavigate, useParams } from "react-router-dom";

export const InputComments = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { board, box, task } = useSelector(
    (storeState) => storeState.boardModule
  );

  useEffect(() => {
    (async () => {
      const { boardId, taskId } = params;
      dispatch(getBoard(boardId));
      const box = await boardService.findBoxByTaskId(boardId, taskId);
      const task = await boardService.getTaskById(boardId, box.id, taskId);
      dispatch(setTask(task, box));
    })();
  }, []);

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
    const newTask = { ...task, comments: [...task.comments, entity.comments] };
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
        <form className="form-comment-details"
          onSubmit={(ev) => {
            onEditTaskEntity(ev);
          }}
        >
          <textarea
            placeholder="Write a comment..."
            className="comment-input"
            rows="2"
            cols="50"
            {...rest}
          >{text}</textarea>
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
