<template>
  <div class="l-page">
    <el-container class="l-main">
      <!--<m-sider actionPage="TownMapList" pageUrl="HomeMapList"></m-sider>-->
      <el-col :span="4" style="height: 100%; background-color:#545c64">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="goToNewPage"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>地图信息设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/">小镇</el-menu-item>
              <el-menu-item index="/homeMapList">住宿</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/advertisementList">
            <i class="el-icon-menu"></i>
            <span slot="title">App启动图设置</span>
          </el-menu-item>
        </el-menu>
      </el-col>

      <div style="width: 100%">
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
          <el-table-column :show-overflow-tooltip="true" prop="link" label="链接地址"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="description" label="民宿描述"></el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="success" size="small" @click="editNewHome(scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="deleteMessageBox(scope.row.objectId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <add-home-map
          v-on:sendHomeMapInfo="createNewHome"
          :is-show.sync="isOnCreateNewTown"
          :all_towns="townList"
          :townInfo="editHomeItem"
          :is-new="is_new_home"
        ></add-home-map>
      </div>
    </el-container>
  </div>
</template>

<script>
import AddHomeMap from '../components/addHomeMap'
import Sider from '../components/Sider.vue'
export default {
  name: 'homeMapList',
  components: { AddHomeMap, 'm-sider': Sider },
  data() {
    return {
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
    }
  }
}
</script>

<style scoped>
</style>
