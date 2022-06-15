/**
 * 创建测试 html 结构
 * @param {*} item
 * @param {*} id
 * @returns
 */
function testDomHTML(item, id) {
    let _div = window.document.createElement("div");
    _div.id = id
    _div.className = "cesium-popup"
    let html = `
        <a
        class="cesium-popup-close-button cesium-popup-color"
        onclick='removeDom(\"${item.id}\")'
        >×</a
        >
        <div class="cesium-popup-background" style="padding: 1px 0">
        <div
            id="tooltip-content"
            class="cesium-popup-content cesium-popup-color"
        >
            <table style="width: 200px; color: white">
            <tr>
                <th
                scope="col"
                colspan="4"
                style="text-align: center; font-size: 15px"
                >
                ${item.title}
                </th>
            </tr>
            <tr>
                <td>建筑面积：</td>
                <td>${item.area ? item.area : '未知'}</td>
            </tr>
            <tr>
                <td>建筑年份：</td>
                <td>${item.year + '年' ? item.year + '年' : '未知'}</td>
            </tr>
            </table>
        </div>
        </div>
        <div class="cesium-popup-tip-container">
        <div class="cesium-popup-tip cesium-popup-background"></div>
        </div>`;
    _div.innerHTML = html
    setTimeout(() => {
        _div.style.display = "block"
    }, 500)
    return _div
}