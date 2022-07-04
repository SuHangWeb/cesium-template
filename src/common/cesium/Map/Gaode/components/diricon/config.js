export default class diricon {
    constructor() { }
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
                label: "向左前方",
                value: "3",
            },
            {
                label: "右左前方",
                value: "4",
            },
            {
                label: "向左后方",
                value: "5",
            },
            {
                label: "向右后方",
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
                value: "",
            },
            {
                label: "通过过街天桥",
                value: "",
            },
            {
                label: "通过地下通道",
                value: "",
            },
            {
                label: "通过广场",
                value: "",
            },
            {
                label: "",
                value: "到道路斜对面",
            }
        ]
    }
    /**
     * 公交
     */
    get iconTypeTransfer() {
        return this.iconTypeWalking
    }
}  