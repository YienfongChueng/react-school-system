import axios from '../http'
export const formatDate = (value,type='datetime')=> {
    const date = new Date(value)
    const y = date.getFullYear('yyyy').toString()
    const m = (date.getMonth() + 1).toString()
    const d = date.getDate().toString()
    const h = date.getHours().toString()
    const mm = date.getMinutes().toString()
    const ss = date.getSeconds().toString()
    const date1 = `${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`
    const time = `${h.padStart(2,'0')}:${mm.padStart(2,'0')}:${ss.padStart(2,'0')}`
    switch (type) {
        case 'datetime':
            return `${date1} ${time}`
        case 'date':
            return date1
        case 'time':
            return time
        default:
            return value
    } 
}

// 防抖
export const  debounce = (callback, delay)=>{
	let timerId
	return function (event) {
		// 如果上次事件还没有真正处理, 清除
		if (timerId) {
			clearTimeout(timerId)
		}
		// 事件发生指定事件后才调用处理事件的回调函数
		// 启动定时器, 只是准备真正处理
		timerId = setTimeout(() => {
			// 正在处理事件
			callback.call(null, event)
			// 删除准备处理的标记
			timerId = null
		}, delay)
	}
}


export function downloadFile(
    request,
    defaultFileName="下载文件",
    successCb = ()=> {},
    errorCb = ()=> {}) {
        return axios.request({
            url:request,
            method: 'get',
            responseType: 'blob',
            timeout: 1000*5
        }).then(response => {
            console.log("downloadFile:",response)
            const blob = new Blob([response])
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            const fileName = defaultFileName
            try {
                // 由于ie不支持download属性，故需要做兼容判断
                window.navigator.msSaveBlob(response, fileName)
                successCallback(url)
            } catch (error) {
                a.href = url
                a.download = fileName
                a.click()
                window.URL.revokeObjectURL(url)
                successCb(url)
            }
        }).catch(err => {
            if (errorCb) {
                errorCb(err)
            }
        })
}