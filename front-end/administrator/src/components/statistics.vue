<template>
  <div id="statistics">
    <nav-bar></nav-bar>
    <div class="columns">
      <div class="left-column">
        <h2>按国籍统计</h2>
        <el-table :data="countryStat" stripe border>
          <el-table-column label="国籍" width="200">
            <template scope="scope">
              <div :id="scope.$index + '_country'">
                {{ scope.row.country }}
              </div>
            </template>
          </el-table-column>

          <el-table-column label="人数" width="80">
            <template scope="scope">
              <div :id="scope.$index + '_countryPersonNum'">
                {{ scope.row.countryPersonNum }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="right-column">
        <h2>按性别统计</h2>
        <el-table :data="sexStat" stripe border>
          <el-table-column label="性别" width="80">
            <template scope="scope">
              <div :id="scope.$index + '_sex'">
                {{ scope.row.sex }}
              </div>
            </template>
          </el-table-column>

          <el-table-column label="人数" width="80">
            <template scope="scope">
              <div :id="scope.$index + '_sexPersonNum'">
                {{ scope.row.sexPersonNum }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
        countryStat: [],
        sexStat: []
      }
    },
    created() {
      this.$http
        .get('/be/api/living/statistics')
        .then(res => {
          let stat = res.data[0]
          for (let key of Object.keys(stat)) {
            this.countryStat.push({
              country: key,
              countryPersonNum: stat[key]
            })
          }
          this.countryStat.sort((a, b) => b.countryPersonNum - a.countryPersonNum)
          this.countryStat.unshift({
            country: '总计',
            countryPersonNum: this.countryStat.reduce((acc, v) => acc + v.countryPersonNum, 0)
          })

          stat = res.data[1]
          for (let key of Object.keys(stat)) {
            this.sexStat.push({
              sex: key,
              sexPersonNum: stat[key]
            })
          }
          this.sexStat.sort((a, b) => b.sexStat - a.sexStat)
          this.sexStat.unshift({
            sex: '总计',
            sexPersonNum: this.sexStat.reduce((acc, v) => acc + v.sexPersonNum, 0)
          })
        })
        .catch(err => {
          this.$message.error('获取数据失败！')
          console.error(err)
        })
    }
  }
</script>

<style>
  h2 {
    margin: 12px 0;
  }

  .columns {
    display: flex;
    justify-content: center;
  }

  .left-column {
    margin-right: 3em;
  }
</style>
