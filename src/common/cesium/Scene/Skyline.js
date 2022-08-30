
/**
 * 天际线
 */
class Skyline {
    constructor(Cesium, viewer) {
        this.Cesium = Cesium
        this.viewer = viewer
    }

    create() {
        const Cesium = this.Cesium
        let collection = this.viewer.scene.postProcessStages;
        let edgeDetection = Cesium.PostProcessStageLibrary.createEdgeDetectionStage();
        let postProccessStage = new Cesium.PostProcessStage({
            name: 'czm_skylinetemp',
            fragmentShader: 'uniform sampler2D colorTexture;' +
                'uniform sampler2D depthTexture;' +

                'varying vec2 v_textureCoordinates;' +

                'void main(void)' +
                '{' +
                'float depth = czm_readDepth(depthTexture, v_textureCoordinates);' +
                'vec4 color = texture2D(colorTexture, v_textureCoordinates);' +
                'if(depth<1.0 - 0.000001){' +
                'gl_FragColor = color;' +
                '}' +
                'else{' +
                'gl_FragColor = vec4(1.0,0.0,0.0,1.0);' +
                '}' +
                '}'
        });
        let postProccessStage1 = new Cesium.PostProcessStage({
            name: 'czm_skylinetemp1',
            fragmentShader: 'uniform sampler2D colorTexture;' +
                'uniform sampler2D redTexture;' +
                'uniform sampler2D silhouetteTexture;' +

                'varying vec2 v_textureCoordinates;' +

                'void main(void)' +
                '{' +
                'vec4 redcolor=texture2D(redTexture, v_textureCoordinates);' +
                'vec4 silhouetteColor = texture2D(silhouetteTexture, v_textureCoordinates);' +
                'vec4 color = texture2D(colorTexture, v_textureCoordinates);' +
                'if(redcolor.r == 1.0){' +
                'gl_FragColor = mix(color, vec4(1.0,0.0,0.0,1.0), silhouetteColor.a);' +
                '}' +
                'else{' +
                'gl_FragColor = color;' +
                '}' +
                '}',
            uniforms: {
                redTexture: postProccessStage.name,
                silhouetteTexture: edgeDetection.name
            }
        });

        const postProccessStage3 = new Cesium.PostProcessStageComposite({
            name: 'czm_skyline',
            stages: [edgeDetection, postProccessStage, postProccessStage1],
            inputPreviousStageTexture: false,
            uniforms: edgeDetection.uniforms
        });

        collection.add(postProccessStage3);
    }
}

export default Skyline