import { useDraggable } from "react-use-draggable-scroll";
import { useRef } from "react";

export const BgImgList = ({ dfBgs, onChange }) => {
    const ref = useRef();
    const { events } = useDraggable(ref);

    // console.log(dfBgs)
    if (!dfBgs) return <h1>loading...</h1>
    return <ul className="bg-image"
        {...events}
        ref={ref} >
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
}