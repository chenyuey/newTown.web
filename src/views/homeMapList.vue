<template>
  <layout>
    <el-button type="primary" @click="showNewTownDialog" class="right-position-btn">新建民宿</el-button>
    <el-table :data="homeMapList" style="width: 100%">
      <el-table-column label="封面">
        <template slot-scope="scope">
          <div style="display: flex">
            <img :src="scope.row.cover_link" style="width: 60px;height: 60px">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="民宿标题"></el-table-column>
      <el-table-column prop="coordinate.longitude" label="经度"></el-table-column>
      <el-table-column prop="coordinate.latitude" label="纬度"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="editNewHome(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteMessageBox(scope.row.objectId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10,20]"
      :page-size="20"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin: 10px"
    ></el-pagination>

    <add-home-map
      v-on:sendHomeMapInfo="createNewHome"
      :is-show.sync="isOnCreateNewTown"
      :all_towns="townList"
      :townInfo="editHomeItem"
      :is-new="is_new_home"
    ></add-home-map>
  </layout>
</template>

<script>
import layout from '../components/layout'
import AddHomeMap from '../components/addHomeMap'
export default {
  name: 'homeMapList',
  components: { layout, AddHomeMap },
  data() {
    return {
      pagesize: 20,
      total: 0,
      currentPage: 1,
      homeMapList: [
        {
          cover_link:
            'https://img.yzcdn.cn/upload_files/2019/03/14/FpDBi7GG27pJGrSxa9MgLz6TcVxQ.png?imageView2%2F2%2Fw%2F730%2Fh%2F0%2Fq%2F75%2Fformat%2Fpng',
          name: '🏠 黄山店村',
          coordinate: '(28,119)',
          link:
            'https://shop7188993.youzan.com/wscshop/showcase/feature?alias=QfTeOa93UT&banner_id=f.6996825~swipe~1~TclOVDmb&index=0&reft=1554690041423&spm=f.78280629',
          description:
            '长沙出发1h，国内赏樱新去处，建筑大师亲自设计文化园，有山有水近郊避世小镇'
        }
      ],
      isOnCreateNewTown: false,
      townList: [],
      editHomeItem: { coordinate: {} },
      is_new_home: true
    }
  },
  mounted() {
    this.getHomeMapList()
    this.getTownList()
  },
  methods: {
    getHomeMapList() {
      var townMapQuery = new this.$parse.Query('HomeMap')
      townMapQuery.find().then(result => {
        console.log(result.map(item => item.toJSON()))
        this.homeMapList = result.map(item => item.toJSON())
        this.total = this.homeMapList.length
      })
    },
    getTownList() {
      var townMapQuery = new this.$parse.Query('TownMap')
      townMapQuery.find().then(result => {
        console.log(result.map(item => item.toJSON()))
        this.townList = result.map(item => item.toJSON())
      })
    },
    showNewTownDialog() {
      this.isOnCreateNewTown = true
      this.is_new_home = true
      // this.editHomeItem = {coordinate:{}};
    },
    createNewHome() {
      this.getHomeMapList()
    },
    deleteNewHome(objectId) {
      var townMapQuery = new this.$parse.Query('HomeMap')
      townMapQuery.equalTo('objectId', objectId)
      townMapQuery.find().then(result => {
        if (result.length > 0) {
          result[0].destroy().then(
            myObject => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getHomeMapList()
            },
            error => {
              this.$message({
                type: 'success',
                message: '删除失败!'
              })
            }
          )
        }
      })
    },
    editNewHome(row) {
      console.log('编辑' + row)
      this.isOnCreateNewTown = true
      this.editHomeItem = row
      this.is_new_home = false
    },
    deleteMessageBox(objectId) {
      this.$confirm('此操作将永久删除该民宿, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteNewHome(objectId)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    goToNewPage(key, keyPath) {
      console.log(keyPath)
      console.log(key)
      this.$router.push(key)
    },
    handleSizeChange(val) {
      this.pagesize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    }
  }
}
</script>

<style scoped>
</style>
