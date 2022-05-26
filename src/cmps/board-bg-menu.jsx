export const BoardBgMenu = ({dfBgs, handleChange}) => {

    const onChange = ({target}) => {
        handleChange({target})
    }

    return <div className="bg-container">
        <ul className="bg-image">
            {dfBgs.image.map((imgUrl, idx) => {
                return <li key={`${idx}`}>
                    <button
                        style={{ backgroundImage: `url(${imgUrl})` }}
                        onClick={onChange}
                        name="backgroundImage"
                        type="button"
                        value={`url(${imgUrl})`}>
                    </button>
                </li>
            })}
        </ul>
        <ul className="bg-color">
            {dfBgs.color.map((color, idx) => {
                return <li key={`${idx + 10}`}>
                    <button
                        style={{ backgroundColor: `${color}` }}
                        onClick={onChange}
                        name="backgroundColor"
                        type="button"
                        value={`${color}`}>
                    </button>
                </li>
            })}
        </ul>
    </div>
}