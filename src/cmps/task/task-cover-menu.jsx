import { useState, useEffect } from 'react'
import { TaskBgPreview } from './task-bg-preview'
import { boardService } from '../../services/board.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove } from '@fortawesome/free-solid-svg-icons'

export const TaskCoverMenu = ({ dfBgs, onChangeBgClr, onChangeBgImg, task, board, box }) => {


    
    return <div className={`task-cover-menu`}>

        <TaskBgPreview board={board} box={box} task={task} />
        <h4 className='cover-menu-h4'>Colors</h4>
        <div className="color-grid">
            {dfBgs.color.map((color, idx) => {
                if (idx < 10) {
                    return <div className="cover-color" onClick={() => onChangeBgClr(color)}
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
                    return <div className='cover-img' onClick={() => onChangeBgImg(imgUrl)}
                        key={idx}
                        style={{ backgroundImage: `url(${imgUrl})` }}>
                    </div>
                }
            })}
        </div>
    </div>
}