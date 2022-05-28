import { BgImgList } from "./bg-image-list.jsx"
import { BgClrList } from "./bg-color-list.jsx"


export const BoardBgMenu = ({ dfBgs, handleChange }) => {


    const onChange = ({ target }) => {
        handleChange({ target })
    }

    return <div className="bg-container">
        <BgImgList
            dfBgs={dfBgs}
            onChange={onChange} />

        <BgClrList 
        dfBgs={dfBgs}
        onChange={onChange}/>
    </div>
}