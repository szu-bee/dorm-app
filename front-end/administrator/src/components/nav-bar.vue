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
        this.$http.get('/be/api/living')
          .then(res => {
            this.$router.push('/living')
          })
          .catch(err => {
            if (err.response) {
              console.log(err.response)
              if (err.response.status === 403) {
                this.$router.replace('/login')
              } else {
                this.$message.error('服务端错误!')
              }
            }
          })
      },
      toStatiPage() {
        this.$http.get('/be/api/living')
          .then(res => {
            this.$router.push('/statistics')
          })
          .catch(err => {
            if (err.response) {
              console.log(err.response)
              if (err.response.status === 403) {
                this.$router.replace('/login')
              } else {
                this.$message.error('服务端错误!')
              }
            }
          })
      },
      toBookingPage() {
        this.$http.get('/be/api/booking')
          .then(res => {
            this.$router.push('/booking')
          })
          .catch(err => {
            if (err.response) {
              console.log(err.response)
              if (err.response.status === 403) {
                this.$router.replace('/login')
              } else {
                this.$message.error('服务端错误!')
              }
            }
          })
      },
      toNotiPage() {
        this.$http.get('/be/api/noti')
          .then(res => {
            this.$router.push('/noti')
          })
          .catch(err => {
            if (err.response) {
              console.log(err.response)
              if (err.response.status === 403) {
                this.$router.replace('/login')
              } else {
                this.$message.error('服务端错误!')
              }
            }
          })
      },
      deleteCookie() {
        this.$cookie.delete('sid', { domain: 'localhost' })
        this.$router.replace('/login')
      }
    }
  }
</script>

<style lang="less" scoped>
  #nav-bar {
    margin-bottom: 8px;
  }
</style>
