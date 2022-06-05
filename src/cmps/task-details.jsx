import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBoard, setTask, editTask } from "../store/action/board-action";
import { boardService } from "../services/board.service";
import { InputDesc } from "./input-desc";
import { InputComments } from "./input-comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft, faXmark, faList, faWindowMaximize, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faWindowMaximize as faWindowMaximizeRegular, faSquare } from "@fortawesome/free-regular-svg-icons";
import { DetailsTaskNav } from "./details-task-nav";
import { ActionMenu } from './action-menu'
import { CommentList } from "./details-comments/comment-list";
import { CheckList } from "./task-check-list";
import { utilService } from "../services/util.service";




export const TaskDetails = () => {
  const { board, box, task } = useSelector(
    (storeState) => storeState.boardModule
  );
  const [menuState, setMenuState] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isPassed, setIsPassed] = useState()
  const { bg, description } = task;
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { boardId } = params;
      if (boardId === board._id) return
      dispatch(getBoard(boardId));
      return () => {
        boardService.saveTask(board._id, task, box.id)
      }
    })();
  }, []);

  useEffect(() => {
    // if(!task?.date?.timeStamp) return 
    if ((Date.now() - Date.parse(task.date.timeStamp)) >= 0) {
      setIsPassed('passed')
    }
    else if (Date.now() - (Date.parse(task.date.timeStamp)) >= -(60 * 60 * 24 * 1000)) {
      setIsPassed('almost')
    }
  }, [task])

  // CHANGE FUNC IN SERVICE FROM GETBYID TO FIND
  useEffect(() => {
    (async () => {
      const { boardId, taskId } = params;
      const box = await boardService.findBoxByTaskId(boardId, taskId);
      const task = await boardService.getTaskById(boardId, box.id, taskId);
      dispatch(setTask(task, box));
    })()
  }, [board])

  const toggleComplete = () => {
    if (task.date.isComplete) {
      const newTask = { ...task, date: { ...task.date, isComplete: '' } }
      dispatch(editTask(board._id, box.id, newTask))
      // setIsComplete('')
    }
    else {
      const newTask = { ...task, date: { ...task.date, isComplete: 'complete' } }
      dispatch(editTask(board._id, box.id, newTask))
      // setIsComplete('complete')
    }
  }

  const getLabels = () => {
    if (!task.labelIds) return;
    return task.labelIds.map((labelId) =>
      boardService.getLabelById(labelId, board)
    );
  };

  const onToggleDetails = () => {
    navigate(`/b/${board._id}`);
  };

  //CHANGE NO NEED FOR THIS FUNC
  const isDesc = () => {
    if (!description) return false
    return true
  }

  const isMembers = () => {
    if (!task.members) return false
    if (!task.members.length) return false
    if (task.members.length > 0) return true
  };
  const randomMemberColor = () => {
    return utilService.getRandomColor()
  }

  const colors = ['#7BC86C', '#F5DD29', '#EF7564', '#CD8DE5', '#5BA4CF', '#29CCE5', '#6DECA9', 'orange', '#FF8ED4', '#8675A9']
  // NO NEED JUST USE THE INSIDE FUNC
  const toggleMenu = () => {
    setMenuState(!menuState)
  }

  const labels = getLabels()

  const isLabelsLength = () => {
    if (!labels) return
    if (labels.length > 0) return true
  };

  // console.log(task)
  if (!task) return <h1>Loading...</h1>
  return (
    <section className="the-great-one the-medium task-details-window"
      onClick={() => {
        onToggleDetails();
      }}>
      <div className="task-details"
        onClick={(ev) => ev.stopPropagation()}>
        <button
          className={`exit-task-details-btn ${bg ? 'yes-cover' : 'no-cover'}`}
          onClick={() => {
            onToggleDetails();
          }}>
          <FontAwesomeIcon className="fa-solid fa-xmark" icon={faXmark} />
        </button>
        <div className="task-details-cover-area">
          {bg && <div
            key={bg}
            className={`task-details-cover `}
            style={{
              background: bg,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}
          >
            {task.bg && <button className="task-details-change-cover-btn" onClick={() => { toggleMenu() }}>
              <span><FontAwesomeIcon icon={faWindowMaximizeRegular} /></span>
              <p>Cover</p>
              {(menuState) &&
                <ActionMenu
                  topic={'Cover'}
                  colors={colors}
                  task={task}
                  box={box}
                  board={board}
                  coverMenuClass="from-cover-area" />}
            </button>}
          </div>}
        </div>

        <div className={`detail-header-container ${bg ? 'yes-cover' : 'no-cover'}`}>
          <div className="task-details-title-container">
            <span className="left-side-icons"><FontAwesomeIcon icon={faWindowMaximize} /></span>
            <h1 className="task-details-title" >{task?.title}</h1>
          </div>
          <h1 className="parent-box-refrance">
            in list <span className="box-title-details">{box.title}</span>
          </h1>
        </div>

        <div className="task-detail-body-container">
          <div className="task-detail-main-container">
            {(isMembers() || isLabelsLength()) && <div className="members-labels-container">
              {(isMembers() &&
                <div className="task-detail-members-container">
                  <div className="members-header">Members</div>
                  <div className="task-members">
                    {(task.members) &&
                      task.members.map((member, idx) => {
                        return <div key={idx}
                          className="task-detail-member">
                          <div >
                            <img className={`task-detail-member ${idx}`} src={member.avatar} />
                          </div>

                        </div>
                      })}
                  </div>
                </div>)}
              <div className="task-detail-label-container">
                {isLabelsLength() &&
                  <div className="labels-header"> Labels</div>}
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
                      )
                    }))}
                </div>
              </div>
              {task.date &&
                <div className="task-details-date-container">
                  <h4 className="date-header">Due Date</h4>
                  <div className={`date-preview ${isPassed} ${task.date.isComplete}`} onClick={(ev) => toggleComplete(ev)}>
                    {(!task.date.isComplete) && <FontAwesomeIcon icon={faSquare} />}
                    {(task.date.isComplete) && <FontAwesomeIcon icon={faSquareCheck} />}
                    <span>{task.date?.month || ''} {task.date?.day || ''}</span>
                  </div>
                </div>}
            </div>}

            <div className="task-description">
              <div
                className={`task-desc-header ${(isMembers() || isLabelsLength()) ? '' : 'is-first'}`}>
                <span className="left-side-icons">
                  <FontAwesomeIcon icon={faAlignLeft} />
                </span>
                <div className="description section-header">
                  Description
                </div>
              </div>
              {(isDesc()) && <InputDesc className="is-desc" />}
              {(!isDesc()) && <InputDesc className="no-desc" />}
              {(task.checkLists?.length > 0) && (task.checkLists.map(checkList => { return <CheckList board={board} box={box} checkList={checkList} task={task} /> }))}
              <div className="activity-container">
                <div className="task-activity-header">
                  <span className="left-side-icons"><FontAwesomeIcon icon={faList} /></span>
                  <div className="activity section-header">Activity</div>
                </div>
                <InputComments board={board} box={box} task={task} />
                <CommentList board={board} box={box} task={task} />
              </div>
            </div>
          </div>

          <DetailsTaskNav className="details-menu" setIsEdit={setIsEdit} isEdit={isEdit} box={box} task={task} board={board} />

        </div>


      </div>
    </section>
  );
};
