/**
 * 右键菜单
 */
class rightClickMenu {
    constructor(Cesium, viewer, menu) {
        this.Cesium = Cesium
        this.viewer = viewer
        this.menu = menu
        this.latObj = undefined
        this._Utils = new Utils(Cesium, viewer)
        this.menu_item_style = 'white-space: nowrap;color: #edffff;font-size:14px;padding: 6px 10px;cursor: pointer;'
        this.Handler = null;
        // this.Handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    }
    create(Callback) {
        //禁用浏览器右键菜单
        this.doProhibit()
        //附加右击事件
        this.loadRightClick((res)=>{
            Callback(res)
        })
    }
    /**
     * 创建ui
     * @param {*} position 屏幕坐标（笛卡尔2）
     */
    createUI(position) {
        let _div = window.document.createElement("div");
        _div.id = "right-click-menu"
        _div.className = "right-click-menu"
        _div.style.top = position.y + 10 + 'px'
        _div.style.left = position.x + 10 + 'px'
        _div.style.position = 'absolute'
        _div.style.zIndex = 3
        _div.style.backgroundColor = 'rgba(23, 49, 71, .8)'
        _div.style.border = '1px solid #2b2c2f;'

        let _html = ''

        for (let i = 0; i < this.menu.length; i++) {
            const item = this.menu[i]
            _html += `
                <div class="right-click-menu-item" style="${this.menu_item_style}" data-method="${item.method}">
                    ${item.label}
                </div>
            `
        }

        _div.innerHTML = _html
        return _div
    }
    /**
     * 附加右击事件
     */
    loadRightClick(Callback) {
        const Cesium = this.Cesium;
        const ellipsoid = this.viewer.scene.globe.ellipsoid;
        this.Handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)
        this.Handler.setInputAction((e) => {
            const _rightClickSwitch = window.localStorage.getItem('right-click-switch')
            if (_rightClickSwitch == 'false') {
                this.Handler = null
                return
            }
            const cartesian = this.viewer.camera.pickEllipsoid(e.position, ellipsoid);
            if (cartesian) {
                // 苗卡尔椭球体的三维坐标 转 地图坐标（弧度）
                const cartographic = this.viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
                // 地图坐标（弧度） 转 十进制度数 toFixed保留小数点后几位
                const log_String = Cesium.Math.toDegrees(cartographic.longitude).toFixed(8);//经度
                const lat_String = Cesium.Math.toDegrees(cartographic.latitude).toFixed(8);//纬度
                const alt_String = (this.viewer.camera.positionCartographic.height / 1000).toFixed(2);//视角高
                const elec_String = this.viewer.scene.globe.getHeight(cartographic).toFixed(4);//海拔
                this.latObj = { log: log_String, lat: lat_String, alt: alt_String, elec: elec_String }
            }
            if (this._Utils.operationDom('has', "right-click-menu")) {
                this._Utils.operationDom('remove', "right-click-menu")
            }
            if (!this._Utils.operationDom('has', "right-click-menu")) {
                this._Utils.operationDom("append", 'MainCenter', this.createUI(e.position))
                const _menu = document.getElementsByClassName('right-click-menu-item')
                for (let i = 0; i < _menu.length; i++) {
                    const menu_item = _menu[i]

                    menu_item.onclick = function (event) {
                        const _method = event.target.dataset.method
                        if (!_method) return
                        Callback(_method)
                      
                    }
                    menu_item.onmouseover = function (event) {
                        this.style.backgroundColor = "#3ea6ff"
                    }
                    menu_item.onmouseout = function (event) {
                        this.style.backgroundColor = ""
                    }
                }
            }

        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

        this.Handler.setInputAction((e) => {
            if (this._Utils.operationDom('has', "right-click-menu")) {
                this._Utils.operationDom('remove', "right-click-menu")
            }
        }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
        this.Handler.setInputAction((e) => {
            if (this._Utils.operationDom('has', "right-click-menu")) {
                this._Utils.operationDom('remove', "right-click-menu")
            }
        }, Cesium.ScreenSpaceEventType.WHEEL);

    }

    /**
     * 禁用浏览器右键菜单
     */
    doProhibit() {
        if (window.Event)
            document.captureEvents(Event.MOUSEUP);

        function nocontextmenu() {
            event.cancelBubble = true
            event.returnvalue = false;
            return false;
        }

        function norightclick(e) {
            if (window.Event) {
                if (e.which == 2 || e.which == 3)
                    return false;
            } else if (event.button == 2 || event.button == 3) {
                event.cancelBubble = true
                event.returnvalue = false;
                return false;
            }
        }
        document.oncontextmenu = nocontextmenu;  // for IE5+ 
        document.onmousedown = norightclick;  //
    }

    clearProhibit() {
        if (this.Handler) {
            this.Handler.destroy();
            this.Handler = null
        }

        if (this._Utils.operationDom('has', "right-click-menu")) {
            this._Utils.operationDom('remove', "right-click-menu")
        }

        if (window.Event)
            document.captureEvents(Event.MOUSEUP);

        function nocontextmenu() {
            event.cancelBubble = false
            event.returnvalue = true;
            return true;
        }

        function norightclick(e) {
            if (window.Event) {
                if (e.which == 2 || e.which == 3)
                    return true;
            } else if (event.button == 2 || event.button == 3) {
                event.cancelBubble = false
                event.returnvalue = true;
                return true;
            }
        }
        document.oncontextmenu = nocontextmenu;  // for IE5+ 
        document.onmousedown = norightclick;  //
    }
}