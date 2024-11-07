import { FC, useEffect, useRef } from "react";
import classNames from "classnames"
import { useDrop } from "react-dnd";
import { useTodoListStore } from "../../stores";

interface GarbageBinProps {
    className?:string | string[]
}

export const GarbageBin:FC<GarbageBinProps> = (props) =>{

    const garbageBinRef = useRef<HTMLDivElement>(null)
    const deleteItem  = useTodoListStore((state)=> (state.deleteItem))

    const [{isOver},drop] = useDrop(()=>{
        return {
            accept:"list-item",
            drop(item: {id:string}) {
                deleteItem(item.id)
            },
            collect(monitor) {
                return {
                    isOver:monitor.isOver()
                }
            },
        }
    })

    useEffect(()=>{
        drop(garbageBinRef)
    },[drop])


    const cs = classNames(
        "h-240 w-240 border-2 border-black rounded-lg mt-20",
        "bg-orange-300",
        "leading-200 text-center text-2xl",
        "flex justify-center items-center",
        "cursor-move select-none",
        isOver ? "bg-yellow-400 border-dashed" : "",
        props.className
    )


    return (
        <div ref={garbageBinRef} className={cs}>垃圾箱</div>
    )
}