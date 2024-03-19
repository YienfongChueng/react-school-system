import { useState } from 'react'

export default function usePagination() {
    const [pagination,setPagination] = useState({
        current: 1,
        pageSize:10,
    })
    const onShowSizeChange = (current,size)=> {
            console.log(current,size)
    
    }
    
    const onChange = (page,pageSize) => {
        console.log(page,pageSize)
        setPagination({
            ...pagination,
            current: page
        })
    }

    return {
        pagination,
        onShowSizeChange,
        onChange
    }
}