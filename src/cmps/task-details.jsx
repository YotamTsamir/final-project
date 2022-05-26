import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormRegister } from "../hooks/useFormRegister";
import {
  editTask,
  getBoard,
  setTask
} from "../store/action/board-action";
import { boardService } from "../services/board.service";

export const TaskDetails = () => {
  const [fieldsEdit, setFieldsEdit] = useState({
    isDescription: false,
    isComments: false,
  });
  const { board, box, task } = useSelector(
    (storeState) => storeState.boardModule
  );
  const [registerComment, newComment, editComment] = useFormRegister({
    comment: "",
  });
  const [register, newDesc, editDesc] = useFormRegister({
    description: task?.description || "",
  });

  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { boardId, taskId } = params
      dispatch(getBoard(boardId))
      const box = await boardService.findBoxByTaskId(boardId, taskId)
      const task = await boardService.getTaskById(boardId, box.id, taskId)
      dispatch(setTask(task, box))
    })()
  }, [])

  const onToggleDetails = () => {
    navigate(`/b/${board._id}`)
  };

  const onEditTaskDesc = async (ev) => {
    ev.preventDefault()
    const newTask = {...task, description: newDesc.description}
    dispatch(editTask(board._id, box.id, newTask))
    dispatch(getBoard())
    setFieldsEdit({ ...fieldsEdit, isDescription: false })
  }

  const onEditTaskComments = async (ev) => {
    ev.preventDefault()
    const newTask = {...task, comments: newComment.comments}
    console.log('dandan', box.id);
    dispatch(editTask(board._id, box.id, newTask))
    dispatch(getBoard())
    setFieldsEdit({ ...fieldsEdit, isComments: false })
  };

  const onEditField = (field, value) => {
    setFieldsEdit({ ...fieldsEdit, isDescription: true })
    editDesc((prevFields) => ({ ...prevFields, [field]: value }))
  };
  // const { comments } = task
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

      <div className="task-description">
        <div className="description">Description</div>
        {/* <button onClick={onEditTaskDesc()}>Edit</button> */}
        {(!task.description || fieldsEdit.isDescription) ? (
          <form
            onSubmit={(ev) => {
              onEditTaskDesc(ev, board._id, box?.id, newDesc.description);
            }}
          >
            <input
              placeholder="Add a more detailed descripton..."
              className="desc-input"
              {...register("description")}
            />
            <button className="save-btn">Save</button>
            <button className="cancel-btn" type="button">
              Cancel
            </button>
          </form>
        ) : (
          <div
            className="curr-desc"
            onClick={() => onEditField("description", task.description)}
          >
            {task.description}
          </div>
        )}
              <div className="activity-container">
        <div className="activity">Activity</div>
        



        {(task.comments && !task.comments.length || fieldsEdit.isComments) ? (
          <form
            onSubmit={(ev) => {
              onEditTaskComments(ev, board._id, box?.id, newComment.comments);
            }}
          >
            <input
              placeholder="Write a comment..."
              className="comment-input"
              {...registerComment("comment")}
            />
            <button className="save-btn-comment">Save</button>
          </form>
        ) : (
          <div
            className="curr-comment"
            onClick={() => onEditField("comment", task.comments)}
          >
            {task.comments && task.comments.map(comment => {
              return <h1>Comment</h1>
          })}
          
        </div>
        )}
      </div>
    </div>
    </div>
  );
};
