import { useDispatch } from "react-redux"
import { editTask } from "../../store/action/board-action"

export const TaskBgPreview = ({ task, box, board }) => {
    const dispatch = useDispatch()
    const setTaskBcgToFull = (isFull) => {
        const newTask = { ...task, isFull }
        dispatch(editTask(board._id, box.id, newTask))

    }
    console.log(task)
    return <div className="task-bg-preview-container">
        <h4 className="task-bg-preview-header">Size</h4>
        <div className="task-bg-preview">
            <div
                style={{  border: (task.isFull) ? '' : '2px solid #0079bf' }}
                className="semi-size bg-preview">
                <div
                    onClick={() => setTaskBcgToFull(false)}
                    className={`img-area ${task.bg ? '' : 'bgc'}`}
                    style={{
                        background: task.bg,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',

                        // border: (task.isFull) ? '2px solid #0079bf;' : '2px solid #0079bf;' 
                    }}>
                </div>
                <div className="task-area">
                    <div
                        className={`first-line  ${task.bg ? '' : 'bgc'} line`}
                        style={{
                            background: task.bg,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                    </div>
                    <div className={`second-line  ${task.bg ? '' : 'bgc'} line`}
                        style={{
                            background: task.bg,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}>
                    </div>
                    <div
                        className="left-bottom-line">
                        <div
                            className={`left-element  ${task.bg ? '' : 'bgc'}`}
                            style={{
                                background: task.bg,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}>
                        </div>
                        <div
                            className={`right-element  ${task.bg ? '' : 'bgc'}`}
                            style={{
                                background: task.bg,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}>
                        </div>
                    </div>
                    <div
                        className={`right-bottom-line  ${task.bg ? '' : 'bgc'}`}
                        style={{
                            background: task.bg,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}>
                    </div>
                </div>
            </div>
            <div
                onClick={() => setTaskBcgToFull(true)}
                className={`full-size bg-preview  ${task.bg ? '' : 'bgc'}`}
                style={{
                    background: task.bg,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: (task.isFull) ? '2px solid #0079bf' : ''
                }}>
                <div className="task-area">
                    <div className="first-line line"></div>
                    <div className="second-line line"></div>
                </div>
            </div>
        </div>
    </div>
}