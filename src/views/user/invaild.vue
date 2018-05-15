<template>
  <div class="app-container">
    <div class="staffList">
        <div class="mini-search">
          <el-input placeholder="请输入用户名称" v-model="searchValue" @keyup.enter.native="searchInfo">
            <template slot="append">
              <el-button type="primary" icon="el-icon-search" @click="searchInfo">搜 索</el-button>
            </template>
          </el-input>
        </div>
        <el-table
            :data="tableData"
            style="width: 100%" 
            stripe
            v-loading="loading"
            >
            <el-table-column
                prop="id"
                label="用户ID">
            </el-table-column>
            <el-table-column
                prop="realname"
                label="姓名">
            </el-table-column>
            <el-table-column
                prop="username"
                label="账号">
            </el-table-column>
            <el-table-column
                prop="password"
                label="密码">
            </el-table-column>
            <el-table-column
                label="操作"
                width="180">
                <template slot-scope="scope">
                    <el-button
                    v-if="nowUserId!=scope.row.id"
                    size="mini"
                    :type="tableStatus === 1 ? 'danger' : 'success'"
                    @click="handDisable(scope.$index, scope.row)">{{tableStatus === 1 ? '禁用' : '启用'}}</el-button>
                    <el-button
                    size="mini"
                    type="success"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="编辑信息"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <el-form :model="channelForm" :rules="rules" ref="channelForm" label-width="50px" class="demo-ruleForm">
              <el-form-item label="姓名" prop="relname">
                  <el-input type="text" v-model.trim="channelForm.relname" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="帐号" prop="username">
                  <el-input v-model="channelForm.username" auto-complete="off" placeholder="建议使用非中文字符"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pwd">
                  <el-input v-model="channelForm.pwd" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="editfun('channelForm')">确 定</el-button>
            </span>
        </el-dialog>
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
import { validateUsername, validatePass } from '@/utils/validate'
import { edit, list } from '@/api/user'
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      total: null,
      searchValue: '', // 搜索内容 用于左上角的显示
      searchParams: {}, // 搜索条件 用于发送时的传参
      tableStatus: 2, // 1启用的 2禁用的
      editBeforeUsername: '',
      editBeforeRealname: '',
      channelForm: {},
      centerDialogVisible: false,
      rules: {
        relname: [
          { required: true, message: '用户名称不能为空', trigger: 'blur' }
        ],
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        pwd: [
          { required: true, trigger: 'blur', validator: validatePass }
        ]
      }
    }
  },
  created() {
    this.nowUserId = Cookies.get('id')
    this.getTableData()
  },
  methods: {
    handDisable(index, row) {
      const params = {
        pcId: row.id,
        status: this.tableStatus === 1 ? 2 : 1
      }
      edit(params).then(res => {
        if (res.success) {
          this.getTableData()
          this.$message({
            type: 'success',
            message: `${this.tableStatus === 1 ? '已禁用' : '已启用'}`
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.errorMessage
          })
        }
      })
    },
    getTableData(page) {
      const params = {
        status: this.tableStatus,
        pageNo: !page ? this.currentPage : page,
        pageSize: this.pageSize
      }
      this.loading = true
      if (Object.keys(this.searchParams).length) {
        Object.assign(params, this.searchParams)
      }
      list(params).then(res => {
        this.loading = false
        if (res.success) {
          this.tableData = res.list
          this.total = res.total
          this.currentPage = res.pageNo
        }
      })
    },
    // 搜索
    searchInfo() {
      this.searchParams = this.searchValue ? { relname: this.searchValue } : {}
      this.getTableData(1)
    },
    handleCurrentChange(page) {
      this.getTableData(page)
    },
    handleEdit(index, row) {
      this.editBeforeUsername = row.username
      this.editBeforeRealname = row.realname
      this.channelForm = {
        pcId: row.id,
        pwd: row.password,
        relname: row.realname,
        username: row.username
      }
      this.centerDialogVisible = true
    },
    editfun(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = Object.assign({}, this.channelForm)
          if (params['realname'] === this.editBeforeRealname) {
            delete params['realname']
          }
          if (params['username'] === this.editBeforeUsername) {
            delete params['username']
          }
          edit(params).then(res => {
            if (res.success) {
              this.centerDialogVisible = false
              this.channelForm = {}
              this.$message({
                type: 'success',
                message: '编辑成功！'
              })

              this.getTableData(this.currentPage)
              if (parseInt(Cookies.get('id')) === parseInt(params['pcId'])) {
                Cookies.set('password', params['pwd'])
              }
            } else {
              this.$message({
                type: 'error',
                message: res.data.errorMessage
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
