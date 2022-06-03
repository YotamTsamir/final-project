

export const TaskBgPreview = () => {


    return <div className="task-bg-preview-container">
        <h4 className="task-bg-preview-header">Size</h4>
        <div className="task-bg-preview">
            <div className="semi-size bg-preview">
                <div className="img-area bgc"
                    style={{ backgroundColor: 'blue' }}></div>
                <div className="task-area">
                    <div className="first-line bgc line"></div>
                    <div className="second-line bgc line"></div>
                    <div className="left-bottom-line">
                        <div className="left-element bgc"></div>
                        <div className="right-element bgc"></div>
                    </div>
                    <div className="right-bottom-line bgc"></div>
                </div>
            </div>
            <div className="full-size bg-preview bgc"
                style={{ backgroundColor: 'blue' }}>
                <div className="task-area">
                    <div className="first-line line"></div>
                    <div className="second-line line"></div>
                </div>
            </div>
        </div>
    </div>
}