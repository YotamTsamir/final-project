import { useEffect, useState } from "react"
import { userService } from "../services/user-service"
import { boardService } from "../services/board.service"
import { useDispatch } from "react-redux"
import { updateBoard } from "../store/action/board-action"
export const AddMember = ({ board }) => {
    const [users, setUsers] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            const currUsers = await getUsers()
            setUsers(currUsers)
        })()
    }, [])
    const getUsers = async () => {
        return await userService.getUsers()
    }

    const onAddMember = (user) => {
        dispatch(updateBoard(user, board._id))
    }


    if (!users) return <h1>Loading...</h1>
    return <div className="users-choices">
        <h1 className="user-choices-header">Users to invite</h1>
        <div><hr /></div>
        {users.map((user, idx) => {
            return <div onClick={() => onAddMember(user)}
                key={idx}
                className={`user-preview ${idx}`} >
                <img src={user.avatar} />
                <h1>{user.fullname}</h1>
            </div>
        })}
    </div>
}