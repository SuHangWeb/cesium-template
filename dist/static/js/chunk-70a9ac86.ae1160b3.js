(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-70a9ac86"],{"245e":function(t,e,i){"use strict";i("2569")},2569:function(t,e,i){},"37f9":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container"},[i("viewer",{ref:"viewer",staticClass:"viewer",attrs:{images:t.images,options:t.options},on:{inited:t.inited},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.images,(function(t,e){return i("img",{key:e,staticClass:"hide",attrs:{src:t}})}))}}])}),i("el-card",{staticClass:"box-card",staticStyle:{"margin-bottom":"16px"}},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("span",[t._v("参考文档")])]),i("div",t._l(t.doc,(function(e,s){return i("Button-linear-color",{key:s,attrs:{title:e.title,index:s,identifier:"doc"},on:{trigger:t.link}})})),1)]),i("el-card",{staticClass:"box-card"},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("span",[t._v("三方依赖（根据需求酌情使用）")])]),i("div",{staticClass:"card-main"},t._l(t.tripartite,(function(e,s){return i("div",{key:s},[i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.describe,placement:"top-start"}},[i("Button-linear-color",{attrs:{title:e.title,index:s,identifier:"tripartite"},on:{trigger:t.link}})],1)],1)})),0)])],1)},l=[],o=(i("2ad0"),[{title:"Cesium中文网",link:"http://cesium.xin/cesium/cn/Documentation1.72/index.html",externalLinks:!0},{title:"Cesium官方文档（英文）",link:"https://cesium.com/learn/cesiumjs/ref-doc/",style:"light-blue-btn",externalLinks:!0},{title:"Cesium官方案例",link:"https://sandcastle.cesium.com/index.html?src=Polygon.html",externalLinks:!0},{title:"Mars3D效果",link:"http://mars3d.cn/example.html",externalLinks:!0},{title:"CSDN-大神文章-cesium之家",link:"https://blog.csdn.net/qq98281642/category_11294524.html",externalLinks:!0},{title:"EarthSDK示例集",link:"http://earthsdk.com/v/last/Apps/Examples/?menu=true&url=./cesium-primitive-createCube.html",externalLinks:!0},{title:"Cesium核心类-思维导图",link:"/cesium-template/static/images/heart-class.jpg"},{title:"Cesium中文网-社区",link:"http://cesium.coinidea.com/",externalLinks:!0},{title:"Cesium中文网-简书",link:"https://www.jianshu.com/u/217c80f1e0a9",externalLinks:!0},{title:"GIS开发者",link:"https://www.giserdqy.com/",externalLinks:!0},{title:"supermap",link:"http://support.supermap.com.cn:8090/webgl/examples/webgl/examples.html#layer",externalLinks:!0},{title:"xt3d实例",link:"http://www.xtgis.cc/basiccategorylist",externalLinks:!0},{title:"内链测试空白页-开发使用",link:"/test/blankPage",innerChain:!0}]),a=[{title:"gcoord",describe:"地理坐标转换器",link:"https://gitee.com/guohaitk/gcoord",externalLinks:!0},{title:"geojson",describe:"数据格式转换器",link:"https://www.npmjs.com/package/geojson",externalLinks:!0},{title:"uuid",describe:"创建一个随机uuid",link:"https://www.npmjs.com/package/uuid",externalLinks:!0}],n=(i("0a71"),i("eece")),r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{class:"pan-btn "+t.randomColor,on:{click:t.btnClick}},[t._v(t._s(t.title))])},c=[],m=(i("d354"),[{className:"color-324157",color:"#324157"},{className:"color-3A71A8",color:"#3A71A8"},{className:"color-C03639",color:"#C03639"},{className:"color-E65D6E",color:"#E65D6E"},{className:"color-30B08F",color:"#30B08F"},{className:"color-4AB7BD",color:"#4AB7BD"},{className:"color-FEC171",color:"#FEC171"},{className:"color-006600",color:"#006600"},{className:"color-006666",color:"#006666"},{className:"color-006699",color:"#006699"},{className:"color-0066FF",color:"#0066FF"},{className:"color-330000",color:"#330000"},{className:"color-660000",color:"#660000"},{className:"color-663399",color:"#663399"},{className:"color-666600",color:"#666600"},{className:"color-666699",color:"#666699"},{className:"color-990000",color:"#990000"},{className:"color-990099",color:"#990099"},{className:"color-CC33CC",color:"#CC33CC"},{className:"color-CC9933",color:"#CC9933"},{className:"color-CCCCFF",color:"#CCCCFF"},{className:"color-FF9900",color:"#FF9900"},{className:"color-FFFF66",color:"#FFFF66"},{className:"color-FF6600",color:"#FF6600"},{className:"color-33CCCC",color:"#33CCCC"},{className:"color-666633",color:"#666633"}]),u=i("ed08"),d={data:function(){return{colors:m}},props:{title:{type:String,default:function(){return""}},identifier:{type:String,default:function(){return""}},className:{type:String,default:function(){return""}},index:{type:Number|String,default:function(){return""}}},computed:{randomColor:function(){return""!==this.className?this.className:""===this.index?this.colors[Object(u["b"])(0,25)].className:this.colors[this.index].className}},methods:{btnClick:function(){""!==this.className?this.$emit("trigger",{type:"class",data:this.className,identifier:this.identifier}):this.$emit("trigger",{type:"index",data:this.index,identifier:this.identifier})}}},p=d,h=(i("e926"),i("cba8")),C=Object(h["a"])(p,r,c,!1,null,"70e0dca8",null),k=C.exports,f={components:{Viewer:n["component"],ButtonLinearColor:k},name:"Files",data:function(){return{doc:o,tripartite:a,images:[],options:{inline:!1,button:!0,navbar:!1,title:!0,toolbar:!1,tooltip:!0,movable:!0,zoomable:!0,rotatable:!0,scalable:!0,transition:!0,fullscreen:!0,keyboard:!0}}},methods:{inited:function(t){this.$viewer=t},show:function(){this.$viewer.show()},link:function(t){var e,i,s;"doc"==t.identifier&&(s=this.doc[t.data]),"tripartite"==t.identifier&&(s=this.tripartite[t.data]),null!==(e=s)&&void 0!==e&&e.externalLinks&&s.externalLinks?window.open(s.link):null!==(i=s)&&void 0!==i&&i.innerChain&&s.innerChain?this.$router.push({path:s.link}):(this.images=[s.link],this.$viewer.show())}}},g=f,x=(i("245e"),Object(h["a"])(g,s,l,!1,null,"4a5350a5",null));e["default"]=x.exports},"7c9a":function(t,e,i){},e926:function(t,e,i){"use strict";i("7c9a")}}]);