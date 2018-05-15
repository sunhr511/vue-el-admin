<template>
  <div class="app-container">
    <div class="project-detail-main">
      <p class="header">
        <a @click="$router.back()">
          <i class="el-icon-back"></i>
          <span>项目设置</span>
        </a>
      </p>
      <h3 class="title">{{$route.params.name}}</h3>
      <div class="project-user-main">
          <div>
            <p class="header">
              <span>项目人数：{{total}}</span>
              <span>帐号</span>
              <span>成员权限</span>
            </p>
            <el-table
              class="p-user-list e-table-flex-between"
              :show-header="false"
              :data="usertList"
              v-loading="loading"
              style="width: 100%">
              <el-table-column
                prop="realname"
                label="姓名">
                <template slot-scope="scope">
                  <avatar v-if="!scope.row.img" :style="{background: scope.row.backcolor ? scope.row.backcolor : '#72DAD5'}">{{setNameStyle(scope.row.realname)}}</avatar>
                  <avatar v-else :src="scope.row.img"></avatar>
                  <span class="p-user-name" :style="{ color: nowUserId == scope.row.id ? '#48BF1C' : 'inherit'}">{{!scope.row.realname && scope.row.realname!== 0 ? '匿名' : scope.row.realname}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="username"
                label="帐号">
              </el-table-column>
              <el-table-column
                prop="role"
                label="权限">
                <template slot-scope="scope">
                    {{setStyleForRoleName(getNameByRole(scope.row.role).name, scope.row.id)}}
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="params.pageSize"
                layout="total, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { detail } from '@/api/project'
import sysconfig from '@/sysconfig'
import avatar from '../../components/Avatar'
export default {
  data() {
    return {
      loading: true,
      usertList: [],
      // 请求Table时带的参数
      params: {
        pageNo: 1,
        pageSize: 10,
        status: 1
      },
      total: null,
      currentPage: null
    }
  },
  created() {
    this.userArr = sysconfig.userArr
    this.init()
  },
  mounted() {
    this.getTableData()
  },
  components: {
    avatar
  },
  methods: {
    init() {
      this.nowUserId = Cookies.get('id')
      this.nowAccess = Cookies.get('access')
      this.params[this.$route.params.type] = 1
    },
    getNameByRole(role) {
      return this.userArr.filter(item => {
        return item.role === parseInt(role)
      })[0]
    },
    // 获得用户列表
    getTableData() {
      this.loading = true
      detail(this.params).then(res => {
        if (res.success) {
          this.usertList = res.list
          this.loading = false
          this.total = res.total
          this.currentPage = res.pageNo
        }
      })
    },
    setNameStyle(name) {
      return !name && name !== 0 ? '匿名' : name.charAt(0).toUpperCase()
    },
    setStyleForRoleName(name, id) {
      return id === 99 ? '财务' : name
    },
    // 改变当前页码更新表格
    handleCurrentChange(page) {
      this.params['pageNo'] = page
      this.getTableData()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.project-detail-main {
  min-height: 85vh!important;
  & > .header {
    font-size: 13px;
    line-height: 47px;
    padding: 0 10px;
    border-bottom: 1px solid #f0f0f0;
    & > i {
      font-weight: 600;
      margin-right: 6px;
    }
  }
  & > h3 {
    &.title {
      padding-left: 20px;
      font-size: 20px;
      line-height: 70px;
    }
  }
  & > .project-user-main {
    padding: 25px 50px 50px;
    & >div .header {
      display: flex;
      align-items: center;
      color: rgba(0, 0, 0, 0.54);
      font-size: 13px;
      height: 48px;
      width: 100%;
      >span{
        flex: 1;
        padding-left: 10px;
      }
    }
  }
  .p-user-name {
    margin-left: 10px;
  }
}
</style>
