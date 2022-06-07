import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faFilter } from '@fortawesome/free-solid-svg-icons'


export const BoardHeaderCmpsRight = ({ isMobile, isFilterOrMenuOpen, onOpenFilterOrMenu }) => {

    return <React.Fragment>
        <button className={`filter-btn  ${isMobile ? 'filter-btn-on-mobile' : ''}`}
            onClick={() => onOpenFilterOrMenu('filter')}>
            <span className={isMobile ? 'filter-btn-on-mobile' : ''}>
                {(isFilterOrMenuOpen !== 'filter') && <FontAwesomeIcon icon={faFilter} />}
                {(isFilterOrMenuOpen === 'filter') && <FontAwesomeIcon icon={faX} />}
            </span>
            {!isMobile &&
                <p>Filter</p>
            }
        </button>
    </React.Fragment>
}