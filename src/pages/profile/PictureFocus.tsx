//styling
import { useEffect, useState } from "react";
import "./focus_style.scss";

interface PictureFocusProps {
    data: object,
    focus: boolean
    setFocus: Function
}

const PictureFocus:React.FC<any> = ({ open, setOpen, postLength }) => {

    const [current, setCurrent] = useState<any>(null);

    useEffect(() => {
        setCurrent(open);
    }, [])

    useEffect(() => {
        console.log(current)
    }, [current])

    const moveLeft = () => {
        if (current > 0) {
            setCurrent(current - 1);
        }
    }

    const moveRight = () => {
        if (current < postLength - 1) {
            setCurrent(current + 1);
        }
    }


    if (open === false) return (null)

    return (
        <>
        <div className="background-wrapper"></div>
        <button className="left-arrow" onClick={() => {moveLeft()}}>Left</button>
        <div className="post-wrapper">
            
        </div>
        <button className="right-arrow" onClick={() => {moveRight()}}>Right</button>
        </>
    )
}

export default PictureFocus;