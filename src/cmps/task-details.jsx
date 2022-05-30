import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormRegister } from "../hooks/useFormRegister";
import { editTask, getBoard, setTask, onRemoveComment, editComment } from "../store/action/board-action";
import { boardService } from "../services/board.service";
import { InputDesc } from "./input-desc";
import { InputComments } from "./input-comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft, faXmark, faList } from "@fortawesome/free-solid-svg-icons";
import { useEffectUpdate } from "../hooks/useEffectUpdate";
import { DetailsTaskNav } from "./details-task-nav";
import { LabelMenu } from './label-menu'
import windowImg from '../imgs/window-details.png'
import coverImg from '../imgs/cover.png'





export const TaskDetails = () => {
  const { board, box, task } = useSelector(
    (storeState) => storeState.boardModule
  );
  const [labels, setLabels] = useState([]);
  const [isEdit, setIsEdit] = useState(false)
  const [editCommentId, setEditCommentId] = useState('')

  const [register, newComment, editNewComment] = useFormRegister({ comments: comments })
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [menuState, setMenuState] = useState(false)
  
  const { comments, labelIds, bg, decription } = task;
  useEffect(() => {
    (async () => {
      const { boardId, taskId } = params;
      dispatch(getBoard(boardId));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { boardId, taskId } = params;
      const box = await boardService.findBoxByTaskId(boardId, taskId);
      const task = await boardService.getTaskById(boardId, box.id, taskId);
      dispatch(setTask(task, box));
    })()
  },[board])

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

  const onEditComment = async (comment) => {
    comment.txt = newComment.comments
    dispatch(editComment(board._id, box.id, task.id, comment))
    setEditCommentId('')

  }
  const onToggleEditComment = (commentId) => {
    setEditCommentId((editCommentId)? '': commentId)
  }

  const onDeleteComment = (ev, commentId) => {
    dispatch(onRemoveComment(board._id, box.id, task.id, commentId))
  }

  const isDesc = () => {
    if (!decription) return false
    return true
  }
  const isMembers = () => {
    // console.log('bigger than 0', task.members.length > 0)
    // console.log('members?', !task.members)
    if (!task.members) return false
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

  return (
    <section>

      <div className="task-details">
        <div className="color-cover-details">
          {/* {(topic === 'Cover') && (colors.map(color => {
                return ( onClick={() => onChangeColor(color)} */}
          <div
            key={bg}
            className={`cover-menu-color-detail ${bg ? '' : 'no-color'}`}
            height={`${bg ? '90px;' : ''}`}
            style={{ background: bg }}
          >
            <div className=" x-btn-cover">

              <button
                className="x-btn "
                onClick={() => {
                  onToggleDetails();
                }}

              >
                <FontAwesomeIcon className="fa-solid fa-xmark" icon={faXmark} />
              </button>
              {task.color && <button className="details-task-cover-btn" onClick={() => { toggleMenu() }}>
                <img className="menu-imgs" src={coverImg} />
                Cover
                {(menuState) && <LabelMenu topic={'Cover'} colors={colors} task={task} box={box} board={board} />}
              </button>}
            </div>
          </div>
        </div>
        <div className="left-details-container detail-header-container">
          <div className="icon-desc-details">
            <img className="window-img-details" src={windowImg} />
            <h1 className="left-details" >{task?.title}</h1>
          </div>
          <h1 className="box-title left-details">
            in list <span className="box-title-details">{box.title}</span>
          </h1>
        </div>
        <div className="detail-menu-container">
          <div className="detail-container">
            <div className="members-labels">
              <div className={`members-members-title ${labels && labels.length ? "members-with-labels" : "members-no-labels"}`}>
                {(isMembers()) && (<div className="members-header"> Members</div>)}
                {(!isMembers()) && (<div className="members-header" style={{ display: "none" }}> Members</div>)}

                {(isMembers() &&
                  <div className="task-members">
                    {(task.members) && task.members.map((member, idx) => {

                      return (<div key={idx} className="task-member">
                        <div className="member-background">
                          <p style={{ backgroundColor: bg }}>{member.init}</p>
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
              <div className="icon-desc-details left-details-container">
                <FontAwesomeIcon className='fa-solid fa-align-left' icon={faAlignLeft} />
                <div className="description left-details">Description</div>
              </div>
              {(isDesc()) && <InputDesc className="is-desc" />}
              {(!isDesc()) && <InputDesc className="no-desc" />}
              <div className="activity-container">
                <div className="left-details-container icon-details-list">
                  <FontAwesomeIcon className="fa-regular fa-list" icon={faList} />
                  <div className="activity left-details">Activity</div>
                </div>
                <InputComments />
                <ul className="comments left-details-container">

                  {isCommentsLength() &&
                    comments.map((comment, idx) => {
                      return <div key={idx} className="comment-container">
                        {(comment.id !== editCommentId) ?
                        <div>
                          <li className="comment left-details" key={idx}>
                            {comment.txt}
                              </li> 
                            <div className="comment-edit-delete-container">
                              <div className="comment-edit" onClick={()=>(onToggleEditComment(comment.id))}>Edit</div><div className="edit-delete--">-</div>
                              <div className="comment-delete"
                                onClick={(ev) => onDeleteComment(ev, comment.id)}>Delete</div>
                            </div>
                            </div>:
                          <div>
                            <textarea className="comment-isEdit" {...register('comments')} > </textarea>
                            <button onClick={()=> (onEditComment(comment))}>Save</button>
                            <button onClick={()=> (onToggleEditComment(comment.id))}>X</button>
                          </div>}
                      </div>
                    })}

                </ul>
              </div>
            </div>
          </div>

          <DetailsTaskNav className="details-menu" openTask={openTask} setIsEdit={setIsEdit} box={box} task={task} board={board} />

        </div>


      </div>

      <div onClick={() => {
        onToggleDetails();
      }} className="the-great-one the-medium"></div>
    </section>
  );
};
