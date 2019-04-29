<template>
  <div class="left-aside">
    <div class="l-aside l-aside-left">
      <el-menu
        @select="handleOpen"
        :default-active="actionPage"
        class="l-aside-left-menu">

        <el-menu-item index="TownMapList">
          <i class="el-icon-location-outline"></i>
          <span slot="title">地图信息设置</span>
        </el-menu-item>
        <el-menu-item index="advertisementList">
          <i class="el-icon-tickets"></i>
          <span slot="title">App启动图设置</span>
        </el-menu-item>
      </el-menu>
    </div>

    <div class="l-aside l-aside-right">
      <div class="l-aside-left-title">
        {{asideTitle[actionPage]}}
      </div>
      <el-menu
        @select="handleOpen"
        :default-active="pageUrl">
        <el-menu-item v-for="good in asideList[actionPage]" :key="good.index" :index="good.index">
          <span>{{good.value}}</span>
        </el-menu-item>
      </el-menu>

    </div>


  </div>
</template>

<script>
  export default {
    props: {
      actionPage: {
        default: 'TownMapList'
      },
      pageUrl: {
        default: 'TownMapList'
      }
    },
    data() {
      return {
        asideList: {
          advertisementList: [{index: 'advertisementList', value: 'App启动图设置'}],
          TownMapList: [{index: 'TownMapList', value: '小镇'},{index: 'homeMapList', value: '住宿'}],
        },
        asideTitle: {
          TownMapList: '地图信息设置',
          advertisementList: 'App启动图设置',
        }
      }

    },
    mounted: function () {
    },
    methods: {
      handleOpen: function (key) {
        this.$router.push('/' + key)
      }

    }

  }
</script>
