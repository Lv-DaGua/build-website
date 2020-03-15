<template>
  <div class="index-page">
    <section class="bg">
      <header class="header">
        <div class="logo">W Builder</div>
        <div>
          <span @click="open = true;" class="login-btn"><i class="el-icon-user"></i></span>
        </div>
      </header>
      <div class="content">
        <div class="left">
          <div class="row1">
            <i class="el-icon-coffee-cup icon"></i>
            自由搭建
          </div>
          <div class="row2">
            Everyone can be a website builder
          </div>
          <div class="row3">
            <el-button class="start-btn" >立即开启</el-button>
          </div>
        </div>
        <div class="right">
          <img src="../../assets/home-bg.png" alt="">
        </div>
      </div>
    </section>

    <login-box :visible.sync="open"/>
  </div>
</template>
<script>
import loginBox from '@/views/login/index'
export default {
  name: 'indexPage',

  components: {
    loginBox
  },
 
  data () {
    return {
      open: false,
    }
  },
 
}
</script>
<style lang='scss' scoped>
$w: 800px;
.index-page{
  .bg{
    background: $mainC;
    min-height: 100px;
    color: #fff;
    padding-top: 24px;
  }

  .header{
    width: $w;
    margin: 0 auto 48px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo{
      // font-weight: bold;
      font-size: 28px;
    }
    .login-btn{
      display: block;
      border: 2px solid #fff;
      border-radius: 50%;
      width: 23px;
      height: 23px;
      text-align: center;
      line-height: 23px;
      font-size: 14px;
      cursor: pointer;
    }
  }

  .content{
    width: $w;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;

    .left{
      width: 400px;
      flex-shrink: 0;
      margin-right: 24px;
      padding-top: 30px;

      .row1{
        font-weight: bold;
        font-size: 38px;
        margin-bottom: 16px;
        .icon{
          color: #b99135;
        }
      }
      .row2{
        // font-weight: bold;
        font-size: 30px;
        margin-bottom: 16px;
      }
      .start-btn{
        background: #e93a5d;
        border-color: #e93a5d;
        color: #fff;
      }
    }

    .right{
      >img{
        width: 100%;
        height: 100%;
      }
    }
  }
  // #e93a5d 按钮红
  // #5f5f5f 字体浅色
}
</style>