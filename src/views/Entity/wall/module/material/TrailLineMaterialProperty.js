/**
 * 流动墙
 */
export default (Cesium) => {
    const get_source = () => {
        return "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
            {\n\
                 czm_material material = czm_getDefaultMaterial(materialInput);\n\
                 vec2 st = materialInput.st;\n\
                 vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n\
                 material.alpha = colorImage.a * color.a;\n\
                 material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n\
                 return material;\n\
             }";
    };

    return {
        cesiumName: "Material_TrailLineMaterialProperty",
        image: process.env.VUE_APP_PUBLIC_URL + "/Vue/Entity/wall/flow.png",
        color: Cesium.Color.RED.withAlpha(0.5),
        duration: 15000,
        uniforms: {
            color: new Cesium.Color(1.0, 1.0, 1.0, 1),
            image: Cesium.Material.DefaultImageId,
            time: 0
        },
        source: get_source(),
    }
}