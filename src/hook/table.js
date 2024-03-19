import { useMemoizedFn, useMount } from 'ahooks'
import { useState,useEffect } from 'react'

export default function useTableList(props,fetchApi) {
    const [data,setData] = useState([])
    const [total,setTotal] = useState(0)
    const getList = useMemoizedFn(function () {
        const params = {
            pageNo: props.current,
            pageSize: props.pageSize
        }
        fetchApi(params).then(res => {
            console.log("fetchApi:",res)
            setData(res.data.list)
            setTotal(res.data.rows)
        })
    })

     // 初始化
     useEffect(()=> {
        getList()
    },[getList,props])

    return {
        data,
        total,
        getList
    }
}