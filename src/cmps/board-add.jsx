import { useState } from 'react'
import { boardService } from "../services/board.service"

export const BoardAdd = ({ dfBgs, onToggleAddBoard, onAddBoard }) => {
    const [isAddBoardOpen, setIsAddBoardOpen] = useState(false)
    const [board, setNewBoard] = useState({
        title: 'Hello',
        style: {
            backgroundImage: "url(https://img.freepik.com/free-vector/gradient-background-vector-spring-colors_53876-117271.jpg?w=360)",
            // backgroundColor: '',
        }
    })


    const closeAddBoard = () => {
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

        // console.log(board)
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
            <div className="bg-container">
                <ul className="bg-image">
                    {dfBgs.image.map((imgUrl, idx) => {
                        return <li key={`${idx}`}>
                            <button
                                style={{ backgroundImage: `url(${imgUrl})` }}
                                onClick={handleChange}
                                name="backgroundImage"
                                type="button"
                                value={`url(${imgUrl})`}>
                            </button>
                        </li>
                    })}
                </ul>
                <ul className="bg-color">
                    {dfBgs.color.map((color, idx) => {
                        return <li key={`${idx+10}`}>
                            <button
                                style={{ backgroundColor: `${color}` }}
                                onClick={handleChange}
                                name="backgroundColor"
                                type="button"
                                value={`${color}`}>
                            </button>
                        </li>
                    })}
                </ul>
            </div>
        </div>


        <button className="exit-add-btn"
            onClick={closeAddBoard}>
            X
        </button>
        <button type="submit"
            className="submit-btn">Create New Board</button>
    </form>
}