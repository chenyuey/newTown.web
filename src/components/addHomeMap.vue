<template>
  <div>
    <el-dialog title="新建民宿" :visible.sync="isShow">
      <div class="addTask">
        <el-form label-width="80px" :model="townInfo">
          <el-form-item label="链接url">
            <el-input
              v-model="townInfo.link"
              @blur="autoFetchData"
              placeholder="请输入民宿链接"
              ref="townLink"
            ></el-input>
          </el-form-item>
          <el-form-item label="民宿名称">
            <el-input v-model="townInfo.name" placeholder="请输入民宿名称"></el-input>
          </el-form-item>
          <el-form-item label="封面url">
            <el-input v-model="townInfo.cover_link" placeholder="请输入民宿封面url"></el-input>
          </el-form-item>
          <el-form-item label="经纬度">
            <el-input v-model="townInfo.coordinate.longitude" placeholder="请输入经度"></el-input>
            <el-input v-model="townInfo.coordinate.latitude" placeholder="请输入纬度"></el-input>
          </el-form-item>

          <el-form-item>
            <baidu-map class="map" @ready="handler" :zoom="zoom" :center="center"></baidu-map>
          </el-form-item>

          <el-form-item label="民宿描述">
            <el-input type="textarea" v-model="townInfo.description" placeholder="请输入简介"></el-input>
          </el-form-item>
          <el-form-item label="所属小镇">
            <el-select v-model="townInfo.nearby_towns" multiple placeholder="请选择">
              <el-option
                v-for="item in all_towns"
                :key="item.name"
                :label="item.name"
                :value="item.objectId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveNewTownInfo">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    isNew: {
      type: Boolean,
      default: true
    },
    townInfo: {
      type: Object,
      default: function() {
        return { coordinate: {}, nearby_towns: [] }
      }
    },
    all_towns: {
      type: Object,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      classList: [],
      townInfo: this.townInfo,
      center: { lng: 0, lat: 0 },
      zoom: 0
    }
  },
  methods: {
    autoFetchData() {
      const url = this.$refs.townLink.$refs.input.value
      const id = url.split('/').pop()

      this.$parse.Cloud.run('getYZItem', { item_id: id })
        .then(res => {
          const data = res.response.item
          this.townInfo = {
            ...this.townInfo,
            name: data.title,
            description: data.summary,
            cover_link: data.pic_thumb_url
          }
          this.$forceUpdate()
        })
        .catch(err => {
          console.log(err)
        })
    },
    saveNewTownInfo() {
      console.log('保存小镇信息')
      console.log(this.townInfo)

      this.isShow = false
      const TownMap = this.$parse.Object.extend('HomeMap')
      var townMap
      if (this.isNew == true) {
        townMap = new TownMap()
      } else {
        townMap = TownMap.createWithoutData(this.townInfo.objectId)
      }
      townMap.set('name', this.townInfo.name)
      townMap.set('cover_link', this.townInfo.cover_link)
      townMap.set('description', this.townInfo.description)
      townMap.set('link', this.townInfo.link)
      var acl = new this.$parse.ACL()
      acl.setReadAccess(this.$parse.User.current(), true)
      acl.setWriteAccess(this.$parse.User.current(), true)
      townMap.setACL(acl)
      townMap.set(
        'coordinate',
        new this.$parse.GeoPoint(
          Number(this.townInfo.coordinate.latitude),
          Number(this.townInfo.coordinate.longitude)
        )
      )
      townMap.set('nearby_towns', this.townInfo.nearby_towns)
      townMap.save().then(
        townMapInfo => {
          // Execute any logic that should take place after the object is saved.
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.$emit('sendHomeMapInfo')
        },
        error => {
          // Execute any logic that should take place if the save fails.
          // error is a Parse.Error with an error code and message.
          alert('Failed to create new object, with error code: ' + error.message)
          console.log('Failed to create new object, with error code: ' + error.message)
        }
      )
    },
    handler({ BMap, map }) {
      let lng = this.townInfo.coordinate.longitude
      let lat = this.townInfo.coordinate.latitude
      this.center = { lng, lat }
      this.zoom = 15
      let point = new BMap.Point(lng, lat)
      map.addOverlay(new window.BMap.Marker(point))
    }
  },
  watch: {
    isShow() {
      this.$emit('update:isShow', this.isShow)
    }
  }
}
</script>

<style>
.map {
  width: 100%;
  height: 300px;
}
</style>
