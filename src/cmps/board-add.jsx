import { useState } from 'react'
import { BoardBgMenu } from './board-bg-menu.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faEllipsis } from '@fortawesome/free-solid-svg-icons'

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
        <h2>Create Board</h2>
        <div><hr /></div>
        <div className="newboard-prev-container">
            <div className="board-prev newboard-prev"
                style={board.style}
            >
                {/* {board.title} */}
                <img src='https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg' />
            </div>
        </div>
        <div className="choose-bg">
            <div className='bg-menu-header'>
                <h3>Background:</h3>
                <buttom className="more-bgs">
                    <FontAwesomeIcon icon={faEllipsis} />
                </buttom>
            </div>
            <BoardBgMenu dfBgs={dfBgs}
                handleChange={handleChange} />
        </div>
        <h3>Board Title</h3>
        <input type="text" placeholder="Board name"
            value={board.title}
            name="title"
            onChange={(ev) => handleChange(ev)} />
        <button className="exit-add-btn"
            onClick={onCloseAddBoard}>
            <FontAwesomeIcon icon={faX} />
        </button>
        <div className='place-holder'></div>
        <button type="submit"
            className="submit-btn">Create New Board</button>
    </form>
}