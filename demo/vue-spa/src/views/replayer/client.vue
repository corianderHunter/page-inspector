<template>
    <div class="replayer-client">
        <div class="left">
            <div class="left-header">
                min:{{0}}
                max:{{100}}
                <el-button @click="isPlaying?pause():play()">{{isPlaying?'pause':'play'}}</el-button>
                <el-input style="width:80px" v-model="timePoint"></el-input>
                <el-button @click="frameReload">fresh iframe</el-button>
            </div>
            <div class="iframe-div">
                <iframe
                    v-if="isReady"
                    ref="iframe"
                    sandbox="allow-same-origin allow-scripts"
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
            pageList: [],
            isReady: false,
            startTime: null
        };
    },
    mounted() {
        this.getRecords();
        this.startTime = Date.now();
        window.addEventListener("message", e => {
            if (e.data === "INSPECTOR_READY") {
                this.frameOk();
            }
        });
    },
    watch: {
        timePoint(val) {
            this.startTime = val - 0;
            this.$refs.iframe.contentWindow.location.reload();
        }
    },
    methods: {
        play() {
            this.isPlaying = !this.isPlaying;
            this.$refs.iframe.contentWindow.postMessage({
                type: "INSPECTOR",
                action: "play",
                timePoint: this.actTime
            });
        },
        pause() {
            this.isPlaying = !this.isPlaying;
            this.$refs.iframe.contentWindow.postMessage({
                type: "INSPECTOR",
                action: "stop",
                timePoint: (this.actTime = this.getCurrTime())
            });
        },
        frameReload() {
            this.$refs.iframe.contentWindow.location.reload();
        },
        getCurrTime(startTime = this.startTime, interval = this.interval) {
            return Math.floor((Date.now() - startTime) / interval) - 0;
        },
        frameOk() {
            this.isPlaying = true;
            !this.startTime && (this.startTime = 0);
            this.$refs.iframe.contentWindow.postMessage(
                {
                    type: "INSPECTOR",
                    action: "init",
                    timePoint: this.startTime,
                    data: {
                        interval: this.interval,
                        records: this.records
                    }
                },
                url.origin
            );
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