<template>
  <div style="margin: 20px">
    username:
    <input type="text" v-model="user.username">
    email:
    <input type="text" v-model="user.email">
    <input type="button" value="Test" @click="handleChange">
  </div>
</template>

<script>
export default {
  name: 'test',
  data() {
    return {
      user: {
        username: '',
        email: ''
      }
    }
  },
  methods: {
    handleChange: function() {
      this.user.username = 'xnng'
    }
  }
}
</script>

<style scoped>
</style>
