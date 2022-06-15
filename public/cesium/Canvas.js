/**
 * 操作canvas
 */
class Canvas {
    constructor(Cesium, viewer) {
        this.Cesium = Cesium
        this.viewer = viewer
    }
    /**
     * 绘制文字 
     * @param {Object} style
     * text = 内容
     * fontSize = 字号
     * color = 颜色 
     */
    drawText(style) {
        const text = style.text;
        let c = document.createElement("canvas");
        const d = (text + "").length * style.fontSize;
        c.width = d;
        c.height = style.fontSize;
        let ctx = c.getContext("2d");

        ctx.fillStyle = style.color;
        ctx.font = "bold " + style.fontSize + "px 微软雅黑"; //设置字体
        ctx.textBaseline = "hanging"; //在绘制文本时使用的当前文本基线
        //绘制文本
        ctx.fillText(text, 0, 0);
        return c;
    }
    /**
     * 绘制图片+文字
     * 注：当前封装属于测试封装，后期根据需求需要做相应改动 使用前 请沟通需求 做相应调整
     * @param {*} params 
     * 固定参数：
     * src/图片路径
     * height/高度
     * width/宽度
     * 非固定参数/属于数据类型：
     * data{Object}=》{*} 有字段data包裹任意字段
     */
    async drawImageText(params) {
        return await new Promise((resolve, reject) => {
            let image = document.createElement('img');
            image.src = params.src;
            let canvas;
            image.onload = () => {
                canvas = document.createElement("canvas");
                canvas.height = params.height;
                canvas.width = params.width;
                let ctx = canvas.getContext('2d');
                /**
                 * clearRect/按照矩形的大小来清除画布中指定位置的内容
                 * context.clearRect(起点x轴坐标，起点y轴坐标，宽，高);
                 */
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                /**
                 * drawImage/绘制图片：分为3个参数，5个参数，9个参数三种情况。
                 * 1、drawImage(image, dx, dy) 在画布指定位置绘制原图
                 * 2、drawImage(image, dx, dy, dw, dh) 在画布指定位置上按原图大小绘制指定大小的图
                 * 3、drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh) 剪切图像，并在画布上定位被剪切的部分：
                 * img/规定要使用的图像、画布或视频
                 * sx/可选。开始剪切图片的 x 坐标位置
                 * sy/可选。开始剪切图片的 y 坐标位置
                 * sw/可选。被剪切图像的宽度（就是裁剪之前的图片宽度，这里的宽度若小于图片的原宽。则图片多余部分被剪掉；若大于，则会以空白填充）
                 * sh/可选。被剪切图像的高度（就是裁剪之前的图片高度）
                 * dx/在画布上放置图像的 x 坐标位置
                 * dy/在画布上放置图像的 y 坐标位置
                 * dw/可选。要使用的图像的宽度（就是裁剪之后的图片高度，放大或者缩放）
                 * dh/可选。要使用的图像的高度（就是裁剪之后的图片高度，放大或者缩放）
                 * 注：
                 * 第一个参数image可以用HTMLImageElement，HTMLCanvasElement或者HTMLVideoElement作为参数。
                 * dx和dy是image在canvas中定位的坐标值；
                 * dw和dh是image在canvas中即将绘制区域（相对dx和dy坐标的偏移量）的宽度和高度值；
                 * sx和sy是image所要绘制的起始位置，
                 * sw和sh是image所要绘制区域（相对image的sx和sy坐标的偏移量）的宽度和高度值。
                 */
                // ctx.drawImage(image, 0, 0, 720, 720, 0, 0, 50, 50);
                ctx.drawImage(image, 0, 0);
                ctx.font = '30px bold 楷体';
                ctx.fillStyle = '#fff';
                /**
                 * fillText/绘制文字
                 * context.fillText(text,x,y,maxWidth);
                 * text/指定将在画布上写入的文本
                 * x/开始绘制文本的x坐标(相对于画布)
                 * y/开始绘制文本的y坐标(相对于画布)
                 * maxWidth/可选的。文本允许的最大宽度，以像素为单位
                 */
                const _text = '阳性：' + params.data.num
                ctx.fillText(_text, (canvas.width - _text.length * 30) / 2, (canvas.height + 30) / 2);

                resolve(canvas)
            };
        })
    }
}

export default Canvas