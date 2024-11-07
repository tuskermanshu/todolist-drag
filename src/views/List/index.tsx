import classNames from "classnames"
import { FC, useEffect, useRef, useState } from "react"
import { useDrag, useDrop } from "react-dnd"
import {ListItem, useTodoListStore} from "../../stores/index.ts"
import { Input } from "antd"
import { animated, useTransition } from "@react-spring/web"

interface ListProps{
    className?: string | string[]
}

interface ItemProps {
    data:ListItem
}

interface GapProps {
    id?:string
}


const Item:FC<ItemProps> = (props) =>{

    const {data} = props
    const itemRef = useRef<HTMLDivElement>(null)
    const [editing,setEditing] =  useState(false)
    const [editingContent,setEditingContent] = useState(data.content)
    const updateItem = useTodoListStore((state)=>state.updateItem)

    const [{dragging},drag] = useDrag({
        type:"list-item",
        item:{
            id: data.id
        },
        collect(monitor) {
            return{
                dragging:monitor.isDragging()
            }
        },
    })

    const handleInputBlur = () => {
        setEditing(false);
        updateItem({
            ...data,
            content: editingContent
        })
    }

    useEffect(()=>{
        drag(itemRef)
    },[drag])

    return (
        <div 
            ref={itemRef} 
            className={classNames(
                "h-100 border-2 border-black bg-blue-300 mb-10 p-10 rounded-lg",
                "flex justify-start items-center",
                "text-xl tracking-wide",
                dragging? 'bg-white border-dashed' : ''
            )}
            onDoubleClick={()=>{setEditing(true)}}
        
        >
            <input type="checkbox" className=" w-40 h-40 mr-10" onChange={(e)=>{
                updateItem({
                    ...data,
                    status: e.target.value ? 'done' : 'todo'
                })
            }}/>
            <p>
                {
                    editing ? 
                        <Input 
                            value={editingContent} 
                            onChange={(e)=>{setEditingContent(e.target.value)}}
                            onBlur={handleInputBlur}
                            size="large"
                            
                        /> 
                        : data.content
                }
            </p>
        </div>
    )
}

const Gap:FC<GapProps> = (props) => {

    const {id} = props
    const gapRef = useRef<HTMLDivElement>(null)

    const addItem = useTodoListStore((state)=>state.addItem)

    const [{isOver},drop] = useDrop(()=>{
        return {
            accept:"new-item",
            drop(){
                addItem({
                    id: Math.random().toString().slice(2,8),
                    status:"todo",
                    content:"待办事项"
                }, id)
            },
            collect(monitor) {
                return {
                    isOver : monitor.isOver()
                }
            },
        }
    })

    useEffect(()=>{
        drop(gapRef)
    },[drop])

    const cs =classNames(
        "h-20",
        isOver ? "bg-red-300" : ""
    )

    return <div ref={gapRef} className={cs}></div>
}



export const List: FC<ListProps> = (props) => {

    const list = useTodoListStore(state => state.list)
    
    const cs = classNames(
        "w-500",
        props.className
    );

    const transitions = useTransition(list,{
        from :{ transform :"translate3d(100%,0,0)",opacity:0},
        enter :{ transform :"translate3d(0%,0,0)",opacity:1},
        leave :{ transform :"translate3d(100%,0,0)",opacity:0},
        keys:list.map(item => item.id)
    })

    return <div className={cs}>
        {
            list.length ? transitions((style,item)=>{
                return (
                    <animated.div style={style}>
                        <Gap id={item.id}/>
                        <Item data={item}/>
                    </animated.div>
                )
            }): <div>暂无代办事项</div>
        }
          <Gap />

    </div>
}
