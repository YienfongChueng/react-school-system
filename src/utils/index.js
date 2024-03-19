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