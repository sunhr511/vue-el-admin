<template>
  <div class="app-container project-main">
    <div class="item_list">
      <ul>
        <li v-for="(item, index) in projectList" v-bind:key="'item' + index" v-if="item.status" @click="openChildrenProject(item.prourl, $event)">
          <div>
            <div class="menu" onClick="javascript:event.preventDefault()">
              <el-dropdown trigger="click" placement="bottom-end" @command="setProject(item, index)">
                <i class="el-icon-more"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><i class="el-icon-setting"></i>&nbsp;&nbsp;设置&nbsp;&nbsp;</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="cover">
              <div class="cover_mask">
              </div>
              <img :src="item.picture ? item.picture : 'https://dxjk.oss-cn-hangzhou.aliyuncs.com//b71d49e8ad6df56a80922fbe0b1cb2d0.png'">
            </div>
            <div class="detail" v-text="item.projectname"></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { list } from '@/api/project'

export default {
  data() {
    return {
      projectList: []
    }
  },
  created() {
    this.getProjectList()
  },
  mounted() {},
  computed: {},
  methods: {
    getProjectList() {
      list({ status: 1 }).then(res => {
        this.projectList = res.data.filter(item => Cookies.get(item['field']) === '1')
      })
    },
    // 设置该项目属性
    setProject(item, index) {
      this.$router.push({
        name: 'project-detail',
        params: { id: item.id, name: item.projectname, type: item.field }
      })
    },
    // 打开子项目
    openChildrenProject(baseurl, e) {
      if (e.target.className !== 'cover_mask') return
      const uri = `${baseurl}?autologin=1&p=${Cookies.get('encryptP')}&u=${Cookies.get('encryptU')}&role=${Cookies.get('role')}`
      window.open(uri)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.project-main {
  .item_list {
    box-sizing: border-box;
    background-color: initial!important;
    ul {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      list-style: none;
      li {
        max-width: 240px;
        width: 33.33%;
        transition: all 0.3s;
        background: #f2f2f2;
        margin: 0 32px 24px 0;
        border-radius: 4px;
        &:hover {
          box-shadow: 0 4px 12px rgba(40, 120, 255, 0.11), 0 3px 14px rgba(0, 0, 0, 0.11);
          & > div {
            border-radius: 4px;
            margin-top: 0;
            overflow: hidden;
            .menu {
              display: block;
            }
            .cover_mask {
              background: rgba(0, 0, 0, 0.2);
            }
          }
        }
        & > div {
          cursor: pointer;
          position: relative;
          display: block;
          border-radius: 4px;
          overflow: hidden;
          box-sizing: border-box;
          overflow: hidden;
          background: #fff;
          transition: all 0.3s;
          box-shadow: 0 2px 2px 0 rgba(40, 120, 255, 0.08);
        }
        .menu {
          position: absolute;
          right: 30px;
          top: 30px;
          z-index: 2;
          display: none;
          i {
            transform: rotate(90deg);
            color: #fff;
            font-size: 18px;
          }
        }
        .cover {
          height: 180px;
          overflow: hidden;
          position: relative;
          left: 0;
          top: 0;
          .cover_mask {
            width: 100%;
            height: 180px;
            background: transparent;
            position: absolute;
            left: 0;
            top: 0;
            transition: all ease 500ms;
            z-index: 1;
          }
          img {
            transition: all 0.3s;
            display: block;
            height: 100%;
            position: absolute;
            -webkit-transform: translatex(-50%);
            transform: translatex(-50%);
            left: 50%;
          }
        }
        .detail {
          border-top: 1px solid #f0f0f0;
          height: 60px;
          width: 100%;
          background: #fff;
          box-sizing: border-box;
          position: relative;
          text-align: center;
          display: -webkit-box;
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }
      }
    }
  }
}

</style>
