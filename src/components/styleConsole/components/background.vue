<template>
  <div class="background">
    <section class="item">
      <div class="label">背景色</div>
      <el-color-picker size="mini" v-model="color"></el-color-picker>
      <div class="val">{{color}}</div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'background',

  props: {
    comOps: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      ops: {
        key: 'background',
        val: null,
      },
      color: '',
    }
  },

  watch: {
    ops: {
      handler(val){
        this.updateStyle(val);
      },
      deep: true
    },

    color(val){
      this.ops.val = val;
    }
  },

  created(){
    this.initDefaultVal();
  },

  methods: {
    initDefaultVal(){
      if(this.comOps.style.background){
        this.color = this.comOps.style.background;
      }
    },

    // 检测到ops变化时就提交到上级
    updateStyle(ops){
      this.$emit('change', ops);
    },
  }
 
}
</script>
<style lang='scss' scoped>
.background{
  .item{
    display: flex;
    align-items: center;
    color: $fc1;
    margin-bottom: 8px;

    .label{
      width: 60px;
      flex-shrink: 0;
    }

    .val{
      color: $fc2;
      margin-left: 12px;
    }
  }
}
</style>