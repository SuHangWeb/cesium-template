/**
 * 波纹效果
 */
export default (Cesium) => {
    /**
     * 带方向的墙体
     * @param {*} options.get:true/false
     * @param {*} options.count:数量
     * @param {*} options.freely:vertical/standard
     * @param {*} options.direction:+/-
     */
    const get_source = (options) => {
        if (options && options.get) {
            var materail =
                "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
    {\n\
        czm_material material = czm_getDefaultMaterial(materialInput);\n\
        vec2 st = materialInput.st;";
            if (options.freely == "vertical") {
                //（由下到上）
                materail +=
                    "vec4 colorImage = texture2D(image, vec2(fract(st.s), fract(float(" +
                    options.count +
                    ")*st.t" +
                    options.direction +
                    " time)));\n ";
            } else {
                //（逆时针）
                materail +=
                    "vec4 colorImage = texture2D(image, vec2(fract(float(" +
                    options.count +
                    ")*st.s " +
                    options.direction +
                    " time), fract(st.t)));\n ";
            }
            //泛光
            materail +=
                "vec4 fragColor;\n\
        fragColor.rgb = (colorImage.rgb+color.rgb) / 1.0;\n\
        fragColor = czm_gammaCorrect(fragColor);\n\
        material.diffuse = colorImage.rgb;\n\
        material.alpha = colorImage.a;\n\
        material.emission = fragColor.rgb;\n\
        return material;\n\
    }";
            return materail;
        }
    };

    return {
        cesiumName: "Material_DynamicWallMaterialPropertys",
        image: "/Vue/Entity/wall/wl.png",
        color: Cesium.Color.CYAN,
        duration: 1500,
        uniforms: {
            color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
            image: Cesium.Material.DefaultImageId,
            time: -20,
        },
        source: get_source({
            get: true,
            count: 3.0,
            freely: "vertical",
            direction: "-",
        }),
    }
}