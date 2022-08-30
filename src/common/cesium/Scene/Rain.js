
/**
 * 雨
 */
class Rain {
    constructor(Cesium, viewer) {
        this.Cesium = Cesium
        this.viewer = viewer
        this.rainStage = undefined
        this.rainMaterials = 'uniform sampler2D colorTexture;\n' +//输入的场景渲染照片
            'varying vec2 v_textureCoordinates;\n' +

            'float hash(float x){\n' +
            'return fract(sin(x*133.3)*13.13);\n' +
            '}\n' +

            'void main(void){\n' +

            'float time = czm_frameNumber / 60.0;\n' +
            'vec2 resolution = czm_viewport.zw;\n' +

            ' vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);\n' +
            'vec3 c=vec3(.6,.7,.8);\n' +

            ' float a=-.4;\n' +
            ' float si=sin(a),co=cos(a);\n' +
            'uv*=mat2(co,-si,si,co);\n' +
            'uv*=length(uv+vec2(0,4.9))*.3+1.;\n' +

            ' float v=1.-sin(hash(floor(uv.x*100.))*2.);\n' +
            'float b=clamp(abs(sin(20.*time*v+uv.y*(5./(2.+v))))-.95,0.,1.)*20.;\n' +
            'c*=v*b;\n' + //屏幕上雨的颜色

            'gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(c,1), 0.5);\n' + //将雨和三维场景融合
            '}\n';
    }

    create() {
        const Cesium = this.Cesium
        //  collection = viewer.scene.postProcessStages;
        this.rainStage = this.viewer.scene.postProcessStages.add(new Cesium.PostProcessStage({
            name: 'czm_rain',
            fragmentShader: this.rainMaterials
        }))
        // collection.add(snow);
        this.viewer.scene.skyAtmosphere.hueShift = -0.5;
        this.viewer.scene.skyAtmosphere.saturationShift = -0.7;
        this.viewer.scene.skyAtmosphere.brightnessShift = -0.33;

        this.viewer.scene.fog.density = 0.001;
        this.viewer.scene.fog.minimumBrightness = 0.8;
        return this.rainStage
    }
    remove() {
        if (this.rainStage != undefined) {
            this.viewer.scene.postProcessStages.remove(this.rainStage)
            this.rainStage = undefined
        }
    }
}

export default Rain