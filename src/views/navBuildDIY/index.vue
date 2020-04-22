<template>
  <div class="nav-build-DIY">
    <section class="container">
      <div class="pan-btn green-btn" @click="handleToDiy">开始 搭建</div>
    </section>

    <el-upload
      class="upload-demo"
      action="/"
      :show-file-list="false"
      :auto-upload="true"
      :http-request="handleAddFile"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>
<script>
import { uploadImg } from '@/api/buildingDiy'
export default {
  name: 'navBuildDIY',
 
  data () {
    return {
          
    }
  },

  methods: {
    handleToDiy(){
      this.$router.push({path: '/buildingDiy'});
    },

    handleAddFile(file){
      let fd = new FormData();     
      fd.append('file', file.file);
      uploadImg(fd).then((res) => {
        
      })
    }
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