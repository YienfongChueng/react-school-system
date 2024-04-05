import { useEffect } from 'react'
import { debounce } from '../../utils'
import './index.css'
export default function Test() {
    function getAutoScale(width=1920,height=960) {
        const winScale = window.innerWidth / window.innerHeight // 浏览器窗口宽高比
        const draftScale = width / height // 设计稿宽高比
        const vw = window.innerWidth / width
        const vh = window.innerHeight / height
        const scale = winScale < draftScale ? vw : vh
        // 等比缩放
        // document.querySelector('#screen').style.transform = `scale(${scale}) translate(-50%)`
        //全屏
        document.querySelector('#screen').style.transform = `scale(${vw},${vh}) translate(-50%)`
    }

    const resizeDelay = debounce(getAutoScale, 100)
    useEffect(()=> {
        resizeDelay()
        window.onresize = ()=> resizeDelay()
        return ()=> {
            window.onresize = null;
        }
    },[resizeDelay])
    return (
        <div className="container" id="screen">
            <div className="header-wrap">数据大屏响应式布局</div>
            <div className="wrap">
                <div className="item item-left1">1</div>
                <div className="item item-center">2</div>
                <div className="item item-right1">3</div>
                <div className="item item-left2">4</div>
                <div className="item item-center">5</div>
                <div className="item item-right2">6</div>
                <div className="item item-left3">7</div>
                <div className="item item-bottom">8</div>
                <div className="item item-right3">9</div>
            </div>
        </div>
    )
}