<template>
  <div class="nav-build-DIY">
    <section class="container">
      <div class="icon-box">
        <img class="icon" src="../../assets/computer.png" alt="">
        <el-carousel class="carousel" height="288px">
          <el-carousel-item v-for="item in list" :key="item">
            <img style="width:100%" :src="item" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="txt">
        <h1 class="h">欢迎使用自定义建站</h1>
        <p>多种组件任意搭建</p>
        <p>样式随你调控</p>
        <p>点击下方按钮开始创作吧</p>
        <div class="pan-btn green-btn btn" @click="handleToDiy">开始 搭建</div>
      </div>
    </section>
  </div>
</template>
<script>
import { uploadImg } from '@/api/buildingDiy'
export default {
  name: 'navBuildDIY',

  data(){
    return{
      list: [
        require('@/assets/car03.png'),
        require('@/assets/car01.png'),
        require('@/assets/car02.png'),
      ]
    }
  },
 
  methods: {
    handleToDiy(){
      this.$router.push({path: '/buildingDiy'});
    },
  }
 
}
</script>
<style lang="scss">
.nav-build-DIY .carousel .el-carousel__arrow{
  display: none;
}
</style>
<style lang='scss' scoped>
.nav-build-DIY{
  .container{
    // text-align: center;
    position: relative;
    top: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: -32px;

    .icon-box{
      position: relative;
      .icon{
        width: 610px;
        // margin-right: 90px;
      }
      .carousel{
        position: absolute;
        width: 437px;
        top: 16px;
        left: 66px;
        height: 288px;
        overflow: hidden;
      }
    }
    .txt{
      text-align: right;
      margin-top: -60px;
      .h{
        font-size: 30px;
        font-weight: 400;
        margin-bottom: 16px;
        margin-right: -32px;
        color: $fc0;
      }
      p{
        margin-bottom: 8px;
        font-size: 16px;
        color: $fc2;
        // padding-left: 16px;
      }
      .btn{
        margin-top: 8px;
        //  margin-left: 16px;
      }
    }
  }
}
</style>