<template>
  <div class="login-box">
    <el-dialog
      :visible.sync="show"
      width="360px"
      custom-class="login-dialog"
      :close-on-click-modal="false"
    >
      <div class="t1">Welcome</div>
      <component :is="curCom" @change="handleType" :default-username="username"></component>
      <footer class="t2">
        <i class="el-icon-coffee-cup icon"></i>. W Builder
      </footer>
    </el-dialog>
  </div>
</template>
<script>
import login from './components/login'
import register from './components/register'
export default {
  name: 'loginBox',

  components: {
    login,
    register
  },

  props: {
    visible:{
      type: Boolean,
      default: false
    }
  },
 
  data () {
    return {
      show: this.visible,
      type: 'login',
      username: '',
    }
  },

  computed: {
    curCom(){
      switch (this.type) {
        case 'login':
          return login
          break;
        case 'register':
          return register
          break;
      }
    }
  },

  watch: {
    visible(isShow){
      this.show = isShow;
    },

    show(isShow){
      this.$emit('update:visible', isShow)
    }
  },

  methods: {
    handleType(type, username){
      this.type = type;
      this.username = username;
    }
  }
 
}
</script>
<style lang='scss' scoped>
.login-box{

  .t1{
    color: $mainC;
    text-align: center;
    font-size: 40px;
    margin-bottom: 32px;
  }

  .t2{
    text-align: center;
    padding-top: 50px;
    position: relative;
    top: 20px;
    color: #cecece;
    font-size: 12px;
  }

}

</style>