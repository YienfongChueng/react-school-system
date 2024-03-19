import { Space, 
    Table,
    Button,
    Modal, 
    DatePicker,
    Form,
    Input,notification } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons'
import { useMemoizedFn, useMount } from 'ahooks'
import { useState,useEffect} from 'react'
import dayjs from 'dayjs'
import { getCourseList,createUpdateCourse,deleteCourse } from '../../http/api'
import { formatDate } from '../../utils'

const { confirm } = Modal;

export default function CourseManage(){
    const columns = [
        {
            title: '课程名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '创建人',
            dataIndex: 'creator',
            key: 'creator',
            render:(text) => (text || '--')
        },
        {
            title: '开课日期',
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
    
    const [showModal,setShowModal] = useState(false)
    const [data,setData] = useState([])
    const [total,setTotal] = useState(0)
    const [row,setRow] = useState({})
    const [pagination,setPagination] = useState({
        current: 1,
        pageSize:10,
    })

    const onShowSizeChange = (current,size)=> {
        console.log(current,size)

    }

    const onChange = (page,pageSize) => {
        console.log(page,pageSize)
        setPagination({
            ...pagination,
            current: page
        })
    }

    const getList = useMemoizedFn(function () {
        const params = {
            pageNo: pagination.current,
            pageSize: pagination.pageSize
        }
        getCourseList(params).then(res => {
                setData(res.data.list)
                setTotal(res.data.rows)
        })
    })
    // 初始化
    useEffect(()=> {
        getList()
    },[getList,pagination])

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
                createUpdateCourse({...row,...value}).then(res => {
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
            content: `确定要删除【${row.name}】课程吗？`,
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteCourse(row.id).then(res => {
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
            <Button type="primary" onClick={()=> handleAddOrEdit(null)}>新增课程</Button>
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
                title={row&&row.id ? '编辑课程' : '新增课程'}
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
                        name:'',
                        created:''
                    }}
                >
                    <Form.Item 
                        label="课程名称"
                        name="name"
                        rules={[
                            { required: true,message: '请输入课程名称!' },
                        ]}>
                        <Input placeholder='请输入课程名称' />
                    </Form.Item>
                    <Form.Item 
                        label="开课日期"
                        name="created"
                        format={dateFormat}
                        rules={[
                            {required: true,message: '请选择开课日期!'},
                        ]}>
                        <DatePicker placeholder='请选择开课日期' />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}