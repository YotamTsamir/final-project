import { BgImgList } from "./bg-image-list.jsx"
import { BgClrList } from "./bg-color-list.jsx"
import { boardService } from '../services/board.service'


export const BoardBgMenu = ({ handleChange }) => {


    // const onChange = ({ target }) => {
    //     handleChange({ target })
    // }

    return <div className="bg-container">
        <BgImgList
            dfBgs={boardService.getDefaultBgs()}
            onChange={handleChange} />

        <BgClrList
            dfBgs={boardService.getDefaultBgs()}
            onChange={handleChange} />
    </div>
}