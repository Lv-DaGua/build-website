<template>
  <div 
    class="component-global img-container" 
    :class="{'is-edit': isEdit, 'img-full': isImgFull}"
    :style="ops.style"
  >
    <slot></slot><!-- 设置按钮插槽 -->
    <img :src="ops.url">
  </div>
</template>
<script>
export default {
  name: 'imgContainer',

  props: {
    ops: {
      type: Object,
      default: () => {}
    },

    isEdit: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      containerStyle: {},
      imgStyle: {}
    }
  },

  computed: {
    isImgFull(){
      if(this.ops.className && this.ops.className === 'img-full'){
        return true
      }else{
        return false
      }
    }
  }

 
}
</script>
<style lang='scss' scoped>
.img-container{
  overflow: hidden;
  >img{
    width: 100%;
    height: auto;
  }
}
.img-container.img-full{
  >img{
    width: 100%;
    height: 100%;
  }
}
</style>