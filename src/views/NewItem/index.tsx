import { FC, useEffect, useRef } from "react"
import classNames from 'classnames';
import { useDrag } from "react-dnd";

interface NewItemProps {
    className?:string | string[]
}

export const NewItem:FC<NewItemProps> = (props) =>{

    const itemRef = useRef<HTMLDivElement>(null)

    const [{ dragging }, drag] = useDrag({
        type:"new-item",
        item:{},
        collect(monitor) {
            return {
                dragging:monitor.isDragging()
            }
        },
    })

    useEffect(()=>{
        drag(itemRef)
    },[drag])

    const cs = classNames(
        "h-100 border-2 border-black rounded-lg mt-20",
        "leading-100 text-center text-2xl",
        "bg-green-300",
        " cursor-move select-none ",
        "flex justify-center items-center",
        dragging ? 'border-dashed bg-white' : "",
        props.className
    )


    return (
        <div ref={itemRef} className={cs}>新的待办事项</div>
    )
}