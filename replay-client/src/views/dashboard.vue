<template>
    <div class="dashboard">
        <div class="bg-mask"></div>
        <iframe ref="replayIframe" scrolling="no"></iframe>
        <div class="page-source">
            From：
            <a :href="url">{{url}}</a>
        </div>
        <div class="play-tools-div">
            <play-tools
                v-if="recordData"
                :recordData="recordData"
                @timeChange="timeChange"
                @play="play"
            ></play-tools>
        </div>
    </div>
</template>

<script>
import playTools from "./playTools";
import fetch from "@utils/fetch";
import replay from "@/../../src/replay";
// import replay from "@/../../dist/page-replay";

let url = new URL("http://localhost:8080/#/");

export default {
    replayIframe: null,
    dom: null,
    data() {
        return {
            recordData: null,
            url
        };
    },
    components: {
        playTools
    },
    mounted() {
        this.$options.replayIframe = this.$refs.replayIframe.contentWindow;
        fetch
            .get("/record", {
                params: {
                    url: url.href
                }
            })
            .then(res => {
                this.recordData = res.data.records;
                this.$options.dom = res.data.dom;
                this.initReplayer();
            });
    },
    methods: {
        timeChange(time) {
            replay.play(time, true);
        },
        play(time, status) {
            status ? replay.play(time) : replay.stop();
        },
        initReplayer() {
            replay.init(
                this.$options.replayIframe,
                this.$options.dom,
                this.recordData
            );
        }
    }
};
</script>

<style lang="scss" scoped>
.dashboard {
    width: 100%;
    height: 100%;
    position: relative;
    .bg-mask {
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: url(/static/images/board-bg.jpeg);
        background-size: 200px 100px;
        filter: blur(7px);
        z-index: 66;
    }
    iframe {
        position: absolute;
        left: 20px;
        top: 20px;
        width: calc(100% - 40px);
        height: calc(100% - 70px);
        background-color: #fff;
        border: none;
        z-index: 77;
    }
    .page-source {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 500px;
        margin-left: auto;
        margin-right: auto;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 10px 50px;
        text-align: center;
        color: #fff;
        border-radius: 0 0 50px 50px;
        z-index: 99;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        box-sizing: border-box;
        a {
            color: #fff;
        }
    }
    .play-tools-div {
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 88;
        padding: 10px;
        color: #fff;
        font-size: 12px;
        line-height: 20px;
        background-color: rgba(0, 0, 0, 0.5);
        .play-tools {
            margin: 0 auto;
            width: 980px;
        }
    }
}
</style>