import { ExclamationCircleFilled } from '@ant-design/icons'
import { 
    Modal, 
    notification } from 'antd';
const { confirm } = Modal;

export function useDeleteData(data,fetchApi,refreshFn) {
     function confirmFn() {
         confirm({
             title: `温馨提示`,
             icon: <ExclamationCircleFilled />,
             content: `确定要删除【${row.name}】吗？`,
             okText: '确定',
             okType: 'danger',
             cancelText: '取消',
             onOk() {
                 fetchApi(data.id).then(res => {
                     if(res.code === 20000) {
                         notification.open({
                             message: '删除成功！',
                             duration: 2,
                             type:'success'
                         })
                         refreshFn()
                     }
                 })
             },
             onCancel() {
               console.log('Cancel');
             },
         });
     }
     return confirmFn
}