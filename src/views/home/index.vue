<template>
  <el-container class="container">
    <el-aside :width="isCollapse?'64px':'200px'">
      <div class="pic-box" :class="{miniLogo:isCollapse}"></div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold icon" @click="isCollapse = !isCollapse"></span>
        <span class="title">江苏传智播客科技教育有限公司</span>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link my-dropdown">
            <img :src="user.photo" alt />
            {{user.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" command="/setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command="/login">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- 二级路由渲染占位标签 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Store from '@/store'
import eventBus from '@/components/eventBus'
export default {
  created () {
    eventBus.$on('updatePhoto', (data) => {
      this.user.photo = data
    })
    eventBus.$on('updateName', (data) => {
      this.user.name = data
    })
    const userInfo = Store.getUser()
    this.user = userInfo
  },
  data () {
    return {
      isCollapse: false,
      user: ''
    }
  },
  methods: {
    // 下拉菜单 菜单项的跳转
    handleCommand (command) {
      if (command === '/login') Store.delUser()
      this.$router.push(command)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .el-aside {
    background: #002033;
    .pic-box {
      width: 100%;
      height: 60px;
      background: #002244 url(../../assets/images/logo_admin.png) no-repeat
        center / 140px auto;
    }
    .miniLogo {
      background-image: url(../../assets/images/logo_admin_01.png);
      background-size: 36px auto;
    }
    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .icon {
      font-size: 24px;
      vertical-align: middle;
      margin-right: 10px;
      cursor: pointer;
    }
    .title {
      vertical-align: middle;
    }
    .el-dropdown {
      float: right;
      img {
        width: 30px;
        vertical-align: middle;
      }
      .my-dropdown {
        cursor: pointer;
      }
    }
  }
}
</style>
