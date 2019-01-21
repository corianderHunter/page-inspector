<template>
    <div class="replayer-client">
        <div class="left">
            <div class="left-header"></div>
            <div class="iframe-div">
                <iframe
                    ref="iframe"
                    sandbox="allow-same-origin allow-scripts"
                    @load="frameOk"
                    src="/#/"
                ></iframe>
            </div>
        </div>
        <div class="right"></div>
    </div>
</template>

<script>
import testData from "./test.json";
import fetch from "@utils/fetch";

let url = "http://localhost:8080/#/";

export default {
    frameWindow: null,
    mounted() {
        this.$options.frameWindow = this.$refs.iframe.contentWindow;
        this.getPageList();
    },
    methods: {
        frameOk() {
            this.$options.frameWindow.postMessage(
                "hello",
                "http://127.0.0.1:5500"
            );
        },
        getPageList() {
            fetch.get("/pageList").then(res => {
                console.log(res);
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