import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormRegister } from "../hooks/useFormRegister";
import { editTask, getBoard, setTask } from "../store/action/board-action";
import { boardService } from "../services/board.service";
import { useNavigate, useParams } from "react-router-dom";


export const InputDesc = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { board, box, task } = useSelector((storeState) => storeState.boardModule);
    
  
  useEffect(() => {
    (async () => {
      const { boardId, taskId } = params;
      dispatch(getBoard(boardId));
      const box = await boardService.findBoxByTaskId(boardId, taskId);
      const task = await boardService.getTaskById(boardId, box.id, taskId);
      dispatch(setTask(task, box));
    })();
  }, []);

  const [register, entity, editEntity] = useFormRegister({  description: task?.description || ""})
    
  const [fieldsEdit, setFieldsEdit] = useState({   isDescription: false})
     
  const { description } = task
  const isEditShownDesc = () => {
    return !description|| fieldsEdit.isDescription;
  };
  const onEditField = () => {
    setFieldsEdit({ ...fieldsEdit, isDescription: true });
  };
  const onEditTaskEntity = async (ev) => {
    ev.preventDefault()
    const newTask = { ...task, description: entity.description }
    dispatch(editTask(board._id, box.id, newTask))
    dispatch(setTask(task, box))
    setFieldsEdit({ isDescription: false })
  };
 const cancelDesc = () => {
  setFieldsEdit({ isDescription: false })
 }
  const {text, ...rest} = register("description")

  return (
    <div className="desc-cmp">
      {/* <button onClick={onEditTaskDesc()}>Edit</button> */}
      {isEditShownDesc() && (
        <form
          onSubmit={(ev) => {
            onEditTaskEntity(ev)
          }}
        >
          <textarea
            placeholder="Add a more detailed descripton..."
            className="desc-input"
            rows="4"
            cols="50"
            {...rest}
          >{text}</textarea>
          <div className="desc-btn-container">
          <button className="save-btn">Save</button>
          <button onClick={cancelDesc} className="cancel-btn" type="button">
            Cancel
          </button>
          </div>
        </form>
      )}
      {!isEditShownDesc() && (
        <div
          className="curr-desc"
          onClick={() =>onEditField() }>{description}
        </div>
      )}
    </div>
  );
};
