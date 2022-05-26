import { useState } from 'react'
import { BoardBgMenu } from './board-bg-menu.jsx'

export const BoardAdd = ({ dfBgs, onToggleAddBoard, onAddBoard }) => {
    const [isAddBoardOpen, setIsAddBoardOpen] = useState(false)
    const [board, setNewBoard] = useState({
        title: 'Hello',
        style: {
            backgroundImage: "url(https://img.freepik.com/free-vector/gradient-background-vector-spring-colors_53876-117271.jpg?w=360)",
        }
    })


    const onCloseAddBoard = () => {
        setIsAddBoardOpen(!isAddBoardOpen)
        onToggleAddBoard()
    }

    const onCreateBoard = (ev) => {
        ev.preventDefault()
        onAddBoard(board)
    }

    const handleChange = ({ target }) => {
        const field = target.name
        const value = target.value

        if (target.type === 'button') {
            return setNewBoard((prevState) => ({
                ...prevState,
                style: { [field]: value }
            }))
        }
        setNewBoard((prevState) =>
            ({ ...prevState, [field]: value }))
    }

    return <form className="board-add"
        onSubmit={(ev) => onCreateBoard(ev)}>
        <input type="text" placeholder="Board name"
            value={board.title}
            name="title"
            onChange={(ev) => handleChange(ev)} />

        <div className="newboard-prev-container">
            <div className="board-prev newboard-prev"
                style={board.style}
            >
                {board.title}
            </div>
        </div>

        <div className="choose-bg">
            <h3>Choose your background:</h3>
            <BoardBgMenu dfBgs={dfBgs}
                handleChange={handleChange} />
        </div>

        <button className="exit-add-btn"
            onClick={onCloseAddBoard}>
            X
        </button>
        <button type="submit"
            className="submit-btn">Create New Board</button>
    </form>
}