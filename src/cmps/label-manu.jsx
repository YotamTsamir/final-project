import { boardService } from "../services/board.service"

export const LabelManu = ({board,task}) => {
    const onAddLabel = (labelId) => {
        boardService.addLabelToTask(task,labelId,board)
    }

    return <div className="label-manu">
        <h1 >Labels</h1>
        <hr />
        <input type="text" />
        <p>Labels</p>
        {(board.labels.map(label=>{
            return (
                <div onClick={()=>onAddLabel(label.id)} style={{backgroundColor:label.color}}>{label.title}</div>
            )
        }))}

    </div>
}