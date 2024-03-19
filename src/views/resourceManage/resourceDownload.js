import { Space, Table, notification } from 'antd';
import { Link } from 'react-router-dom'
import { formatDate,downloadFile } from '../../utils'
import  useTableList from '../../hook/table'
import usePagination from '../../hook/pagination'
import { getResourceList } from '../../http/api'
import { getToken } from  '../../utils/auth'
export default function ResourceDownload(){
    const columns = [
        {
            title: '课程名称',
            dataIndex: 'name',
            key: 'name',
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
                    <Link  onClick={() => download(record)} >下载</Link>
                </Space>
            ),
        },
    ];
 
    const {pagination,onShowSizeChange,onChange} = usePagination()
    const {data,total,getList} = useTableList(pagination,getResourceList)

    const download = (record)=> {
        // downloadFile(
        //     record.path,
        //     'xxxx',
        //     // 成功回调
        //     ()=> {
        //         notification.open({
        //             message:'文件下载成功！',
        //             duration: 2,
        //             type:'success'
        //         });
        //     },
        //     // 失败回调
        //     ()=> {
        //         notification.open({
        //             message:'文件下载失败！',
        //             duration: 2,
        //             type:'error'
        //         });
        // })
        const xhr = new XMLHttpRequest();
        xhr.open('GET',record.path);
        xhr.responseType = 'blob';//字节流
        xhr.setRequestHeader('token',getToken()); //头部携带token
        xhr.send();
        xhr.onload = ()=>{
            console.log(xhr.response)
            notification.open({
                message:'文件下载成功！',
                duration: 4,
                type:'info'
            });
            //将blob流读取成一个url
            let urlObject = window.URL;
            let _blob = new Blob([xhr.response]);
            let a = document.createElement('a'); //创建a标签
            a.href=urlObject.createObjectURL(_blob);
            a.download = record.path;
            a.click(); //触发a标签
        }
    }
    return (
        <>
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
        </>
    )
}