import { boardService } from "../services/board.service"

export const BoardAdd = ({closeAddBoard}) => {


    return <form className="board-add" 
    onSubmit={boardService.addBoard} 
    onClick={(ev) => ev.stopPropagation()}>
        <input type="text" placeHolder="Board name" />

        <button>Create New Board</button>
    </form>
}