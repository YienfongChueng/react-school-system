export const defaultOptions = {
    grid: {
      left: '5%',
      right: '5%',
      top: '5%',
      bottom: '5%',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }
    ]
}

export const lineOptions = {
    grid: {
      left: '5%',
      right: '5%',
      top: '5%',
      bottom: '5%',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
        smooth: 0.6
      }
    ]
}

export const barOptions = {
    grid: {
      left: '5%',
      right: '5%',
      top: '5%',
      bottom: '5%',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
}

export const pieOptions = {
    grid: {
      left: '5%',
      right: '5%',
      top: '5%',
      bottom: '5%',
    },
    title: {
        text: '教职工分布',
        subtext: '职称',
        left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '人员',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 450, name: '专任教师' },
          { value: 50, name: '后勤人员' },
          { value: 157, name: '专业技术人员' },
          { value: 67, name: '政党管理人员' },
          { value: 55, name: '辅导员' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
}