

export const BoxFilterMenu = ({handleChange, filter, board,}) => {



    return <div className="filter-container">
        <h5 className="filter-header">Hello Filter<hr /></h5>
        <h6>Contains Keywords...</h6>
        <input type="text"
            name="title"
            placeholder="search by keywords..."
            value={filter.filterBy === "title" ?
                filter.value : ''}
            onChange={handleChange} />
        <div><hr /></div>
        <h6>Contain label...</h6>
        <div className="filter-by-label">
            {board.labels.map(label => {
                return <div
                    className="label-picker-container"
                    key={label.id}>
                    <input type="checkbox"
                        name="labelIds"
                        id={`check-label-${label.id}`}
                        value={label.id}
                        onClick={handleChange} />
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