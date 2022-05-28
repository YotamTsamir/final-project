import { useDraggable } from "react-use-draggable-scroll";
import { useRef } from "react";


export const BgClrList = ({ dfBgs, onChange }) => {
    const ref = useRef();
    const { events } = useDraggable(ref);


    return <ul className="bg-color"
    {...events}
    ref={ref}>
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
}