import { BoxPreview } from "./box-preview"

export const BoxList = ({boxes,board,onAddTask}) => {
    if(!boxes) return <h1>Loading...</h1>
    return boxes.map(box => <BoxPreview onAddTask={onAddTask} board={board} box={box} key={box.id} />)
}