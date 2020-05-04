<template>
  <div class="web" v-loading="fetchLoading">
    <article>
      <template v-for="item in compList">
        <component 
          :is="item.type"
          :ops="item.ops"
          :key="item.cid" 
          :is-edit="false"
        >
        </component>
      </template>
    </article>
  </div>
</template>
<script>
import { getWebInfo } from '@/api/web'
// 组件
import container from '@/components/container/index'
import textContainer from '@/components/textContainer/index'
import imgContainer from '@/components/imgContainer/index'
import carousel from '@/components/carousel/index'
export default {
  name: 'web',
 
  components: {
    container,
    textContainer,
    imgContainer,
    carousel
  },

  data () {
    return {
      compList: [],
      notPage: false,
      fetchLoading: false,
    }
  },

  created(){
    this.fetchData();
  },

  methods: {
    fetchData(){
      const key = this.$route.query.k;
      if(key === ''){
        this.notPage = true;
        return
      }
      this.fetchLoading = true;
      getWebInfo({key}).then((res) => {
        if(res.code === 10000){
          this.compList = res.data.web
        }
      }).finally(() => {
        this.$nextTick(() => {
          this.fetchLoading = false;
        })
      });
    }
  }
 
}
</script>
<style lang='scss' scoped>
.web{
  min-height: 300px;
}
</style>