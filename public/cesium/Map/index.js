
// import Utils from "@/common/cesium/Utils.js";
// import "./Baidu/module/BaiDuImageryProvider" //百度地图依赖

/**
 * 地图操作
 * 参考：
 * https://blog.51cto.com/u_6725876/5155018
 */
class Map {
    constructor(Cesium, viewer) {
        this.Cesium = Cesium
        this.viewer = viewer
    }
    get list() {
        return [
            {
                label: "腾讯地图",
                value: "tencent"
            },
            {
                label: "OSM地图",
                value: "osm"
            },
            {
                label: "高德-矢量",
                value: "gaode-vector"
            },
            {
                label: "高德-影像",
                value: "gaode-image"
            },
            {
                label: "Bing地图",
                value: "bing"
            },
            {
                label: "google地图",
                value: "google"
            },
            {
                label: "天地图",
                value: "tianditu"
            },
            {
                label: "Mapbox地图",
                value: "mapbox"
            },
            {
                label: "ArcGis地图",
                value: "arcgis"
            },
            // {
            //     label: "百度地图",
            //     value: "baidu"
            // }
        ]
    }
    /**
     * 地图类型初始化
     * @param {String} type 自定义类型 可以查看上面 list 
     * @param {Object} params 参数 根据不同类型的地图 传递官方需要的参数 目前简要封装 可以根据项目需求 迭代参数
     * @returns 地图参数
     */
    init(type, params) {
        if (type == "tencent") {
            return this.createTencent(params)
        }
        if (type == "osm") {
            return this.createOsm(params)
        }
        if (type == "gaode-vector") {
            return this.createGaodeVector(params)
        }
        if (type == "gaode-image") {
            return this.createGaodeImage(params)
        }
        if (type == "bing") {
            return this.createBing(params)
        }
        if (type == "google") {
            return this.createGoogle(params)
        }
        if (type == "tianditu") {
            return this.createTianditu(params)
        }
        if (type == "mapbox") {
            return this.createMapbox(params)
        }
        if (type == "arcgis") {
            return this.createArcGis(params)
        }
        if (type == "baidu") {
            return this.createBaidu(params)
        }
    }
    /**
     * 腾讯地图
     * @param {Object} params 参数
     * @returns 地图实体
     */
    createTencent(params) {
        const Cesium = this.Cesium
        const data = new Cesium.UrlTemplateImageryProvider({
            url: "https://p2.map.gtimg.com/sateTiles/{z}/{sx}/{sy}/{x}_{reverseY}.jpg?version=229",
            customTags: {
                sx: (imageryProvider, x, y, level) => {
                    return x >> 4;
                },
                sy: (imageryProvider, x, y, level) => {
                    return ((1 << level) - y) >> 4;
                },
            },
        })
        return data
    }
    /**
     * OSM地图
     * @param {Object} params 
     * @returns 地图实体
     */
    createOsm(params) {
        const Cesium = this.Cesium
        // 目前提供 黑色/black 白色/white 两个类型例子 后面可迭代更新当前函数内的更多玩法
        const type = params?.type ? params.type : "white"
        let mapType;

        if (type == 'white') {
            mapType = {
                url: 'https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png',
                subdomains: ["a", "b", "c", "d"],
            }
        }

        if (type == 'black') {
            mapType = {
                url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
                subdomains: ["a", "b", "c", "d"],
            }
        }

        const data = new Cesium.UrlTemplateImageryProvider(mapType)
        return data
    }
    /**
     * 高德-矢量
     * @param {Object} params 
     * @returns 地图实体
     */
    createGaodeVector(params) {
        const Cesium = this.Cesium
        const data = new Cesium.UrlTemplateImageryProvider({
            url: "http://webst02.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}"
        })
        return data
    }

    /**
     * 高德-影像
     * @param {Object} params 
     * @returns 地图实体
     */
    createGaodeImage(params) {
        const Cesium = this.Cesium
        const data = new Cesium.UrlTemplateImageryProvider({
            url: "http://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}"
        })
        return data
    }

    /**
     * Bing地图
     * @param {Object} params 
     * @returns 地图实体
     */
    createBing(params) {
        const Cesium = this.Cesium
        /**
         * key可能会失效，更换自己的key
         * 可至官网（https://www.bingmapsportal.com/）申请key
         */
        const key = params?.key ? params.key : 'AnG2da_pErvggXYPqbZs3Fr7U4UWNwyU5rHArWgE6G792Y0wUv4RDBu0xZcHAzvy'
        const data = new Cesium.BingMapsImageryProvider({
            key,
            url: 'https://dev.virtualearth.net',
            mapStyle: Cesium.BingMapsStyle.AERIAL
        })
        return data
    }
    /**
     * Google地图
     * 注：
     * 请求地址 https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z} 
     * or
     * http://mt1.google.cn/vt/lyrs=s&x={x}&y={y}&z={z}
     * @param {Object} params 
     * 参数：
     * lyrs：h（街道图）、m（街道图）、p（街道图）、r（街道图）、s（影像无注记）、y（影像含注记）、t（地形图）
     * @returns 地图实体
     */
    createGoogle(params) {
        const Cesium = this.Cesium
        const lyrs = params?.lyrs ? params.lyrs : 'm'
        const data = new Cesium.UrlTemplateImageryProvider({
            url: `https://www.google.cn/maps/vt?lyrs=${lyrs}@189&gl=cn&x={x}&y={y}&z={z}`
        })
        return data
    }

    /**
     * 天地图
     * @param {Object} params 
     * 参数：
     * LAYER：img（影像地图）、vec（矢量地图）、cia（标记）
     * @returns 地图实体
     */
    createTianditu(params) {
        const Cesium = this.Cesium
        const LAYER = params?.LAYER ? params.LAYER : 'vec'
        const data = new Cesium.UrlTemplateImageryProvider({
            url: `https://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${LAYER}&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=9a516b0f2a8179bb68f73172cff4bd22`
        })
        return data
    }

    /**
     * Mapbox地图
     * @param {Object} params 
     * @returns 地图实体
     */
    createMapbox(params) {
        const Cesium = this.Cesium
        const data = new Cesium.UrlTemplateImageryProvider({
            url: `https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png`
        })
        return data
    }


    /**
     * ArcGis地图
     * @param {Object} params 
     * @returns 地图实体
     */
    createArcGis(params) {
        const Cesium = this.Cesium
        //街道
        // https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}

        //灰色图
        // https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}

        //深蓝夜色：
        // https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}
        const data = new Cesium.ArcGisMapServerImageryProvider({
            name: "img_arcgis",
            url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
        })
        return data
    }

    /**
     * 百度地图
     * @param {Object} params 
     * @returns 地图实体
     */
    createBaidu(params) {
        const Cesium = this.Cesium
        // console.log(new BaiduImageryProvider())
        const _BaiduImageryProvider = new BaiduImageryProvider({
            url: "http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1"
        })
        // const data = new Cesium.UrlTemplateImageryProvider(_BaiduImageryProvider)
        return _BaiduImageryProvider
    }

}

export default Map