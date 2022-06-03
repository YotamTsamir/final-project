import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBoard, setTask } from "../store/action/board-action";
import { boardService } from "../services/board.service";
import { InputDesc } from "./input-desc";
import { InputComments } from "./input-comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft, faXmark, faList, faWindowMaximize } from "@fortawesome/free-solid-svg-icons";
import { faWindowMaximize as faWindowMaximizeRegular } from "@fortawesome/free-regular-svg-icons";
import { DetailsTaskNav } from "./details-task-nav";
import { ActionMenu } from './action-menu'
import { CommentList } from "./details-comments/comment-list";
import { CheckList } from "./task-check-list";

import windowImg from '../imgs/window-details.png'
// import coverImg from '../imgs/cover.png'
import { utilService } from "../services/util.service";




export const TaskDetails = () => {
  const { board, box, task } = useSelector(
    (storeState) => storeState.boardModule
  );
  const [menuState, setMenuState] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
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
  // CHANGE FUNC IN SERVICE FROM GETBYID TO FIND
  useEffect(() => {
    (async () => {
      const { boardId, taskId } = params;
      const box = await boardService.findBoxByTaskId(boardId, taskId);
      const task = await boardService.getTaskById(boardId, box.id, taskId);
      dispatch(setTask(task, box));
    })()
  }, [board])


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
  if (!task) return <h1>Loading...</h1>
  return (
    <section className="the-great-one the-medium task-details-window"
      onClick={() => {
        onToggleDetails();
      }}>
      <div className="task-details"
        onClick={(ev) => ev.stopPropagation()}>
        <button
          className="exit-task-details-btn "
          onClick={() => {
            onToggleDetails();
          }}            >
          <FontAwesomeIcon className="fa-solid fa-xmark" icon={faXmark} />
        </button>
        <div className="task-details-cover-area">
          <div
            key={bg}
            className={`task-details-cover ${bg ? '' : 'no-color'}`}
            height={`${bg ? '90px;' : ''}`}
            style={{ background: bg }}
          >
            {task.bg && <button className="task-details-change-cover-btn" onClick={() => { toggleMenu() }}>
              <span><FontAwesomeIcon icon={faWindowMaximizeRegular} /></span>
              <p>Cover</p>
              {(menuState) && <ActionMenu topic={'Cover'} colors={colors} task={task} box={box} board={board} />}
            </button>}
          </div>
        </div>

        <div className="detail-header-container">
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
            <div className="members-labels-container">
              {(isMembers() &&
                // <div className={`members-members-title ${labels && labels.length ? "members-with-labels" : "members-no-labels"}`}>
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

                      })
                    }
                  </div>
                </div>
              )}
              <div className="task-detail-label-container">
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
              <div className="task-desc-header">
                <span className="left-side-icons"><FontAwesomeIcon icon={faAlignLeft} /></span>
                <div className="description section-header">Description</div>
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

      {/* <div onClick={() => {
        onToggleDetails();
      }} className="the-great-one the-medium"></div> */}
    </section>
  );
};
