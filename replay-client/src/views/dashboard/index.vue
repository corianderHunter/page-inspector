<template>
    <div class="dashboard">
        <div class="bg-mask"></div>
        <iframe ref="replayIframe" scrolling="no"></iframe>
        <div class="page-source">
            From：
            <a :href="url">{{url||'---'}}</a>
        </div>
        <div class="play-tools-div">
            <play-tools
                v-if="max&&$options.recordData"
                :max="max"
                :interval="$options.interval"
                :records="$options.recordData"
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

export default {
    replayIframe: null,
    dom: null,
    recordData: null,
    interval: null,
    data() {
        return {
            max: 0
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
        Promise.all([this.getSession(), this.getRecords()]).then(args => {
            let [session, recordIds] = args;
            console.log(session);
            this.$options.dom = session.page;
            this.$options.interval = session.interval;
            this.max = session.max;
            this.max = this.getAllRecords(recordIds).then(records => {
                this.$options.recordData = records.reduce((result, val) => {
                    return { ...result.data, ...val.data };
                });
            });
            this.initReplayer();
        });
    },
    methods: {
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
                this.$options.recordData,
                this.$options.interval
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