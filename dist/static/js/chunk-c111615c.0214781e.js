(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c111615c"],{"37f9":function(t,e,i){"use strict";i.r(e);var l=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container"},[i("viewer",{ref:"viewer",staticClass:"viewer",attrs:{images:t.images,options:t.options},on:{inited:t.inited},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.images,(function(t,e){return i("img",{key:e,staticClass:"hide",attrs:{src:t}})}))}}])}),i("el-card",{staticClass:"box-card",staticStyle:{"margin-bottom":"16px"}},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("span",[t._v("参考文档")])]),i("div",t._l(t.computed_private(t.doc),(function(e,l){return i("Button-linear-color",{key:l,attrs:{title:e.title,index:l,identifier:"doc"},on:{trigger:t.link}})})),1)]),i("el-card",{staticClass:"box-card",staticStyle:{"margin-bottom":"16px"}},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("span",[t._v("参考效果")])]),i("div",t._l(t.computed_private(t.effect),(function(e,l){return i("Button-linear-color",{key:l,attrs:{title:e.title,index:l,identifier:"effect"},on:{trigger:t.link}})})),1)]),i("el-card",{staticClass:"box-card",staticStyle:{"margin-bottom":"16px"}},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("span",[t._v("三方依赖（根据需求酌情使用）")])]),i("div",{staticClass:"card-main"},t._l(t.computed_private(t.tripartite),(function(e,l){return i("div",{key:l},[i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.describe,placement:"top-start"}},[i("Button-linear-color",{attrs:{title:e.title,index:l,identifier:"tripartite"},on:{trigger:t.link}})],1)],1)})),0)]),i("el-card",{staticClass:"box-card"},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("span",[t._v("工具")])]),i("div",{staticClass:"card-main"},t._l(t.computed_private(t.tools),(function(e,l){return i("div",{key:l},[i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.describe,placement:"top-start"}},[i("Button-linear-color",{attrs:{title:e.title,index:l,identifier:"tools"},on:{trigger:t.link}})],1)],1)})),0)])],1)},s=[],a=(i("decf"),i("eb3b"),i("f12e"),[{title:"Cesium中文网",link:"http://cesium.xin/cesium/cn/Documentation1.95/index.html",externalLinks:!0},{title:"Cesium官方文档（英文）",link:"https://cesium.com/learn/cesiumjs/ref-doc/",style:"light-blue-btn",externalLinks:!0},{title:"CSDN-大神文章-cesium之家",link:"https://blog.csdn.net/qq98281642/category_11294524.html",externalLinks:!0},{title:"Cesium核心类-思维导图",link:"/cesium-template/static/images/heart-class.jpg"},{title:"Cesium中文网-社区",link:"http://cesium.coinidea.com/",externalLinks:!0},{title:"Cesium中文网-简书",link:"https://www.jianshu.com/u/217c80f1e0a9",externalLinks:!0},{title:"GIS开发者",link:"https://www.giserdqy.com/",externalLinks:!0},{title:"入门教程",link:"https://syzdev.cn/cesium-docs/",externalLinks:!0},{title:"Cesium API使用指南",link:"https://zhuanlan.zhihu.com/p/80904975",externalLinks:!0},{title:"Cesium资料大全",link:"https://zhuanlan.zhihu.com/p/34217817",externalLinks:!0},{title:"内链测试空白页-开发使用",link:"/test/blankPage",innerChain:!0,private:!0},{title:"空白球体-开发使用",link:"/test/testPage",innerChain:!0,private:!0},{title:"coding-工作平台",link:"https://landstar.coding.net/user",innerChain:!0,private:!0},{title:"下载",link:"https://zhuanlan.zhihu.com/p/523570955",innerChain:!0,private:!0}]),n=[{title:"Cesium官方案例",link:"https://sandcastle.cesium.com/index.html?src=Polygon.html",externalLinks:!0},{title:"Mars3D效果",link:"http://mars3d.cn/example.html",externalLinks:!0},{title:"西部世界(EarthSDK示例集)",link:"http://earthsdk.com/v/last/Apps/Examples/?menu=true&url=./cesium-primitive-createCube.html",externalLinks:!0},{title:"北京超图(supermap)",link:"http://support.supermap.com.cn:8090/webgl/examples/webgl/examples.html#layer",externalLinks:!0},{title:"xt3d实例",link:"http://www.xtgis.cc/basiccategorylist",externalLinks:!0},{title:"恒歌科技",link:"http://www.freexgis.com/",externalLinks:!0},{title:"拓展示例和插件",link:"https://gitee.com/yangyizhao/cesium-examples?_from=gitee_search",externalLinks:!0},{title:"数字视觉",link:"http://dc.dvgis.cn/#/examples",externalLinks:!0},{title:"vue-cesium",link:"https://zouyaoji.top/vue-cesium/#/zh-CN",externalLinks:!0},{title:"cv3案例集",link:"http://cv3.zhengqj.cc/",externalLinks:!0},{title:"Cesium map实例",link:"http://api.rivermap.cn/cesium/rivermap/map.html",externalLinks:!0}],o=[{title:"gcoord",describe:"地理坐标转换器",link:"https://gitee.com/guohaitk/gcoord",externalLinks:!0},{title:"geojson",describe:"数据格式转换器",link:"https://www.npmjs.com/package/geojson",externalLinks:!0},{title:"uuid",describe:"创建一个随机uuid",link:"https://www.npmjs.com/package/uuid",externalLinks:!0},{title:"bignumber",describe:"精度计算",link:"https://www.npmjs.com/package/bignumber.js",externalLinks:!0}],r=[{title:"地理geoJson下载",describe:"地理geoJson数据下载",link:"http://datav.aliyun.com/portal/school/atlas/area_selector#&lat=31.769817845138945&lng=104.29901249999999&zoom=4",externalLinks:!0}],c=(i("0a71"),i("eece")),m=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{class:"pan-btn "+t.randomColor,on:{click:t.btnClick}},[t._v(t._s(t.title))])},u=[],d=(i("7502"),[{className:"color-324157",color:"#324157"},{className:"color-3A71A8",color:"#3A71A8"},{className:"color-C03639",color:"#C03639"},{className:"color-E65D6E",color:"#E65D6E"},{className:"color-30B08F",color:"#30B08F"},{className:"color-4AB7BD",color:"#4AB7BD"},{className:"color-FEC171",color:"#FEC171"},{className:"color-006600",color:"#006600"},{className:"color-006666",color:"#006666"},{className:"color-006699",color:"#006699"},{className:"color-0066FF",color:"#0066FF"},{className:"color-330000",color:"#330000"},{className:"color-660000",color:"#660000"},{className:"color-663399",color:"#663399"},{className:"color-666600",color:"#666600"},{className:"color-666699",color:"#666699"},{className:"color-990000",color:"#990000"},{className:"color-990099",color:"#990099"},{className:"color-CC33CC",color:"#CC33CC"},{className:"color-CC9933",color:"#CC9933"},{className:"color-CCCCFF",color:"#CCCCFF"},{className:"color-FF9900",color:"#FF9900"},{className:"color-FFFF66",color:"#FFFF66"},{className:"color-FF6600",color:"#FF6600"},{className:"color-33CCCC",color:"#33CCCC"},{className:"color-666633",color:"#666633"}]),p=i("ed08"),h={data:function(){return{colors:d}},props:{title:{type:String,default:function(){return""}},identifier:{type:String,default:function(){return""}},className:{type:String,default:function(){return""}},index:{type:Number|String,default:function(){return""}}},computed:{randomColor:function(){return""!==this.className?this.className:""===this.index?this.colors[Object(p["b"])(0,25)].className:this.colors[this.index].className}},methods:{btnClick:function(){""!==this.className?this.$emit("trigger",{type:"class",data:this.className,identifier:this.identifier}):this.$emit("trigger",{type:"index",data:this.index,identifier:this.identifier})}}},k=h,f=(i("e926"),i("cba8")),C=Object(f["a"])(k,m,u,!1,null,"70e0dca8",null),x=C.exports,g={components:{Viewer:c["component"],ButtonLinearColor:x},name:"Files",data:function(){return{doc:a,effect:n,tripartite:o,tools:r,images:[],options:{inline:!1,button:!0,navbar:!1,title:!0,toolbar:!1,tooltip:!0,movable:!0,zoomable:!0,rotatable:!0,scalable:!0,transition:!0,fullscreen:!0,keyboard:!0}}},computed:{computed_private:function(){return function(t){var e=!1;return e?t:t.filter((function(t){return!(null!==t&&void 0!==t&&t.private&&t.private)}))}}},methods:{inited:function(t){this.$viewer=t},show:function(){this.$viewer.show()},link:function(t){var e,i,l;"doc"==t.identifier&&(l=this.doc[t.data]),"effect"==t.identifier&&(l=this.effect[t.data]),"tripartite"==t.identifier&&(l=this.tripartite[t.data]),"tools"==t.identifier&&(l=this.tools[t.data]),null!==(e=l)&&void 0!==e&&e.externalLinks&&l.externalLinks?window.open(l.link):null!==(i=l)&&void 0!==i&&i.innerChain&&l.innerChain?this.$router.push({path:l.link}):(this.images=[l.link],this.$viewer.show())}}},v=g,b=(i("7884"),Object(f["a"])(v,l,s,!1,null,"87a63588",null));e["default"]=b.exports},7884:function(t,e,i){"use strict";i("d9c8")},"7c9a":function(t,e,i){},d9c8:function(t,e,i){},e926:function(t,e,i){"use strict";i("7c9a")}}]);