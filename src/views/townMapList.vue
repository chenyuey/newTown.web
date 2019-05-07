<template>
  <layout>
    <el-button type="primary" @click="showNewTownDialog" class="right-position-btn">新建小镇</el-button>
    <el-table
      :data="townMapList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      style="width: 100%"
    >
      <el-table-column label="封面">
        <template slot-scope="scope">
          <div style="display: flex">
            <img :src="scope.row.cover_link" style="width: 60px;height: 60px">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="小镇标题"></el-table-column>
      <el-table-column prop="region" label="分类"></el-table-column>
      <el-table-column prop="coordinate.longitude" label="经度"></el-table-column>
      <el-table-column prop="coordinate.latitude" label="纬度"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="editNewTown(scope.row)">编辑</el-button>
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

    <add-new-town
      v-on:sendNewTownInfo="createNewTown"
      :is-show.sync="isOnCreateNewTown"
      :townInfo="editTownItem"
      :is-new="is_new_town"
    ></add-new-town>
  </layout>
</template>

<script>
import layout from '../components/layout'
import AddNewTown from '../components/addNewTown'
export default {
  name: 'townMapList',
  components: { layout, AddNewTown },
  data() {
    return {
      pagesize: 20,
      total: 0,
      currentPage: 1,
      townMapList: [
        {
          cover_link:
            'https://img.yzcdn.cn/upload_files/2019/03/14/FpDBi7GG27pJGrSxa9MgLz6TcVxQ.png?imageView2%2F2%2Fw%2F730%2Fh%2F0%2Fq%2F75%2Fformat%2Fpng',
          name: '🏠 黄山店村',
          region: '华中小镇',
          coordinate: '(28,119)',
          link:
            'https://shop7188993.youzan.com/wscshop/showcase/feature?alias=QfTeOa93UT&banner_id=f.6996825~swipe~1~TclOVDmb&index=0&reft=1554690041423&spm=f.78280629',
          description:
            '长沙出发1h，国内赏樱新去处，建筑大师亲自设计文化园，有山有水近郊避世小镇'
        }
      ],
      isOnCreateNewTown: false,
      editTownItem: { coordinate: {} },
      is_new_town: true
    }
  },
  mounted() {
    this.getTownMapList()
  },
  methods: {
    getTownMapList() {
      var townMapQuery = new this.$parse.Query('TownMap')
      townMapQuery.find().then(result => {
        console.log(result.map(item => item.toJSON()))
        this.townMapList = result.map(item => item.toJSON())
        this.total = this.townMapList.length
      })
    },
    showNewTownDialog() {
      this.isOnCreateNewTown = true
      this.is_new_town = true
      // this.editTownItem = {coordinate:{}};
      console.log('xinjian')
    },
    createNewTown() {
      this.getTownMapList()
    },
    enterHomeMapList() {
      this.$router.push('/homeMapList')
    },
    enterAdList() {
      this.$router.push('/advertisementList')
    },
    deleteNewTown(objectId) {
      var townMapQuery = new this.$parse.Query('TownMap')
      townMapQuery.equalTo('objectId', objectId)
      townMapQuery.find().then(result => {
        if (result.length > 0) {
          result[0].destroy().then(
            myObject => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getTownMapList()
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
    editNewTown(row) {
      console.log('编辑' + row)
      this.isOnCreateNewTown = true
      this.editTownItem = row
      this.is_new_town = false
    },
    deleteMessageBox(objectId) {
      this.$confirm('此操作将永久删除该小镇, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteNewTown(objectId)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    goToNewPage(key) {
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
