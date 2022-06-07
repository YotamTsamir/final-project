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
  const [register, entity, editEntity] = useFormRegister({ description: task?.description || "" })
  const [fieldsEdit, setFieldsEdit] = useState({ isDescription: false })
  const { description } = task
  const [isDescFocus, setIsDescFocus] = useState(false)

  const isEditShownDesc = () => {
    return !description || fieldsEdit.isDescription;
  };

  const onEditField = () => {
    setFieldsEdit({ ...fieldsEdit, isDescription: true });
  };

  const onEditTaskEntity = async (ev) => {
    console.log(ev)
    ev.preventDefault()
    const newTask = { ...task, description: entity.description }
    dispatch(editTask(board._id, box.id, newTask))
    dispatch(setTask(task, box))
    setFieldsEdit({ isDescription: false })
  };

  // const cancelDesc = () => {
  //   setFieldsEdit({ isDescription: false })
  // }

  const { text, ...rest } = register("description")

  return (
    <div className="desc-cmp">
      {isEditShownDesc() && (
        <form
          onSubmit={(ev) => {
            console.log('on submit')
            // onEditTaskEntity(ev)
          }}
          className="task-desc-form">
          <textarea
            placeholder="Add a more detailed descripton..."
            className={`task-desc-edit ${isDescFocus ? 'focused-desc' : 'not-focus-desc'}`}
            onFocus={() => setIsDescFocus(true)}
            onBlur={() => setIsDescFocus(false)}
            {...rest}
          >{text}</textarea>
          <div className="desc-btns-container">
           {isDescFocus && 
           <div className="desc-focus-btn-container">
            <button className="desc-save-btn desc-btn" onClick={() => console.log('on submit btn')}>Save</button>
            <button
              // onClick={}
              className="desc-cancel-btn desc-btn"
              type="button">
              Cancel
            </button>
          </div>
          }
          </div>
        </form>
      )}
      <div className="left-details-container">
        {!isEditShownDesc()  &&(
          <div
            className="curr-desc left-details"
            onClick={onEditField}>{description}
          </div>
        )}</div>
    </div>
  );
};
