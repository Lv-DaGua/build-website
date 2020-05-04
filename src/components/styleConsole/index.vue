<template>
  <div class="style-console">
    <component
      v-for="(item, i) in styleComponentItems"
      :key="i"
      :is="item"
      :com-ops="comOps"
      :type="type"
      @change="updateStyleOps"
      @change-text="updateText"
      @change-css="updateCss"
      @change-class=updateClass
      @change-url="updateImgURL"
      @change-content="updateContent"
    >
    </component>
  </div>
</template>
<script>
import basic from './components/basic'
import background from './components/background'
import padding from './components/padding'
import border from './components/border'
import textContent from './components/textContent'
import uploadImg from './components/uploadImg'
import carouselItem from './components/carouselItem'
export default {
  name: 'styleConsole',

  components: {
    basic,
    background,
    padding,
    border,
    textContent,
    uploadImg,
    carouselItem
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
          return ['basic', 'background', 'padding', 'border', 'textContent']
          break;
        case 'textContainer':
          return ['basic', 'textContent']
          break;
        case 'imgContainer':
          return ['basic', 'uploadImg']
          break;
        case 'carousel':
          return ['basic', 'carouselItem']
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
    // 更新文本内容
    updateText(text){
      this.$emit('change-text', text);
    },

    // 修改css片段
    updateCss(isAppend, cssTypeName){
      this.$emit('change-css', isAppend, cssTypeName);
    },

    updateClass(isAppend, className){
      this.$emit('change-class', isAppend, className);
    },

    updateImgURL(url){
      this.$emit('change-url', url)
    },

    updateContent(content){
      this.$emit('change-content', content)
    },

    // 更新样式对象
    updateStyleOps(updateItem){

      if(Array.isArray(updateItem)){
        updateItem.forEach((item) => {
          this.deepEach(this.ops, item)
        })
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
  max-height: 400px;
  overflow-y: auto;
}
</style>