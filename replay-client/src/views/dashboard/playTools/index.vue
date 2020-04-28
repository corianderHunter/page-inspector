<template>
  <div class="play-tools" v-if="max">
    <i
      class="play-btn iconfont"
      :class="{
        'icon-pause': playStatus,
        'icon-play': !playStatus,
        cna: isEnd,
      }"
      @click="clickPlay"
    ></i>
    <div class="start-time">{{ timeStart }}</div>
    <div class="bar" :style="{ width: width + 'px' }" v-if="records">
      <input
        type="range"
        class="time-range"
        :max="max"
        :min="min"
        :value="time"
        @change="timeChange"
        :step="step"
      />
      <div class="heat-bar-div">
        <heat-bar :width="width" :records="records"></heat-bar>
      </div>
    </div>
    <div class="end-time">{{ timeEnd }}</div>
  </div>
</template>

<script>
import heatBar from "./heatBar";

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
      width: 800,
      playStatus: false,
      step: 1,
      time: 0,
      min: 0,
      speed: 1,
    };
  },
  props: {
    max: Number,
    interval: Number,
    records: Object,
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
    },
  },
  mounted() {
    this.playStatus = true;
  },
  computed: {
    isEnd() {
      return this.time >= this.max;
    },
    timeStart() {
      return getTimeStr((this.time * this.interval) / 1000);
    },
    timeEnd() {
      return getTimeStr((this.max * this.interval) / 1000);
    },
  },
  destroyed() {
    this.setTimer();
  },
  methods: {
    clickPlay() {
      if (this.isEnd) return;
      this.playStatus = !this.playStatus;
      this.$emit("play", this.time - 0, this.playStatus);
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
      !this.isEnd && (this.time = this.time + 1000 / this.interval);
    },
    timeChange(e) {
      this.setTimer();
      this.playStatus = true;
      this.time = e.target.value - 0;
      this.$emit("timeChange", this.time);
    },
  },
};
</script>

<style lang="scss" scoped>
.cna {
  cursor: not-allowed !important;
}
.play-tools {
  display: flex;
  color: #fff;
  line-height: 19px;

  .start-time,
  .end-time {
    font-size: 12px;
    width: 40px;
  }
  .play-btn {
    font-size: 20px;
    margin-right: 20px;
    color: rgba(255, 255, 255, 0.8);
    font-weight: bold;
    cursor: pointer;
  }
  .bar {
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
        background: rgba(255, 255, 255, 1);
        margin-top: 0px;
      }

      &::-moz-range-thumb {
        border: 0;
        height: 15px;
        width: 15px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 1);
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
