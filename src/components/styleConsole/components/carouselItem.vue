<template>
  <div class="carousel-item">
    <section class="item">
      <div class="label">内容</div>
      <ul class="content">
        <li 
          v-for="(item,i) in carouselList" 
          :key="item + '_' + i"
          class="content-item"
        >
          <div class="img">
            <img :src="item" alt="carousel">
          </div>
          <div class="oper">
            <el-button class="oper-btn" type="text" icon="el-icon-delete" @click="handleDelete(i)">删除</el-button>
          </div>
        </li>
        <li>
          <el-upload
            class="upload-demo"
            action="/"
            :auto-upload="true"
            :http-request="handleUpload"
            :show-file-list="false"
          >
          <div class="upload"><i class="el-icon-plus"></i></div>
          </el-upload>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
import { uploadImg } from '@/api/buildingDiy'
export default {
  name: 'carouselItem',

  props: {
    comOps: {
      type: Object,
      default: () => {}
    },

    type: {
      type: String,
      default: ''
    }
  },
 
  data () {
    return {
      carouselList: this.comOps.content,
      loading: false, 
    }
  },

  watch: {
    comOps: {
      handler(val){
        this.carouselList = val.content
      },
      deep: true
    },

    carouselList(val){
      this.$emit('change-content', this.carouselList)
    }
  },

  methods: {
    handleUpload(file){
      let fd = new FormData();     
      fd.append('file', file.file);
      this.loading = true;
      uploadImg(fd).then((res) => {
        if(res.code === 10000){
          this.$message.success('上传成功');
          this.carouselList.push(res.data.url);
        }
      }).finally(() => {
        this.loading = false
      })
    },

    handleDelete(i){
      if(this.carouselList[i]){
        this.carouselList.splice(i, 1);
        this.$message.success('删除成功')
      }
    },
  }
 
}
</script>
<style lang='scss' scoped>
.carousel-item{
  .item{
    display: flex;
    align-items: center;
    color: $fc1;
    margin-bottom: 8px;

    .label{
      width: 60px;
      flex-shrink: 0;
    }
    .content{
      width: 100%;
      &-item{
        display: flex;
        align-items: center;
        .img{
          width: 150px;
          margin-right: 16px;
          >img{
            width: 100%;
            height: auto;
          }
        }
        .oper{
          // font-size: 12px;
          &-btn{
            font-size: 12px;
          }
        }
      }
    }

    .upload{
      width: 150px;
      height: 87px;
      border: 1px dashed $line-c;
      text-align: center;
      line-height: 87px;
      font-weight: bold;
      font-size: 32px;
      color: $fc3;
      cursor: pointer;
      &:hover{
        border-color: $green;
        color: $green;
      }
    }
  }
}
</style>