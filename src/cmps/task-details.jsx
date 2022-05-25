import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormRegister } from "../hooks/useFormRegister"
import { loadBoards, setNewBoard, getBoard } from "../store/action/board-action";
import { boardService } from "../services/board.service";

export const TaskDetails = () => {
  const [fieldsEdit, setFieldsEdit] = useState({
    description: false,
    comment: false,
  })
  const [register, newDesc, editDesc] = useFormRegister({ description: '' })
  const [registerComment, newComment, editComment] = useFormRegister({ comment: '' })
  const { board, box, task } = useSelector((storeState) => storeState.boardModule);
    
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onToggleDetails = () => {
    navigate(`/b/${board._id}`);
  };

  const onEditTaskDesc = async (ev) => {
    ev.preventDefault()
    const newBoard = await boardService.editTaskDesc(board._id, box, task, newDesc.description)
    dispatch(setNewBoard(newBoard))
    dispatch(getBoard(board._id))
    setFieldsEdit({...fieldsEdit, description: false})
  }

  const onEditField = (field, value) => {
    setFieldsEdit({...fieldsEdit, description: true}) 
    editDesc((prevFields) => ({ ...prevFields, [field]: value }))
  }

  return (
    <div className="task-details">
      <button className="x-btn" onClick={() => {onToggleDetails()}}>X</button>
      <h1>{task?.title}</h1>
      <h1 className="box-title">
        in list <span className="box-title-details">{box?.title}</span>
      </h1>

    <div className="task-description">
      <div>Description</div>
      {!task?.description || fieldsEdit.description ?<form onSubmit={(ev) => { onEditTaskDesc(ev, board._id, box?.id, newDesc.description) }}><input className="desc-input" {...register('description')} /> </form> : <div onClick={() => onEditField('description', task.description)}>{task.description}</div>}
      <button className="save-btn">Save</button>
      <button className="cancel-btn">Cancel</button>
    </div>
    <div className="Activity">
      <div>Activity</div>
      <input></input>

    </div>
    </div>
  );
};
