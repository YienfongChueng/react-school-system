import { Navigate } from 'react-router-dom'
import Login from '../views/login'
import Test from '../views/test' // 数据大屏
import Home from '../layout'
import menus from './menu'
import permission from '../utils/permission'


// 遍历生成路由配置数据
function setRoutesConfig(routesData) {
    return routesData.map(item => ({
        path: item.url,
        name:item.name,
        element: item.element,
        meta: {title:item.title},
        children:item.children && setRoutesConfig(item.children)
    }))
}

// 首页重定向
const homeNavigate = {
    path: '/home',
    element: <Navigate to='/home/index' replace />,
    meta: {title: ''}
}

export const routes = [
    {
        from: '*',
        to: '/login' // or 404
    },
    {
        path: '/login',
        name: 'login',
        element: <Login />,
    },
    {
        path:'/test',
        name:'test',
        element:< Test />
    },
    {
        path: '/home',
        name: 'home',
        element: <Home />,
        meta: {showMenu: true},
        children: [
            homeNavigate,
           ...setRoutesConfig(permission(menus))
        ]
    }
]