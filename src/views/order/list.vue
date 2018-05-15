<template>
  <div class="app-container">
    <div class="content">
        <div class="mini-search">
          <el-input placeholder="请输入订单ID" v-model="searchValue" @keyup.enter.native="searchInfo">
            <template slot="append">
              <el-button type="primary" icon="el-icon-search" @click="searchInfo">搜 索</el-button>
            </template>
          </el-input>
        </div>
        <el-table
            :data="tableData"
            style="width: 100%"
            v-loading="loading"
            stripe
            >
            <el-table-column
                prop="shoppingid"
                label="订单ID"
                width="80"
                >
            </el-table-column>
            <el-table-column
                prop="accountid"
                label="用户ID"
                width="80"
                >
            </el-table-column>
            <el-table-column
                prop="goodname"
                label="商品名称"
                width="210"
                >
            </el-table-column>
            <el-table-column
                prop="createtime"
                label="创建时间"
                width="100"
                >
            </el-table-column>
            <el-table-column
                label="购买平台"
                width="100"
                >
              <template slot-scope="scope">
                {{reutrnValByKey(scope.row.projectid)}}
              </template>
            </el-table-column>
            <el-table-column
                label="实付金额"
                width="100"
                >
              <template slot-scope="scope">
                {{ scope.row.firstprice ? scope.row.firstprice : 0 }} 元
              </template>
            </el-table-column>
            <el-table-column
                label="订单状态"
                width="100"
                >
              <template slot-scope="scope">
                {{ setOrderStatus(scope.row.orderstatus)}}
              </template>
            </el-table-column>
            <el-table-column
                prop="receiver"
                label="收货人名称"
                width="110"
                >
            </el-table-column>
            <el-table-column
                prop="retel"
                label="收货人手机"
                width="110"
                >
            </el-table-column>
            <el-table-column
                label="收货人地址"
                >
                <template slot-scope="scope">
                {{ scope.row.address}}
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { list } from '@/api/order'
export default {
  data() {
    return {
      loading: false,
      searchValue: '', // 搜索内容 用于左上角的显示
      searchParams: {}, // 搜索条件 用于发送时的传参
      currentPage: 1, // 当前页
      tableData: [], // 当前页，表格数据
      total: null, // 总条数
      pageSize: 20, // 每页显示个数
      orderStatus: 2, // 0全部 1代付款 2待收货 3已完成 4取消
      projectId: 0 // 表示全部
    }
  },
  created() {
    if (this.projectArr.length === 0) {
      this.$store.dispatch('SetProjectArr', { status: 0 }) // if a great many dispatch, use mapActions
    }
  },
  mounted() {
    this.getTableData() // 获得表格数据
  },
  computed: {
    ...mapGetters(['projectArr'])
  },
  methods: {
    reutrnValByKey(checkVal, checkKey = 'id', returnVal = 'projectname') {
      try {
        return this.projectArr.filter(item => {
          return item[checkKey] === parseInt(checkVal)
        })[0][returnVal]
      } catch (err) {
        return '未知来源'
      }
    },
    setOrderStatus(status) {
      let rs = '未知状态'
      switch (status) {
        case 1:
          rs = '待付款'
          break
        case 2:
          rs = '待收货'
          break
        case 3:
          rs = '已完成'
          break
        case 4:
          rs = '已取消'
          break
        default:
          break
      }
      return rs
    },
    getTableData(page) {
      const params = {
        orderStatus: this.orderStatus,
        pageNo: !page ? this.currentPage : page,
        pageSize: this.pageSize,
        projectId: this.projectId
      }
      if (Object.keys(this.searchParams).length) {
        Object.assign(params, this.searchParams)
      }
      this.loading = true
      list(params).then(res => {
        this.loading = false
        if (res.success) {
          this.total = res.total
          this.tableData = res.list
          this.currentPage = res.pageNo
        }
      })
    },
    // 搜索渠道
    searchInfo() {
      this.searchParams = this.searchValue ? { shoppingId: this.searchValue } : {}
      this.getTableData(1)
    },
    // 改变当前页码更新表格
    handleCurrentChange(page) {
      this.getTableData(page)
    }
  }
}
</script>
<style scope>
.search {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
.search button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.search input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.block {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}
.el-dialog_body {
  padding-bottom: 0;
}
</style>
