import { useState, useEffect } from 'react'
import { TaskBgPreview } from './task-bg-preview'
import { boardService } from '../../services/board.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove } from '@fortawesome/free-solid-svg-icons'

export const TaskCoverMenu = () => {
    const [bgImgs, setBgImgs] = useState([])
    const [bgClrs, setBgClrs] = useState([])
    const [currBg, setCurrBg] = useState({})

    useEffect(() => {
        dgBgs()
    }, [])

    const dgBgs = () => {
        const bgsToDisplay = boardService.getDefaultBgs()
        setBgImgs(bgsToDisplay.image.splice(0, 6))
        setBgClrs(bgsToDisplay.color.splice(0, 10))
    }


    const onChangeBgImg = () => {
        console.log('hello')
    }

    return <div className="task-cover-menu">
        <div className='cover-menu-header'>
            <h2>Cover</h2>
            <button className='close-cover-menu'>
                <FontAwesomeIcon icon={faRemove} />
            </button>
        </div>
        <div><hr /></div>
        <TaskBgPreview />
        <h4 className='cover-menu-h4'>Colors</h4>
        <div className="color-grid">
            {bgClrs.map(color => {
                return <button className="cover-color"
                    style={{ backgroundColor: color }}>
                </button>
            })}
        </div>
        <h4 className="cover-menu-h4">Photos from Unsplash</h4>
        <div className="bg-container-cover-menu">
            {bgImgs.map(imgUrl => {
                return <button className='cover-img'
                    style={{ backgroundImage: `url(${imgUrl})` }}>
                </button>
            })}
        </div>
    </div>
}