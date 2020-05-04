<template>
  <div class="nav-build-DIY">
    <section class="container">
      <div class="pan-btn green-btn" @click="handleToDiy">开始 搭建</div>
    </section>
  </div>
</template>
<script>
import { uploadImg } from '@/api/buildingDiy'
export default {
  name: 'navBuildDIY',
 
  methods: {
    handleToDiy(){
      this.$router.push({path: '/buildingDiy'});
    },
  }
 
}
</script>
<style lang='scss' scoped>
.nav-build-DIY{
  .container{
    text-align: center;
    position: relative;
    top: 30vh;
  }
}
</style>