import { useState } from 'react'
import { Carousel,Card } from 'antd';
import Chart from './chart'
import {lineOptions, barOptions,pieOptions} from './chart/chartOptions'

import './index.css'
export default function Index(){
    const [banner,setBanner] = useState([
        {id: 1, url: require('../../assets/img/back1.jpg')},
        {id: 2, url: require('../../assets/img/back2.jpg')},
    ])
    return (
        <div className="content">
            {/* 轮播 */}
            <div className="banner">
                <Carousel autoplay >
                    {banner.map(item => <img key={item.id} src={item.url} alt="" />)}
                </Carousel>
            </div>
            <div className="module-box">
                <div className="margin5" style={{flex: '0 1 55%'}}>
                    <Card  title="教职工分布">
                        <Chart options={pieOptions} />
                    </Card>

                </div>
                <div className="module-box_item" style={{flex: '0 1 45%'}}>
                    <div className="module-box">
                        <div className="margin5" style={{flex: '0 1 100%'}}>
                            <Card  title="组织架构">
                                <Chart options={lineOptions} height="140px"  />
                            </Card>
                        </div>
                    </div>
                    <div  className="module-box">
                        <div className="margin5" style={{flex: '0 1 100%'}}>
                            <Card  title="学生人数统计">
                                <Chart options={barOptions} height="140px"  />
                            </Card>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}