import Index from '../views/index'
import CourseManage from '../views/courseManage'
import StudentManage from '../views/studentManage'
import TeacherManage from '../views/teacherManage'
import TeachCourse from '../views/teacherManage/teachCourse'
import TeacherInfo from '../views/teacherManage/teacherInfo'
import ResourceManage from '../views/resourceManage'
import ResourceUpload from '../views/resourceManage/resourceUpload'
import ResourceDownload from '../views/resourceManage/resourceDownload'

import Drag from '../views/drag' // 拖拉拽demo
import Charts from '../views/charts' // 图表demo
import Editor from '../views/editor'

import {
    HomeOutlined, //首页
    ReadOutlined, //课程管理
    TeamOutlined, //教师管理
    SolutionOutlined, // 教师信息
    BookOutlined, //所授课程
    UserOutlined, // 学生管理
    ProfileOutlined, //排课管理 
    InsertRowAboveOutlined, //drag
    FolderOpenOutlined, //资料管理
    UploadOutlined, // 资料上传
    CloudDownloadOutlined, //资料下载
    // KeyOutlined,// 权限管理
    BarChartOutlined , //  charts
    ScheduleOutlined // editor
  } from '@ant-design/icons';
const menus = [
    {
        name: 'index', 
        title: '首页',
        url: '/home/index',
        element:<Index/>,
        icon: <HomeOutlined/>, 
    },
    {
        name: 'courseManage', 
        title: '课程管理',
        url: '/home/courseManage',
        element:<CourseManage/>,
        icon: <ReadOutlined/>, 
    },
    {
        name: 'teacherManage', 
        title: '教师管理',
        url: '/home/teacherManage',
        element:<TeacherManage/>,
        icon: <TeamOutlined/>, 
        children:[
            {
                name: 'teacherInfo', 
                title: '教师信息',
                url: '/home/teacherManage/info',
                element:<TeacherInfo/>,
                icon: <SolutionOutlined/>, 
            },
            {
                name: 'teachCourse', 
                title: '所授课程',
                url: '/home/teacherManage/course',
                element:<TeachCourse/>,
                icon: <BookOutlined/>, 
            },
        ]
    },
    {
        name: 'studentManage', 
        title: '学生管理',
        url: '/home/studentManage',
        element:<StudentManage/>,
        icon: <UserOutlined/>, 
    },
    {
        name: 'resourceManage', 
        title: '资料管理',
        url: '/home/resource',
        element:<ResourceManage/>,
        icon: <FolderOpenOutlined/>, 
        children: [
            {
                name: 'resourceUpload', 
                title: '资料上传',
                url: '/home/resource/upload',
                element:<ResourceUpload/>,
                icon: <UploadOutlined/>, 
            },
            {
                name: 'resourceDownload', 
                title: '资料下载',
                url: '/home/resource/download',
                element:<ResourceDownload/>,
                icon: <CloudDownloadOutlined/>, 
            },
        ]
    },
    {
        name: 'drag',
        title: '拖拉拽demo',
        url: '/home/drag',
        element: <Drag />,
        icon: <InsertRowAboveOutlined />
    },
    {
        name: 'charts',
        title: '图表demo',
        url: '/home/charts',
        element: <Charts />,
        icon: <BarChartOutlined/>
    },
    {
        name: 'editor',
        title: 'wangEditor编辑器demo',
        url: '/home/editor',
        element: <Editor/>,
        icon: <ScheduleOutlined />
    }
]

export default menus