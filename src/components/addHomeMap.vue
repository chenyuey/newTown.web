<template>
  <div>
    <el-dialog title="新建民宿" :visible.sync="isShow">
      <div class="addTask">
        <el-form  label-width="80px" :model="townInfo">
          <el-form-item label="民宿名称" >
            <el-input v-model="townInfo.name"  placeholder="请输入民宿名称"></el-input>
          </el-form-item>
          <el-form-item label="封面url" >
            <el-input v-model="townInfo.cover_link"  placeholder="请输入民宿封面url"></el-input>
          </el-form-item>
          <el-form-item label="链接url" >
            <el-input v-model="townInfo.link"  placeholder="请输入民宿链接"></el-input>
          </el-form-item>
          <el-form-item label="经纬度" >
            <el-input v-model="townInfo.coordinate.longitude"  placeholder="请输入经度"></el-input>
            <el-input v-model="townInfo.coordinate.latitude"  placeholder="请输入纬度"></el-input>
          </el-form-item>
          <el-form-item label="民宿描述">
            <el-input type="textarea" v-model="townInfo.description" placeholder="请输入简介"></el-input>
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
      townInfo: {
        type: Object,
        default: function () {
          return {coordinate:{}}
        }
      },
    },
    data() {
      return {
        classList: []
      }
    },
    methods:{
      saveNewTownInfo(){
        console.log("保存小镇信息")
        this.isShow = false;
        const TownMap = this.$parse.Object.extend("HomeMap");
        const townMap = new TownMap();
        townMap.set("name", this.townInfo.name);
        townMap.set("cover_link", this.townInfo.cover_link);
        townMap.set("description", this.townInfo.description);
        townMap.set("link", this.townInfo.link);
        townMap.set("coordinate", new this.$parse.GeoPoint(Number(this.townInfo.coordinate.latitude),Number(this.townInfo.coordinate.longitude)));

        townMap.save()
          .then((townMapInfo) => {
            // Execute any logic that should take place after the object is saved.
            alert("新建成功");
            this.$emit("sendHomeMapInfo");

          }, (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
            console.log('Failed to create new object, with error code: ' + error.message)
          });

      }
    },
    watch: {
      isShow() {
        this.$emit('update:isShow', this.isShow)
      }
    }

  }
</script>
