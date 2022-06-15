
/**
 * 地图集合 切换面板
 */
function openBaseMaps() {
    const _Utils = new Utils()
    const _Map = new Map(Cesium, viewer)

    //创建dom元素
    const windowId = 'BaseMaps-Operation-Window'
    let _div = window.document.createElement("div");
    _div.id = windowId
    _div.className = windowId
    let html = ``
    for (let i = 0; i < _Map.list.length; i++) {
        const item = _Map.list[i]
        html += `<option value="${item.value}">${item.label}</option>`
    }
    html = `<a
    class="BaseMaps-Operation-Window-close"
    onclick='closeBaseMaps(\"${windowId}\")'
    >×</a
    >
    <select id="BaseMaps-Operation-Window-select" onchange='BaseMapsChange()'>
    <option disabled selected value>请选择切换地图类型</option>
    ${html}
    </select>`
    _div.innerHTML = html
    if (!_Utils.operationDom('has', windowId)) {
        _Utils.operationDom("append", 'MainCenter', _div)
    }
}