<template>
  <div class="component-global" :class="{'is-edit': isEdit}" :style="ops.style">
    <slot></slot><!-- 设置按钮插槽 -->
    <span>{{ops.text}}</span>
  </div>
</template>
<script>
export default {
  name: 'textContainer',

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
 
}
</script>
<style lang='scss' scoped>

</style>