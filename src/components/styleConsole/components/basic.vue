<template>
  <div class="basic">
    <div class="item">
      <div class="label">宽度</div>
      <el-input v-model="w" size="small" type="text" placeholder="请输入目标宽度" class="item-input">
        <span slot="append">{{wUnit}}</span>
      </el-input>
      <el-radio v-model="wUnit" label="px">px</el-radio>
      <el-radio v-model="wUnit" label="%">%</el-radio>
    </div>
  </div>
</template>
<script>
export default {
  name: 'basic', // 基础样式内容，包括宽高背景颜色等等..

  props: {
    comOps: {
      type: Object,
      default: () => {}
    }
  },
 
  data () {
    return {
      ops: {
        key: 'width',
        val: null,
      },
      w: null,
      wUnit: 'px',
    }
  },

  watch: {
    ops: {
      handler(val){
        this.updateStyle(val);
      },
      deep: true
    },

    w(val){
      this.ops.val = `${this.w}${this.wUnit}`
    },

    wUnit(val){
      this.ops.val = `${this.w}${this.wUnit}`
    },

  },

  created() {
    this.initDefaultVal();
  },

  methods: {
    initDefaultVal(){
      if(this.comOps.style.width){
        let str = this.comOps.style.width;
        // 100px, 分割数值和符号
        this.w = /\d+/g.exec(str)[0];
        this.wUnit = /\D+/g.exec(str)[0];
      }
    },

    updateStyle(ops){
      this.$emit('change', ops);
    },
  }
 
}
</script>
<style lang='scss' scoped>
.basic{
  .item{
    display: flex;
    align-items: center;
    color: $fc1;

    .label{
      width: 50px;
      flex-shrink: 0;
    }
    .item-input{
      width: 180px;
      margin-right: 30px;
    }
  }
}
</style>