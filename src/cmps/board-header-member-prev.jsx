import React from 'react'

export const BoardHeaderMemberPrev = ({ isMobile, board, setIsAddMember, isAddMember }) => {
    return <React.Fragment>
        <div className={`curr-task-members ${isMobile ? 'members-on-mobile' : ''}`}>
            {board.members.map((member, idx) => {
                if (!member) return
                return <div
                    key={idx}
                    className={`member-preview ${idx}`} >
                    <img src={member.avatar} alt="user-avatar" />
                </div>
            })}
        </div>

        <button className={`add-member-board ${isMobile ? 'add-member-mobile' : ''}`} onClick={() => setIsAddMember(!isAddMember)}>Add Member</button>
    </React.Fragment>
}