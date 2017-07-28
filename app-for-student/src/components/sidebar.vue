<template>
  <div id="sidebar">
    <el-menu>
      <router-link to="/">
        <el-menu-item index="1"><i class="el-icon-arrow-left"></i>Back to home</el-menu-item>
      </router-link>
      <el-menu-item @click="noti" index="2">
        <i class="el-icon-information"></i>Notification
      </el-menu-item>
      <router-link to="/booking-form">
        <el-menu-item index="3">
          <i class="el-icon-edit"></i>Booking form
        </el-menu-item>
      </router-link>
      <el-tooltip content="Please wait for manager's operation" placement="bottom">
        <router-link to="/view-result">
          <el-menu-item index="4">
            <i class="el-icon-circle-check"></i>View Result
          </el-menu-item>
        </router-link>
      </el-tooltip>
    </el-menu>
  </div>
</template>

<script>
  export default {
    methods: {
      noti() {
        this.$http.get('/be/api/noti')
          .then(noti => {
            this.$msgbox({
              title: noti.data.title,
              message: noti.data.content,
              showCancelButton: true,
              confirmButtonText: 'confirm',
              cancelButtonText: 'cancel',
              beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                  instance.confirmButtonLoading = true
                  instance.confirmButtonText = 'executing...'
                  setTimeout(() => {
                    done()
                    setTimeout(() => {
                      instance.confirmButtonLoading = false
                    }, 3000)
                  }, 500)
                } else {
                  done()
                }
              }
            })
          })
          .catch(err => {
            console.error(err)
          })
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
