import axios from 'axios'
import { message } from 'antd';
import { getToken } from '../utils/auth'

const instance = axios.create({
    baseURL: 'http://124.223.161.17:8010/api',
    timeout: 3000
})

instance.interceptors.request.use(config => {
    config.headers['token'] = getToken()
    return config
})

instance.interceptors.response.use(response => {

    // console.log('interceptors.response:',response.data)

    // if (response.headers['content-disposition']) {
    //     const fileName = response.headers['content-disposition'].split(';')[1].split('filename=')[1]
    //      if (fileName) {
    //         response.data.fileName = decodeURI(fileName)
    //     }
    //     return Promise.resolve(response.data)
    //   }

    const {code,msg} = response.data
    if(code === 20004) {
        message.open({
            type: 'error',
            content: '登录已过期，请重新登录！',
        });
        window.location="/login"
    } else if(code !== 20000) {
        message.open({
            type: 'error',
            content: msg,
        });
    }
    return response.data
    
},err => {
    Promise.reject(err)
})

export default instance