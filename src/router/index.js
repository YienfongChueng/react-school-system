import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import { routes } from './config'
import { getToken } from '../utils/auth'

/** 
 * 递归调用路由递归数据，生成路由数据
 * @param {路由配置数据}} routes 
 */
function createRouter(routes) {
    return routes.map((r,idx) => (
        r.path ? 
            <Route key={r.path} path={r.path} element={<Auth {...r}>{r.element}</Auth> }>
                {r.children && createRouter(r.children)}
            </Route>
        : 
        // 没有匹配到路径，重定向
        <Route key={idx} path={r.from} element={<Navigate to={r.to} />}/>
    ))
}

/**
 * 路由权限控制
 * @param {*} props 
 */
function Auth(props) {
    const { path,children } = props
    // 如果是登录页面，pass
    if(path === '/login') return children
    if(path === '/test') return children
    // 如果有token，pass
    if(getToken()) {
        return children
    } else {
        //否则，重定向到登陆页
        <Navigate to="/login" replace/>
    }
}

export function RouterView() {
    return (
        <BrowserRouter>
            <Routes>
                {createRouter(routes)}
            </Routes>
        </BrowserRouter>
    )
}

