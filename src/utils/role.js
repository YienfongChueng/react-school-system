const roleTypeKey = 'roleType';
//说明 1-admin 2-teacher 3-student
//存
export const setRoleType = value =>sessionStorage.setItem(roleTypeKey,value);

//取
export const getRoleType = () =>sessionStorage.getItem(roleTypeKey);

//删
export const removeRoleType = () =>sessionStorage.removeItem(roleTypeKey);