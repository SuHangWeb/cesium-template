
//自定义materialproperty
class CustomMaterialPropery {
    constructor(Cesium) {
        this.definitionChanged = new Cesium.Event();
        Cesium.Material._materialCache.addMaterial("CustomMaterial", {
            fabric: {
                type: "CustomMaterial",
                uniforms: {
                    // color: new Cesium["Color"](1, 0.0, 0.0, 0.5),
                    color: Cesium.Color.fromRandom({ alpha: 0.8 }),
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
            },
        });
    }
    getType() {
        // 返回材质类型
        return "CustomMaterial";
    }
    getValue(time, result) {
        // // console.log(result, time);
        // let t = performance.now() / 1000;
        // t = t % 1;
        // console.log(t);
        // result.uTime = t;
        // result.uTime = this.params.uTime;
        // 返回材质值
        // return result;
    }
}
export default CustomMaterialPropery