<template>
  <div>
    <div class="login-container">
      <div class="login-title">登录</div>
      <div class="login-row">
        <el-input placeholder="用户名" v-model="userInfo.username"></el-input>
      </div>
      <div class="login-row">
        <el-input placeholder="密码"  v-model="userInfo.password" type="password"></el-input>
      </div>
      <div class="login-row login-action">
        <el-button type="primary" class="big-button" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Login",
      data() {
        return {
          userInfo: {
            username:'',
            password:'',
          }
        }
      },
      methods: {
        login() {
          /*登录*/
          if(this.userInfo.username==''||this.userInfo.password==''){
            this.$message.error('请输入帐号密码');
          }else{
            console.log(this.userInfo.username,this.userInfo.password)
            this.$parse.User.logIn(this.userInfo.username,this.userInfo.password).then((data)=>{
              // this.$user.save(this.userInfo.username);
              this.$router.push('/townMapList');
            },  (error)=> {
              this.$message.error('帐号密码错误');
            });
          }
        }
      },
    }
</script>

<style scoped>


  .login-container {
    margin: 96px auto 0px auto;
    width: 430px;
    text-align: center;
    border: 1px solid rgba(187, 187, 187, 1);
    padding: 40px;
    /*background: red;*/
  }

  .login-title {
    margin: auto;
    color: rgba(16, 16, 16, 1);
    font-size: 20px;
  }

  .login-row {
    margin: 20px 0;
  }

  .login-action {
    margin-top: 50px;
  }

  .big-button {
    width: 100%;
    margin: auto;
  }

  @media (max-width: 500px) {/*宽度不大于1000px时, 隐藏右边侧栏*/
    .login-container {
      margin: 96px auto ;
      width: 100%;
      text-align: center;
      border: 1px solid rgba(187, 187, 187, 1);
      padding: 40px;
      box-sizing: border-box;
    }
  }


</style>


