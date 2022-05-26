import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormRegister } from "../hooks/useFormRegister";
import { editTask, getBoard, setTask } from "../store/action/board-action";
import { boardService } from "../services/board.service";
import { InputDesc } from "./input-desc";
import { InputComments } from "./input-comments";

export const TaskDetails = () => {
  const [fieldsEdit, setFieldsEdit] = useState({
    isComments: false,
  });
  const [labels, setLabels] = useState([])
  const { board, box, task } = useSelector(
    (storeState) => storeState.boardModule
  );

  const [register, entity, editEntity] = useFormRegister({
    description: task?.description || "",
    comments: task?.comment || "",
  });

  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { boardId, taskId } = params;
      dispatch(getBoard(boardId));
      const box = await boardService.findBoxByTaskId(boardId, taskId);
      const task = await boardService.getTaskById(boardId, box.id, taskId);
      dispatch(setTask(task, box));
      setLabels(getLabels)
    })();
  }, []);
  const getLabels = () => {
    if (!task.labelIds) return
    // console.log(task.labelIds)
    const taskLabels = task.labelIds.map(labelId => boardService.getLabelById(labelId, board))
    console.log(taskLabels)
    return taskLabels
}

  const onToggleDetails = () => {
    navigate(`/b/${board._id}`);
  };

  const isCommentsLength = () => {

    // return comments.length > 0;
  };

  const { comments, labelIds } = task;
  return (
    <div className="task-details">
      <div className="detail-header-container">
        <h1>{task?.title}</h1>
        <button
          className="x-btn"
          onClick={() => {
            onToggleDetails();
          }}
        >
          X
        </button>
      </div>
      <h1 className="box-title">
        in list <span className="box-title-details">{box.title}</span>
      </h1>
      <div className="label-container">
      <div className="labels-header"> Labels</div> 
        <div className="label-detail-container">
          {labels.map(label => {
            return <div style={{ backgroundColor: label.color }} className="label-details">
              {label.title}
              </div>
          })}
          </div>
          </div>
      <div className="task-description">
        <div className="description">Description</div>
        <InputDesc />
        <div className="activity-container">
          <div className="activity">Activity</div>
          <InputComments />
          <ul>
            {isCommentsLength() &&(
             comments.map((comment, idx) => {
                 return <li key={idx}>{comment}</li>;
              }))}
          </ul>
        </div>
      </div>
    </div>
  );
};
