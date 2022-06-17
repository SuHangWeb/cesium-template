/**
 * 导入外部js
 * 
 * 使用方法：
 * // 引入
 * import '@/common/importJs.js'
 * // html使用的地方
 * <remote-script src="js地址"></remote-script>
 */
import Vue from 'vue'

Vue.component('remote-script', {
    render: function (createElement) {
        var self = this;
        return createElement('script', {
            attrs: {
                type: 'text/javascript',
                src: this.src
            },
            on: {
                load: function (event) {
                    self.$emit('load', event);
                },
                error: function (event) {
                    self.$emit('error', event);
                },
                readystatechange: function (event) {
                    if (this.readyState == 'complete') {
                        self.$emit('load', event);
                    }
                }
            }
        });
    },
    props: {
        src: {
            type: String,
            required: true
        }
    }
});