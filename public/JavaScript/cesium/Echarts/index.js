class Echarts {
    constructor(echarts) {
        this.echarts = echarts
    }

    /**
     * 创建图表
     * @param {*} chartDom 图表dom
     * @param {*} type     图表类型
     * @param {*} data     图表数据 
     * @param {*} option   图表参数 
     */
    create(chartDom, type, data, option) {
        const echarts = this.echarts
        let myChart = echarts.init(chartDom);
        //饼图
        if (type == 'bar') {
            myChart.setOption(this.bar(data, option))
        }
    }


    /**
     * 饼图
     */
    bar(data, option) {
        if (option) {
            return option
        } else {
            const handleData = function (arr, key) {
                return arr.map((item) => {
                    if (Array.isArray(item[key])) {

                    } else {
                        return item[key]
                    }
                })
            }
            // Array.isArray(data)
            return {
                grid: {
                    left: '8%',
                    right: "5%",
                    top: '8%',
                    bottom: '12%'
                },
                tooltip: {
                    trigger: 'axis',
                },
                xAxis: {
                    axisTick: { show: false },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#fff"
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#fff',
                            fontSize: 12
                        },
                        clickable: true
                    },
                    type: 'category',
                    data: handleData(data, 'label')
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: '#fff',
                            fontSize: 12
                        },
                        clickable: true
                    },
                },
                series: [
                    {
                        data: handleData(data, 'gdp'),
                        type: 'bar',
                        name: "人均GDP"
                    },
                    {
                        data: handleData(data, 'industry1'),
                        type: 'bar',
                        name: "互联网产业"
                    },
                    {
                        data: handleData(data, 'industry2'),
                        type: 'bar',
                        name: "交通产业"
                    },
                    {
                        data: handleData(data, 'industry3'),
                        type: 'bar',
                        name: "美容产业"
                    }
                ]
            }
        }
    }
}