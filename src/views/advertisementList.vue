<template>
  <div>
    <el-button type="primary" @click="showNewTownDialog">新建广告</el-button>
    <el-table
      :data="adList"
      style="width: 100%">
      <el-table-column
        label="启动页图片"
      >
        <template slot-scope="scopeTmpImage">
          <div style="display: flex;">
          <img :src="scopeTmpImage.row.adImage.url" style="width: 60px;height: 130px ; border: 1px solid gray"/>
        </div>
        </template>
      </el-table-column>

      <el-table-column
        label="上线状态"
      >
        <template slot-scope="scopeTmpSwitch">
          <div style="display: flex">
            <el-switch
              v-model="scopeTmpSwitch.row.isOnline"
              @change="updateOnlineStatus(scopeTmpSwitch.row)"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </div>
        </template>


      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="editNewAd(scope.row)">编辑
          </el-button>
          <el-button type="success" size="small" @click="deleteNewAd(scope.row.objectId)">删除
          </el-button>

        </template>

      </el-table-column>
    </el-table>

    <add-ad  v-on:sendAdInfo="createNewAd" :is-show.sync="isOnCreateNewAd" :adInfo="editAdItem"  :is-new="is_new_ad"></add-ad>
  </div>
</template>

<script>
  import AddAd from "../components/AddAd";
  export default {
    name: "adList",
    components: {AddAd},
    data(){
      return{
        adList:[],
        isOnCreateNewAd: false,
        editAdItem:{adImage:{url:""}},
        is_new_ad:true,
      }
    },
    mounted(){
      this.getAdvertisementList();
    },
    methods:{
      getAdvertisementList(){
        var townMapQuery = new this.$parse.Query("Advertisement");
        townMapQuery.find().then((result)=> {
          console.log(result.map(item=>item.toJSON()))
          let adList = result.map(item=>item.toJSON());
          this.adList = adList
        })
      },
      showNewTownDialog(){
        this.isOnCreateNewAd = true;
        this.is_new_ad = true;
      },
      createNewAd(){
        this.getAdvertisementList();
      },
      deleteNewAd(objectId){
        var townMapQuery = new this.$parse.Query("Advertisement");
        townMapQuery.equalTo("objectId",objectId);
        townMapQuery.find().then((result)=> {
          if (result.length > 0){
            result[0].destroy().then((myObject) => {
              alert("删除成功");
              this.getAdvertisementList();
            }, (error) => {
              alert("删除失败"+error);
            });
          }
        })
      },
      editNewAd(row){
        console.log("编辑"+row);
        this.isOnCreateNewAd = true;
        this.editAdItem = row;
        this.is_new_ad = false;
      },
      updateOnlineStatus(row){
        console.log(row)
        const Advertisement = this.$parse.Object.extend("Advertisement");
        var advertise = Advertisement.createWithoutData(row.objectId);
        advertise.set("isOnline",row.isOnline);
        advertise.save()
          .then((advertInfo) => {
          }, (error) => {
          });

      }
    }
    ,watch:{
      isOnCreateNewAd(){
        console.log('isOnCreateNewAd',this.isOnCreateNewAd)
      }
    }

  }

</script>

<style scoped>

</style>
