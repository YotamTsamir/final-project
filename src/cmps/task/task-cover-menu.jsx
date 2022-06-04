import { useState, useEffect } from 'react'
import { TaskBgPreview } from './task-bg-preview'
import { boardService } from '../../services/board.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove } from '@fortawesome/free-solid-svg-icons'

export const TaskCoverMenu = ({ dfBgs, toggleMenu, topic }) => {


    const onChangeBgImg = () => {
        console.log('hello')
    }

    return <div className="task-cover-menu">
        <div className='cover-menu-header'>
            <h2>Cover</h2>
            <div className='close-cover-menu' onClick={() => toggleMenu(topic)}>
                <FontAwesomeIcon icon={faRemove} />
            </div>
        </div>
        <div><hr /></div>
        <TaskBgPreview />
        <h4 className='cover-menu-h4'>Colors</h4>
        <div className="color-grid">
            {dfBgs.color.map((color, idx) => {
                if (idx < 10) {
                    // console.log(color, idx)
                    return <div className="cover-color"
                        key={idx}
                        style={{ backgroundColor: color }}>
                    </div>
                }
            })}
        </div>
        <h4 className="cover-menu-h4">Photos from Unsplash</h4>
        <div className="bg-container-cover-menu">
            {dfBgs.image.map((imgUrl, idx) => {
                if (idx < 6) {
                    // console.log(imgUrl, idx)
                    return <div className='cover-img'
                        key={idx}
                        style={{ backgroundImage: `url(${imgUrl})` }}>
                    </div>
                }
            })}
        </div>
    </div>
}