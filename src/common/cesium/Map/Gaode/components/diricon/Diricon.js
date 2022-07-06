export default class Diricon {
    constructor() { }
    /**
     * 文字
     */
    get iconTypeText() {
        return [
            {
                label: "起",
                value: "15",
            },
            {
                label: "经",
                value: "16",
            },
            {
                label: "终",
                value: "17",
            },
        ]
    }

    /**
     * 交通工具
     *  transfer=公交  metro=地铁 train=火车
     */
    get iconTypeVehicle() {
        return [
            {
                label: "transfer",
                value: "22",
            },
            {
                label: "train",
                value: "23",
            },
            {
                label: "metro",
                value: "24",
            },
        ]
    }

    /**
     * 驾车
     */
    get iconTypeDriving() {
        return [
            {
                label: "直行",
                value: "0",
            },
            {
                label: "左转",
                value: "1",
            },
            {
                label: "右转",
                value: "2",
            },
            {
                label: "向左前方行驶",
                value: "3",
            },
            {
                label: "向右前方行驶",
                value: "4",
            },
            {
                label: "向左后方行驶",
                value: "5",
            },
            {
                label: "向右后方行驶",
                value: "6",
            },
            {
                label: "左转调头",
                value: "7",
            },
            {
                label: "靠左",
                value: "9",
            },
            {
                label: "靠右",
                value: "10",
            },
            {
                label: "进入环岛",
                value: "13",
            },
            {
                label: "离开环岛",
                value: "14",
            },
            {
                label: "减速行驶",
                value: "12",
            }
        ]
    }
    /**
     * 步行
     */
    get iconTypeWalking() {
        return [
            {
                label: "直行",
                value: "0",
            },
            {
                label: "左转",
                value: "1",
            },
            {
                label: "右转",
                value: "2",
            },
            {
                label: "向左前方行走",
                value: "3",
            },
            {
                label: "向右前方行走",
                value: "4",
            },
            {
                label: "向左后方行走",
                value: "5",
            },
            {
                label: "向右后方行走",
                value: "6",
            },
            {
                label: "靠左",
                value: "9",
            },
            {
                label: "靠右",
                value: "10",
            },
            {
                label: "通过人行横道",
                value: "27",
            },
            {
                label: "通过过街天桥",
                value: "28",
            },
            {
                label: "通过地下通道",
                value: "26",
            },
            {
                label: "通过广场",
                value: "29",
            },
            {
                label: "到道路斜对面",
                value: "25",
            }
        ]
    }
    /**
     * 公交
     */
    get iconTypeTransfer() {
        return this.iconTypeDriving
    }

    /**
     * 骑行
     */
    get iconTypeRiding() {
        return this.iconTypeDriving
    }


    /**
     * 获取icon的类名
     * @param {*} type 导航类型 例如 驾车、骑行等 driving=驾车  walking=步行  transfer=公交 riding=骑行  vehicle=交通工具 text=文字
     * @param {*} value 根据当前api提供的中文汉字来筛选
     * @param {*} typeColor * 如果type参数为 driving=驾车  walking=步行  transfer=公交 riding=骑行 当前可设置灰色 只要布尔值为false 默认为蓝色true
     */
    setIcon(type, value, typeColor) {
        let className = ""
        let typeColorName = typeColor ? "blue" : "grey"
        if (type == "driving") {
            const filterType = this.iconTypeDriving.filter(item => {
                if (value == "" || value.length == 0) {
                    return item.label == "直行"
                } else {
                    return item.label == value
                }
            })
            if (filterType.length != 0) {
                className = `gaode-diricon-${type} gaode-diricon-${filterType[0].value} gaode-diricon-${typeColorName}`
            }
        }
        if (type == "walking") {
            const filterType = this.iconTypeWalking.filter(item => {
                if (value == "" || value.length == 0) {
                    return item.label == "直行"
                } else {
                    return item.label == value
                }
            })
            if (filterType.length != 0) {
                className = `gaode-diricon-${type} gaode-diricon-${filterType[0].value} gaode-diricon-${typeColorName}`
            }
        }
        if (type == "transfer") {
            const filterType = this.iconTypeTransfer.filter(item => {
                if (value == "" || value.length == 0) {
                    return item.label == "直行"
                } else {
                    return item.label == value
                }
            })
            if (filterType.length != 0) {
                className = `gaode-diricon-${type} gaode-diricon-${filterType[0].value} gaode-diricon-${typeColorName}`
            }
        }
        if (type == "riding") {
            const filterType = this.iconTypeRiding.filter(item => {
                if (value == "" || value.length == 0) {
                    return item.label == "直行"
                } else {
                    return item.label == value
                }
            })
            if (filterType.length != 0) {
                className = `gaode-diricon-${type} gaode-diricon-${filterType[0].value} gaode-diricon-${typeColorName}`
            }
        }
        if (type == "text") {
            const filterType = this.iconTypeText.filter(item => {
                return item.label == value
            })
            if (filterType.length != 0) {
                className = `gaode-diricon-${type} gaode-diricon-${filterType[0].value}`
            }
        }
        if (type == "vehicle") {
            const filterType = this.iconTypeVehicle.filter(item => {
                return item.label == value
            })
            if (filterType.length != 0) {
                className = `gaode-diricon-${type} gaode-diricon-${filterType[0].value}`
            }
        }
        return className
    }

}  