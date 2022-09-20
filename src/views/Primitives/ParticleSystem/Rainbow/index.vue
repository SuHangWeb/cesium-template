<template>
  <div class="container">
    <div id="cesiumContainer"></div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      viewer: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const Cesium = this.cesium;
      Cesium.Ion.defaultAccessToken = process.env.VUE_APP_TOKEN;
      this.viewer = new Cesium.Viewer("cesiumContainer", {
        imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
          url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
        }),
        terrainProvider: new Cesium.CesiumTerrainProvider({
          //加载火星在线地形
          url: "http://data.marsgis.cn/terrain",
        }),
        shouldAnimate: true,
        infoBox: false,
        selectionIndicator: false,
      });
      //设置贴地效果
      this.viewer.scene.globe.depthTestAgainstTerrain = false;
      this.start();
    },
    /**
     * 开始
     */
    start() {
      const Cesium = this.cesium;

      this.viewer.camera.setView({
        destination: new Cesium.Cartesian3(-2402869.5473937024, 5500792.323090967, 2301364.3012694074),
        orientation: {
          heading: 0.1307560686539233,
          pitch: -0.2370424491699914,
          roll: 6.283172143952305,
        },
      });

      var twoPoints = [113.3698, 22.6139, 114.2135, 22.6127];
      //animatedParabola(twoPoints);
      let startptD = new Cesium.Cartesian3(twoPoints[0], twoPoints[1]);
      let endptD = new Cesium.Cartesian3(twoPoints[2], twoPoints[3]);

      let startpt = Cesium.Cartesian3.fromDegrees(twoPoints[0], twoPoints[1]);
      let endpt = Cesium.Cartesian3.fromDegrees(twoPoints[2], twoPoints[3]);
      let r = Cesium.Cartesian3.distance(startpt, endpt) / 2;

      let points;
      let showPoint = false;
      if (showPoint)
        points = this.viewer.scene.primitives.add(new Cesium.PointPrimitiveCollection());
      let linePt = [];
      let step = 90;
      for (let i = 0; i < step; i++) {
        let angle = Math.PI * i / step;
        let height = r * Math.sin(angle);
        let per = (1 - Math.cos(angle)) / 2;
        let pt = Cesium.Cartesian3.lerp(startptD, endptD, per, new Cesium.Cartesian3());
        linePt.push(pt.x, pt.y, height);

        if (showPoint) {
          points.add({
            position: Cesium.Cartesian3.fromDegrees(pt.x, pt.y, height),
            color: Cesium.Color.YELLOW,
            pixelSize: 5.0,
          });
        }

      }
      linePt.push(endptD.x, endptD.y, 0);

      //用primitive方式改写
      var oneTypeLineInstances = [];

      oneTypeLineInstances.push(
        new Cesium.GeometryInstance({
          geometry: new Cesium.PolylineGeometry({
            positions: Cesium.Cartesian3.fromDegreesArrayHeights(linePt),
            width: 180,
            vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT
          }),
        })
      );

      //侧面看效果很差
      this.viewer.scene.postProcessStages.fxaa.enabled = true;
      var oneTypeLinesPrimitive = new Cesium.Primitive({
        geometryInstances: oneTypeLineInstances,
        appearance: new Cesium.PolylineMaterialAppearance({
          material: new Cesium.Material({
            fabric: {
              uniforms: {
                // image: 'colors1.png',
                // animationSpeed: 0.01,
                //color: new Cesium.Color(0.0, 1.0, 1.0, 1.0)
                red: new Cesium.Color(1.0, 0, 0, 1.0),
                orange: new Cesium.Color(1.0, 0.647, 0, 1.0),
                yellow: new Cesium.Color(1.0, 1.0, 0, 1.0),
                green: new Cesium.Color(0, 1.0, 0, 1.0),
                cyan: new Cesium.Color(0, 1.0, 1.0, 1.0),
                blue: new Cesium.Color(0, 0, 1.0, 1.0),
                purple: new Cesium.Color(0.545, 0, 1.0, 1.0),
              },
              source: `
                varying float v_width;
                czm_material czm_getMaterial(czm_materialInput materialInput) { 
                    czm_material material = czm_getDefaultMaterial(materialInput);
                    vec2 st = materialInput.st;

                    // vec2 uv = gl_FragCoord.xy / czm_viewport.zw;
                    // vec2 uv = gl_FragCoord.xy / u_resolution;

                    vec2 center = vec2(0.5,0.0);
                    float dis = distance(center,st);
                    if(dis>0.5 || dis <0.4 || st.s<0.2 || st.s>0.8)
                        material.alpha = 0.0;
                    else 
                        material.alpha = 1.0;

                    material.alpha *= (0.5-abs(st.s-0.5))*0.5;
                    material.alpha *= (0.5-abs(st.t-0.5));

                    if(dis>0.41 && dis<=0.42)
                        material.diffuse = red.rgb;
                    else if(dis>0.42 && dis<=0.43)
                        material.diffuse = orange.rgb;
                    else if(dis>0.43 && dis<=0.44)
                        material.diffuse = yellow.rgb;
                    else if(dis>0.44 && dis<=0.45)
                        material.diffuse = green.rgb;
                    else if(dis>0.45 && dis<=0.46)
                        material.diffuse = cyan.rgb;
                    else if(dis>0.46 && dis<=0.47)
                        material.diffuse = blue.rgb;
                    else if(dis>0.47 && dis<=0.48)
                        material.diffuse = purple.rgb;
                    else {
                        material.diffuse = red.rgb;
                        material.alpha = 0.0;
                    }

                    return material;
                } `,
              // aboveGround: true
            }
          })
        }),
        // asynchronous: true
      });
      this.viewer.scene.primitives.add(oneTypeLinesPrimitive);

    },
  },
};
</script>
  
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;

  #cesiumContainer {
    width: 100%;
    height: 100%;
  }
}
</style>