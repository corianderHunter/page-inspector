<template>
    <el-container class="main-container">
        <el-header>
            Header
            <input id="input1">
            <el-button type="primary" @click="record">---record---</el-button>
            <el-button type="primary" @click="replay">---replay---</el-button>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-input v-model="input1" placeholder="请输入内容"></el-input>
                <el-input v-model="input2" placeholder="请输入内容"></el-input>
                <div>
                    <div>
                        <el-switch
                            v-if="test2"
                            v-model="value3"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                        ></el-switch>
                    </div>
                </div>
            </el-aside>
            <el-main>
                <el-time-picker
                    is-range
                    v-model="value4"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围"
                ></el-time-picker>
                <el-time-picker
                    is-range
                    arrow-control
                    v-model="value5"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围"
                ></el-time-picker>
                <el-switch v-model="value2" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                <el-switch v-model="value3" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                <el-steps :active="1">
                    <el-step title="步骤 1" icon="el-icon-edit"></el-step>
                    <el-step title="步骤 2" icon="el-icon-upload"></el-step>
                    <el-step title="步骤 3" icon="el-icon-picture"></el-step>
                </el-steps>
                <div class="block">
                    <span class="demonstration">默认 Hover 指示器触发</span>
                    <el-carousel height="150px" :autoplay="false">
                        <el-carousel-item v-for="item in 4" :key="item">
                            <h3>{{ item }}</h3>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="block">
                    <span class="demonstration">Click 指示器触发</span>
                    <el-carousel trigger="click" height="150px" :autoplay="false">
                        <el-carousel-item v-for="item in 4" :key="item">
                            <h3>{{ item }}</h3>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div>
                    <el-dropdown>
                        <el-button type="primary">
                            更多菜单
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item>双皮奶</el-dropdown-item>
                            <el-dropdown-item>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown split-button type="primary">更多菜单
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item>双皮奶</el-dropdown-item>
                            <el-dropdown-item>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div>
                    <el-dropdown>
                        <el-button type="primary">
                            更多菜单
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item>双皮奶</el-dropdown-item>
                            <el-dropdown-item>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown split-button type="primary">更多菜单
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item>双皮奶</el-dropdown-item>
                            <el-dropdown-item>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div>
                    <el-dropdown>
                        <el-button type="primary">
                            更多菜单
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item>双皮奶</el-dropdown-item>
                            <el-dropdown-item>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown split-button type="primary">更多菜单
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item>双皮奶</el-dropdown-item>
                            <el-dropdown-item>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div>
                    <el-dropdown>
                        <el-button type="primary">
                            更多菜单
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item>双皮奶</el-dropdown-item>
                            <el-dropdown-item>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown split-button type="primary">更多菜单
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item>双皮奶</el-dropdown-item>
                            <el-dropdown-item>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div>
                    <el-dropdown>
                        <el-button type="primary">
                            更多菜单
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item>双皮奶</el-dropdown-item>
                            <el-dropdown-item>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown split-button type="primary">更多菜单
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item>双皮奶</el-dropdown-item>
                            <el-dropdown-item>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div>
                    <el-dropdown>
                        <el-button type="primary">
                            更多菜单
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item>双皮奶</el-dropdown-item>
                            <el-dropdown-item>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown split-button type="primary">更多菜单
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item>双皮奶</el-dropdown-item>
                            <el-dropdown-item>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div>
                    <el-dropdown>
                        <el-button type="primary">
                            更多菜单
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item>双皮奶</el-dropdown-item>
                            <el-dropdown-item>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown split-button type="primary">更多菜单
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item>双皮奶</el-dropdown-item>
                            <el-dropdown-item>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div>
                    <el-dropdown>
                        <el-button type="primary">
                            更多菜单
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item>双皮奶</el-dropdown-item>
                            <el-dropdown-item>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown split-button type="primary">更多菜单
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item>双皮奶</el-dropdown-item>
                            <el-dropdown-item>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div>
                    <el-dropdown>
                        <el-button type="primary">
                            更多菜单
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item>双皮奶</el-dropdown-item>
                            <el-dropdown-item>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown split-button type="primary">更多菜单
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item>双皮奶</el-dropdown-item>
                            <el-dropdown-item>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div>
                    <el-dropdown>
                        <el-button type="primary">
                            更多菜单
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item>双皮奶</el-dropdown-item>
                            <el-dropdown-item>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown split-button type="primary">更多菜单
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item>双皮奶</el-dropdown-item>
                            <el-dropdown-item>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div>
                    <el-dropdown>
                        <el-button type="primary">
                            更多菜单
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item>双皮奶</el-dropdown-item>
                            <el-dropdown-item>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown split-button type="primary">更多菜单
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item>双皮奶</el-dropdown-item>
                            <el-dropdown-item>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="box">
                    <div class="top">
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="Top Left 提示文字"
                            placement="top-start"
                        >
                            <el-button>上左</el-button>
                        </el-tooltip>
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="Top Center 提示文字"
                            placement="top"
                        >
                            <el-button>上边</el-button>
                        </el-tooltip>
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="Top Right 提示文字"
                            placement="top-end"
                        >
                            <el-button>上右</el-button>
                        </el-tooltip>
                    </div>
                    <div class="left">
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="Left Top 提示文字"
                            placement="left-start"
                        >
                            <el-button>左上</el-button>
                        </el-tooltip>
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="Left Center 提示文字"
                            placement="left"
                        >
                            <el-button>左边</el-button>
                        </el-tooltip>
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="Left Bottom 提示文字"
                            placement="left-end"
                        >
                            <el-button>左下</el-button>
                        </el-tooltip>
                    </div>

                    <div class="right">
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="Right Top 提示文字"
                            placement="right-start"
                        >
                            <el-button>右上</el-button>
                        </el-tooltip>
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="Right Center 提示文字"
                            placement="right"
                        >
                            <el-button>右边</el-button>
                        </el-tooltip>
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="Right Bottom 提示文字"
                            placement="right-end"
                        >
                            <el-button>右下</el-button>
                        </el-tooltip>
                    </div>
                    <div class="bottom">
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="Bottom Left 提示文字"
                            placement="bottom-start"
                        >
                            <el-button>下左</el-button>
                        </el-tooltip>
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="Bottom Center 提示文字"
                            placement="bottom"
                        >
                            <el-button>下边</el-button>
                        </el-tooltip>
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="Bottom Right 提示文字"
                            placement="bottom-end"
                        >
                            <el-button>下右</el-button>
                        </el-tooltip>
                    </div>
                    <el-button type="text" @click="outerVisible = true;initRecorder()">点击打开外层 Dialog</el-button>
                    <el-dialog title="外层 Dialog" :visible.sync="outerVisible" @close="dialogClose">
                        <el-dialog
                            width="30%"
                            title="内层 Dialog"
                            :visible.sync="innerVisible"
                            append-to-body
                        ></el-dialog>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="outerVisible = false">取 消</el-button>
                            <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
                        </div>
                    </el-dialog>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import vueMerge from "@utils/vue-data-merge";
// import { recorder, replayer } from "@utils/page-recorder";
import { setTimeout } from "timers";
import circularJSON from "circular-json";
import sizeof from "object-sizeof";
import fetch from "@utils/fetch";
// import { record } from "@utils/page-recorder/lib/rebuild";
// import { isPlainObject } from "@utils/page-recorder/lib/rebuild/utils";
// import record from "@/../../../src/record";
import record from "@/../../../dist/page-record";
import { domToPlainObject } from "@/../../../src/utils";
export default {
    data() {
        return {
            value1: true,
            value2: true,
            input1: "",
            input2: "",
            value3: false,
            outerVisible: false,
            innerVisible: false,
            value4: [
                new Date(2016, 9, 10, 8, 40),
                new Date(2016, 9, 10, 9, 40)
            ],
            value5: [
                new Date(2016, 9, 10, 8, 40),
                new Date(2016, 9, 10, 9, 40)
            ],
            testData1: {
                a: 1,
                b: {
                    aa: 22,
                    bb: 33
                },
                c: {
                    aa: 1,
                    bb: 22,
                    cc: 33
                }
            },
            test1: false,
            test2: false,
            testData2: [{ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 }]
        };
    },
    mounted() {
        // this.record()
        if (window.Worker) {
            // console.info("register worker!");
            // new Worker("/static/worker.js");
        }
    },
    methods: {
        initRecorder() {},
        dialogClose() {},
        record() {
            record.init();
        },
        replay() {
            fetch.post("/record", {
                url: window.location.href,
                dom: record.getDomObject(),
                records: record.getRecords()
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.main-container {
    min-height: 100vh;
    .el-header {
        background-color: #d4d4d4;
    }
    .el-aside {
        background-color: #f5f5f5;
    }
}
</style>
<style>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>