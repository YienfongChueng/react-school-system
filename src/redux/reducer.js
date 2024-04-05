
const initState = {
    roleType: 0
}
export default function rootReducer(state = initState,action) {
    switch (action.type) {
        case 'SET_ROLE_TYPE':
            return {
                roleType: action.roleType
            }
        default:
            return state;
    }
}