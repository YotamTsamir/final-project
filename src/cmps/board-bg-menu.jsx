import { BgImgList } from "./bg-image-list.jsx"
import { BgClrList } from "./bg-color-list.jsx"
import { boardService } from '../services/board.service'


export const BoardBgMenu = ({ dfBgs, handleChange }) => {



    return <div className="bg-container">
        <BgImgList
            dfBgs={dfBgs}
            onChange={handleChange} />

        <BgClrList
            dfBgs={dfBgs}
            onChange={handleChange} />
    </div>
}