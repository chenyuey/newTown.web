<template>
  <div class="l-page">
    <el-container class="l-main">
      <!--<m-sider actionPage="advertisementList" pageUrl="advertisementList"></m-sider>-->

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
        <el-button type="primary" @click="showNewTownDialog" class="right-position-btn">新建广告</el-button>
        <el-table :data="adList" style="width: 100%;overflow:scroll">
          <el-table-column label="启动页图片">
            <template slot-scope="scopeTmpImage">
              <div style="display: flex;">
                <img
                  :src="scopeTmpImage.row.adImage.url"
                  style="width: 120px;height: 130px ; border: 1px solid gray"
                >
              </div>
            </template>
          </el-table-column>

          <el-table-column label="上线状态">
            <template slot-scope="scopeTmpSwitch">
              <div style="display: flex">
                <el-switch
                  v-model="scopeTmpSwitch.row.isOnline"
                  @change="updateOnlineStatus(scopeTmpSwitch.row)"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                ></el-switch>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!--<el-button type="success" size="small" @click="editNewAd(scope.row)">编辑-->
              <!--</el-button>-->
              <el-button type="danger" size="small" @click="deleteMessageBox(scope.row.objectId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <add-ad
          v-on:sendAdInfo="createNewAd"
          :is-show.sync="isOnCreateNewAd"
          :adInfo="editAdItem"
          :is-new="is_new_ad"
        ></add-ad>
      </div>
    </el-container>
  </div>
</template>

<script>
import AddAd from '../components/AddAd'
import Sider from '../components/Sider.vue'
export default {
  name: 'adList',
  components: { AddAd, 'm-sider': Sider },
  data() {
    return {
      adList: [],
      isOnCreateNewAd: false,
      editAdItem: { adImage: { url: '' } },
      is_new_ad: true
    }
  },
  mounted() {
    this.getAdvertisementList()
  },
  methods: {
    getAdvertisementList() {
      var townMapQuery = new this.$parse.Query('Advertisement')
      townMapQuery.find().then(result => {
        console.log(result.map(item => item.toJSON()))
        let adList = result.map(item => item.toJSON())
        this.adList = adList
      })
    },
    showNewTownDialog() {
      this.isOnCreateNewAd = true
      this.is_new_ad = true
    },
    createNewAd() {
      this.getAdvertisementList()
    },
    deleteNewAd(objectId) {
      var townMapQuery = new this.$parse.Query('Advertisement')
      townMapQuery.equalTo('objectId', objectId)
      townMapQuery.find().then(result => {
        if (result.length > 0) {
          result[0].destroy().then(
            myObject => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getAdvertisementList()
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
    editNewAd(row) {
      console.log('编辑' + row)
      this.isOnCreateNewAd = true
      this.editAdItem = row
      this.is_new_ad = false
    },
    updateOnlineStatus(row) {
      console.log(row)
      const Advertisement = this.$parse.Object.extend('Advertisement')
      var advertise = Advertisement.createWithoutData(row.objectId)
      advertise.set('isOnline', row.isOnline)
      advertise.save().then(advertInfo => {}, error => {})
    },
    deleteMessageBox(objectId) {
      this.$confirm('此操作将永久删除该启动图, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteNewAd(objectId)
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
  },
  watch: {
    isOnCreateNewAd() {
      console.log('isOnCreateNewAd', this.isOnCreateNewAd)
    }
  }
}
</script>

<style scoped>
</style>
