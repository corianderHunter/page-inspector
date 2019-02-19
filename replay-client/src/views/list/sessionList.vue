<template>
    <div class="website-list">
        <el-table :data="list" style="width: 1000px;">
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
                    <el-button @click="replay(scope.row)" type="text" size="small">回放</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: []
        };
    },
    computed: {
        websiteId() {
            return this.$route.params.websiteId || 0;
        }
    },
    mounted() {
        this.websiteId &&
            this.$service
                .getSessionsByWebsite({
                    params: {
                        websiteId: this.websiteId
                    }
                })
                .then(data => {
                    this.list = data;
                });
    },
    methods: {
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