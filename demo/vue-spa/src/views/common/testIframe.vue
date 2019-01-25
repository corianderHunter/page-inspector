<template>
    <div class="replayer-client">
        <div class="left">
            <div class="iframe-div">
                <iframe ref="iframe" sandbox="allow-same-origin allow-scripts" @load="iframeLoaded"></iframe>
            </div>
        </div>
        <div class="right"></div>
    </div>
</template>

<script>
import fetch from "@utils/fetch";
let url = new URL("http://localhost:8080/#/");

function plainObjectToDom(obj, callback = () => {}) {
    // if (!isPlainObject(obj)) return;
    let _node;
    try {
        switch (obj.nodeType) {
            case 1:
            case 9:
                if (obj.tagName.toUpperCase() === "SCRIPT") {
                    _node = document.createElement("NO-SCRIPT");
                } else {
                    _node = document.createElement(obj.tagName);
                }
                if (!_node) return;
                if (obj.attributes) {
                    for (let pro in obj.attributes) {
                        _node.setAttribute(pro, obj.attributes[pro]);
                    }
                }
                obj.childNodes &&
                    obj.childNodes.forEach(val => {
                        let _dom = plainObjectToDom(val, callback);
                        _dom && _node.appendChild(_dom);
                    });
                break;
            case 3:
                _node = new Text();
                _node.textContent = obj.textContent;
                break;
            case 8:
                _node = new Comment();
                _node.textContent = obj.textContent;
                break;
            default:
                break;
        }
    } catch (e) {
        console.error(e);
    }
    callback(obj, _node);
    return _node;
}

export default {
    data() {
        return {
            interval: null,
            records: null,
            dom: null
        };
    },
    mounted() {},
    methods: {
        iframeLoaded() {
            let sonWindow = this.$refs.iframe.contentWindow;
            this.getRecords().then(() => {
                sonWindow.document.documentElement &&
                    sonWindow.document.documentElement.remove();
                sonWindow.document.append(plainObjectToDom(this.dom));
            });
        },
        getRecords() {
            return fetch
                .get("/record", {
                    params: {
                        url: url.href
                    }
                })
                .then(res => {
                    this.isReady = true;
                    this.interval = res.data.interval;
                    this.records = res.data.records;
                    this.dom = res.data.dom;
                    return res.data;
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.replayer-client {
    display: flex;
    .left {
        flex: 1;
        display: flex;
        flex-direction: column;
        .left-header {
            height: 300px;
        }
        .iframe-div {
            flex: 1;
            height: calc(100vh - 300px);
            iframe {
                width: 100%;
                height: 100%;
            }
        }
    }
    .right {
        width: 200px;
    }
}
</style>