<template>
  <div>
    <el-button type="primary" @click="showNewTownDialog">新建民宿</el-button>
    <el-table
      :data="townMapList"
      style="width: 100%">

      <el-table-column
        label="封面"
      >
        <template slot-scope="scope">
          <div style="display: flex">
            <img :src="scope.row.cover_link" style="width: 60px;height: 60px"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="民宿标题"
      >
      </el-table-column>
      <el-table-column
        prop="coordinate.longitude"
        label="经度"
      >
      </el-table-column>
      <el-table-column
        prop="coordinate.latitude"
        label="纬度"
      >
      </el-table-column>
      <el-table-column
        prop="link"
        label="链接地址">
      </el-table-column>
      <el-table-column
        prop="description"
        label="民宿描述">
      </el-table-column>
    </el-table>

    <add-home-map  v-on:sendHomeMapInfo="createNewHome" :is-show.sync="isOnCreateNewTown"  ></add-home-map>
  </div>


</template>

<script>
  import AddNewTown from "../components/addNewTown";
  import AddHomeMap from "../components/addHomeMap";
  export default {
    name: "townMapList",
    components: {AddHomeMap, AddNewTown},
    data(){
      return{
        townMapList:[{
          cover_link:"https://img.yzcdn.cn/upload_files/2019/03/14/FpDBi7GG27pJGrSxa9MgLz6TcVxQ.png?imageView2%2F2%2Fw%2F730%2Fh%2F0%2Fq%2F75%2Fformat%2Fpng",
          name:"🏠 黄山店村",
          coordinate:"(28,119)",
          link:"https://shop7188993.youzan.com/wscshop/showcase/feature?alias=QfTeOa93UT&banner_id=f.6996825~swipe~1~TclOVDmb&index=0&reft=1554690041423&spm=f.78280629",
          description:"长沙出发1h，国内赏樱新去处，建筑大师亲自设计文化园，有山有水近郊避世小镇"
        }],
        isOnCreateNewTown: false,
      }
    },
    mounted(){
      this.getTownMapList();
    },
    methods:{
      getTownMapList(){
        var townMapQuery = new this.$parse.Query("HomeMap");
        townMapQuery.find().then((result)=> {
          console.log(result.map(item=>item.toJSON()))
          this.townMapList = result.map(item=>item.toJSON());
        })
      },
      showNewTownDialog(){
        this.isOnCreateNewTown = true;
      },
      createNewHome(){
        this.getTownMapList();
      }
    }

  }

</script>

<style scoped>

</style>
