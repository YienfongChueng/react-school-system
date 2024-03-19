import * as echarts from 'echarts'
import {useRef,useEffect} from 'react'
import { defaultOptions } from './chartOptions'
export default function Chart(props){
    const chartRef = useRef(null)

    useEffect(()=> {
        // 初始化
        const myChart = echarts.init(chartRef.current)
        myChart.setOption(props.options || defaultOptions)
        //响应式
        window.addEventListener('resize',()=> {
            myChart.resize()
        })
        return ()=> {
            window.removeEventListener('resize',()=> {
                myChart.resize()
            })
        }
    },[props.options])

    return (
        <div 
            ref={chartRef} 
            style={{width: props.width || '100%',height: props.height || '400px'}}>
        </div>
    )
}