// register$3(PolyGradient, {
//     'fabric': {
//         'uniforms': {
//             'color': new Cesium['Color'](0, 0, 0, 0.5),
//             'diffusePower': 1.6,
//             'alphaPower': 1.5
//         },
//         'source': `
//                 uniform vec4 color;
//                     uniform float diffusePower;
//                     uniform float alphaPower;
                
//                     czm_material czm_getMaterial(czm_materialInput materialInput)
//                     {
//                     czm_material material = czm_getDefaultMaterial(materialInput);
//                     vec2 st = materialInput.st;
//                     float alpha = distance(st,vec2(0.5, 0.5));
//                     material.alpha = color.a  * alpha  * alphaPower;
//                     material.diffuse = color.rgb * diffusePower;
//                     return material;
//                     }
//                 `
//     },
//     'translucent': !![]
// })





