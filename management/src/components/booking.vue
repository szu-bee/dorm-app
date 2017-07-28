<template>
  <div id="booking">
    <nav-bar></nav-bar>
    <h1>学生申请记录</h1>
    <div class="buttons-aside">
      <a href="/be/api/booking/booking.csv" download>
        <el-button size="small" type="success" icon="document">
          导出文件
        </el-button>
      </a>
    </div>

    <el-table :data="tableData" stripe border height="660">
      <el-table-column label="房间类型" width="96">
        <template scope="scope">
          <div :contenteditable="scope.row.editable" :id="scope.$index + '_roomType'">
            {{ scope.row.roomType }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="姓名" width="280">
        <template scope="scope">
          <div :contenteditable="scope.row.editable" :id="scope.$index + '_name'">
            {{ scope.row.name }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="性别" width="80">
        <template scope="scope">
          <div :contenteditable="scope.row.editable" :id="scope.$index + '_sex'">
            {{ scope.row.sex }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="学号" width="120">
        <template scope="scope">
          <div :contenteditable="scope.row.editable" :id="scope.$index + '_studentId'">
            {{ scope.row.studentId }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="护照号码" width="120">
        <template scope="scope">
          <div :contenteditable="scope.row.editable" :id="scope.$index + '_passport'">
            {{ scope.row.passport }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="手机" width="160">
        <template scope="scope">
          <div :contenteditable="scope.row.editable" :id="scope.$index + '_phone'">
            {{ scope.row.phone }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="邮箱" width="220">
        <template scope="scope">
          <div :contenteditable="scope.row.editable" :id="scope.$index + '_email'">
            {{ scope.row.email }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="预计入住时间" width="160">
        <template scope="scope">
          <div :contenteditable="scope.row.editable" :id="scope.$index + '_bookingDate'">
            {{ scope.row.bookingDate.slice(0, 10) }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" width="176">
        <template scope="scope">
          <el-button @click.native.prevent="handleAgreement(scope.row)" 
            size="small">
            {{ scope.row.agreeStatus }}
          </el-button>
          <el-button @click.native.prevent="handleRevoke(scope.row)" 
            size="small" type="danger">
            撤消
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
  import navBar from './nav-bar.vue'
  import _ from 'lodash'

  export default {
    components: {
      navBar
    },
    data() {
      return {
        tableData: []
      }
    },
    created() {
      this.$http
        .get('/be/api/booking')
        .then(res => {
          this.tableData = res.data.map(ele => {
            console.log(ele)
            ele.agreeStatus = !ele.agreeStatus ? '同意 / 驳回' : ele.agreeStatus
            return ele
          })
        })
        .catch(err => {
          alert('Fail to fetch bookings')
          console.error(err)
        })
    },
    methods: {
      handleAgreement(row) {
        if (row.agreeStatus !== '同意 / 驳回') {
          return
        }
        this.$msgbox({
          title: '提示',
          message: '请选择同意或驳回学生申请',
          showCancelButton: true,
          confirmButtonText: '同意',
          cancelButtonText: '驳回',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            const replica = _.cloneDeep(row)
            if (action === 'confirm') {
              replica.agreeStatus = '已同意'
              this.$http
                .put('/be/api/booking', replica)
                .then(() => {
                  row.agreeStatus = '已同意'
                  console.log(row)
                  done()
                })
                .catch(err => {
                  this.$message({
                    type: 'error',
                    message: 'Fail to agree'
                  })
                  console.error(err)
                })
            } else {
              replica.agreeStatus = '已驳回'
              this.$http
                .put('/be/api/booking', replica)
                .then(() => {
                  row.agreeStatus = '已驳回'
                  done()
                })
                .catch(err => {
                  this.$message({
                    type: 'error',
                    message: 'Fail to reject'
                  })
                  console.error(err)
                })
            }
          }
        })
      },
      handleRevoke(row) {
        if (row.agreeStatus === '同意 / 驳回') {
          return
        }
        const replica = _.cloneDeep(row)
        replica.agreeStatus = '同意 / 驳回'
        this.$http
          .put('/be/api/booking', replica)
          .then(res => {
            row.agreeStatus = '同意 / 驳回'
            console.log(res)
          })
          .catch(err => {
            console.error(err)
          })
      }
    }
  }
</script>

<style lang="less" scoped>
  #booking {
    h1 {
      margin: 12px 0;
    }

    .buttons-aside {
      float: right;
      margin: 0 4px 8px;
    }
  }
</style>
