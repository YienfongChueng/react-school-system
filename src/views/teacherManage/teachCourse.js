import { Form,DatePicker, Input,notification,Button,Select } from 'antd';
import { useState,useEffect } from 'react'
import { getAllTeacher,getAllCourse,teacherCourseRel } from '../../http/api'
import './index.css'

export default function TeachCourse(){

    const [form] = Form.useForm();  //通过对表单数据进行交互等
    const dateFormat = 'YYYY-MM-DD';
    const [allTeacher,setAllTeacher] = useState([])
    const [allCourse,setAllCourse] = useState([])

    const queryData = async() => {
        let {data:c} = await getAllCourse();
        let {data:t} = await getAllTeacher();
        setAllCourse(c.map(v=>({...v,label:v.name,value:v.id})));
        setAllTeacher(t.map(v=>({...v,label:v.account,value:v.id})));
    }

    useEffect(()=> {
        queryData()
    },[])

    const handleOk = () => {
        // 提交
        form.validateFields().then(value => {
            if(value) {
                teacherCourseRel(value).then(res => {
                    const {code} = res
                    if(code === 20000) {
                        notification.open({
                            message: '操作成功！',
                            duration: 2,
                            type:'success'
                        })
                        form.resetFields()
                    }
                })
            }
        })
    };
    const handleCancel = () => {
        form.resetFields()
    };

    return (
        <div className="form-wrap" >
            <Form
                className="my-form"
                form={form}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    teacher_id:'',
                    course_id: '',
                    time_start:'',
                }}
            >
                <Form.Item 
                    label="选择教师"
                    name="teacher_id"
                    rules={[
                        { required: true,message: '请选择教师!' },
                    ]}>
                    <Select
                        placeholder="请选择教师" 
                        options={allTeacher}
                    ></Select>
                </Form.Item>
                <Form.Item 
                    label="选择课程"
                    name="course_id"
                    rules={[
                        { required: true,message: '请选择课程!' },
                    ]}>
                    <Select
                        placeholder="请选择课程" 
                        options={allCourse}
                    ></Select>
                </Form.Item>
                <Form.Item 
                    label="授课日期"
                    name="time_start"
                    format={dateFormat}
                    rules={[
                        {required: true,message: '请选择授课日期!'},
                    ]}>
                    <DatePicker placeholder='请选择授课日期' />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        span: 24,
                        offset:6
                }}>
                    <Button  type="primary" onClick={handleOk}>提交</Button>
                    <Button  onClick={handleCancel}>取消</Button>
            </Form.Item>
            </Form>
        </div>
    )
    
}