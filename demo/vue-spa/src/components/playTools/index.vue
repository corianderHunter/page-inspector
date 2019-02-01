<template>
    <div class="play-tools">
        <i
            class="play-btn iconfont"
            :class="{'icon-pause':playStatus,'icon-play':!playStatus,'cna':isEnd}"
            @click="clickPlay"
        ></i>
        <span class="start-time">{{timeStart}}</span>
        <div class="bar" v-if="records">
            <input
                type="range"
                class="time-range"
                :max="time.max"
                :min="time.min"
                :value="time.value"
                @change="timeChange"
                :step="step"
            >
            <div class="heat-bar-div">
                <heat-bar :records="records"></heat-bar>
            </div>
        </div>
        <span class="end-time">{{timeEnd}}</span>
    </div>
</template>

<script>
import heatBar from "./heatBar";
import fetch from "@utils/fetch";

let url = new URL("http://localhost:8080/#/");

function pad(num, n) {
    var len = num.toString().length;
    while (len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}

function getTimeStr(time) {
    let second = pad(Math.ceil(time % 60), 2);
    let minute = pad(Math.floor(time / 60), 2);
    return minute + ":" + second;
}

export default {
    timer: null,
    data() {
        return {
            records: null,
            playStatus: false,
            interval: 0,
            step: 1,
            time: {
                value: 0,
                min: 0,
                max: 0
            },
            speed: 1
        };
    },
    components: { heatBar },
    watch: {
        isEnd(val) {
            if (val) {
                this.playStatus = false;
                clearInterval(this.$options.timer);
            }
        },
        playStatus(val) {
            if (val) {
                this.setTimer();
            } else {
                this.clearTimer();
            }
        }
    },
    computed: {
        isEnd() {
            return this.time.value >= this.time.max;
        },
        timeStart() {
            return getTimeStr((this.time.value * this.interval) / 1000);
        },
        timeEnd() {
            return getTimeStr((this.time.max * this.interval) / 1000);
        }
    },
    destroyed() {
        this.setTimer();
    },
    mounted() {
        fetch
            .get("/record", {
                params: {
                    url: url.href
                }
            })
            .then(res => {
                this.records = res.data.records.records;
                this.interval = res.data.records.interval;
                let keys = Object.keys(this.records).map(val => val - 0);
                this.time.max = keys[keys.length - 1];
                this.time.value = this.time.min;
                this.playStatus = true;
            });
    },
    methods: {
        clickPlay() {
            if (this.isEnd) return;
            this.playStatus = !this.playStatus;
            this.$emit("play", this.playStatus);
        },
        setTimer() {
            clearInterval(this.$options.timer);
            this.$options.timer = setInterval(this.play, 1000 * this.speed);
        },
        clearTimer() {
            clearInterval(this.$options.timer);
            this.$options.timer = null;
        },
        play() {
            this.time.value = this.time.value + 1000 / this.interval;
        },
        timeChange(e) {
            this.setTimer();
            this.playStatus = true;
            this.time.value = e.target.value - 0;
            this.$emit("timeChange", this.time.value - 0);
        }
    }
};
</script>

<style lang="scss" scoped>
.cna {
    cursor: not-allowed !important;
}
.play-tools {
    display: flex;
    color: #333;
    line-height: 19px;
    .start-time,
    .end-time {
        font-size: 12px;
    }
    .play-btn {
        font-size: 20px;
        margin-right: 20px;
        color: rgba(255, 181, 73, 1);
        font-weight: bold;
        cursor: pointer;
    }
    .bar {
        width: 400px;
        height: 10px;
        border-radius: 5px;
        position: relative;
        margin: 0 10px;
        margin-top: 2px;
        .heat-bar-div {
            overflow: hidden;
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 10;
        }
        .time-range {
            position: absolute;
            width: 100%;
            background-color: transparent;
            appearance: none;
            z-index: 99;
            &::-webkit-slider-thumb {
                -webkit-appearance: none;
                border: 0;
                height: 15px;
                width: 15px;
                border-radius: 50%;
                background: rgba(255, 181, 73, 1);
                margin-top: 0px;
            }

            &::-moz-range-thumb {
                border: 0;
                height: 15px;
                width: 15px;
                border-radius: 50%;
                background: rgba(255, 181, 73, 1);
                margin-top: 0px;
            }
            #thumb {
                background-color: rgba(26, 188, 156, 0.5);
            }
            &:focus {
                outline: none;
            }
        }
    }
}
</style>