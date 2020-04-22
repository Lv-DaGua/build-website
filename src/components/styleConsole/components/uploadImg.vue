<template>
  <div class="upload-img">
    <section class="item">
      <div class="label">图片</div>
      <ul class="input-groud">
        <li class="sub-item">
          <!-- <div class="sub-label">图片</div> -->
          <el-upload
            class="upload-demo"
            action="/"
            :show-file-list="false"
            :auto-upload="true"
            :http-request="handleAddFile"
          >
            <el-button size="small" type="primary" :loading="loading">点击上传</el-button>
          </el-upload>
          <span class="tip">再次上传即可替换图片，支持png，jpg</span>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
import { uploadImg } from '@/api/buildingDiy'
export default {
  name: 'uploadImg',
 
  data () {
    return {
      loading: false,
      fileURL: '',
    }
  },

  watch: {
    fileURL(url){
      this.$emit('change-url', url)
    }
  },
  
  methods: {
    handleAddFile(file){
      let fd = new FormData();     
      fd.append('file', file.file);
      this.loading = true;
      uploadImg(fd).then((res) => {
        if(res.code === 10000){
          this.$message.success('上传成功');
          this.fileURL = res.data.url;
        }
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.upload-img{
  margin: 16px 0;
  .item{
    display: flex;
    align-items: center;
    color: $fc1;
    margin-bottom: 8px;

    .label{
      width: 60px;
      flex-shrink: 0;
    }

    .input-groud{
      width: 100%;

      .sub-item{
        margin-bottom: 8px;
        display: flex;
        align-items: center;

        .sub-label{
          width: 30px;
          flex-shrink: 0;
          color: $fc2;
          margin-right: 4px;
        }
        .sub-item-input{
          width: 110px;
          margin-right: 24px;
        }
        .val{
          color: $fc2;
          margin-left: 12px;
        }
        .tip{
          font-size: 12px;
          color: $fc3;
          margin-left: 8px;
        }
      }
    }
    
  }
}
</style>