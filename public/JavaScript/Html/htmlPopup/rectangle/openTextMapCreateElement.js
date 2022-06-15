/**
 * 操作面板
 * @param {*} id 
 * @returns 
 */
function openTextMapCreateElement(id) {
    let _div = window.document.createElement("div");
    _div.id = id
    _div.className = "textMap-popup"
    let html = `
        <a
        class="textMap-popup-close-button textMap-popup-color"
        onclick='removeDom(\"${id}\")'
        >×</a
        >
        <div class="tip">
            <p>
                绘制：<br />
                输入文字=》点击绘制按钮 开始绘制
                =》按住鼠标左键拖动=》抬起鼠标左键结束绘制
            </p>
            <br />
            <p>
                编辑：<br />
                点击编辑按钮=》选中要编辑的图形 =》拖动点位=》鼠标右键结束编辑
            </p>
        </div>
        <div class="form-item">
            <div class="label">颜色：</div>
            <div class="value">
                <input type="color" id="textMap-color" value="#409EFF"/>
            </div>
        </div>
        <div class="form-item">
            <div class="label">动作：</div>
            <div class="value">
                <input class="switch" id="textMap-switch" type="checkbox"/>
            </div>
        </div>
        <div class="form-item">
            <div class="label">地形：</div>
            <div class="value">
                <select class="select" id="textMap-select">
                    <option value="NONE">位置绝对</option>
                    <option value="CLAMP_TO_GROUND" selected>位置固定在地形上</option>
                    <option value="RELATIVE_TO_GROUND">位置高度是指地形上方的高度</option>
                </select>
            </div>
        </div>
        <div class="form-item">
            <div class="label">文字：</div>
            <div class="value">
                <input class="text" autocomplete="off" type="text" id="textMap-text" placeholder="请输入要创建的文字"/>
            </div>
        </div>
        <div class="form-item">
            <button class="primary" onclick="TextMapDrawStart()" type="button">绘制</button>
            <button class="warning" onclick="TextMapDrawEdit()" type="button">编辑</button>
        </div>
    `;
    _div.innerHTML = html
    return _div
}