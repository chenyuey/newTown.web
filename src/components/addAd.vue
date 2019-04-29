<template>
    <div>
      <el-dialog title="新建广告" :visible.sync="isShow">
        <div class="addTask">
          <el-form  label-width="80px" :model="adInfo">
            <el-form-item label="广告图片" prop="adImage">
              <picture-input ref="adImage" @change="onAdImageChange"
                             :prefill="adInfo.adImage.url"
                             width="130" height="130" margin="16"
                             accept="image/jpeg,image/png,image/jpg" size="10" buttonClass="btn"></picture-input>
              <div>（备注：请上传png、jpg、jpeg类型图片）</div>
            </el-form-item>
            <el-form-item label="是否展示" >
              <el-switch
                v-model="adInfo.isOnline"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveNewAdInfo">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  <script>
    import PictureInput from '../components/PictureInput.vue'
    export default {
      name: "addAd",
      props: {
        isShow: {
          type: Boolean,
          default: false
        },
        isNew:{
          type: Boolean,
          default: true
        },
        adInfo: {
          type: Object,
          default: function () {
            return {}
          }
        },
      },
      components: {
        PictureInput,
      },
      data() {
        return {
        }
      },
      methods:{
        saveNewAdInfo(){
          console.log("保存小镇信息")
          this.isShow = false;
          const Advertisement = this.$parse.Object.extend("Advertisement");
          var advertise;
          if (this.isNew == true){
            advertise = new Advertisement();
          } else {
            advertise = Advertisement.createWithoutData(this.townInfo.objectId);
          }
          advertise.set("isOnline", this.adInfo.isOnline);
          advertise.set("adImage", this.adInfo.adImage);

          advertise.save()
            .then((advertInfo) => {
              // Execute any logic that should take place after the object is saved.
              this.$message({
                type: 'success',
                message: '保存成功!'
              });
              this.$emit('sendAdInfo');

            }, (error) => {
              // Execute any logic that should take place if the save fails.
              // error is a Parse.Error with an error code and message.
            });
        },
        onAdImageChange(){
          var base64 = this.$refs.adImage.image;
          var file = new this.$parse.File("ad.png", { base64: base64 });
          console.log(this.$refs.adImage.image)
          this.adInfo.adImage = file;
        }
      },
      watch: {
        isShow() {
          console.log('===sdf=====')
          this.$emit('update:isShow', this.isShow)

        }
      }

    }
  </script>

