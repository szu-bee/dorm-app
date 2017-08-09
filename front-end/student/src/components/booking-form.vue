<template>
  <div id="booking-form">
    <div id="sidebar">
      <sidebar></sidebar>
    </div>
    <div class="content">
      <el-form ref="form" :model="form" :rules="rules" label-width="6em">
        <el-form-item label="Name" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Sex" prop="sex">
          <el-select v-model="form.sex" placeholder="Please choose">
            <el-option label="male" value="male"></el-option>
            <el-option label="female" value="female"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="StudentId" prop="studentId">
          <el-input v-model="form.studentId"></el-input>
        </el-form-item>
        <el-form-item label="Passport" prop="passport">
          <el-input v-model="form.passport"></el-input>
        </el-form-item>
        <el-form-item label="Phone" prop="phone">
          <el-input v-model="form.phone" auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="RoomType" prop="roomType">
          <el-select v-model="form.roomType" placeholder="Please choose">
            <el-option label="single" value="single"></el-option>
            <el-option label="double" value="double"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Booking" prop="bookingDate">
          <el-date-picker type="date" 
            format="yyyy-MM-dd"
            v-model="form.bookingDate"
            placeholder="Choose appointment date" 
            :picker-options="pickerOptions"
            class="date-picker">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm('form')" type="primary">submit</el-button>
          <el-button @click="resetForm('form')">reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script>
  import sidebar from './sidebar.vue'

  export default {
    components: {
      sidebar
    },
    data() {
      return {
        form: {
          name: '',
          sex: '',
          studentId: '',
          passport: '',
          phone: '',
          email: '',
          roomType: '',
          bookingDate: ''
        },
        passportUrl: '',
        stuCardUrl: '',
        rules: {
          name: [{ required: true }],
          sex: [{ required: true }],
          passport: [{ required: true }],
          roomType: [{ required: true }],
          bookingDate: [{ required: true }],
          studentId: [
            {
              required: true,
              trigger: 'blur'
            },
            {
              validator: (ruleForm, value, callback) => {
                if (value === '') {
                  callback(new Error('StudentId cannot be empty'))
                } else if (value.length > 16) {
                  callback(new Error('StudentId length cannot be over 16'))
                } else if (!Array.from(value).every(x => x >= 0 && x <= 9)) {
                  callback(new Error('StudentId must be number'))
                } else {
                  callback()
                }
              }
            }
          ],
          phone: [
            {
              required: true,
              trigger: 'blur'
            },
            {
              validator: (ruleForm, value, callback) => {
                if (value === '') {
                  callback(new Error('Phone cannot be empty'))
                } else if (value.length !== 11) {
                  callback(new Error('Phone length should be 11'))
                } else if (Array.from(value).some(x => x < '0' || x > '9')) {
                  callback(new Error('Phone must be number'))
                } else {
                  callback()
                }
              }
            }
          ],
          email: [
            {
              required: true,
              trigger: 'blur'
            },
            {
              type: 'email',
              message: 'Please input correct email address',
              trigger: 'blur, change'
            }
          ]
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7
          }
        }
      }
    },
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
                  }, 3000)
                } else {
                  done()
                }
              }
            })
          })
          .catch((err) => {
            console.log(err)
          })
      },
      handlePassportSuccess(res, file) {
        this.passportUrl = URL.createObjectURL(file.raw)
      },
      handleStuCardSuccess(res, file) {
        this.stuCardUrl = URL.createObjectURL(file.raw)
      },
      beforePhotoUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('Upload image only JPG format!')
        }
        if (!isLt2M) {
          this.$message.error('Upload image could not over 2MB size!')
        }
        return isJPG && isLt2M
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const addHours = (d, h) => new Date(d.getTime() + (h * 60 * 60 * 1000))
            this.form.bookingDate = addHours(this.form.bookingDate, 8)
            this.$http
              .post('/be/api/booking', this.form)
              .then(res => {
                this.$msgbox({
                  type: 'success',
                  title: 'Successful!',
                  message: 'Submitted!'
                })
              })
              .catch(err => {
                console.error(err)
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
  #booking-form {
    display: flex;

    .content {
      text-align: center;
      margin: 4% 24%;
    }
  }
</style>
