<template>
  <div class="padding">
    <section class="item">
      <div class="label">内边距</div>
      <el-input v-model="padding" size="small" type="text" placeholder="目标容器的内边距" class="item-input">
        <span slot="append">{{paddingUnit}}</span>
      </el-input>
      <el-radio v-model="paddingUnit" label="px">px</el-radio>
      <!-- <el-radio v-model="paddingUnit" label="%">%</el-radio> -->
    </section>
  </div>
</template>
<script>
import publicConsoleItem from '../mixins/publicConsoleItem'
export default {
  name: 'padding',

  props: {
    comOps: {
      type: Object,
      default: () => {}
    }
  },

  mixins: [publicConsoleItem],
 
  data () {
    return {
      // 记录该组件需要别分割单位和数值的属性，如：width = 100px
      attrs: ['padding'], 

      ops: {
        key: 'padding',
        val: null
      },

      padding: null,
      paddingUnit: 'px',
    }
  },

  watch: {
    padding(val){
      this.ops.val = `${this.padding}${this.paddingUnit}`
    },

    widthUnit(val){
      this.ops.val = `${this.padding}${this.paddingUnit}`
    },
  }
 
}
</script>
<style lang='scss' scoped>
.padding{
  .item{
    display: flex;
    align-items: center;
    color: $fc1;
    margin-bottom: 8px;

    .label{
      width: 60px;
      flex-shrink: 0;
    }
    .item-input{
      width: 145px;
      margin-right: 30px;
    }
  }
}
</style>