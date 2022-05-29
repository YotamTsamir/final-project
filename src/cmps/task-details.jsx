import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormRegister } from "../hooks/useFormRegister";
import { editTask, getBoard, setTask } from "../store/action/board-action";
import { boardService } from "../services/board.service";
import { InputDesc } from "./input-desc";
import { InputComments } from "./input-comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft, faXmark, faList } from "@fortawesome/free-solid-svg-icons";
import { useEffectUpdate } from "../hooks/useEffectUpdate";
import { DetailsTaskNav } from "./details-task-nav";
import { LabelMenu } from './label-menu'


export const TaskDetails = () => {
  const [labels, setLabels] = useState([]);
  const [isEdit, setIsEdit] = useState(false)
  const { board, box, task } = useSelector(
    (storeState) => storeState.boardModule
  );
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [menuState, setMenuState] = useState(false)

  useEffect(() => {
    (async () => {
      const { boardId, taskId } = params;
      dispatch(getBoard(boardId));
      const box = await boardService.findBoxByTaskId(boardId, taskId);
      const task = await boardService.getTaskById(boardId, box.id, taskId);
      dispatch(setTask(task, box));
    })();
  }, []);

  useEffect(() => {
    setLabels(getLabels());
  }, [task])

  const getLabels = () => {
    if (!task.labelIds) return;
    return task.labelIds.map((labelId) =>
      boardService.getLabelById(labelId, board)
    );
  };

  const onToggleDetails = () => {
    navigate(`/b/${board._id}`);
  };
  const openTask = () => {
    navigate(`task/${task.id}`)
    setIsEdit(false)
  }
  const isCommentsLength = () => {
    if (!comments) return
    return comments.length > 0;
  };


  const isMembers = () => {
    if (!task.members) return
    if (task.members.length > 0) return true
  };
  const isLabelsLength = () => {
    if (!labels) return
    if (labels.length > 0) return true
  };
  const colors = ['#7BC86C', '#F5DD29', '#EF7564', '#CD8DE5', '#5BA4CF', '#29CCE5', '#6DECA9', 'orange', '#FF8ED4', '#8675A9']

  const toggleMenu = () => {
    setMenuState(!menuState)
  }

  const { comments, labelIds, color } = task;
  return (
    <section>

      <div onClick={() => {
        onToggleDetails();
      }} className="the-great-one the-medium"></div>
      <div className="task-details">
        <div className="color-cover-details">
          {/* {(topic === 'Cover') && (colors.map(color => {
                return ( onClick={() => onChangeColor(color)} */}
          <div
            key={color}
            className={`cover-menu-color-detail ${color ? '' : 'no-color'}`}
            style={{ backgroundColor: color }}
          >
            <div className="x-btn-cover">
              <button
                className="x-btn"
                onClick={() => {
                  onToggleDetails();
                }}
              >
                <FontAwesomeIcon className="fa-solid fa-xmark" icon={faXmark} />
              </button>
              {task.color && <button className="details-task-cover-btn" onClick={() => { toggleMenu() }}>
                Cover
                {(menuState) && <LabelMenu topic={'Cover'} colors={colors} task={task} box={box} board={board} />}
              </button>}
            </div>
          </div>
        </div>
        <div className="detail-header-container">
          <h1>{task?.title}</h1>

          <h1 className="box-title">
            in list <span className="box-title-details">{box.title}</span>
          </h1>
        </div>
        <div className="detail-menu-container">
          <div className="detail-container">
            <div className="members-labels">
              <div className="members-members-title">
                {(isMembers()) && (<div className="members-header"> Members</div>)}
                {(isMembers() &&
                  <div className="task-members">
                    {(task.members) && task.members.map((member, idx) => {

                      return (<div key={idx} className="task-member">
                        <div className="member-background">
                          <p style={{ backgroundColor: color }}>{member.init}</p>
                        </div>
                      </div>)
                    })
                    }
                  </div>)}</div>
              <div className="label-container">
                {isLabelsLength() && <div className="labels-header"> Labels</div>}
                <div className="label-detail-container">
                  {isLabelsLength() && (
                    labels.map((label) => {
                      return (
                        <div
                          key={label.id}
                          style={{ backgroundColor: label.color }}
                          className="label-details"
                        >
                          {label.title}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
            <div className="task-description">
              <div className="icon-desc-details">
                <FontAwesomeIcon className='fa-solid fa-align-left' icon={faAlignLeft} />
                <div className="description">Description</div>
              </div>
              <InputDesc />
              <div className="activity-container">
                <div className="icon-details-list">
                  <FontAwesomeIcon className="fa-regular fa-list" icon={faList} />
                  <div className="activity">Activity</div>
                </div>
                <InputComments />
                <ul className="comments">
                  {isCommentsLength() &&
                    comments.map((comment, idx) => {
                      return <li className="comment" key={idx}>{comment}</li>;
                    })}
                </ul>
              </div>
            </div>
          </div>

          <DetailsTaskNav className="details-menu" openTask={openTask} setIsEdit={setIsEdit} box={box} task={task} board={board} />

        </div>


      </div>
    </section>
  );
};
