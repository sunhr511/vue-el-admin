<template>
    <div class="app-container">
      <div class="addcontent">
        <el-form :model="userForm" :rules="rules" ref="userForm" label-width="60px" class="adduser">
          <el-form-item label="姓名" prop="realname">
            <el-input v-model.trim="userForm.realname"></el-input>
          </el-form-item>
          <el-form-item label="帐号" prop="username">
            <el-input v-model="userForm.username"></el-input>
          </el-form-item>
            <el-form-item label="密码" prop="password" placeholder="建议使用非中文字符">
            <el-input v-model="userForm.password"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-select v-model="userForm.role" placeholder="请选择角色">
              <el-option label="渠道管理员" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('userForm')">立即创建</el-button>
            <el-button @click="resetForm('userForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
import { validateUsername, validatePass } from '@/utils/validate'
import { add } from '@/api/user'
export default {
  data() {
    return {
      userForm: {
        password: '',
        role: '2',
        realname: '',
        username: ''
      },
      rules: {
        realname: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePass }
        ],
        role: [{ required: true, message: '请选择角色类型', trigger: 'change' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          add(this.userForm).then(res => {
            if (res.success) {
              this.resetForm('userForm')
              this.$confirm('添加成功！', {
                type: 'success',
                showCancelButton: false
              })
            } else {
              this.$confirm(res.data.errorMessage, {
                type: 'error',
                showCancelButton: false
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.adduser {
  width: 50%;
  .el-form-item__label{
    text-align: left;
  }
  .el-select {
    width: 100%;
    input{
      user-select: none;
    }
  }
  > button:nth-of-type(1) {
    margin-left: 100px;
  }
}
.addcontent {
  background: #fff;
  padding: 20px;
}
.addcontent .ivu-input {
  width: 50%;
}
</style>
