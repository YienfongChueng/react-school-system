
const tokenKey = 'react-school-system'
export function setToken(value) {
    sessionStorage.setItem(tokenKey,value)
}

export function getToken() {
    return sessionStorage.getItem(tokenKey)
}

export function removeToken() {
    sessionStorage.removeItem(tokenKey)
}

