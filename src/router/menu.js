import Index from '../views/index'
import CourseManage from '../views/courseManage'
import StudentManage from '../views/studentManage'
import TeacherManage from '../views/teacherManage'
import TeachCourse from '../views/teacherManage/teachCourse'
import TeacherInfo from '../views/teacherManage/teacherInfo'
import ResourceManage from '../views/resourceManage'
import ResourceUpload from '../views/resourceManage/resourceUpload'
import ResourceDownload from '../views/resourceManage/resourceDownload'

import {
    HomeOutlined, //首页
    ReadOutlined, //课程管理
    TeamOutlined, //教师管理
    SolutionOutlined, // 教师信息
    BookOutlined, //所授课程
    UserOutlined, // 学生管理
    // ProfileOutlined, //排课管理
    FolderOpenOutlined, //资料管理
    UploadOutlined, // 资料上传
    CloudDownloadOutlined, //资料下载
    // KeyOutlined, // 权限管理
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
    }

]

export default menus