<template>
    <canvas
        class="heat-bar"
        :width="pixelWidth"
        :height="height"
        id="playTools"
        :style="{transform:'scaleX('+(scale<1?scale:1)+')','transform-origin': '0 0'}"
    ></canvas>
</template>

<script>
export default {
    canvasCxt: null,
    wad: {
        width: 0,
        color: {
            r: 58,
            g: 197,
            b: 105
        }
    },
    data() {
        return {
            height: 10
        };
    },
    props: {
        records: Object,
        width: Number
    },
    watch: {
        records() {
            this.drawBar(this.records);
        }
    },
    computed: {
        scale() {
            return this.width / (this.timeMax - this.timeMin);
        },
        pixelWidth() {
            return this.scale < 1 ? this.timeMax - this.timeMin : this.width;
        },
        timePointsArr() {
            return Object.keys(this.records).map(val => val - 0);
        },
        timeMin() {
            return 0;
        },
        timeMax() {
            return this.timePointsArr[this.timePointsArr.length - 1];
        },
        renderPoints() {
            return this.timePointsArr.map(val => {
                let level,
                    obj = this.records[val],
                    keyLen = Object.keys(obj).length;
                if (obj["nodes"] && obj["nodes"].length > 3) {
                    level = 4;
                } else if (keyLen == 3) {
                    level = 3;
                } else if (keyLen == 2) {
                    level = 2;
                } else {
                    level = 1;
                }
                return {
                    point: val,
                    level
                };
            });
        }
    },
    mounted() {
        this.drawBar(this.records);
    },
    methods: {
        initCanvas() {
            this.canvasCxt = document
                .getElementById("playTools")
                .getContext("2d");
            this.canvasCxt.fillStyle = "rgba(255,255,255,0.1)";
            this.canvasCxt.fillRect(0, 0, this.pixelWidth, this.height);
        },
        getBlipColour(opacity) {
            return (
                "rgba(" +
                this.$options.wad.color.r +
                "," +
                this.$options.wad.color.g +
                "," +
                this.$options.wad.color.b +
                ", " +
                opacity +
                ")"
            );
        },
        colorLevel(gradient, level) {
            level = 4;
            switch (level) {
                case 1:
                    gradient.addColorStop(0, this.getBlipColour(0));
                    gradient.addColorStop(0.35, this.getBlipColour(0.1));
                    gradient.addColorStop(0.5, this.getBlipColour(0.3));
                    gradient.addColorStop(0.65, this.getBlipColour(0.1));
                    gradient.addColorStop(1, this.getBlipColour(0));
                    break;
                case 2:
                    gradient.addColorStop(0, this.getBlipColour(0));
                    gradient.addColorStop(0.35, this.getBlipColour(0.3));
                    gradient.addColorStop(0.5, this.getBlipColour(0.4));
                    gradient.addColorStop(0.65, this.getBlipColour(0.3));
                    gradient.addColorStop(1, this.getBlipColour(0));
                    break;
                case 3:
                    gradient.addColorStop(0, this.getBlipColour(0));
                    gradient.addColorStop(0.35, this.getBlipColour(0.45));
                    gradient.addColorStop(0.5, this.getBlipColour(0.6));
                    gradient.addColorStop(0.65, this.getBlipColour(0.45));
                    gradient.addColorStop(1, this.getBlipColour(0));
                    break;
                case 4:
                    gradient.addColorStop(0, this.getBlipColour(1));
                    gradient.addColorStop(1, this.getBlipColour(1));
                    break;
                default:
                    break;
            }
        },
        drawGradient(posX, level) {
            let gradient = this.canvasCxt.createLinearGradient(
                posX * this.$options.wad.width - this.$options.wad.width / 2,
                0,
                posX * this.$options.wad.width + this.$options.wad.width / 2,
                0
            );
            this.colorLevel(gradient, level);
            this.canvasCxt.fillStyle = gradient;
            this.canvasCxt.fillRect(
                posX * this.$options.wad.width - this.$options.wad.width / 2,
                0,
                this.$options.wad.width,
                10
            );
        },
        drawBar() {
            this.initCanvas(document.getElementById("playTools"));
            this.$options.wad.width = this.scale < 1 ? 1 : this.scale;
            this.renderPoints.forEach(val =>
                this.drawGradient(val.point, val.level)
            );
        }
    }
};
</script>

<style lang="scss" scoped>
</style>