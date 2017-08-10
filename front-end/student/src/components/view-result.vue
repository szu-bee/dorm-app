<template>
  <div id="view-result">
    <sidebar></sidebar>
    <div class="showcase">
      <h2>View booking result</h2>
      <input v-model="studentId"
        @keyup.enter="getResult(studentId)" 
        placeholder="Your studentId">
      <div class="icon">
        <icon-button @click="getResult(studentId)">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="40" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </icon-button>
      </div>
      <div v-model="result" class="info">{{ result }}</div>
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
        studentId: '',
        result: ''
      }
    },
    methods: {
      getResult(studentId) {
        if (!studentId) return
        if (studentId.toString().length < 10) {
          this.result = 'Student id could not be shorter than 10!'
        }
        if (typeof studentId !== 'number') {
          this.result = 'Number is required!'
        }
        this.$http.get(`/be/api/booking?studentid=${studentId}`)
          .then(res => {
            if (res.data === '已同意') {
              this.result = 'Manager had passed your booking!'
            } else if (res.data === '已驳回') {
              this.result = 'Manager had rejected your booking! You could apply again.'
            } else {
              this.result = 'Please wait for manager.'
            }
          })
          .catch(err => {
            if (err.response) {
              console.log(err.response)
              if (err.response.status === 404) {
                this.result = 'Student is not exsit! Please input correct student id!'
              } else {
                if (typeof studentId !== 'number') {
                  this.result = 'Number is required!'
                } else if (studentId.toString().length < 10) {
                  this.result = 'Student id could not be shorter than 10!'
                } else {
                  this.result = 'Server error!'
                }
              }
            }
          })
      }
    }
  }
</script>

<style lang="less" scoped>
  #view-result {
    display: flex;

    .showcase {
      position: relative;
      height: 40px;
      margin: 6% 30%;

      input {
        width: 100%;
        height: 100%;
        padding-left: 12px;
        border: 1px solid #bfcbd9;
        border-radius: 4px;
        outline: none;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);

        &:focus {
          border: 1.6px solid #20a0ff;
        }
      }

      .icon {
        position: absolute;
        top: 148px;
        right: 0;
        padding-right: 8px;
        &:hover {
          cursor: pointer;
        }

        button {
          width: 32px;
          padding: 0;
        }
      }

      .info {
        margin: 3em 0;
        color: red;
      }
    }

    h2 {
      margin: 2em 0 3em;
    }
  }
</style>
