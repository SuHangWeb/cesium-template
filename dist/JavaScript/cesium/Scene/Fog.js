
/**
 * 雾
 */
class Fog {
    constructor(Cesium, viewer) {
        this.Cesium = Cesium
        this.viewer = viewer
        this.fogStage = undefined
        this.fogMaterials = "  uniform sampler2D colorTexture;\n" +
            "  uniform sampler2D depthTexture;\n" +
            "  varying vec2 v_textureCoordinates;\n" +
            "  void main(void)\n" +
            "  {\n" +
            "      vec4 origcolor=texture2D(colorTexture, v_textureCoordinates);\n" +
            "      vec4 fogcolor=vec4(0.8,0.8,0.8,0.5);\n" +
            "\n" +
            "      float depth = czm_readDepth(depthTexture, v_textureCoordinates);\n" +
            "      vec4 depthcolor=texture2D(depthTexture, v_textureCoordinates);\n" +
            "\n" +
            "      float f=(depthcolor.r-0.22)/0.8;\n" +
            "      if(f<0.0) f=0.0;\n" +
            "      else if(f>1.0) f=1.0;\n" +
            "      gl_FragColor = mix(origcolor,fogcolor,f);\n" +
            "   }"
    }

    create() {
        const Cesium = this.Cesium
        this.fogStage = this.viewer.scene.postProcessStages.add(new Cesium.PostProcessStage({
            name: 'czm_fog',
            fragmentShader: this.fogMaterials
        }))
        // this.FogStage.enabled=true;
        return this.fogStage
    }
    remove() {
        if (this.fogStage != undefined) {
            this.viewer.scene.postProcessStages.remove(this.fogStage)
            this.fogStage = undefined
        }
    }
}

// export default Fog