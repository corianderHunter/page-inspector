<template>
    <div class="replayer-client">
        <div class="left">
            <div class="left-header">
                min:{{0}}
                max:{{100}}
                <el-button
                    @click="isPlaying=!isPlaying;isPlay?play(0):pause()"
                >{{isPlaying?'pause':'play'}}</el-button>
                <el-input style="width:80px" v-model="timePoint"></el-input>
            </div>
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

let url = new URL("http://localhost:8080/#/");

export default {
    frameWindow: null,
    data() {
        return {
            isPlaying: false,
            timePoint: 0,
            interval: null,
            records: null,
            pageList: []
        };
    },
    mounted() {
        this.$options.frameWindow = this.$refs.iframe.contentWindow;
    },
    methods: {
        play() {},
        pause() {},
        frameOk() {
            this.getRecords().then(res => {
                this.interval = res.data.interval;
                this.records = res.data.records;
                this.$options.frameWindow.postMessage(
                    {
                        type: "INSPECTOR",
                        records: this.records
                    },
                    url.origin
                );
            });
        },
        getRecords() {
            return fetch.get("/record", {
                params: {
                    url: url.href
                }
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