<template>
  <div class="style-console">
    <component
      v-for="(item, i) in styleComponentItems"
      :key="i"
      :is="item"
      :com-ops="comOps"
      @change="updateStyleOps"
    >
    </component>
  </div>
</template>
<script>
import basic from './components/basic'
export default {
  name: 'styleConsole',

  components: {
    basic,
  },

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
      ops: {}
    }
  },

  computed: {
    styleComponentItems(){
      switch (this.type) {
        case 'container':
          return ['basic']
          break;
        default:
          break;
      }
    }
  },

  watch: {
    comOps: {
      handler(val){
        this.ops = val
      },
      deep: true
    }
  },

  created(){
    // 这里要保证this.ops能够正确赋值
    this.ops = Object.assign({}, this.comOps)
  },

  methods: {
    updateStyleOps(updateItem){

      if(Array.isArray(updateItem)){

      }else{
        this.deepEach(this.ops, updateItem)
      }

      this.$emit('change-style', this.ops);
    },

    // 对ops深度遍历，更新对应的值
    deepEach(scoure,item){
      for (const key in scoure) {
        if (scoure.hasOwnProperty(key)) {
          if(key === item.key){
            scoure[key] = item.val;
            return
          }
          if(typeof scoure[key] === 'object'){
            this.deepEach(scoure[key], item);
          }
        }
      }
    },
  }
 
}
</script>
<style lang="scss">
.console-dialog{
  border-radius: 4px;
  box-shadow: 0 4px 11px rgba(0,0,0,.3);

  .el-dialog__header{
    // background: #efefef;
    border-radius: 4px 4px 0 0;
    background: #4ab7bd;
    .el-dialog__title{
      color: #fff;
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }
  }
}
</style>
<style lang='scss' scoped>
.style-console{

}
</style>