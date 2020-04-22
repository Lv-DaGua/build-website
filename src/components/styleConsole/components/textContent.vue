<template>
  <div class="text-content">
    <section class="item">
      <div class="label">文本</div>
      <ul class="input-groud">
        <li class="sub-item">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入文本内容"
            v-model="text"
          >
          </el-input>
        </li>
        <li class="sub-item">
          <!-- <div class="sub-label">对齐</div> -->
          <el-radio v-model="textAlign" label="left">居左</el-radio>
          <el-radio v-model="textAlign" label="center">居中</el-radio>
          <el-radio v-model="textAlign" label="right">居右</el-radio>
        </li>
        <li class="sub-item">
          <div class="sub-label">大小</div>
          <el-input v-model="fontSize" size="small" type="text" placeholder="" class="sub-item-input">
            <span slot="append">px</span>
          </el-input>
          <!-- <span class="tip">（各个浏览器的最小字号不一样）</span> -->
        </li>
        <li class="sub-item">
          <div class="sub-label">粗细</div>
           <el-radio v-model="fontWeight" label="normal">常规</el-radio>
          <el-radio v-model="fontWeight" label="bold">加粗</el-radio>
        </li>
        <li class="sub-item">
          <div class="sub-label">颜色</div>
          <el-color-picker size="mini" v-model="color"></el-color-picker>
          <div class="val">{{color}}</div>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
import publicConsoleItem from '../mixins/publicConsoleItem'
export default {
  name: 'textContent',

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
      attrs: ['fontSize'], 

      ops: [
        {
          key: 'textAlign',
          val: null
        },
        {
          key: 'fontSize',
          val: null
        },
        {
          key: 'fontWeight',
          val: null
        },
        {
          key: 'color',
          val: null
        }
      ],

      text: '',
      textAlign: 'left',
      fontSize: null,
      fontSizeUnit: 'px',
      fontWeight: 'normal',
      color: '',
    }
  },

  watch: {
    ops: {
      handler(val){
        this.$emit('change', val);
      },
      deep: true
    },

    text(val){
      this.$emit('change-text', val);
    },

    textAlign(val){
      this.updateOps('textAlign', val)
    },

    fontSize(val){
      let newVal = val + 'px';
      this.updateOps('fontSize', newVal)
    },

    fontWeight(val){
      this.updateOps('fontWeight', val)
    },

    color(val){
      this.updateOps('color', val)
    }
  },

  created(){
    this.init()
  },

  methods: {
    init(){
      this.text = this.comOps.text;
      this.textAlign = this.comOps.style.textAlign;
      this.color = this.comOps.style.color;
      this.fontWeight = this.comOps.style.fontWeight;
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
<style lang='scss' scoped>
.text-content{
  margin: 16px 0;
  padding-right: 16px;
  .item{
    display: flex;
    align-items: center;
    color: $fc1;
    margin-bottom: 8px;

    .label{
      width: 60px;
      flex-shrink: 0;
    }

    .input-groud{
      width: 100%;

      .sub-item{
        margin-bottom: 8px;
        display: flex;
        align-items: center;

        .sub-label{
          width: 30px;
          flex-shrink: 0;
          color: $fc2;
          margin-right: 4px;
        }
        .sub-item-input{
          width: 110px;
        }
        .val{
          color: $fc2;
          margin-left: 12px;
        }
        .tip{
          font-size: 12px;
          color: $fc3;
        }
      }
    }
    
  }
}
</style>