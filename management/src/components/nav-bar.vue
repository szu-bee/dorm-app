<template>
  <div id="nav-bar">
    <el-menu :default-active="activeIndex" class="el-menu-demo" 
              mode="horizontal" @select="handleSelect">
      <router-link to="/living"><el-menu-item index="1">在住人员信息</el-menu-item></router-link>
      <router-link to="/statistics"><el-menu-item index="2">在住人员统计</el-menu-item></router-link>
      <router-link to="/booking"><el-menu-item index="3">学生申请</el-menu-item></router-link>
      <router-link to="/noti"><el-menu-item index="4">发布通知</el-menu-item></router-link>
      <!--<router-link to="/"><el-menu-item index="5">退出登录</el-menu-item></router-link>-->
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '3'
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key)
        console.log(keyPath)
        this.activeIndex = key
      }
    }
  }
</script>

<style lang="less" scoped>
  #nav-bar {
    margin-bottom: 8px;
  }
</style>
