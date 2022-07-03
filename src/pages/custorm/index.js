import { Button } from "antd";
import { useState } from "react";
export default function Custorm(){
    let [id, setId] = useState(0)
    const onClick = () =>{
        const newId = id++
        setId(newId)
    }
    return (
        <div>
        {id}
        <Button type="primary" htmlType="button" onClick={()=>onClick()}></Button>
        </div>
    )
}

Custorm.route = { path: "/custorm" };