import { Card, Space,Button,Divider,Col, Row } from 'antd';
import  {RightCircleOutlined } from '@ant-design/icons'
import { useState,useCallback } from 'react'
import './index.css'
export default function Drag(){
    const [datas,setDatas] = useState([
        {id:3,title: 'title3',content: 'content3',col:4},
        {id:4,title: 'title4',content: 'content4',col:4},
        {id:5,title: 'title5',content: 'content5',col:4},
        {id:6,title: 'title6',content: 'content6',col:4},
        // {id:7,title: 'title7',content: 'content7',col:3},
        // {id:8,title: 'title8',content: 'content8',col:3},
        // {id:9,title: 'title9',content: 'content9',col:3},
        // {id:0,title: 'title0',content: 'content0',col:2},
        // {id:1,title: 'title1',content: 'content1',col:2},
        // {id:2,title: 'title2',content: 'content2',col:1},
    ])
    const [list,setList] = useState([
        {id:1,title: 'title1'},
        {id:2,title: 'title2'},
        {id:3,title: 'title3'},
        {id:4,title: 'title4'},
        {id:5,title: 'title5'},
    ])
    const [dragStartIndex,setDragStartIndex] = useState() 
    // 拖起事件
    function handleDragStart(e,index) {
        setDragStartIndex(index)
    }
    function handleDragEnter(e) {
        e.preventDefault()
    }
    function handleDragover(e) {
        e.preventDefault()
    }
    // 放下事件
    function handleDrop(e,index,targetList,updateTargetList) {
        if(dragStartIndex === index) {
            // no drag move happen, return
            return
        }
        // get the drag component
        const dragComp = targetList[dragStartIndex]
        // 方案1:以index为中心将数据切成两份
        // let arr1 = datas.slice(0,index)
        // let arr2 = datas.slice(index)
        // if(dragStartIndex > index) {
        //     //往前移动
        //     arr2 = arr2.filter(d => (d.id !== dragComp.id))
        //     // arr2.unshift(dragComp)
        //     arr1.splice(index,0,dragComp)
        // }else {
        //     // 往后移动
        //     arr1 = arr1.filter(d => (d.id !== dragComp.id))
        //     arr2.splice(index,0,dragComp) // 插入的位置，删除几个元素，插入的内容
        // }
        
        // setDatas(arr1.concat(arr2))
        // 方案2
        let arr = [...targetList]
        // 先删掉开始元素，再在目标元素插入
        arr.splice(dragStartIndex,1) // 删除
        arr.splice(index,0,dragComp) // 插入
        updateTargetList(arr)
    }
    return (
        <>
            <div className="tip">拖动元素到你想插入的位置</div>
            <Row gutter={[16,16]}>
                {
                    datas && datas.map((item,index) => (
                        <Col className="cols" key={item.id} span={24 / item.col}>
                            <div draggable
                                onDragStart={e => handleDragStart(e,index)}
                                onDragEnter={handleDragEnter}
                                onDragOver={handleDragover}
                                onDrop={e => handleDrop(e,index,datas,setDatas)}>
                                <Card
                                    title={item.title}
                                    style={{
                                        width: '100%',
                                        height: 200,
                                    }}
                                >
                                    <p>{item.content}</p>
                                </Card>
                            </div>
                        </Col>
                    ))
                }
            </Row>

            <div className="tip">拖动排序</div>
            <div>
                <ul className="ul" >
                    {
                        list && list.map((item,i) => (
                            <li 
                                className="li"
                                draggable
                                key={item.id}
                                onDragStart={e => handleDragStart(e,i)}
                                onDragEnter={handleDragEnter}
                                onDragOver={handleDragover}
                                onDrop={e => handleDrop(e,i,list,setList)}>
                                {item.title}
                            </li>
                        ))
                    }
                </ul>
            </div>

        </>
    )
}