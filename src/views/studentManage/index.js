import { Space, Table,Button,Modal,Form,DatePicker, Input,notification } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons'
import { useState } from 'react'
import dayjs from 'dayjs'
import md5 from 'md5'
import { formatDate } from '../../utils'
import  useTableList from '../../hook/table'
import usePagination from '../../hook/pagination'
import { getStudentList,deleteStudent,createUpdateStudent } from '../../http/api'
const { confirm } = Modal;
export default function StudentManage(){
    const columns = [
        {
            title: '学生账号',
            dataIndex: 'account',
            key: 'account',
        },
        {
            title: '学生姓名',
            dataIndex: 'real_name',
            key: 'real_name',
        },
        {
            title: '创建日期',
            dataIndex: 'created',
            key: 'created',
            render: (text) => (formatDate(text,'date'))
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => handleAddOrEdit(record)} >编辑</Button>
                    <Button type="link" onClick={() => handleDelete(record)} danger>删除</Button>
                </Space>
            ),
        },
    ];

    const dateFormat = 'YYYY-MM-DD';
    const [form] = Form.useForm();  //通过对表单数据进行交互等
    const [row,setRow] = useState({})
    const [showModal,setShowModal] = useState(false)

    const {pagination,onShowSizeChange,onChange} = usePagination()
    const {data,total,getList} = useTableList(pagination,getStudentList)

    function handleAddOrEdit(data) {
        setRow(data)
        const value = data && data.id? {...data,'created':dayjs(data.created,dateFormat)} : form.resetFields()
        form.setFieldsValue(value)
        setShowModal(true)
    }
    const handleOk = () => {
        // 提交
        form.validateFields().then(value => {
            if(value) {
                
                const params = {
                    ...row,
                    ...value,
                    password: md5(value.password)
                }
                createUpdateStudent(params).then(res => {
                    const {code} = res
                    if(code === 20000) {
                        notification.open({
                            message: '操作成功！',
                            duration: 2,
                            type:'success'
                        })
                        getList() 
                        setShowModal(false);
                    }
                })
            }
        })
    };
    const handleCancel = () => {
        setShowModal(false);
        form.resetFields()
    };

    function handleDelete(row) {
        confirm({
            title: `温馨提示`,
            icon: <ExclamationCircleFilled />,
            content: `确定要删除【${row.account}】学生吗？`,
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteStudent(row.id).then(res => {
                    if(res.code === 20000) {
                        notification.open({
                            message: '删除成功！',
                            duration: 2,
                            type:'success'
                        })
                        getList()
                    }
                })
            },
            onCancel() {
              console.log('Cancel');
            },
        });
        
    }
 
    

    return (
        <>
            <Button type="primary" onClick={()=> handleAddOrEdit(null)}>添加学生</Button>
            <Table 
                rowKey={(record) => record.id} 
                columns={columns} 
                dataSource={data}
                pagination={{
                    position: ['bottomCenter'],
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: total,
                    onChange: onChange,
                    onShowSizeChange: onShowSizeChange
                }} />
            {/* 弹窗 */}
            <Modal 
                title={row&&row.id ? '编辑学生' : '添加学生'}
                open={showModal} 
                onOk={handleOk} 
                onCancel={handleCancel}
                cancelText='取消'
                okText='确定'>
                <Form
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
                        account:'',
                        real_name: '',
                        password: '',
                        created:'',
                    }}
                >
                    <Form.Item 
                        label="学生账号"
                        name="account"
                        rules={[
                            { required: true,message: '请输入学生账号!' },
                        ]}>
                        <Input placeholder='请输入学生账号' />
                    </Form.Item>
                    <Form.Item 
                        label="学生姓名"
                        name="real_name"
                        rules={[
                            { required: true,message: '请输入学生姓名!' },
                        ]}>
                        <Input placeholder='请输入学生姓名' />
                    </Form.Item>
                    <Form.Item 
                        label="密码"
                        name="password"
                        rules={[
                            { required: true,message: '请输入密码!' },
                        ]}>
                        <Input type="password" placeholder='请输入密码' />
                    </Form.Item>
                    <Form.Item 
                        label="日期"
                        name="created"
                        format={dateFormat}
                        rules={[
                            {required: true,message: '请选择日期!'},
                        ]}>
                        <DatePicker placeholder='请选择日期' />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
    
}