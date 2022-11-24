class Echarts {
    constructor(echarts) {
        this.echarts = echarts

    }

    /**
     * 创建图表
     * @param {*} chartDom 图表dom
     * @param {*} type     图表类型
     * @param {*} option   图表参数 
     */
    create(chartDom, type, option) {
        const echarts = this.echarts
        let myChart = echarts.init(chartDom);
        myChart.setOption(this.bar(option))
    }


    /**
     * 饼图
     */
    bar(option) {
        return option
    }
}