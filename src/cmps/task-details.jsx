import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormRegister } from "../hooks/useFormRegister"
import { setNewBoard } from "../store/action/board-action";
import { boardService } from "../services/board.service";

export const TaskDetails = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [register, newDesc, editDesc] = useFormRegister({ description: '' })
  const { board, box, task } = useSelector(
    (storeState) => storeState.boardModule
  );
  
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const onToggleDetails = () => {
    navigate(`/b/${board._id}`);
  };

  const onEditTaskDesc = async (ev) => {
    ev.preventDefault()
    const newBoard = await boardService.editTaskDesc(board._id, box, task, newDesc.description)
    setIsEdit(!isEdit) 
    dispatch(setNewBoard(newBoard))
  }

  return (
    <div className="task-details">
      <button onClick={() => {onToggleDetails()}}>X</button>
      <h1>{task?.title}</h1>
      <h1 className="box-title">
        in list <span className="box-title-details">{box?.title}</span>
      </h1>

    <div className="task-description">
      <div>Description</div>
      {!task?.description ?<form onSubmit={(ev) => { onEditTaskDesc(ev, board._id, box?.id, newDesc.description) }}><input {...register('description')} /> <button>Save</button></form> : <div>{task.description}</div>}

    </div>
    </div>
  );
};
