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
            total: 0,
            pager: {
                page: 1,
                pageSize: 10
            }
        };
    },
    mounted() {
        this.fetchList();
    },
    methods: {
        fetchList() {
            this.$service
                .getWebsites({
                    params: this.pager
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