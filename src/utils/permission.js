// 菜单权限控制
import { getRoleType } from '../utils/role'
export default function permission(data){
    let type = getRoleType();
    if(Number(type) === 2){
        return data.filter(v=>v.name!=='studentManage');
    }else if(Number(type) === 3){
        const list = data.filter(v=>v.name!=='teacherManage');
        return  list
    }else {
        return data;
    }
}