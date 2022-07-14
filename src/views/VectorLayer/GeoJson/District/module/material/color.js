/**
 * 波纹效果
 */
export default (Cesium, color = "") => {
    return {
        cesiumName: "Material_color",
        color: color || Cesium.Color.fromRandom({ alpha: 0.8 }),
        uniforms: {
            color: color || Cesium.Color.fromRandom({ alpha: 0.8 }),
            diffusePower: 1.6,
            alphaPower: 1.5,
        },
        source: `uniform vec4 color;
                uniform float diffusePower;
                uniform float alphaPower;
                czm_material czm_getMaterial(czm_materialInput materialInput)
                    {
                    czm_material material = czm_getDefaultMaterial(materialInput);
                    vec2 st = materialInput.st;
                    float alpha = distance(st,vec2(0.5, 0.5));
                    material.alpha = color.a  * alpha  * alphaPower;
                    material.diffuse = color.rgb * diffusePower;
                    return material;
                }`,
    }
}