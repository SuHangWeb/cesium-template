/**
 * 流动效果
 */
export default (Cesium) => {
    return {
        cesiumName: "material_polylineVolume_flow",
        image: process.env.VUE_APP_PUBLIC_URL + "/Vue/Entity/polylineVolume/flow-line2.png",
        // image: process.env.VUE_APP_PUBLIC_URL + "/Vue/Entity/polylineVolume/line3.png",
        color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
        duration: 2000,
        uniforms: {
            color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
            image: Cesium.Material.DefaultImageId,
            // time: 0,
            constantSpeed: 500,
            depthFailMaterial: true,
            'repeat': new Cesium.Cartesian2(1, 1),//重复
            'axisY': ![],
            'speed': 10,
            'time': -1,
            'hasImage2': ![],
        },
        source: "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
        {\n\
            czm_material material = czm_getDefaultMaterial(materialInput);\n\
            vec2 st = materialInput.st;\n\
            \n\
            if(texture2D(image, vec2(0.0, 0.0)).a == 1.0){\n\
                discard;\n\
            }else{\n\
                material.alpha = texture2D(image, vec2(1.0 - fract(time - st.s), st.t)).a * color.a;\n\
            }\n\
            \n\
            material.diffuse = max(color.rgb * material.alpha * 3.0, color.rgb);\n\
            \n\
            return material;\n\
        }\n\
        ",
    }
}
