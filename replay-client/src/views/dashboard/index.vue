<template>
    <div class="dashboard">
        <div class="bg-mask"></div>
        <div class="iframe-div">
            <iframe ref="replayIframe" scrolling="no"></iframe>
        </div>
        <div class="page-source">
            From：
            <a :href="url" target="_blank">{{url||'---'}}</a>
        </div>
        <div class="play-tools-div">
            <play-tools
                v-if="max&&recordData"
                :max="max"
                :interval="interval"
                :records="recordData"
                @timeChange="timeChange"
                @play="play"
            ></play-tools>
        </div>
    </div>
</template>

<script>
import playTools from "./playTools";
import fetch from "@utils/fetch";
import replay from "@/../../dist/page-replay";

export default {
    replayIframe: null,
    dom: null,

    data() {
        return {
            max: 0,
            url: "",
            recordData: null,
            interval: null
        };
    },
    computed: {
        websiteId() {
            return this.$route.params.websiteId;
        },
        sessionId() {
            return this.$route.params.sessionId;
        },
        id() {
            return this.$route.params.id;
        }
    },
    components: {
        playTools
    },
    mounted() {
        this.$options.replayIframe = this.$refs.replayIframe.contentWindow;
        Promise.all([
            this.getWebsite(),
            this.getSession(),
            this.getRecords()
        ]).then(args => {
            let [website, session, recordIds] = args;
            this.url = website.origin + session.path;
            this.$options.dom = session.page;
            this.interval = session.interval;
            this.max = session.max;
            this.getAllRecords(recordIds).then(records => {
                this.recordData = records.reduce((result, val) => {
                    return { ...result, ...val };
                });
                this.initReplayer();
            });
        });
    },
    methods: {
        getWebsite() {
            return this.$service.getWebsite({
                urlParams: {
                    id: this.websiteId
                }
            });
        },
        getSession() {
            return this.$service.getSession({
                urlParams: {
                    id: this.sessionId
                }
            });
        },
        getRecords() {
            return this.$service.getRecords({
                urlParams: {
                    websiteId: this.websiteId,
                    sessionId: this.sessionId
                }
            });
        },
        getAllRecords(ids) {
            return Promise.all(
                ids.map(async id => {
                    return await this.$service
                        .getRecord({
                            urlParams: {
                                websiteId: this.websiteId,
                                id
                            }
                        })
                        .then(data => data.data || {});
                })
            );
        },
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
                this.recordData,
                this.interval
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
    .iframe-div {
        position: absolute;
        left: 20px;
        top: 20px;
        width: calc(100% - 40px);
        height: calc(100% - 70px);
        background-image: url(/static/images/subtlepatterns-white_texture.png);
        z-index: 77;
        iframe {
            border: none;
            background-color: #fff;
        }
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