/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from "react"
import { List } from '../List/index';
import { NewItem } from "../NewItem";
import { GarbageBin } from "../GarbageBin";
import classNames from "classnames";
import { Col, Row } from "antd";


type TodoListProps = object

export const TodoList:FC<TodoListProps> = (_props) => {
    return (
        <Row className={classNames(
            "h-600 m-auto mt-100 p-10",
            "border-2 border-black",
        )}>
            <Col className="flex-2 h-full mr-10 overflow-auto" flex={3}>
                <div>
                    <List/>
                </div>
            </Col>
            <Col flex={2}>
                <NewItem/>
                <GarbageBin className={"mt-10"}/>
            </Col>
      </Row>
    )
}