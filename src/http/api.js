import  http  from './http'

// 登陆
export function userLogin(data) {
    return http.post('/user/login',data)
}
// 退出登陆
export function userLogout() {
    return http.post('/user/logout')
}


//课程管理-获取课程列表 
export function getCourseList(params) {
    return http.get(`/course/list`,params)
}
// 课程管理-新增/编辑课程
export function createUpdateCourse(data) {
    return http.post('/course/create-update',data)
}
// 课程管理-删除
export function deleteCourse(id) {
    return http.delete(`/course/delete/${id}`)
}


// 资料管理-资料列表
export function getResourceList(params) {
    return http.get('/material/list',params)
}
// 资料管理-资料上传
export function uploadResource(data) {
    return http.upload('/material/create',data)
}


// 教师管理-列表
export function getTeacherList(params) {
    return http.get('/teacher/list',params)
}
//教师管理-删除
export function deleteTeacher(id) {
    return http.delete(`/teacher/removeUser/${id}`)
}
// 教师管理-新增/编辑
export function createUpdateTeacher(data) {
    return http.post('/teacher/create-update',data)
}


// 教师管理-所授课程-获取所有教师
export function getAllTeacher() {
    return http.get('/teacher/all')
}
// 教师管理-所授课程-获取所有课程
export function getAllCourse() {
    return http.get('/course/all')
}
// 教师管理-所授课程-提交课程
export function teacherCourseRel(data) {
    return http.post('/teacherCourseRel/createOrUpd',data)
}


// 学生管理-获取学生列表
export function getStudentList(params) {
    return http.get('/student/list',params)
}
// 学生管理-删除学生
export function deleteStudent(id) {
    return http.delete(`/student/removeUser/${id}`)
}
// 学生管理-编辑学生信息
export function createUpdateStudent(data) {
    return http.post('/student/create-update',data)
}

