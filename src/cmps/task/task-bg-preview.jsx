

export const TaskBgPreview = ({ task }) => {


    return <div className="task-bg-preview-container">
        <h4 className="task-bg-preview-header">Size</h4>
        <div className="task-bg-preview">
            <div className="semi-size bg-preview">
                <div
                    className={`img-area ${task.bg ? '' : 'bgc'}`}
                    style={{
                        background: task.bg,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}>
                </div>
                <div className="task-area">
                    <div
                        className={`first-line  ${task.bg ? '' : 'bgc'} line`}
                        style={{
                            background: task.bg,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
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
                className={`full-size bg-preview  ${task.bg ? '' : 'bgc'}`}
                style={{
                    background: task.bg,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                <div className="task-area">
                    <div className="first-line line"></div>
                    <div className="second-line line"></div>
                </div>
            </div>
        </div>
    </div>
}