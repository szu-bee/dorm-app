<template>
  <div id="noti">
    <nav-bar></nav-bar>
    <div class="form">
      <el-form ref="form" :model="form">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" 
            :title="form.title">
          </el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="form.content" 
            :content="form.content"
            :rows="6"
            :autosize="{ minRows: 2, maxRows: 10 }"
            type="textarea">
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="submitForm('form')" type="primary">发布</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import navBar from './nav-bar.vue'

  export default {
    components: {
      navBar
    },
    data() {
      return {
        form: {
          title: '',
          content: ''
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$http
          .put('/be/api/noti', this.form)
          .then(res => {
            console.log(res)
            this.$message({
              message: '发布成功！',
              type: 'success'
            })
          })
          .catch(err => {
            console.error(err)
          })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style lang="less" scoped>
  .form {
    margin: 4% 30%;
  }
</style>
