<template>
    <canvas class="heat-bar" :width="width" :height="height" id="playTools"></canvas>
</template>

<script>
export default {
    canvasCxt: null,
    wad: {
        width: 0,
        color: {
            r: 255,
            g: 0,
            b: 0
        }
    },
    data() {
        return {
            height: 10,
            width: 400
        };
    },
    props: {
        records: Object
    },
    watch: {
        records() {
            this.drawBar(this.records);
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
            this.canvasCxt.fillStyle = "rgba(0,0,0,0.05)";
            this.canvasCxt.fillRect(0, 0, this.width, this.height);
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
            switch (level) {
                case 1:
                    gradient.addColorStop(0, this.getBlipColour(0));
                    gradient.addColorStop(0.35, this.getBlipColour(0.02));
                    gradient.addColorStop(0.5, this.getBlipColour(0.07));
                    gradient.addColorStop(0.65, this.getBlipColour(0.02));
                    gradient.addColorStop(1, this.getBlipColour(0));
                    break;
                case 2:
                    gradient.addColorStop(0, this.getBlipColour(0));
                    gradient.addColorStop(0.35, this.getBlipColour(0.05));
                    gradient.addColorStop(0.5, this.getBlipColour(0.1));
                    gradient.addColorStop(0.65, this.getBlipColour(0.05));
                    gradient.addColorStop(1, this.getBlipColour(0));
                    break;
                case 3:
                    gradient.addColorStop(0, this.getBlipColour(0));
                    gradient.addColorStop(0.35, this.getBlipColour(0.07));
                    gradient.addColorStop(0.5, this.getBlipColour(0.15));
                    gradient.addColorStop(0.65, this.getBlipColour(0.07));
                    gradient.addColorStop(1, this.getBlipColour(0));
                    break;
                case 4:
                    gradient.addColorStop(0, this.getBlipColour(0.2));
                    gradient.addColorStop(1, this.getBlipColour(0.2));
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
                posX * this.$options.wad.width + this.$options.wad.width / 2,
                10
            );
        },
        drawBar(data) {
            let timePoint = Object.keys(data).map(val => val - 0);
            let points = timePoint.map(val => {
                let level,
                    obj = data[val],
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
            let min = timePoint[0],
                max = timePoint[timePoint.length - 1];
            this.initCanvas(document.getElementById("playTools"));
            this.$options.wad.width = Math.floor(400 / (max - min));
            points.forEach(val => this.drawGradient(val.point, val.level));
        }
    }
};
</script>

<style lang="scss" scoped>
</style>