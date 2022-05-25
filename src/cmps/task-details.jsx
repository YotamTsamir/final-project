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
  const { board, box, task } = useSelector((storeState) => storeState.boardModule);
  const [registerComment, newComment, editComment] = useFormRegister({ comment: '' })
  const [register, newDesc, editDesc] = useFormRegister({ description: task?.description || '' })
    
  useEffect(()=> {
    console.log(task)
  },[])
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onToggleDetails = () => {
    navigate(`/b/${board._id}`);
  };


  const onEditTaskDesc = async (ev) => {
    console.log('CHEKCING');
    ev.preventDefault()
    const newBoard = await boardService.editTaskDesc(board._id, box, task, newDesc.description)
    dispatch(setNewBoard(newBoard))
    setFieldsEdit({...fieldsEdit, description: false})
  }

  const onEditField = (field, value) => {
    setFieldsEdit({...fieldsEdit, description: true}) 
    editDesc((prevFields) => ({ ...prevFields, [field]: value }))
  }

  return (
    <div className="task-details">
      <div className="detail-header-container">
      <h1>{task?.title}</h1>
      <button className="x-btn" onClick={() => {onToggleDetails()}}>X</button>
      </div>
      <h1 className="box-title">
        in list <span className="box-title-details">{box?.title}</span>
      </h1>

    <div className="task-description">
      <div className="description">Description</div>
      {!task?.description || fieldsEdit.description ?<form onSubmit={(ev) => { onEditTaskDesc(ev, board._id, box?.id, newDesc.description) }}><input placeholder="Add a more detailed descripton..." className="desc-input" {...register('description')} /> <button className="save-btn">Save</button>
      <button className="cancel-btn" type="button">Cancel</button></form> : <div onClick={() => onEditField('description', task.description)}>{task.description}</div>}
      {console.log(task.description)}
      
    </div>
    <div className="activity">
      <div className="activity">Activity</div>
      <input className="comment-input" placeholder="Add a comment..."></input>

    </div>
    </div>
  );
};
