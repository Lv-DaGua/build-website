<template>
  <div class="register">
    <div class="title">—— 注 册 ——</div>
    <el-form ref="form" :model="form">
      <el-form-item>
        <el-input class="input" placeholder="请输入手机号" v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input class="input" type="password" placeholder="请输入密码" v-model="form.pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input class="input" type="password" placeholder="再次确认密码" v-model="form.repwd"></el-input>
      </el-form-item>
      <div>
        <el-button class="btn" round @click="handleRegister" :loading="loading">注 册</el-button>
      </div>
      <div class="bottom">
        <span>已有账号？<span class="text-btn" @click="toLogin()">直接登录</span></span>
      </div>
    </el-form>
  </div>
</template>
<script>
import { register } from '@/api/user'
export default {
  name: 'register',
 
  data () {
    return {
      loading: false,
      form: {
        account: '',
        pwd: '',
        repwd: ''
      } 
    }
  },

  methods: {
    toLogin(name = ''){
      this.$emit('change', 'login', name);
    },

    async handleRegister(){
      const data = {
        username: this.form.account,
        password: this.form.pwd
      }
      this.loading = true;
      const res = await register(data);
      this.loading = false;      
      if(res.code === 10000){
        this.$message.success('注册成功');
        this.toLogin(res.data.username);
      }      
    }
  }
 
}
</script>
<style lang="scss">
.register{
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
.register{
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