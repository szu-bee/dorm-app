<template>
  <div id="nav-bar">
    <el-menu mode="horizontal">
      <el-menu-item index="1" @click="toLivingPage()">在住人员信息</el-menu-item>
      <el-menu-item index="2" @click="toStatiPage()">在住人员统计</el-menu-item>
      <el-menu-item index="3" @click="toBookingPage()">学生申请</el-menu-item>
      <el-menu-item index="4" @click="toNotiPage()">发布通知</el-menu-item>
      <el-menu-item index="5" @click="deleteCookie()">退出登录</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    methods: {
      toLivingPage() {
        this.$router.push('/living')
      },
      toStatiPage() {
        this.$router.push('/statistics')
      },
      toBookingPage() {
        this.$router.push('/booking')
      },
      toNotiPage() {
        this.$router.push('/noti')
      },
      deleteCookie() {
        this.$cookie.delete('sid', { domain: 'localhost' })
        this.$router.replace('/')
      }
    }
  }
</script>

<style lang="less" scoped>
  #nav-bar {
    margin-bottom: 8px;
  }
</style>
