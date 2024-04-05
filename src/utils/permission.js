// 菜单权限控制
import { getRoleType } from '../utils/role'
import {store} from '../redux'
export default function permission(data){
    // let type = getRoleType();
    console.log(store.getState())
    let { roleType } = store.getState()
    if(Number(roleType) === 2){
        return data.filter(v=>v.name!=='studentManage');
    }else if(Number(roleType) === 3){
        const list = data.filter(v=>v.name!=='teacherManage');
        return  list
    }else {
        return data;
    }
}