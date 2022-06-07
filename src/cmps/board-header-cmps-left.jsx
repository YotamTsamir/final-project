import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { AddMember } from "./add-member"
import { BoardHeaderMemberPrev } from './board-header-member-prev.jsx'

export const BoardHeaderCmpsLeft = ({ isMobile, setIsAddMember, onToggleStarBoard, board, isAddMember }) => {

    return <React.Fragment>
        <button
            className={`fav-btn  
            ${isMobile ? 'star-on-mobile' : ''}`}
            onClick={onToggleStarBoard}>
            {!board.isStarred &&
                <FontAwesomeIcon className="star-board" icon={faStarRegular} />}
            {board.isStarred &&
                <FontAwesomeIcon className="starred-board" icon={faStar} />}

            {isMobile && <span className="on-mobile-star-board">Set as Favourite</span>}
        </button>
        {!isMobile &&
            <span className="line-between-header">|</span>
        }
        {(board.members && !isMobile) &&
            <BoardHeaderMemberPrev
                board={board}
                setIsAddMember={setIsAddMember}
                isAddMember={isAddMember}
                isMobile={isMobile}
            />}
        {(isAddMember) && <AddMember board={board} />}
    </React.Fragment>
}