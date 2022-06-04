import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

export const BoxFilterMenu = ({ labelFilter, setLabelFilter, boardFilter, onToggleMenu, board }) => {

    const onAddLabelFilter = (labelId) => {
        if (labelFilter.includes(labelId)) {
            const labelIdx = labelFilter.findIndex(currLabelId => currLabelId === labelId)
            const newLabelFilter = [...labelFilter]
            newLabelFilter.splice(labelIdx, 1)
            setLabelFilter(newLabelFilter)
            return
        }
        setLabelFilter([...labelFilter, labelId])
    }


    return <div className="filter-container">
        <button className='close-board-menu-btn'
            title="close menu"
            onClick={() => onToggleMenu(false)}>
            <FontAwesomeIcon icon={faX} />
        </button>
        <h5 className="filter-header">Filter</h5>
        <div><hr /></div>
        <div className="filter-by-kw">
            <h6>Keywords</h6>
            <input
                {...boardFilter('filter')}
                placeholder="search by keywords..."
            />
            <div><hr /></div>
        </div>
        <div className="filter-by-label">
            <h6>Label</h6>
            {board.labels.map(label => {
                let checkeds;
                if (labelFilter.includes(label.id)) checkeds = 'checked'
                else checkeds = 'false'
                return <div
                    className="label-picker-container"
                    key={label.id}>
                    {(labelFilter.includes(label.id)) ? <input type="checkbox"
                        checked
                        onChange={() => onAddLabelFilter(label.id)}
                        name="labelIds"
                        id={`check-label-${label.id}`}
                    /> :
                        <input type="checkbox"
                            onChange={() => onAddLabelFilter(label.id)}
                            name="labelIds"
                            id={`check-label-${label.id}`}
                        />}
                    <label
                        htmlFor={`check-label-${label.id}`}
                        style={{ backgroundColor: label.color }}>
                        <p>{label.title}</p>
                    </label>
                </div>
            })}
        </div>
    </div>
}