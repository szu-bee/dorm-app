<template>
  <div id="login">
    <h1>管理员登录页</h1>
    <el-form :inline="true" :model="form" :rules="rules" ref="form" class="form">
      <el-form-item prop="pass">
        <el-input type="password" 
          placeholder="请输入密码" 
          v-model="form.pass" 
          auto-complete="off">
        </el-input>
      </el-form-item>
      <el-form-item class="buttons">
        <el-button @click="submitForm('form')" type="primary">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          pass: ''
        },
        rules: {
          pass: [{
            validator: (form, value, callback) => {
              if (value === '') {
                callback(new Error('密码不能为空'))
              } else if (value.length < 8) {
                callback(new Error('密码长度不能小于8位'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$http
              .post('/be/api/login', this.form)
              .then(res => {
                this.$cookie.set('sid', res.data, { expires: 1, domain: 'localhost', secure: true })
                this.$router.replace('/booking')
                console.log(document.cookie)
              })
              .catch(err => {
                if (err.response) {
                  console.log(err.response)
                  if (err.response.status === 400) {
                    this.$message.error('密码不正确！')
                  } else {
                    this.$message.error('服务器错误！')
                  }
                }
              })
          } else {
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

<style lang="less" scoped>
  #login {
    h1 {
      margin: 4.2em 0 2.8em;
    }

    .form {
      display: flex;
      flex-direction: column;
    }
  }
</style>
