import request from './index'

const http =  {
    get: (url,params)=> request.get(url,{params}),
    post: (url,data) => request.post(url,data),
    delete: (url,params)=> request.delete(url,params),
    upload: (url,file) => request.post(url,file,{
        headers: {'Content-Type': 'multipart/form-data'}
    })
}

export default http
