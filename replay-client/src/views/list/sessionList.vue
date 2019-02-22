<template>
    <div class="website-list">
        <h1 style="width: 1000px;margin:50px auto;">
            浏览记录列表
            <span style="font-size:14px;">(站点：{{website.origin}})</span>
            <span
                @click="$router.push('/websites')"
                style="font-size:14px;margin-left:10px;cursor:pointer;"
            >返回站点列表</span>
        </h1>
        <el-table :data="list" style="width: 1000px;margin:50px auto;   ">
            <el-table-column prop="path" label="路径" width="150"></el-table-column>
            <el-table-column prop="userAgent" label="用户标识" width="200"></el-table-column>
            <el-table-column prop="ip" label="IP"></el-table-column>
            <el-table-column prop="createdAt" label="访问时间"></el-table-column>
            <el-table-column label="有效访问时长">
                <template slot-scope="scope">
                    <span>{{Math.ceil(scope.row.max*scope.row.interval/1000)}}s</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        :disabled="!scope.row.max"
                        @click="replay(scope.row)"
                        type="text"
                        size="small"
                    >回放</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            style="width: 1000px;margin:20px auto;text-align:right;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pager.page"
            :page-size="pager.pageSize"
            layout="total, prev, pager, next"
            :total="total"
        ></el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            pager: {
                page: 1,
                pageSize: 10
            },
            total: 0,
            website: {}
        };
    },
    computed: {
        websiteId() {
            return this.$route.params.websiteId || 0;
        }
    },
    mounted() {
        if (!this.websiteId) return;
        this.fetchList();
        this.$service
            .getWebsite({
                urlParams: {
                    id: this.websiteId
                }
            })
            .then(data => {
                this.website = data;
            });
    },
    methods: {
        fetchList() {
            this.$service
                .getSessionsByWebsite({
                    params: {
                        websiteId: this.websiteId,
                        ...this.pager
                    }
                })
                .then(data => {
                    this.list = data.list;
                    this.total = data.count;
                });
        },
        handleSizeChange(val) {
            this.pager.pageSize = val - 0;
            this.fetchList();
        },
        handleCurrentChange(val) {
            this.pager.page = val - 0;
            this.fetchList();
        },
        replay(session) {
            this.$router.push({
                name: "dashboard",
                params: {
                    websiteId: session.websiteId,
                    sessionId: session._id
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
</style>