/**
 * 动态渐变
 */
class DynamicGradient {
    /**
     * 上到下
     * @param {*} params 
     */
    TopToBottom(params) {
        // 着色器代码
        const shaders = "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
        {\n\
            czm_material material = czm_getDefaultMaterial(materialInput);\n\
            vec2 st = materialInput.st;\n\
            vec4 colorImage = texture2D(image, vec2(fract(-(st.t + time)), st.t));\n\
            material.alpha = colorImage.a * color.a;\n\
            material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n\
            return material;\n\
        }"
        return shaders
    }

    /**
     * 下到上
     * @param {*} params 
     */
    BottomToTop(params) {
        // 着色器代码
        const shaders = "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
        {\n\
            czm_material material = czm_getDefaultMaterial(materialInput);\n\
            vec2 st = materialInput.st;\n\
            vec4 colorImage = texture2D(image, vec2(fract(st.t - time), st.t));\n\
            material.alpha = colorImage.a * color.a;\n\
            material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n\
            return material;\n\
        }"
        return shaders
    }


    /**
     * 顺时针
     * @param {*} params 
     */
    Clockwise(params) {
        // 着色器代码
        const shaders = "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
        {\n\
            czm_material material = czm_getDefaultMaterial(materialInput);\n\
            vec2 st = materialInput.st;\n\
            vec4 colorImage = texture2D(image, vec2(fract(-(st.s + time)), st.t));\n\
            material.alpha = colorImage.a * color.a;\n\
            material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n\
            return material;\n\
        }"
        return shaders
    }

    /**
     * 逆时针
     * @param {*} params 
     */
    Anticlockwise(params) {
        // 着色器代码
        const shaders = "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
        {\n\
            czm_material material = czm_getDefaultMaterial(materialInput);\n\
            vec2 st = materialInput.st;\n\
            vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n\
            material.alpha = colorImage.a * color.a;\n\
            material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n\
            return material;\n\
        }"
        return shaders
    }


}

export default DynamicGradient