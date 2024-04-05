import { createStore } from 'redux'

//持久化
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from './reducer'


//在localStorge中生成key为root的值
const persistConfig = {
    key: 'root',
    storage,
    blacklist:[]  //设置某个reducer数据不持久化，白名单
  }


const myPersistReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(myPersistReducer)
const persistor = persistStore(store)
export {
    store,persistor
}
