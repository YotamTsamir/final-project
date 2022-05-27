import { useState } from 'react'
import { LabelMenu } from './label-menu'

export const DetailsTaskNav = ({ board, task, box, onEditTaskTitle, setIsEdit }) => {
    const [menuState, setMenuState] = useState({
        'Edit label': false,
        'Change cover': false,
        'Edit dates': false,
    })

    const toggleMenu = (menuName) => {
        const newMenuState = {}
        for (const key in menuState) {
            newMenuState[key] = key === menuName ? !menuState[menuName] : false
        }
        setMenuState(newMenuState)
    }

    const onOpenUserMenu = () => {
        setUserMenu(!userMenu)
    }

    const menuBtns = [
        { txt: 'Edit label'},
        { txt: 'Change members'},
        { txt: 'Change cover' },
        { txt: 'Move'},
        { txt: 'Copy'},
        { txt: 'Edit dates'},
        { txt: 'Archive'},
    ]

    const colors=['red','blue','grey','black','yellow','orange']
    return <section>
        <div className='add-to-card'>Add to card</div>
        <div className="details-task-nav">
            {menuBtns.map(btn => {
                return (
                    <button key={btn.txt} className="details-task-nav-btn" onClick={() => {toggleMenu(btn.txt)}}>
                        {btn.txt}
                        {(menuState['Edit label']) && btn.txt === 'Edit label' && <LabelMenu topic={'Labels'} setIsEdit={setIsEdit} onEditTaskTitle={onEditTaskTitle} task={task} box={box} board={board} />}
                        {(menuState['Change cover']) && btn.txt === 'Change cover' && <LabelMenu topic={'Cover'} colors={colors} task={task} box={box} board={board}/>}
                    </button>
                )
            })}
        </div>
        
    </section>
}