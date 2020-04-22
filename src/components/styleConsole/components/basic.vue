<template>
  <div class="basic">
    <section class="item">
      <div class="label">层级</div>
      <el-input v-model.number="zIndex" size="small" type="text" placeholder="请输入数字" class="item-input">
        <span slot="append">数字</span>
      </el-input>
      <span class="tip">层级数大的盖住小的</span>
    </section>

    <section class="item" v-if="!isTextContent">
      <div class="label">宽度</div>
      <el-input v-model="width" size="small" type="text" placeholder="请输入目标宽度" class="item-input">
        <span slot="append">{{widthUnit}}</span>
      </el-input>
      <el-radio v-model="widthUnit" label="px">px</el-radio>
      <el-radio v-model="widthUnit" label="%">%</el-radio>
      <span class="tip">推荐</span>
    </section>

    <section class="item" v-if="!isTextContent">
      <div class="label">高度</div>
      <el-input v-model="height" size="small" type="text" placeholder="请输入目标高度" class="item-input">
        <span slot="append">{{heightUnit}}</span>
      </el-input>
      <el-radio v-model="heightUnit" label="px">px</el-radio>
      <el-radio v-model="heightUnit" label="%">%</el-radio>
    </section>
    <section class="item" v-if="isImgContainer">
      <div class="label"></div>
      <el-checkbox v-model="isKeepScale">保持图片原始比例</el-checkbox>
    </section>

    <section class="item">
      <div class="label">X轴</div>
      <el-input v-model="left" size="small" type="text" placeholder="离屏幕左边的距离" class="item-input" :disabled="isCenter">
        <span slot="append">{{leftUnit}}</span>
      </el-input>
      <el-radio v-model="leftUnit" label="px">px</el-radio>
      <el-radio v-model="leftUnit" label="%">%</el-radio>
      <span class="tip">推荐</span>
    </section>
    <section class="item">
      <div class="label"></div>
      <el-checkbox v-model="isCenter">相对屏幕居中（X轴方向）</el-checkbox>
    </section>

    <section class="item">
      <div class="label">Y轴</div>
      <el-input v-model="top" size="small" type="text" placeholder="离屏幕上边的距离" class="item-input">
        <span slot="append">{{topUnit}}</span>
      </el-input>
      <el-radio v-model="topUnit" label="px">px</el-radio>
      <el-radio v-model="topUnit" label="%">%</el-radio>
    </section>


  </div>
</template>
<script>
import publicConsoleItem from '../mixins/publicConsoleItem'
export default {
  name: 'basic', // 基础样式内容，包括宽高背景颜色等等..

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

  mixins: [publicConsoleItem],
 
  data () {
    return {
      // 记录该组件需要别分割单位和数值的属性，如：width = 100px
      attrs: ['width', 'height', 'top', 'left'], 

      ops: [
        {
          key: 'zIndex',
          val: null
        },
        {
          key: 'width',
          val: null
        },
        {
          key: 'height',
          val: null
        },
        {
          key: 'left',
          val: null,
        },
        {
          key: 'top',
          val: null
        }
      ],

      zIndex: null,
      width: null,
      widthUnit: 'px',
      height: null,
      heightUnit: 'px',
      left: null,
      leftUnit: 'px',
      top: null,
      topUnit: 'px',

      isCenter: false,
      isKeepScale: true,
    }
  },

  computed: {
    isTextContent(){
      return this.type === 'textContainer'
    },

    isImgContainer(){
      return this.type === 'imgContainer'
    }
  },

  watch: {
    zIndex(val){
      this.updateOps('zIndex', val);
    },

    width(val){
      let newVal = `${this.width}${this.widthUnit}`
      this.updateOps('width', newVal)
    },

    widthUnit(val){
      let newVal = `${this.width}${this.widthUnit}`;
      this.updateOps('width', newVal)
    },

    height(val){
      let newVal = `${this.height}${this.heightUnit}`
      this.updateOps('height', newVal)
    },

    heightUnit(val){
      let newVal = `${this.height}${this.heightUnit}`;
      this.updateOps('height', newVal)
    },

    left(val){
      let newVal = `${this.left}${this.leftUnit}`
      this.updateOps('left', newVal)
    },

    leftUnit(val){
      let newVal = `${this.left}${this.leftUnit}`;
      this.updateOps('left', newVal)
    },

    top(val){
      let newVal = `${this.top}${this.topUnit}`
      this.updateOps('top', newVal)
    },

    topUnit(val){
      let newVal = `${this.top}${this.topUnit}`;
      this.updateOps('top', newVal)
    },

    isCenter(val){
      // 锁定x轴，并更新为50%
      this.left = 50;
      this.leftUnit = '%';
      this.$emit('change-css', val/**isAppend */, 'center');
    },

    isKeepScale(val){
      // 假如val === false，那么意思就是变为图片充满整个容器，所以应该加上类名full-img，
      this.$emit('change-class', !val/**isAppend */, 'img-full');
    },

  },

  created(){
    this.init();
  },

  methods: {
    init(){
      this.zIndex = this.comOps.style.zIndex;
      // console.log(this.comOps.style.transform);
      
      // 对居中屏幕做特殊处理
      if(this.comOps.style.transform && this.comOps.style.transform === 'translateX(-50%)'){
        this.isCenter = true;
      }
      // 对保持图片原始比例做特殊处理
      if(this.comOps.className && this.comOps.className === 'img-full'){
        this.isKeepScale = false;
      }
    },

    updateOps(attr, newVal){
      this.ops.forEach((item) => {
        if(item.key === attr){
          item.val = newVal
        }
      })
    }
  }
 
}
</script>
<style lang="scss">
.basic .item .el-radio{
  margin-right: 14px !important;
}
</style>
<style lang='scss' scoped>
.basic{
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
      margin-right: 24px;
    }
    .tip{
      font-size: 12px;
      color: $fc3;
    }
  }
}
</style>