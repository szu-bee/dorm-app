<template>
  <div id="login">
    <h1>管理员登录页</h1>
    <p>测试阶段，暂不设密码</p>
    <!--<el-form :inline="true" :model="form" :rules="rules" ref="form" class="form">
      <el-form-item label="请输入密码" prop="pass">
        <el-input type="password" v-model="form.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="buttons">
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>-->
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
            console.log('ok!')
            this.$http
              .put('http://localhost:3000/', this.form)
              .then(res => {
                console.log(res)
              })
              .catch(err => {
                console.error(err)
              })
          } else {
            console.log('error')
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
    display: flex;
    flex-direction: column;
  }

  h1 {
    margin: 4.2em 0 2.8em;
  }

  /*.form {
    display: flex;
    flex-direction: column;
  }

  .buttons {
    margin-left: 1.2em;
  }*/
</style>
