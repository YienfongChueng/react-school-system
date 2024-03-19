import { Select,Form,Input,Upload,Button,notification } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useEffect,useState } from 'react'
import { getAllCourse, uploadResource } from '../../http/api'

export default function ResourceUpload(){
    const [form] = Form.useForm();  //通过对表单数据进行交互等
    const [allCourse,setAllCourse] = useState([])
    const acceptList = ".rar,.zip,.png,.jpg,.xls,.xlsx,.doc,.docx,.pdf,.ppt"
    const acceptTips = acceptList.replace(/\./g ,"")

    useEffect(()=> {
        getAllCourseList()
    },[])

    const getAllCourseList = ()=> {
        getAllCourse().then(res => {
            if(res.code === 20000) {
                const opts = res.data.map(d => ({...d,label: d.name,value:d.id}))
                setAllCourse(opts)
            }
        })
    }
    
    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
    };

    const beforeUpload = (file, fileList) => {
        // 大小限制
        const isLt2M = file.size/1024/1024<2;
        if(!isLt2M){
            notification.open({
                message:'上传文件大小不能超过2MB',
                duration: 2,
                type:'warning'
            });
            return Upload.LIST_IGNORE; //不符合，不展示此文件
        }
        // 格式限制 todo
        return false;
    }

    function onsubmit() {
        form.validateFields().then(value => {
            let formdata = new FormData() 
            formdata.append("name",value.name)
            formdata.append("course_id",value.course_id)
            formdata.append("file",value.file[0].originFileObj)

            uploadResource(formdata).then(res => {
                if(res.code === 20000) {
                    notification.open({
                        message:'上传成功',
                        duration: 1,
                        type:'info'
                    });
                    // 清空表单
                    form.resetFields()
                }
            })

        })
    }
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
                    name:'',
                    course_id:'',
                    file: ''
                }}
            >
                <Form.Item 
                    label="选择课程"
                    name="course_id"
                    rules={[
                        {required:true,message:'请选择课程！'}
                    ]}>
                        <Select placeholder="请选择课程" options={allCourse}> </Select>
                </Form.Item>
                <Form.Item 
                    label="文件名称"
                    name="name"
                    rules={[
                        { required: true, message: '请输入文件名称!'},
                    ]}>
                    <Input placeholder='请输入文件名称' />
                </Form.Item>
                <Form.Item label="上传文件" name="file" getValueFromEvent={normFile}>
                    <Upload.Dragger 
                        name="file" 
                        action=""
                        maxCount={1}
                        accept={acceptList}
                        beforeUpload={beforeUpload}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">点击上传文件（支持拖拽文件到上传区域）</p>
                        <p className="ant-upload-hint">支持{acceptTips}类型</p>
                    </Upload.Dragger>
                </Form.Item>
                <Form.Item  
                    wrapperCol={{
                        span: 24,
                        offset:6
                    }}>
                    <Button className="submit-btn" type="primary" onClick={onsubmit}>上 传</Button>
                </Form.Item>
            </Form>
        </div>
    )
}