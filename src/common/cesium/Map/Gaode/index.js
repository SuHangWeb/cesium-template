
/**
 * 常用的高德在线地图网址
 // 1.影像图
 https://webst01.is.autonavi.com/appmaptile?x=54658&y=26799&z=16&style=6
 // 2.道路纯图
 https://wprd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x=54658&y=26799&z=16&scl=1&ltype=2
 // 3.道路简图
 http://webrd01.is.autonavi.com/appmaptile?x=54658&y=26799&z=16&size=1&scale=1&style=7
 // 4.道路详图
 http://webrd01.is.autonavi.com/appmaptile?x=54658&y=26799&z=16&lang=zh_cn&size=1&scale=1&style=8
 // 5.纯道路图
 http://wprd01.is.autonavi.com/appmaptile?x=54658&y=26799&z=16&lang=zh_cn&size=1&scl=1&style=8&ltype=11
 // 6.纯地标图
 https://wprd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=8&x=54658&y=26799&z=16&scl=1&ltype=4
 // 7.路网注记图
 http://webst01.is.autonavi.com/appmaptile?x=54658&y=26799&z=16&lang=zh_cn&size=1&scale=1&style=8

 高德在线地图的瓦片地址及规律参数： 
 lang：显示语言，zh_cn：中文，en：英文
 scl：设置标注还是底图，1表示标注，2表示底图
 style：地图类型控制，6卫星（st）,7简图（st rd），8详图（不透明rd，透明st）
 */
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
     * 获取插件
     */
    get plugin() {
        const arr = [
            {
                label: "输入提示，根据输入关键字提示匹配信息",
                value: "Autocomplete",
            },
            {
                label: "地点搜索服务插件，提供某一特定地区的位置查询服务",
                value: "PlaceSearch"
            },
            {
                label: "行政区查询服务，提供行政区相关信息",
                value: "DistrictSearch"
            },
            {
                label: "驾车路线规划服务",
                value: "Driving"
            },
            {
                label: "公交换乘服务",
                value: "Transfer"
            },
            {
                label: "骑行路线规划服务",
                value: "Riding"
            },
            {
                label: "步行路线规划服务",
                value: "Walking"
            },
            {
                label: "轨迹纠偏",
                value: "GraspRoad"
            }
        ]
        const arrMap = arr.map(item => {
            return `AMap.${item.value}`
        })
        return arrMap.toString()
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
    /**
     * 使用搜索组件  输入提示，根据输入关键字提示匹配信息
     * @param {Object} params 配置参数  https://lbs.amap.com/api/javascript-api/reference/search#m_AMap.Autocomplete
     * @returns {Object} 搜索数据
     * @use 使用方法：
     *  this._GaodeMap
          .AutoComplete({
            input: "表单id",
          })
          .then((res) => {
            //为了实时监听 接收处 需要此方法接收实时变化的数据
            res.on("select", (result) => {
              console.log(result);
            });
          });
     */
    AutoComplete(params) {
        const AMap = this.AMap
        const autoCompleteParams = {
            /**
             * 输入提示时限定POI类型，多个类型用“|”分隔，POI相关类型请在网站“相关下载”处下载
             * 目前只支持Poi类型编码如“050000”
             * 默认值：所有类别
             */
            type: params?.type ? params.type : "",
            /**
             * 输入提示时限定城市。
             * 可选值：城市名（中文或中文全拼）、citycode、adcode；
             * 默认值：“全国”
             */
            city: params?.city && params.city != "" ? params.city : "全国",
            /**
             * 返回的数据类型
             * 可选值：all-返回所有数据类型、poi-返回POI数据类型、bus-返回公交站点数据类型、busline-返回公交线路数据类型
             * 目前暂时不支持多种类型
             */
            datatype: params?.datatype ? params.datatype : "all",
            /**
             * 是否强制限制在设置的城市内搜索,
             * 默认值为：false
             * true：强制限制设定城市，false：不强制限制设定城市
             */
            citylimit: params?.citylimit ? params.citylimit : false,
            /**
             * 可选参数，用来指定一个input输入框，设定之后，在input输入文字将自动生成下拉选择列表。
             * 支持传入输入框DOM对象的id值，或直接传入输入框的DOM对象。
             */
            input: params?.input ? params.input : undefined,
            /**
             * 可选参数，指定一个现有的div的id或者元素，作为展示提示结果的容器，
             * 当指定了input的时候有效，缺省的时候将自动创建一个显示结果面板
             */
            output: params?.output ? params.output : undefined,
            /**
             * 默认为true，
             * 表示是否在input位于页面较下方的时候自动将输入面板显示在input上方以避免被遮挡
             */
            outPutDirAuto: params?.outPutDirAuto ? params.outPutDirAuto : true
        }
        return new Promise((resolve, reject) => {
            AMap.plugin("AMap.AutoComplete", () => {
                const autoComplete = new AMap.AutoComplete(autoCompleteParams);
                //注册监听，当选中某条记录时会触发
                // autoComplete.on("select", (result) => {
                //     console.log(result)
                //     resolve(result)
                // });
                resolve(autoComplete)
            });
        })
    }
    /**
     * 驾车路线规划
     * @param {Object} params 配置参数 文档：https://lbs.amap.com/api/jsapi-v2/documentation#driving
     * @returns {Object} 驾车路线规划数据
     */
    Driving(params) {
        const AMap = this.AMap
        const drivingParams = {
            /**
             * AMap.Map对象, 展现结果的地图实例。当指定此参数后，搜索结果的标注、线路等均会自动添加到此地图上。可选
             * cesium 不需要当前参数
             */
            map: params?.map ? params.map : undefined,
            /**
             * 驾车路线规划策略
             * 下方10~20的策略，会返回多条路径规划结果。（高德地图APP策略也包含在内，强烈建议从此策略之中选择）
             * 下方策略 0~9的策略，仅会返回一条路径规划结果
             * 
             * 下方策略返回多条路径规划结果:
             * 10，返回结果会躲避拥堵，路程较短，尽量缩短时间，与高德地图的默认策略也就是不进行任何勾选一致
             * 11，返回三个结果包含：时间最短；距离最短；躲避拥堵 （由于有更优秀的算法，建议用10代替）
             * 12，返回的结果考虑路况，尽量躲避拥堵而规划路径，与高德地图的“躲避拥堵”策略一致
             * 13，返回的结果不走高速，与高德地图“不走高速”策略一致
             * 14，返回的结果尽可能规划收费较低甚至免费的路径，与高德地图“避免收费”策略一致
             * 15，返回的结果考虑路况，尽量躲避拥堵而规划路径，并且不走高速，与高德地图的“躲避拥堵&不走高速”策略一致
             * 16，返回的结果尽量不走高速，并且尽量规划收费较低甚至免费的路径结果，与高德地图的“避免收费&不走高速”策略一致
             * 17，返回路径规划结果会尽量的躲避拥堵，并且规划收费较低甚至免费的路径结果，与高德地图的“躲避拥堵&避免收费”策略一致
             * 18，返回的结果尽量躲避拥堵，规划收费较低甚至免费的路径结果，并且尽量不走高速路，与高德地图的“避免拥堵&避免收费&不走高速”策略一致
             * 19，返回的结果会优先选择高速路，与高德地图的“高速优先”策略一致
             * 20，返回的结果会优先考虑高速路，并且会考虑路况躲避拥堵，与高德地图的“躲避拥堵&高速优先”策略一致
             * 
             * 下方策略仅返回一条路径规划结果
             * 0，速度优先，此路线不一定距离最短
             * 1，费用优先，不走收费路段，且耗时最少的路线
             * 2，距离优先，仅走距离最短的路线，但是可能存在穿越小路/小区的情况
             * 3，速度优先，不走快速路，例如京通快速路（因为策略迭代，建议使用13）
             * 4，躲避拥堵，但是可能会存在绕路的情况，耗时可能较长
             * 5，多策略（同时使用速度优先、费用优先、距离优先三个策略计算路径）。其中必须说明，就算使用三个策略算路，会根据路况不固定的返回一~三条路径规划信息。
             * 6，速度优先，不走高速，但是不排除走其余收费路段
             * 7，费用优先，不走高速且避免所有收费路段
             * 8，躲避拥堵和收费，可能存在走高速的情况，并且考虑路况不走拥堵路线，但有可能存在绕路和时间较长
             * 9，躲避拥堵和收费，不走高速
             */
            policy: params?.policy ? params.policy : 0,
            /**
             * 默认值：base，返回基本地址信息
             * 当取值为：all，返回DriveStep基本信息+DriveStep详细信息
             */
            extensions: params?.extensions ? params.extensions : "base",
            /**
             * 默认为0，表示可以使用轮渡，为1的时候表示不可以使用轮渡
             */
            ferry: params?.ferry ? params.ferry : 0,
            /**
             * 结果列表的HTML容器id或容器元素，提供此参数后，结果列表将在此容器中进行展示。可选
             */
            panel: params?.panel ? params.panel : undefined,
            /**
             * 设置隐藏路径规划的起始点图标 设置为true：隐藏图标；设置false：显示图标
             * 默认值为：false
             */
            hideMarkers: params?.hideMarkers ? params.hideMarkers : false,
            /**
             * 设置是否显示实时路况信息，默认设置为true。 
             * 显示绿色代表畅通，
             * 黄色代表轻微拥堵，
             * 红色代表比较拥堵，
             * 灰色表示无路况信息。
             */
            showTraffic: params?.showTraffic ? params.showTraffic : true,
            /**
             * 	车牌省份的汉字缩写，用于判断是否限行，与number属性组合使用，可选。例如：京
             */
            province: params?.province ? params.province : undefined,
            /**
             * 除省份之外车牌的字母和数字，用于判断限行相关，与province属性组合使用，可选。例如:NH1N11
             */
            number: params?.number ? params.number : undefined,
            /**
             * 使用map属性时，绘制的规划线路是否显示描边。缺省为true
             */
            isOutline: params?.isOutline ? params.isOutline : undefined,
            /**
             * 使用map属性时，绘制的规划线路的描边颜色。缺省为'white'
             */
            outlineColor: params?.outlineColor ? params.outlineColor : undefined,
            /**
             * 用于控制在路径规划结束后，是否自动调整地图视野使绘制的路线处于视口的可见范围
             */
            autoFitView: params?.autoFitView ? params.autoFitView : undefined,
        }
        return new Promise((resolve, reject) => {
            AMap.plugin("AMap.Driving", () => {
                const driving = new AMap.Driving(drivingParams);
                driving.search(params.start, params.end, (status, result) => {
                    if (status == "complete") {
                        resolve(result)
                    } else {
                        reject("Error")
                    }
                });
            });
        })
    }
    /**
     * 公交换乘服务
     * @param {Object} params 配置参数 文档：https://lbs.amap.com/api/jsapi-v2/documentation#transfer
     * @returns {Object} 公交换乘服务数据
     */
    Transfer(params) {
        const AMap = this.AMap
        const transferParams = {
            /**
             * AMap.Map对象, 展现结果的地图实例。当指定此参数后，搜索结果的标注、线路等均会自动添加到此地图上。可选
             * cesium 不需要当前参数
             */
            map: params?.map ? params.map : undefined,
            /**
             * 公交换乘的城市，支持城市名称、城市区号、电话区号，
             * 此项为必填
             */
            city: params?.city ? params.city : "",
            /**
             * 公交换乘策略strategy
             * 例如：AMap.DrivingPolicy.LEAST_TIME
             * 0/最快捷模式
             * 1/最经济模式
             * 2/最少换乘模式
             * 3/最少步行模式
             * 5/不乘地铁模式
             */
            policy: params?.policy ? params.policy : 0,
            /**
             * 是否计算夜班车，默认为不计算。true：计算，false：不计算
             */
            nightflag: params?.nightflag ? params.nightflag : false,
            /**
             * 默认值：base，返回基本地址信息
             * 当取值为：all，返回DriveStep基本信息+DriveStep详细信息
             */
            extensions: params?.extensions ? params.extensions : "base",
            /**
             * 结果列表的HTML容器id或容器元素，提供此参数后，结果列表将在此容器中进行展示。可选值
             */
            panel: params?.panel ? params.panel : "",
            /**
             * 设置隐藏路径规划的起始点图标 设置为true：隐藏图标；设置false：显示图标
             * 默认值为：false
             */
            hideMarkers: params?.hideMarkers ? params.hideMarkers : false,
            /**
             * 使用map属性时，绘制的规划线路是否显示描边。缺省为true
             */
            isOutline: params?.isOutline ? params.isOutline : undefined,
            /**
             * 使用map属性时，绘制的规划线路的描边颜色。缺省为'white'
             */
            outlineColor: params?.outlineColor ? params.outlineColor : undefined,
            /**
             * 用于控制在路径规划结束后，是否自动调整地图视野使绘制的路线处于视口的可见范围
             */
            autoFitView: params?.autoFitView ? params.autoFitView : undefined,
        }
        return new Promise((resolve, reject) => {
            AMap.plugin("AMap.Transfer", () => {
                const trans = new AMap.Transfer(transferParams);
                trans.search(params.start, params.end, (status, result) => {
                    if (status == "complete") {
                        resolve(result)
                    } else {
                        reject("Error")
                    }
                });
            });
        })
    }

    /**
     * 骑行路线规划服务
     * @param {Object} params 配置参数 文档：https://lbs.amap.com/api/jsapi-v2/documentation#riding
     * @returns {Object} 骑行路线规划服务数据
     */
    Riding(params) {
        const AMap = this.AMap
        const ridingParams = {
            /**
             * AMap.Map对象, 展现结果的地图实例。当指定此参数后，搜索结果的标注、线路等均会自动添加到此地图上。可选
             * cesium 不需要当前参数
             */
            map: params?.map ? params.map : undefined,
            /**
             * 骑行路线规划策略；
             * 默认值：0
             * 可选值为： 
             * 0：推荐路线及最快路线综合 
             * 1：推荐路线 
             * 2：最快路线
             */
            policy: params?.policy ? params.policy : 0,
            /**
             * 结果列表的HTML容器id或容器元素，提供此参数后，结果列表将在此容器中进行展示。可选值
             */
            panel: params?.panel ? params.panel : "",
            /**
             * 设置隐藏路径规划的起始点图标 设置为true：隐藏图标；设置false：显示图标
             * 默认值为：false
             */
            hideMarkers: params?.hideMarkers ? params.hideMarkers : false,
            /**
             * 使用map属性时，绘制的规划线路是否显示描边。缺省为true
             */
            isOutline: params?.isOutline ? params.isOutline : undefined,
            /**
             * 使用map属性时，绘制的规划线路的描边颜色。缺省为'white'
             */
            outlineColor: params?.outlineColor ? params.outlineColor : undefined,
            /**
             * 用于控制在路径规划结束后，是否自动调整地图视野使绘制的路线处于视口的可见范围
             */
            autoFitView: params?.autoFitView ? params.autoFitView : undefined,
        }
        return new Promise((resolve, reject) => {
            AMap.plugin("AMap.Riding", () => {
                const riding = new AMap.Riding(ridingParams);
                riding.search(params.start, params.end, (status, result) => {
                    if (status == "complete") {
                        resolve(result)
                    } else {
                        reject("Error")
                    }
                });
            });
        })
    }

    /**
     * 步行路线规划服务
     * @param {Object} params 配置参数 文档：https://lbs.amap.com/api/jsapi-v2/documentation#walking
     * @returns {Object} 步行路线规划服务数据
     */
    Walking(params) {
        const AMap = this.AMap
        const walkingParams = {
            /**
             * AMap.Map对象, 展现结果的地图实例。当指定此参数后，搜索结果的标注、线路等均会自动添加到此地图上。可选
             * cesium 不需要当前参数
             */
            map: params?.map ? params.map : undefined,
            /**
             * 结果列表的HTML容器id或容器元素，提供此参数后，结果列表将在此容器中进行展示。可选值
             */
            panel: params?.panel ? params.panel : "",
            /**
             * 设置隐藏路径规划的起始点图标 设置为true：隐藏图标；设置false：显示图标
             * 默认值为：false
             */
            hideMarkers: params?.hideMarkers ? params.hideMarkers : false,
            /**
             * 使用map属性时，绘制的规划线路是否显示描边。缺省为true
             */
            isOutline: params?.isOutline ? params.isOutline : undefined,
            /**
             * 使用map属性时，绘制的规划线路的描边颜色。缺省为'white'
             */
            outlineColor: params?.outlineColor ? params.outlineColor : undefined,
            /**
             * 用于控制在路径规划结束后，是否自动调整地图视野使绘制的路线处于视口的可见范围
             */
            autoFitView: params?.autoFitView ? params.autoFitView : undefined,
        }
        return new Promise((resolve, reject) => {
            AMap.plugin("AMap.Walking", () => {
                const mwalk = new AMap.Walking(walkingParams);
                mwalk.search(params.start, params.end, (status, result) => {
                    if (status == "complete") {
                        resolve(result)
                    } else {
                        reject("Error")
                    }
                });
            });
        })
    }


}


export default GaodeMap