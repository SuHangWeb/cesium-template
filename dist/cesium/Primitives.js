
/**
 * 获取基元的集合
 */
class Primitives {
    constructor(Cesium, viewer) {
        this.Cesium = Cesium
        this.viewer = viewer
    }
    /**
     * 创建粒子
     * @param {Object} params 配置参数
     * @returns {Primitives} 实体粒子
     * params:
     * 除了官方的 参数 还需要增加 创建好的模型参数
     * entity = 模型
     */
    createParticleSystem(params) {
        const Cesium = this.Cesium
        const gravityScratch = new Cesium.Cartesian3();
        /**
         * 方法
         */
        const methods = {
            /**
             * 每帧都要调用一次回调函数以更新粒子。
             * @param {*} particle 正在更新粒子。
             * @param {*} dt 自上次更新以来的时间（秒）
             */
            applyGravity: (particle, dt) => {
                var position = particle.position;
                var gravityVector = Cesium.Cartesian3.normalize(position, gravityScratch);
                // Cesium.Cartesian3.multiplyByScalar(gravityVector, GRAVITATIONAL_CONSTANT * dt, gravityVector);
                Cesium.Cartesian3.multiplyByScalar(gravityScratch, params.updateCallback.dt * dt, gravityScratch);
                particle.velocity = Cesium.Cartesian3.add(particle.velocity, gravityScratch, particle.velocity);
            },
            /**
             * 计算当前时间点飞机模型的位置矩阵
             * @param {*} entity 模型
             * @param {*} time 
             */
            computeModelMatrix: (entity, time) => {
                return entity.computeModelMatrix(time, new Cesium.Matrix4());
            },
            /**
             * 计算引擎(粒子发射器)位置矩阵
             * 控制粒子发射的方向
             */
            computeEmitterModelMatrix: () => {
                var emitterModelMatrix = new Cesium.Matrix4();
                var translation = new Cesium.Cartesian3();
                var rotation = new Cesium.Quaternion();
                var hpr = new Cesium.HeadingPitchRoll();
                var trs = new Cesium.TranslationRotationScale();

                hpr = Cesium.HeadingPitchRoll.fromDegrees(110.0, 30.0, 0.0, hpr); // 倾斜角度
                trs.translation = Cesium.Cartesian3.fromElements(0, 0, 1, translation); // 发射高度
                trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr, rotation);
                return Cesium.Matrix4.fromTranslationRotationScale(trs, emitterModelMatrix);
            }
        }
        const scenePrimitives = this.viewer.scene.primitives.add(
            //粒子系统管理粒子集合的更新和显示。
            new Cesium.ParticleSystem({
                // 是否显示粒子系统
                show: params.show || true,
                /**
                 * 每帧都要调用一次回调函数以更新粒子
                 * particle/正在更新粒子。
                 * dt/自上次更新以来的时间（秒）
                 * 切记开启 shouldAnimate  否则 没有回调
                 */
                // updateCallback: methods.applyGravity,
                updateCallback: (particle, dt) => {
                    params.updateCallback(particle, dt)
                },
                /**
                 * 此的粒子发射器（这里发射形式cesium官方有四种，可根据实际切换或开发）
                 * new Cesium.CircleEmitter(0.5)
                 * new Cesium.CircleEmitter(2.0)
                 * new Cesium.SphereEmitter(2.5)
                 * new Cesium.ConeEmitter(Cesium.Math.toRadians(45.0))
                 * new Cesium.BoxEmitter(new Cesium.Cartesian3(10.0, 10.0, 10.0)),
                 */
                emitter: params.emitter || new Cesium.CircleEmitter(0.5),

                /**
                 * 主模型参数(位置)
                 * 将粒子系统从模型转换为世界坐标的4x4转换矩阵。
                 */
                modelMatrix: params.modelMatrix || methods.computeModelMatrix(params.entity, Cesium.JulianDate.now()),
                /**
                 * 4x4转换矩阵，用于转换粒子系统局部坐标系内的粒子系统发射器
                 */
                emitterModelMatrix: params.emitterModelMatrix || methods.computeEmitterModelMatrix(),
                //每秒要发射的粒子数 默认 “5”
                emissionRate: params.emissionRate || 5,
                /**
                 * ParticleBurst 的数组，在周期性的时间发射粒子爆发。
                 * 数组内容
                 * 这些脉冲偶尔会同步以产生多色效果
                 *  默认：undefined
                 * new Cesium.ParticleBurst({
                    time: 0.1,// 默认：0.0   在粒子系统生命周期开始之后的几秒钟内发生爆发的时间。
                    minimum: 10,// 默认：0.0  突发中发射的最小粒子数。
                    maximum: 100,// 默认：50.0  爆发中发射的最大粒子数。
                  })
                 */
                bursts: params.bursts || undefined,
                //粒子系统完成后是否应该循环爆发。
                loop: params.loop || true,
                //设置缩放比例，以在粒子的生命周期内应用于粒子的图像。
                scale: params.scale || undefined,
                //在粒子寿命开始时应用于粒子图像的初始比例。 默认：undefined
                startScale: params.startScale || undefined,
                // 在粒子寿命结束时应用于粒子图像的最终比例。 默认：undefined
                endScale: params.endScale || undefined,
                /**
                 * 设置粒子在其粒子寿命期间的颜色。
                 * 默认：Color.WHITE
                 */
                color: params.color || Cesium.Color.WHITE,
                // 粒子在其生命初期的颜色。默认：undefined
                startColor: params.startColor || undefined,
                // 粒子寿命结束时的颜色。默认：undefined
                endColor: params.endColor || undefined,
                /**
                 * 用于广告牌的URI，HTMLImageElement或HTMLCanvasElement。
                 * 默认：undefined
                 */
                image: params.image || undefined,
                /**
                 * 如果设置，则将覆盖用来缩放粒子图像尺寸（以像素为单位）的minimumImageSize和maximumImageSize输入。
                 * Cartesian2
                 * 默认：new Cesium.Cartesian2(1.0, 1.0),
                 */
                imageSize: params.imageSize || new Cesium.Cartesian2(1.0, 1.0),
                /**
                 * 设置宽度的最小范围，以高度为单位，在该范围之上可以随机缩放粒子图像的尺寸（以像素为单位）。
                 * Cartesian2
                 * 默认：undefined
                 */
                minimumLife: params.minimumLife || undefined,
                /**
                 * 设置最大宽度宽度（以高度为单位），在该范围内可以随机缩放粒子图像的尺寸（以像素为单位）。
                 * Cartesian2
                 * 默认：undefined
                 */
                maximumLife: params.maximumLife || undefined,
                //设置粒子的大小是米还是像素。 true 以米为单位调整粒子大小；否则，大小以像素为单位。 默认：undefined
                sizeInMeters: params.sizeInMeters || undefined,
                /**
                 * 如果设置，则用该值覆盖minimumSpeed和maximumSpeed输入。
                 * 默认 1.0
                 */
                speed: params.speed || 1.0,
                /**
                 * 设置以米/秒为单位的最小界限，高于该界限时，将随机选择粒子的实际速度。
                 * 默认：undefined
                 */
                minimumSpeed: params.minimumSpeed || undefined,
                /**
                 * 设置以米/秒为单位的最大范围，在该范围内将随机选择粒子的实际速度。
                 * 默认：undefined
                 */
                maximumSpeed: params.maximumSpeed || undefined,
                /**
                 * 粒子系统发射粒子的时间（以秒为单位）
                 * Number.MAX_VALUE
                 */
                lifetime: params.lifetime || 0.5,
                /**
                 * 如果设置，则使用此值覆盖minimumParticleLife和maximumParticleLife输入。
                 * 默认：5.0
                 */
                particleLife: params.particleLife || 5.0,
                /**
                 * 设置最小和最大颗粒质量（以千克为单位）。
                 * 默认：  1.0
                 */
                mass: params.mass || 1.0,
                /**
                 * 设置粒子质量的最小范围（以千克为单位）。粒子的实际质量将被选择为高于该值的随机量。
                 */
                minimumMass: params.minimumMass || undefined,
                /**
                 * 设置最大粒子质量（以千克为单位）。粒子的实际质量将选择为低于此值的随机量。
                 */
                maximumMass: params.maximumMass || undefined,
            })
        )
        return scenePrimitives;
    }
}


export default Primitives