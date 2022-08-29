
/**
 * 场景
 */
class Scene {
    constructor(Cesium, viewer) {
        this.Cesium = Cesium
        this.viewer = viewer
        this.scene = viewer.scene
    }

    /**
     * 雾
     */
    fog() {
        const scene = this.scene
        scene.fog.enabled = true;//启用雾
        scene.fog.density = 0.001;//密度
        scene.fog.minimumBrightness = 0.8;//来自照明的雾色的最小亮度。值 0.0 会导致雾完全变黑。值 1.0 根本不会影响亮度。
    }

    /**
     * 太阳
     */
    sun() {
        const scene = this.scene
        scene.sun.show = true;
        scene.sun.glowFactor = 10; //太阳变大
    }

    /**
     * 月亮
     */
    moon() {
        const scene = this.scene
        scene.moon.show = true;
        scene.moon.onlySunLighting = true;
    }

    /**
     * 星空
     */
    skyBox() {
        const scene = this.scene
        scene.skyBox.show = true;
    }

    /**
     * 大气
     */
    skyAtmosphere() {
        const scene = this.scene
        scene.skyAtmosphere.show = true;
        scene.skyAtmosphere.hueShift = -1; //1
        scene.skyAtmosphere.saturationShift = -1;//1
        scene.skyAtmosphere.brightnessShift = -1; //1
    }

    /**
     * 黑白
     */
    colourless() {
        const Cesium = this.Cesium
        const collection = this.scene.postProcessStages;
        const silhouette = collection.add(Cesium.PostProcessStageLibrary.createBlackAndWhiteStage());
        silhouette.enabled = true;
        silhouette.uniforms.gradations = 15.0; //调节黑白程度（1 - 20）
    }

    /**
     * 高斯模糊
     */
    gaussianBlur() {
        const Cesium = this.Cesium
        const collection = this.viewer.scene.postProcessStages;
        const silhouette = collection.add(Cesium.PostProcessStageLibrary.createBlurStage());
        silhouette.enabled = true;
        silhouette.uniforms.delta = 1.0;
        silhouette.uniforms.sigma = 1.0;
        silhouette.uniforms.stepSize = 20.0;//（行之有效）
    }

    /**
     * 亮度
     */
    brightness() {
        const Cesium = this.Cesium
        const collection = this.viewer.scene.postProcessStages;
        const silhouette = collection.add(Cesium.PostProcessStageLibrary.createBrightnessStage());
        silhouette.enabled = true;
        silhouette.uniforms.brightness = 0.1; //（调节亮度0 - 3最佳）
    }

    /**
     * 景深
     */
    depthOfField() {
        const Cesium = this.Cesium
        const collection = this.viewer.scene.postProcessStages;
        const silhouette = collection.add(Cesium.PostProcessStageLibrary.createDepthOfFieldStage());
        silhouette.enabled = true;
        silhouette.uniforms.focalDistance = 1;  //（1000）
        silhouette.uniforms.delta = 1;  // （5）
        silhouette.uniforms.sigma = 1;   //（5）
        silhouette.uniforms.stepSize = 1; // （10）
    }

    /**
     * 耀斑
     */
    solarFlare() {
        const Cesium = this.Cesium

        var lensFlare = this.viewer.scene.postProcessStages.add(
            Cesium.PostProcessStageLibrary.createLensFlareStage()
        );

        function updatePostProcess() {
            lensFlare.enabled = 5;
            lensFlare.uniforms.intensity = 5;
            lensFlare.uniforms.distortion = 5;
            lensFlare.uniforms.ghostDispersal = 5;
            lensFlare.uniforms.haloWidth = 5;
            lensFlare.uniforms.dirtAmount = 5;
            lensFlare.uniforms.earthRadius = 5;
        }
        updatePostProcess();

        var camera = this.viewer.scene.camera;
        camera.position = new Cesium.Cartesian3(
            40010447.97500168,
            56238683.46406788,
            20776576.752223067
        );
        camera.direction = new Cesium.Cartesian3(
            -0.5549701431494752,
            -0.7801872010801355,
            -0.2886452346452218
        );
        camera.up = new Cesium.Cartesian3(
            -0.3016252360948521,
            -0.13464820558887716,
            0.9438707950150912
        );
        camera.right = Cesium.Cartesian3.cross(
            camera.direction,
            camera.up,
            new Cesium.Cartesian3()
        );

        this.viewer.clock.currentTime = new Cesium.JulianDate(
            2458047,
            27399.860215000022
        );
    }

    /**
     * 夜视
     */
    nightVision() {
        const Cesium = this.Cesium
        const collection = this.viewer.scene.postProcessStages;
        const silhouette = collection.add(Cesium.PostProcessStageLibrary.createNightVisionStage());
        silhouette.enabled = true;
    }

    /**
     * 环境遮蔽
     */
    ambientOcclusion() {
        const Cesium = this.Cesium
        const silhouette = Cesium.PostProcessStageLibrary.createAmbientOcclusionStage();
        silhouette.enabled = true;
        silhouette.uniforms.intensity = 5.0;
        silhouette.uniforms.bias = 15.0;
        silhouette.uniforms.lengthCap = 5.0;
        silhouette.uniforms.stepSize = 5.0;
        silhouette.uniforms.frustumLength = 5.0;
    }

    /**
     * 阴影
     */
    shadow() {
        const Cesium = this.Cesium
        this.viewer.scene.shadowMap = new Cesium.ShadowMap({
            lightCamera: this.viewer.camera,
            context: this.viewer.scene.context
        });
        this.viewer.scene.shadowMap.enabled = true;
    }

}

export default Scene