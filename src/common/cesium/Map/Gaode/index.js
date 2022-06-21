
class GaodeMap {
    constructor(AMap) {
        this.AMap = AMap
    }
    /**
     * 获取行政列表
     * @param {Object} params 配置参数 https://lbs.amap.com/api/jsapi-v2/documentation#districtsearch
     * https://lbs.amap.com/api/jsapi-v2/guide/abc/prepare 10008故障码解决办法
     * @returns {Array} 行政列表数据
     */
    districtList(params) {
        const AMap = this.AMap
        const districtSearchParams = {
            // 关键字对应的行政区级别，country表示国家
            level: params?.level ? params.level : "country",
            /**
             * 显示下级行政区级数（行政区级别包括：国家、省/直辖市、市、区/县4个级别），商圈为区/县下一 级，
             * 可选值：0、1、2、3，默认值：1
             * 0：不返回下级行政区
             * 1：返回下一级行政区
             * 2：返回下两级行政区
             * 3：返回下三级行政区
             */
            subdistrict: params?.subdistrict ? params.subdistrict : 1,
            //是否显示商圈，默认值true 可选为true/false，为了能够精准的定位到街道，特别是在快递、物流、送餐等场景下，强烈建议将此设置为false
            showbiz: params?.showbiz ? params.showbiz : true,
            //是否返回行政区边界坐标点，默认值：base，不返回行政区边界坐标点，取值：all，返回完整行政区边界坐标点
            extensions: params?.extensions ? params.extensions : "base",
        }

        const searchKeywords = params?.keyword ? params.keyword : "中国";

        return new Promise((resolve, reject) => {
            AMap.plugin('AMap.DistrictSearch', () => {
                const districtSearch = new AMap.DistrictSearch(districtSearchParams)
                // 搜索所有省/直辖市信息
                districtSearch.search(searchKeywords, (status, result) => {
                    // 查询成功时，result即为对应的行政区信息
                    if (status == "complete") {
                        resolve(result.districtList[0]["districtList"])
                    } else {
                        reject("Error")
                    }
                })
            })
        })
    }
    /**
     * 搜索数据的兴趣点类别
     */
    get placeSearchType() {
        const str = "汽车服务|汽车销售|汽车维修|摩托车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|道路附属设施|地名地址信息|公共设施"
        return str.split("|")
    }
    /**
     * 获取搜索数据
     * @param {Object} params 配置参数  https://lbs.amap.com/api/javascript-api/reference/search#m_AMap.PlaceSearch
     * @returns {Object} 搜索数据
     */
    placeSearch(params) {
        const AMap = this.AMap
        const placeSearchParams = {
            /**
           * 兴趣点城市 可选值：城市名（中文或中文全拼）、citycode、adcode
           * 默认值：“全国”
           */
            city: params?.city && params.city != "" ? params.city : "全国",
            /**
             * 是否强制限制在设置的城市内搜索，默认值为：false
             * true：强制限制设定城市，false：不强制限制设定城市
             */
            citylimit: params?.citylimit ? params.citylimit : false,
            /**
             * 是否按照层级展示子POI数据,默认0
             * children=1，展示子节点POI数据，children=0，不展示子节点数据
             */
            children: params?.children ? params.children : 0,
            /**
             * 兴趣点类别，多个类别用“|”分割，如“餐饮|酒店|电影院”
             * POI搜索类型共分为以下20种：
             * 汽车服务|汽车销售|汽车维修|摩托车服务|餐饮服务|购物服务|生活服务|体育休闲服务|
             * 医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|
             * 交通设施服务|金融保险服务|公司企业|道路附属设施|地名地址信息|公共设施
             * 默认值：餐饮服务、商务住宅、生活服务
             */
            type: params?.type ? params.type : "餐饮服务|商务住宅|生活服务", //类别，可以以|后面加其他类 例如： 餐饮服务|交通服务
            /**
             * 检索语言类型
             * 可选值：zh_cn：中文简体，en：英文
             * 默认为: zh_cn：中文简体
             */
            lang: params?.lang ? params.lang : "zh_cn",
            /**
             * 单页显示结果条数 默认值：10
             * 取值范围：1-50，超出取值范围按最大值返回
             */
            pageSize: params?.pageSize ? params.pageSize : 10, // 单页显示结果条数
            /**
             * 页码。（如pageIndex为2，pageSize为10，那么显示的应是第11-20条返回结果）
             * 默认值：1
             * 取值范围：1-100，超过实际页数不返回poi
             */
            pageIndex: params?.pageIndex ? params.pageIndex : 1, //页码
            /**
             * 此项默认值：base，返回基本地址信息
             * 取值：all，返回基本+详细信息
             */
            extensions: params?.extensions ? params.extensions : "base", //返回基本地址信息
            /**
             * AMap.Map对象, 展现结果的地图实例。当指定此参数后，搜索结果的标注、线路等均会自动添加到此地图上。可选值
             */
            map: params?.map ? params.map : undefined,
            /**
             * 结果列表的HTML容器id或容器元素，提供此参数后，结果列表将在此容器中进行展示。可选值
             */
            panel: params?.panel ? params.panel : "",
            /**
             * 在使用map属性时，是否在地图上显示周边搜索的圆或者范围搜索的多边形，默认为true
             */
            showCover: params?.showCover ? params.showCover : true,
            /**
             * 如使用了map或panel属性，renderStyle可以用来设定绘制的UI风格，缺省为'newpc'
             * 可选值:'newpc'或'default'，'newpc'为带图片展示的新样式，'default'为原有简单样式。
             */
            renderStyle: params?.renderStyle ? params.renderStyle : "default",
            /**
             * 用于控制在搜索结束后，是否自动调整地图视野使绘制的Marker点都处于视口的可见范围
             */
            autoFitView: params?.autoFitView ? params.autoFitView : true,
        }
        const searchKeyword = params?.searchKeyword ? params.searchKeyword : ""
        const placeSearch = new AMap.PlaceSearch(placeSearchParams);
        return new Promise((resolve, reject) => {
            AMap.plugin("AMap.PlaceSearch", () => {
                placeSearch.search(searchKeyword, (status, result) => {
                    if (status == "complete") {
                        resolve(result.poiList)
                    } else {
                        reject("Error")
                    }
                });
            });
        })
    }
    /**
     * 详细查询
     * @param {String} id 
     * @returns {Object} 详情数据
     * 省/市/区/详细
     * 名称
     * 电话号
     * 类目
     * 评分
     * ........
     */
    getDetails(id) {
        const AMap = this.AMap
        const placeSearch = new AMap.PlaceSearch({ extensions: "all" });
        return new Promise((resolve, reject) => {
            placeSearch.getDetails(id, (status, result) => {
                if (status === 'complete' && result.info === 'OK') {
                    resolve(result)
                } else {
                    reject("Error")
                }
            });
        })
    }
}


export default GaodeMap