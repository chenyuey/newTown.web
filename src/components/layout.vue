<template>
  <el-container>
    <el-aside width="250px" style="background-color:#545c64;min-height: 100vh">
      <el-menu
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        default-openeds="['1']"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>地图信息设置</span>
          </template>
          <el-menu-item index="/">小镇</el-menu-item>
          <el-menu-item index="/homeMapList">住宿</el-menu-item>
        </el-submenu>
        <el-menu-item index="/advertisementList">
          <i class="el-icon-menu"></i>
          <span slot="title">App启动图设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <slot/>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'layout',
  methods: {
    handleSelect(key) {
      this.$router.push(key)
    }
  },
  data() {
    return {
      currentPath: this.$router.history.current.path
    }
  },
  mounted() {
    console.log(this.$router.history.current.path)
  }
}
</script>

<style scoped>
/* 重写样式，删除菜单右边的那根线 */
.el-menu {
  border-right: none;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
}
</style>
