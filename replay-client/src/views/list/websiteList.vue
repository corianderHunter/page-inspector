<template>
    <div class="website-list">
        <h1 style="width: 1000px;margin:50px auto;">站点列表</h1>
        <el-table :data="list" style="width: 1000px;margin:50px auto;">
            <el-table-column prop="origin" label="站点" width="300"></el-table-column>
            <el-table-column prop="count" label="session数目" width="180"></el-table-column>
            <el-table-column prop="createdAt" label="首次访问时间"></el-table-column>
            <el-table-column prop="lastestVisited" label="最后访问时间"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="detail(scope.row)" type="text" size="small">查看</el-button>
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
    mounted() {
        this.$service.getWebsites().then(data => {
            this.list = data;
        });
    },
    methods: {
        detail(website) {
            this.$router.push({
                name: "sessionList",
                params: {
                    websiteId: website._id
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
</style>