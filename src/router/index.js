import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'


import externalLink from "./externalLink"

const externalLinkArr = externalLink.map(item => {
  const { path, title } = item
  return {
    path,
    meta: { title, icon: 'link' }
  }
})


/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    children: [{
      path: '/',
      name: 'index',
      component: () => import('@/views/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: '首页', icon: 'dashboard' }
  //   }]
  // },
  {
    path: '/start',
    component: Layout,
    children: [{
      path: 'start',
      name: 'Start',
      component: () => import('@/views/Start'),
      meta: { title: '快速开始', icon: 'el-icon-star-off', highlight: true }
    }]
  },


  {
    path: '/getCoordinates',
    component: Layout,
    children: [{
      path: 'getCoordinates',
      name: 'GetCoordinates',
      component: () => import('@/views/GetCoordinates'),
      meta: { title: '获取经纬度', icon: 'el-icon-map-location', highlight: true }
    }]
  },

  {
    path: '/haloLine',
    component: Layout,
    children: [{
      path: 'haloLine',
      name: 'HaloLine',
      component: () => import('@/views/HaloLine'),
      meta: { title: '光晕线', icon: 'el-icon-paperclip', highlight: true }
    }]
  },



  {
    path: '/html',
    component: Layout,
    redirect: '/entity/htmlPopup',
    name: 'Html',
    meta: { title: 'Html', icon: 'el-icon-collection-tag' },
    children: [
      {
        path: 'htmlPopup',
        name: 'HtmlPopup',
        component: () => import('@/views/Html/htmlPopup'),
        meta: { title: 'html图层定位', icon: 'el-icon-collection-tag', highlight: true }
      }
    ]
  },

  {
    path: '/city',
    component: Layout,
    redirect: '/City/wisdom',
    name: 'City',
    meta: { title: '城市', icon: 'el-icon-office-building', highlight: true },
    children: [
      {
        path: 'wisdom',
        name: 'wisdom',
        component: () => import('@/views/City/wisdom'),
        meta: { title: '智慧城市', icon: 'el-icon-office-building', highlight: true },
      },
      {
        path: 'section',
        name: 'section',
        component: () => import('@/views/City/section'),
        meta: { title: '分析剖切', icon: 'el-icon-office-building', highlight: true },
      },
      {
        path: 'UAV',
        name: 'UAV',
        component: () => import('@/views/City/UAV'),
        meta: { title: '无人机', icon: 'el-icon-s-promotion', highlight: true },
      },
    ]
  },

  {
    path: '/scene',
    component: Layout,
    children: [{
      path: 'scene',
      name: 'Scene',
      component: () => import('@/views/Scene'),
      meta: { title: '场景', icon: 'el-icon-bangzhu', highlight: true }
    }]
  },

  {
    path: '/entity',
    component: Layout,
    redirect: '/entity/drawPoint',
    name: 'Entity',
    meta: { title: 'Entity', icon: 'el-icon-menu' },
    children: [
      {
        path: 'drawPoint',
        name: 'DrawPoint',
        component: () => import('@/views/Entity/drawPoint'),
        meta: { title: '绘制点', icon: 'el-icon-edit', highlight: true }
      },
      {
        path: 'drawLine',
        name: 'DrawLine',
        component: () => import('@/views/Entity/drawLine'),
        meta: { title: '绘制线', icon: 'el-icon-edit', highlight: true }
      },
      {
        path: 'textMap',
        name: 'TextMap',
        component: () => import('@/views/Entity/textMap/rectangle'),
        meta: { title: '文字贴图', icon: 'el-icon-edit', highlight: true },
        children: [
          {
            path: 'rectangle',
            component: () => import('@/views/Entity/textMap/rectangle'),
            name: 'Rectangle',
            meta: { title: '文字贴图-矩形', icon: 'el-icon-edit', highlight: true }
          },
        ]
      },
      {
        path: 'canvasImageSpot',
        name: 'CanvasImageSpot',
        component: () => import('@/views/Entity/canvasImageSpot'),
        meta: { title: 'Canvas 图片点', icon: 'el-icon-pie-chart', highlight: true }
      },
      {
        path: 'wall',
        name: 'Wall',
        component: () => import('@/views/Entity/wall'),
        meta: { title: '墙体', icon: 'el-icon-full-screen', highlight: true }
      },
      {
        path: 'dynamicPosition',
        name: 'DynamicPosition',
        component: () => import('@/views/Entity/dynamicPosition'),
        meta: { title: '动态位置', icon: 'el-icon-place', highlight: true }
      },
      {
        path: 'polylineVolume',
        name: 'PolylineVolume',
        component: () => import('@/views/Entity/polylineVolume'),
        meta: { title: '管道', icon: 'el-icon-paperclip', highlight: true }
      },
      {
        path: 'ellipsoid',
        name: 'Ellipsoid',
        component: () => import('@/views/Entity/ellipsoid'),
        meta: { title: '半球体', icon: 'el-icon-orange', highlight: true }
      },
    ]
  },


  {
    path: '/primitives',
    component: Layout,
    redirect: '/Primitives/ParticleSystem',
    name: 'Primitives',
    meta: { title: 'Primitives', icon: 'el-icon-menu', highlight: true },
    children: [
      {
        path: 'particleSystem',
        name: 'ParticleSystem',
        component: () => import('@/views/Primitives/ParticleSystem/AircraftTailFlame'),
        meta: { title: '粒子', icon: 'table', highlight: true },
        children: [
          {
            path: 'aircraftTailFlame',
            component: () => import('@/views/Primitives/ParticleSystem/AircraftTailFlame'),
            name: 'AircraftTailFlame',
            meta: { title: '飞机尾焰', icon: 'el-icon-s-promotion', highlight: true }
          },
          {
            path: 'rainbow',
            component: () => import('@/views/Primitives/ParticleSystem/Rainbow'),
            name: 'Rainbow',
            meta: { title: '彩虹', icon: 'el-icon-dish-1', highlight: true }
          },
          {
            path: 'zoom',
            component: () => import('@/views/Primitives/ParticleSystem/Zoom'),
            name: 'Zoom',
            meta: { title: '距离变化', icon: 'el-icon-crop', highlight: true }
          },
        ]
      },
      {
        path: 'models',
        name: 'Models',
        component: () => import('@/views/Primitives/Models/Mapping'),
        meta: { title: '模型', icon: 'el-icon-menu', highlight: true },
        children: [
          {
            path: 'mapping',
            component: () => import('@/views/Primitives/Models/Mapping'),
            name: 'Mapping',
            meta: { title: '贴图', icon: 'el-icon-picture-outline-round', highlight: true }
          },
        ]
      },
    ]
  },


  {
    path: '/echarts',
    component: Layout,
    redirect: '/Echarts/Bar',
    name: 'Echarts',
    meta: { title: 'Echarts', icon: 'el-icon-pie-chart', highlight: true },
    children: [
      {
        path: 'bar',
        name: 'Bar',
        component: () => import('@/views/Echarts/Bar'),
        meta: { title: '统计柱状体', icon: 'el-icon-s-data', highlight: true }
      },
      {
        path: 'waterPolo',
        name: 'WaterPolo',
        component: () => import('@/views/Echarts/WaterPolo'),
        meta: { title: '动态水球', icon: 'el-icon-pie-chart', highlight: true }
      },
    ]
  },

  {
    path: '/maps',
    component: Layout,
    redirect: '/Maps/Base',
    name: 'Maps',
    meta: { title: 'Maps', icon: 'earth', highlight: true },
    children: [
      {
        path: 'base',
        name: 'Base',
        component: () => import('@/views/Maps/Base'),
        meta: { title: '地图集合', icon: 'earth', highlight: true }
      },
      {
        path: 'gaode',
        name: 'Gaode',
        component: () => import('@/views/Maps/Gaode/PoiQuery'),
        meta: { title: '高德', icon: 'earth', highlight: true },
        children: [
          {
            path: 'poiQuery',
            component: () => import('@/views/Maps/Gaode/PoiQuery'),
            name: 'PoiQuery',
            meta: { title: '高德POI查询', icon: 'earth', highlight: true }
          },
        ]
      },
    ]
  },


  {
    path: '/vectorLayer',
    component: Layout,
    redirect: '/VectorLayer/GeoJson',
    name: 'VectorLayer',
    meta: { title: '矢量图层', icon: 'el-icon-picture-outline', highlight: true },
    children: [
      {
        path: 'geoJson',
        name: 'GeoJson',
        component: () => import('@/views/VectorLayer/GeoJson/District'),
        meta: { title: 'GeoJson矢量图层', icon: 'el-icon-picture-outline', highlight: true },
        children: [
          {
            path: 'district',
            component: () => import('@/views/VectorLayer/GeoJson/District'),
            name: 'District',
            meta: { title: '行政区', icon: 'el-icon-map-location', highlight: true }
          },
        ]
      },
    ]
  },


  {
    path: '/models',
    component: Layout,
    redirect: '/Models/gLTF',
    name: 'Models',
    meta: { title: '模型', icon: 'el-icon-cpu', highlight: true },
    children: [
      {
        path: 'gLTF',
        name: 'gLTF',
        component: () => import('@/views/Models/gLTF/storey'),
        meta: { title: 'gLTF', icon: 'el-icon-cpu', highlight: true },
        children: [
          {
            path: 'district',
            component: () => import('@/views/Models/gLTF/storey'),
            name: 'District',
            meta: { title: '楼栋分层控制', icon: 'el-icon-school', highlight: true }
          },
        ]
      },
      {
        path: '3DTiles',
        name: '3DTiles',
        component: () => import('@/views/Models/3DTiles/monomerEditing'),
        meta: { title: '3DTiles', icon: 'el-icon-cpu', highlight: true },
        children: [
          {
            path: 'monomerEditing',
            component: () => import('@/views/Models/3DTiles/monomerEditing/index.vue'),
            name: 'MonomerEditing',
            meta: { title: '矢量单体化编辑', icon: 'el-icon-school', highlight: true }
          },
          {
            path: 'urbanBuildings',
            component: () => import('@/views/Models/3DTiles/UrbanBuildings/index.vue'),
            name: 'UrbanBuildings',
            meta: { title: '城市建筑', icon: 'el-icon-office-building', highlight: true }
          },
        ]
      },
    ]
  },


  {
    path: '/analysis',
    component: Layout,
    redirect: '/Analysis/RollerShutter',
    name: 'Analysis',
    meta: { title: '分析', icon: 'el-icon-monitor', highlight: true },
    children: [
      {
        path: 'rollerShutter',
        name: 'RollerShutter',
        component: () => import('@/views/Analysis/RollerShutter'),
        meta: { title: '卷帘', icon: 'el-icon-c-scale-to-original', highlight: true }
      },
    ]
  },

  {
    path: '/tools',
    component: Layout,
    redirect: '/tools/measure',
    name: 'Tools',
    meta: { title: '工具', icon: 'el-icon-thumb', highlight: true },
    children: [
      {
        path: 'compass',
        name: 'Compass',
        component: () => import('@/views/Tools/compass'),
        meta: { title: '罗盘', icon: 'el-icon-discover', highlight: true }
      },
      {
        path: 'draw',
        name: 'Draw',
        component: () => import('@/views/Tools/draw'),
        meta: { title: '绘制', icon: 'el-icon-edit', highlight: true }
      },
      {
        path: 'measure',
        name: 'Measure',
        component: () => import('@/views/Tools/measure'),
        meta: { title: '测量', icon: 'el-icon-mouse', highlight: true }
      },
      {
        path: 'rightClick',
        name: 'RightClick',
        component: () => import('@/views/Tools/rightClick'),
        meta: { title: '右键', icon: 'el-icon-mouse', highlight: true }
      },
      {
        path: 'effect',
        name: 'Effect',
        component: () => import('@/views/Tools/effect'),
        meta: { title: '效果', icon: 'el-icon-magic-stick', highlight: true }
      },
    ]
  },


  {
    path: '/test',
    component: Layout,
    redirect: '/Test/BlankPage',
    name: 'Test',
    meta: { title: '测试', icon: 'el-icon-menu' },
    hidden: true,
    children: [
      {
        path: 'blankPage',
        name: 'BlankPage',
        component: () => import('@/views/Test/BlankPage'),
        meta: { title: '测试页面', icon: 'el-icon-monitor' }
      }, {
        path: 'testPage',
        name: 'TestPage',
        component: () => import('@/views/Test/TestPage'),
        meta: { title: '空白球体', icon: 'el-icon-monitor' }
      },
    ]
  },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   name: 'External-link',
  //   meta: { title: '文档外链', icon: 'el-icon-folder-opened' },
  //   children: externalLinkArr
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
