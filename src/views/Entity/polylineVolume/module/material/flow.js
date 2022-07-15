/**
 * 波纹效果
 */
export default (Cesium) => {
    return {
        cesiumName: "material_polylineVolume_flow",
        image: process.env.VUE_APP_PUBLIC_URL + "/Vue/Entity/polylineVolume/flow.png",
        color: Cesium.Color.CYAN,
        duration: 1500,
        uniforms: {
            color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
            image: Cesium.Material.DefaultImageId,
            // time: 0,
            constantSpeed: 300,
            depthFailMaterial: true,
            'repeat': new Cesium.Cartesian2(1, 1),//重复
            'axisY': ![],
            'speed': 10,
            'time': -1,
            'hasImage2': ![],
        },
        source: `uniform vec4 color;
        uniform vec4 bgColor;
        uniform float speed;
        uniform float startTime;
        uniform float bidirectional;
        
        czm_material czm_getMaterial(czm_materialInput materialInput)
        {
            czm_material material = czm_getDefaultMaterial(materialInput);
            vec2 st = materialInput.st;
            float t = fract(startTime + czm_frameNumber * speed / 1000.0);
        
            t *= 1.03;
            float alpha0 = smoothstep(t - 0.03, t, st.s) * step(st.s, t);
            float mt = 1. - t;
            float alpha1 = smoothstep(mt + 0.03, mt, st.s) * step(mt, st.s);
        
            float a0 = step(abs(bidirectional - 0.0) - 0.001, 0.);
            float a1 = step(abs(bidirectional - 1.0) - 0.001, 0.);
            float db = step(abs(bidirectional - 2.0) - 0.001, 0.);
            float alpha = alpha0 * (a0 + db) + alpha1 * (a1 + db);
            alpha = clamp(alpha, 0., 1.);
        
            material.diffuse = color.rgb * alpha + bgColor.rgb * (1. - alpha);
            material.alpha = color.a * alpha + bgColor.a * (1. - alpha);
        
            // if (useImageAndRepeat.x != 0.) {
            //     float repeat = useImageAndRepeat.y;
            //     vec4 marsImageColor = texture2D(image, fract(vec2(fract((st.s-t)*repeat), st.t)));
            //     material.diffuse = marsImageColor.rgb;
            //     material.alpha = marsImageColor.a;
            // }
        
            return material;
        }`,
    }
}

// czm_material czm_getMaterial(czm_materialInput materialInput)\n\
//         {\n\
//             czm_material material = czm_getDefaultMaterial(materialInput);\n\
//             vec2 st = materialInput.st;\n\
//             vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n\
//             material.alpha = colorImage.a;\n\
//             material.diffuse = colorImage.rgb;\n\
//             return material;\n\
//         }

// 'uniforms': {
//     'image': process.env.VUE_APP_PUBLIC_URL + "/Vue/Entity/polylineVolume/flow.png",
//     'color': new Cesium.Color(1, 0, 0, 1),
//     'repeat': new Cesium__namespace[(_0x39e549(0x1225))](0x1, 0x1),
//     'axisY': ![],
//     'speed': 0xa,
//     'time': -0x1,
//     'hasImage2': ![],
//     'image2': Cesium__namespace[_0x39e549(0x824)][_0x39e549(0xfa1)],
//     'color2': new Cesium__namespace[(_0x39e549(0xa90))](0x1, 0x1, 0x1)
// },

// 'uniforms': {
//     'image': Cesium__namespace[_0x39e549(0x824)]['DefaultImageId'],
//     'color': new Cesium__namespace[(_0x39e549(0xa90))](1, 0, 0, 1),
//     'repeat': new Cesium.Cartesian2(1, 1),//重复
//     'axisY': ![],
//     'speed': 10,
//     'time': -1,
//     'hasImage2': ![],
//     'image2': Cesium__namespace[_0x39e549(0x824)][_0x39e549(0xfa1)],
//     'color2': new Cesium__namespace[(_0x39e549(0xa90))](0x1, 0x1, 0x1)
// },


// uniform vec4 color;
// uniform float speed;
// uniform float startTime;
// uniform float percent;
// uniform float alpha;

// czm_material czm_getMaterial(czm_materialInput materialInput){
//   czm_material material = czm_getDefaultMaterial(materialInput);
//   vec2 st = materialInput.st;
//   float t =fract(startTime +czm_frameNumber * speed / 1000.0);
//   t *= (1.0 + percent);
//   float alpha1 = smoothstep(t- percent, t, st.s) * step(-t, -st.s);
//   alpha1 += alpha;
//   material.diffuse = color.rgb;
//   material.alpha = alpha1;
//   return material;
// }



// uniform vec4 color;
// uniform vec4 bgColor;
// uniform float speed;
// uniform float startTime;
// uniform float bidirectional;

// czm_material czm_getMaterial(czm_materialInput materialInput)
// {
//     czm_material material = czm_getDefaultMaterial(materialInput);
//     vec2 st = materialInput.st;
//     float t = fract(startTime + czm_frameNumber * speed / 1000.0);

//     t *= 1.03;
//     float alpha0 = smoothstep(t - 0.03, t, st.s) * step(st.s, t);
//     float mt = 1. - t;
//     float alpha1 = smoothstep(mt + 0.03, mt, st.s) * step(mt, st.s);

//     float a0 = step(abs(bidirectional - 0.0) - 0.001, 0.);
//     float a1 = step(abs(bidirectional - 1.0) - 0.001, 0.);
//     float db = step(abs(bidirectional - 2.0) - 0.001, 0.);
//     float alpha = alpha0 * (a0 + db) + alpha1 * (a1 + db);
//     alpha = clamp(alpha, 0., 1.);

//     material.diffuse = color.rgb * alpha + bgColor.rgb * (1. - alpha);
//     material.alpha = color.a * alpha + bgColor.a * (1. - alpha);

//     // if (useImageAndRepeat.x != 0.) {
//     //     float repeat = useImageAndRepeat.y;
//     //     vec4 marsImageColor = texture2D(image, fract(vec2(fract((st.s-t)*repeat), st.t)));
//     //     material.diffuse = marsImageColor.rgb;
//     //     material.alpha = marsImageColor.a;
//     // }

//     return material;
// }



// LineFlowColorMaterial =
// 'uniform\x20vec4\x20color;\x0auniform\x20float\x20speed;\x0auniform\x20float\x20startTime;\x0auniform\x20float\x20percent;\x0auniform\x20float\x20alpha;\x0a\x0aczm_material\x20czm_getMaterial(czm_materialInput\x20materialInput){\x0a\x20\x20czm_material\x20material\x20=\x20czm_getDefaultMaterial(materialInput);\x0a\x20\x20vec2\x20st\x20=\x20materialInput.st;\x0a\x20\x20float\x20t\x20=fract(startTime\x20+czm_frameNumber\x20*\x20speed\x20/\x201000.0);\x0a\x20\x20t\x20*=\x20(1.0\x20+\x20percent);\x0a\x20\x20float\x20alpha1\x20=\x20smoothstep(t-\x20percent,\x20t,\x20st.s)\x20*\x20step(-t,\x20-st.s);\x0a\x20\x20alpha1\x20+=\x20alpha;\x0a\x20\x20material.diffuse\x20=\x20color.rgb;\x0a\x20\x20material.alpha\x20=\x20alpha1;\x0a\x20\x20return\x20material;\x0a}\x0a',
// ODLineMaterial =
// 'uniform\x20vec4\x20color;\x0auniform\x20vec4\x20bgColor;\x0auniform\x20float\x20speed;\x0auniform\x20float\x20startTime;\x0auniform\x20float\x20bidirectional;\x0a\x0aczm_material\x20czm_getMaterial(czm_materialInput\x20materialInput)\x0a{\x0a\x20\x20\x20\x20czm_material\x20material\x20=\x20czm_getDefaultMaterial(materialInput);\x0a\x20\x20\x20\x20vec2\x20st\x20=\x20materialInput.st;\x0a\x20\x20\x20\x20float\x20t\x20=\x20fract(startTime\x20+\x20czm_frameNumber\x20*\x20speed\x20/\x201000.0);\x0a\x0a\x20\x20\x20\x20t\x20*=\x201.03;\x0a\x20\x20\x20\x20float\x20alpha0\x20=\x20smoothstep(t\x20-\x200.03,\x20t,\x20st.s)\x20*\x20step(st.s,\x20t);\x0a\x20\x20\x20\x20float\x20mt\x20=\x201.\x20-\x20t;\x0a\x20\x20\x20\x20float\x20alpha1\x20=\x20smoothstep(mt\x20+\x200.03,\x20mt,\x20st.s)\x20*\x20step(mt,\x20st.s);\x0a\x0a\x20\x20\x20\x20float\x20a0\x20=\x20step(abs(bidirectional\x20-\x200.0)\x20-\x200.001,\x200.);\x0a\x20\x20\x20\x20float\x20a1\x20=\x20step(abs(bidirectional\x20-\x201.0)\x20-\x200.001,\x200.);\x0a\x20\x20\x20\x20float\x20db\x20=\x20step(abs(bidirectional\x20-\x202.0)\x20-\x200.001,\x200.);\x0a\x20\x20\x20\x20float\x20alpha\x20=\x20alpha0\x20*\x20(a0\x20+\x20db)\x20+\x20alpha1\x20*\x20(a1\x20+\x20db);\x0a\x20\x20\x20\x20alpha\x20=\x20clamp(alpha,\x200.,\x201.);\x0a\x0a\x20\x20\x20\x20material.diffuse\x20=\x20color.rgb\x20*\x20alpha\x20+\x20bgColor.rgb\x20*\x20(1.\x20-\x20alpha);\x0a\x20\x20\x20\x20material.alpha\x20=\x20color.a\x20*\x20alpha\x20+\x20bgColor.a\x20*\x20(1.\x20-\x20alpha);\x0a\x0a\x20\x20\x20\x20//\x20if\x20(useImageAndRepeat.x\x20!=\x200.)\x20{\x0a\x20\x20\x20\x20//\x20\x20\x20\x20\x20float\x20repeat\x20=\x20useImageAndRepeat.y;\x0a\x20\x20\x20\x20//\x20\x20\x20\x20\x20vec4\x20marsImageColor\x20=\x20texture2D(image,\x20fract(vec2(fract((st.s-t)*repeat),\x20st.t)));\x0a\x20\x20\x20\x20//\x20\x20\x20\x20\x20material.diffuse\x20=\x20marsImageColor.rgb;\x0a\x20\x20\x20\x20//\x20\x20\x20\x20\x20material.alpha\x20=\x20marsImageColor.a;\x0a\x20\x20\x20\x20//\x20}\x0a\x0a\x20\x20\x20\x20return\x20material;\x0a}\x0a',
