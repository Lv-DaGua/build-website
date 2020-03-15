<template>
  <div class="login">
    <div class="title">—— 登 录 ——</div>
    <el-form ref="form" :model="form">
      <el-form-item>
        <el-input class="input" placeholder="请输入账号" v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input class="input" placeholder="请输入密码" v-model="form.pwd"></el-input>
      </el-form-item>
      <div>
        <el-button class="btn" round>登 录</el-button>
      </div>
      <div class="bottom">
        <span>还没有账号？<span class="text-btn" @click="toRegister">去注册一个吧</span></span>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'login',
 
  data () {
    return {
      form: {
        account: '',
        pwd: ''
      }
    }
  },

  methods: {
    toRegister(){
      this.$emit('change', 'register');
    }
  }
 
}
</script>
<style lang="scss">
.login{
  .input .el-input__inner{
    border-radius: 30px;
    outline: none;
  }
  .input .el-input__inner:focus{
    border-color: #e2e5ea !important;
  }
}
</style>
<style lang='scss' scoped>
.login{
  padding: 0 28px;

  .title{
    color: #808080;
    text-align: center;
    margin-bottom: 16px;
    opacity: .7;
  }

  .btn{
    background: #223247;
    color: #fff;
    width: 100%;
    border-color: #223247;
  }

  .bottom{
    margin-top: 8px;
    color: #808080;
    font-size: 12px;
    .text-btn{
      cursor: pointer;
      color: #409eff;
    }
  }
}
</style>