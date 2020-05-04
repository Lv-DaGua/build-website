<template>
  <div class="custom-com">
    <ul>
      <li
        class="item"
        v-for="item in comList"
        :key="item.id"
        @click="handleAdd(item)"
      >
        <section class="img">
          <img :src="item.img" alt="">
        </section>
        <section class="content">
          <div class="title">{{item.title}}</div>
          <div class="desc">{{item.desc}}</div>
        </section>
      </li>
    </ul>
  </div>
</template>
<script>
import customComList from '@/utils/customComList'
export default {
  name: 'customCom',
 
  data () {
    return {
      comList: []
    }
  },

  created(){
    this.comList = customComList;
  },

  methods: {
    handleAdd(com){
      this.$emit('select', JSON.parse(JSON.stringify(com.defaultOps)));
    }
  }
 
}
</script>
<style lang='scss' scoped>
.custom-com{
  height: calc(100vh - 124px);
  overflow: auto;

  .item{
    display: flex;
    margin: 2px;
    margin-bottom: 6px;
    // border-bottom: 1px solid $line-c;
    border-radius: 4px;
    cursor: pointer;
    &:hover{
      box-shadow: 0 2px 12px 1px rgba(0,0,0,.1);
    }
    .img{
      width: 100px;
      flex-shrink: 0;
      padding: 10px;
      >img{
        width: 100%;
        height: auto;
      }
    }
    .content{
      width: 100%;
      padding: 16px 24px;
      .title{
        font-size: 14px;
        font-weight: bold;
        color: $fc0;
        margin-bottom: 12px;
      }
      .desc{
        font-size: 14px;
        color: $fc2;
        line-height: 1.3;
      }
    }
  }
}
</style>