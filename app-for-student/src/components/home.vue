<template>
  <div id="home">
    <h1>Welcome!</h1>
    <h2>Please read the rules and notification before booking.</h2>
    <div :gutter="20" class="content">
      <div class="choose-lang">
        <el-select v-model="value" placeholder="Choose language">
          <el-option v-for="item in options" 
            :key="item.value" 
            :label="item.label" 
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="text" @click="chosenLang(value)">View rules</el-button>
      </div>
      <el-checkbox v-model="checked">I have read the rules and promise to obey</el-checkbox>
      <div class="buttons">
        <el-button @click="noti" type="info" class="noti">Notification</el-button>
        <el-tooltip content="Booking or view booking result" placement="top">
          <router-link to="/booking-form">
            <el-button type="success">Booking now</el-button>
          </router-link>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        options: [
          {
            value: 'Chinese',
            label: 'Chinese'
          },
          {
            value: 'English',
            label: 'English'
          }
        ],
        value: '',
        checked: true
      }
    },
    methods: {
      chosenLang(value) {
        console.log(value)
        if (value === 'Chinese') {
          this.$router.push('/rule-zh')
        } else {
          this.$router.push('/rule-en')
        }
      },
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
                    }, 300)
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
  #home {
    padding: 3% 0;
    text-align: center;

    & > h1, h2 {
      margin: 24px 0;
    }

    .content {
      margin-top: 6%;

      .choose-lang, & > .el-button, .el-checkbox {
        padding: 12px 60px;
      }
      .buttons {
        padding: 50px 60px;
      }
      .el-select {
        width: 120px;
      }
    }
  }
</style>
