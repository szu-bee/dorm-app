<template>
  <div id="living">
    <nav-bar></nav-bar>
    <h1>留学生楼入住登记表</h1>

    <div class="buttons-aside">
      <el-button @click.native.prevent="pushRow()" size="small" type="primary" icon="plus">
        添加
      </el-button>
      <a href="/be/api/living/living.csv" download>
        <el-button size="small" type="success" icon="document">
          导出文件
        </el-button>
      </a>
    </div>

    <el-table v-loading.body="loading"
      element-loading-text="拼命加载中"
      :data="tableData" stripe border height="660" 
      :default-sort="{prop: 'date', order: 'descending'}">
      <el-table-column label="房号" width="100" prop="room" sortable>
        <template scope="scope">
          <div :contenteditable="scope.row.editable" :id="scope.$index + '_room'">
            {{ scope.row.room }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="姓名" width="280" prop="name" sortable>
        <template scope="scope">
          <div :contenteditable="scope.row.editable" :id="scope.$index + '_name'">
            {{ scope.row.name }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="性别" width="70">
        <template scope="scope">
          <div :contenteditable="scope.row.editable" :id="scope.$index + '_sex'">
            {{ scope.row.sex }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="国籍" width="200">
        <template scope="scope">
          <div :contenteditable="scope.row.editable" :id="scope.$index + '_country'">
            {{ scope.row.country }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="学历" width="200">
        <template scope="scope">
          <div :contenteditable="scope.row.editable" :id="scope.$index + '_eduBackground'">
            {{ scope.row.eduBackground }}
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

      <el-table-column label="学号" width="120">
        <template scope="scope">
          <div :contenteditable="scope.row.editable" :id="scope.$index + '_studentId'">
            {{ scope.row.studentId }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="最新注册时间" width="160">
        <template scope="scope">
          <div :contenteditable="scope.row.editable" :id="scope.$index + '_regiDate'">
            {{ scope.row.regiDate }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="签证编号" width="120">
        <template scope="scope">
          <div :contenteditable="scope.row.editable" :id="scope.$index + '_visaId'">
            {{ scope.row.visaId }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="签证期限" width="100">
        <template scope="scope">
          <div :contenteditable="scope.row.editable" :id="scope.$index + '_visaDue'">
            {{ scope.row.visaDue }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="交换学生预订" width="220">
        <template scope="scope">
          <div :contenteditable="scope.row.editable" :id="scope.$index + '_bookRemark'">
            {{ scope.row.bookRemark }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="押金" width="150">
        <template scope="scope">
          <div :contenteditable="scope.row.editable" :id="scope.$index + '_deposit'">
            {{ scope.row.deposit }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="交费记录" width="660">
        <template scope="scope">
          <div :contenteditable="scope.row.editable" :id="scope.$index + '_paymentRecord'">
            {{ scope.row.paymentRecord }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="时间" width="180">
        <template scope="scope">
          <div :contenteditable="scope.row.editable" :id="scope.$index + '_endTime'">
            {{ scope.row.endTime }}
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

      <el-table-column label="操作" fixed="right" width="140">
        <template scope="scope">
          <el-button @click.native.prevent="handleRowEditable(scope.$index, scope.row)" size="small">
            {{ scope.row.status }}
          </el-button>
          <el-button @click.native.prevent="deleteRow(scope.$index, scope.row)" size="small" type="danger">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
        tableData: [],
        loading: true
      }
    },
    created() {
      this.$http
        .get('/be/api/living')
        .then(res => {
          this.tableData = res.data.map(ele => {
            ele.status = '编辑'
            return ele
          })
          this.loading = false
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
    methods: {
      pushRow() {
        const toPush = {
          room: '',
          name: '',
          sex: '',
          country: '',
          eduBackground: '',
          passport: '',
          studentId: '',
          regiDate: '',
          visaId: '',
          visaDue: '',
          bookRemark: '',
          deposit: '',
          paymentRecord: '',
          endTime: '',
          phone: '',
          editable: false,
          status: '编辑'
        }
        this.$http.post('/be/api/living', toPush)
          .then(res => {
            res.data.status = '编辑'
            this.tableData.push(res.data)
          })
          .catch(err => {
            this.$message.error('创建失败！')
            console.error(err)
          })
      },
      handleRowEditable(index, row) {
        if (row.status === '编辑') {
          row.editable = true
          row.status = '保存'
        } else {
          for (let key of Object.keys(row)) {
            const dom = document.getElementById(`${index}_${key}`)
            if (dom) {
              row[key] = dom.innerText
            }
          }
          this.$http
            .put('/be/api/living', row)
            .then(res => {
              row.editable = false
              row.status = '编辑'
              this.$message.success('保存成功！')
            })
            .catch(err => {
              this.$message.error('保存失败！')
              console.error(err)
            })
        }
      },
      deleteRow(index, row) {
        this.$msgbox({
          title: '提示',
          message: '删除后将无法恢复, 是否继续?',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              this.$http
                .delete(`/be/api/living?id=${row._id}`)
                .then(() => {
                  this.tableData.splice(index, 1)
                  this.$message.success('删除成功！')
                  done()
                })
                .catch(err => {
                  this.$message.error('删除失败！')
                  console.error(err)
                })
            } else {
              done()
            }
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  #living {
    h1 {
      margin: 12px 0;
    }

    .buttons-aside {
      float: right;
      margin: 0 4px 8px;
    }
  }
</style>
