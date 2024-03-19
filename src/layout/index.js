import React, { useState } from 'react';
import { Outlet,Link, useLocation , useNavigate} from 'react-router-dom';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  } from '@ant-design/icons';

import { Layout, Menu, Button } from 'antd';
import menus from '../router/menu'
import {removeToken } from '../utils/auth'
import { removeRoleType } from '../utils/role';
import MyBreadcrumb from './MyBreadcrumb';
import permission from '../utils/permission'
import './index.css'

const { Header, Sider, Content } = Layout;

/**
 * 递归生成menuItem数据
 * @param {*} chidren 
 * @returns 
 */
function initItems(data) {
    return data.map(v => {
        return {
            key: v.url,
            icon: v.icon,
            label: v.children ? v.title : <Link to={v.url}>{v.title}</Link>,
            children:v.children && initItems(v.children)
        }
    })    
}

export default function Home() {
    
    const [collapsed, setCollapsed] = useState(false);
    const [menuItems,setMenuItems] = useState(initItems(permission(menus)))
    const location = useLocation()
    const navigate = useNavigate();
    function logout() {
        removeToken()
        removeRoleType()
        navigate('/login')
    }
    return (
        <div className="module">
            <Layout>
                {/* 左侧内容 */}
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo-title" >{collapsed  ? '高校' :  '高校教务管理系统'}</div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[location.pathname]}
                        defaultOpenKeys={['/home/teacherManage','/home/resource']}
                        items={menuItems}
                    />
                </Sider>
                {/* 右侧 */}
                <Layout className="site-layout">
                    {/* 头部 */}
                    <Header  className="site-layout-header site-layout-background" >
                        {/* 展开折叠 */}
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 30,
                                height: 30,
                            }}
                        />
                        {/* 面包屑 */}
                        {/* <MyBreadcrumb /> */}

                        <Button className="logout-btn" type="primary" onClick={logout}>退出</Button>
                    </Header>
                    {/* 主体内容 */}
                    <Content className="site-layout-content site-layout-background">
                        {/* 二级路由需要在对应的一级路由添加一个路由出口 */}
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}