import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleDetails } from "../store/action/board-action";

export const TaskDetails = () => {
  const { task } = useSelector((storeState) => storeState.boardModule);
  const { board } = useSelector((storeState) => storeState.boardModule);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const onToggleDetails = () => {
    console.log(board._id)
    navigate(`/b/${board._id}`)
  }
  // if (!task) return <h1>asdasd</h1>;
  return (
    <div className='task-details'>
      <button onClick={() => { onToggleDetails() }}>X</button>
      <h1>{task.title}</h1>
      <h1>asdasd</h1>
    </div >
  );
};
