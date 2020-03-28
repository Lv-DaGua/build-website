<template>
  <div class="component-global" :style="ops.style">
    <slot></slot><!-- 设置按钮插槽 -->
    <span>{{ops.text}}</span>
  </div>
</template>
<script>
export default {
  name: 'container',

  props: {
    ops: {
      type: Object,
      default: () => {}
    }
  },
 
}
</script>
<style lang='scss' scoped>

</style>