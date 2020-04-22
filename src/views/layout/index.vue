<template>
  <div class="layout">
    <header class="header">
      <div class="container">
        <section class="logo">
          <div>W Builder</div>
        </section>
        <section class="nav">
          <el-menu 
            :default-active="path"
            :router="true"
            class="nav-menu" 
            mode="horizontal" 
            background-color="#223247"
            text-color="#fff"
            active-text-color="#fff"
            @select="handleSelect"
          >
            <el-submenu index="1">
              <template slot="title">开始搭建</template>
              <el-menu-item index="2-1">模板建站</el-menu-item>
              <el-menu-item index="/user/buildDiy">自定义建站</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">我的地盘</template>
              <el-menu-item index="/user/myWeb">我的作品</el-menu-item>
              <el-menu-item index="/user/myDraft">我的草稿</el-menu-item>
            </el-submenu>
          </el-menu>
          <section class="info">
            <div class="img">
              <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" alt="">
            </div>
            <div class="name">{{username}}</div>
          </section>
        </section>
      </div>
    </header>
    <!-- 面包屑 -->
    <section class="breadcrumb">
      <div class="container">
        <span class="breadcrumb-icon"><i class="el-icon-s-flag"></i></span> 
        <span>{{breadcrumbTxt}}</span>
      </div>
    </section>
    <!-- 导航路由主体内容 -->
    <article class="article">
      <transition name="fade-transform" mode="out-in">
        <router-view></router-view>
      </transition>
    </article>
  </div>
</template>
<script>
export default {
  name: 'layout',
 
  data () {
    return {
      path: '',
      breadcrumbTxt: '',
    }
  },

  computed: {
    username(){
      return this.$store.state.username
    }
  },

  watch: {
    $route: {
      handler(route){
        if(route.meta && route.meta.title){
          this.breadcrumbTxt = route.meta.title;
        }else{
          this.breadcrumbTxt = '';
        }
      },
      immediate: true
    }
  },

  methods: {
    handleSelect(){

    }
  }
 
}
</script>
<style lang="scss">
.nav-menu .el-submenu.is-active .el-submenu__title{
  border-bottom: 2px solid $mainC !important;
}
</style>
<style lang='scss' scoped>
.layout{
  .header{
    background: $mainC;

    .container{
      display: flex;
      justify-content: space-between;
      width: $cw;
      margin: 0 auto;
      align-items: center;

      .logo{
        color: #fff;
        font-size: 26px;
        font-weight: bold;
      }

      .nav{
        display: flex;

        .nav-menu{
          border: none !important;
        }

        .info{
          display: flex;
          align-items: center;
          padding: 0 20px;

          .img{
            width: 40px;
            height: 40px;
            >img{
              width: 100%;
              border-radius: 6px;
            }
          }
          .name{
            color: #fff;
            padding-left: 8px;
            font-size: 14px;
          }
        }
      }
    }

  }

  .breadcrumb{
    background: #f7f7f7;
    height: 42px;
    line-height: 42px;
    color: $fc2;
    font-size: 14px;

    &-icon{
      width: 20px;
      height: 20px;
      display: inline-block;
      line-height: 22px;
      text-align: center;
      background: #64d9d6;
      color: #fff;
      border-radius: 3px;
      margin-right: 8px;
    }

    .container{
      width: $cw;
      margin: 0 auto;
      box-sizing: border-box;
      padding: 0 4px;
      // padding: 0 24px;#f7f7f7
    }
  }

  .article{
    box-sizing: border-box;
    width: $cw;
    margin: 0 auto;
    padding: 24px 0;
  }
}
</style>