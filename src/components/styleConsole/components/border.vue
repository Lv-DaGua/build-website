<template>
  <div class="border">
    <section class="item">
      <div class="label">边框</div>
      <ul class="input-groud">
        <li class="sub-item">
          <div class="sub-label">粗细</div>
          <el-input v-model="borderWidth" size="small" type="text" placeholder="" class="sub-item-input">
            <span slot="append">px</span>
          </el-input>
          <span class="tip">如要取消边框则设为0即可</span>
        </li>
        <li class="sub-item">
          <div class="sub-label">类型</div>
          <el-select v-model="borderStyle" size="small" placeholder="请选择" class="sub-item-input">
            <el-option
              v-for="item in styleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </li>
        <li class="sub-item">
          <div class="sub-label">颜色</div>
          <el-color-picker size="mini" v-model="borderColor"></el-color-picker>
          <div class="val">{{borderColor}}</div>
        </li>
        <li class="sub-item">
          <div class="sub-label">圆角</div>
          <el-input v-model="borderRadius" size="small" type="text" placeholder="" class="sub-item-input">
            <span slot="append">px</span>
          </el-input>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
import publicConsoleItem from '../mixins/publicConsoleItem'
export default {
  name: 'border',

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
      attrs: ['borderWidth', 'borderRadius'], 

      ops: [
        {
          key: 'borderWidth',
          val: null
        },
        {
          key: 'borderStyle',
          val: null
        },
        {
          key: 'borderColor',
          val: null
        },
        {
          key: 'borderRadius',
          val: null
        }
      ],

      borderWidth: null,
      borderWidthUnit: 'px',
      borderStyle: '',
      borderColor: '',
      borderRadius: '',

      styleList: [
        { label: '——', value: 'solid' },
        { label: '------', value: 'dashed' },
        { label: '........', value: 'dotted' },
        { label: '凸起', value: 'ridge' },
      ]
          
    }
  },

  watch: {
    borderWidth(val){
      let newVal = val + 'px';
      this.updateOps('borderWidth', newVal)
    },

    borderStyle(val){
      this.updateOps('borderStyle', val)
    },

    borderColor(val){
      this.updateOps('borderColor', val)
    },

    borderRadius(val){
      let newVal = val + 'px';
      this.updateOps('borderRadius', newVal)
    }
  },

  created(){
    this.init();
  },

  methods: {
    // 初始化自己没有带单位的属性值，带单位的属性值已经在mixin里面初始化了
    init(){
      if(this.comOps.style.borderStyle){
        this.borderStyle = this.comOps.style.borderStyle
      }
      if(this.comOps.style.borderColor){
        this.borderColor = this.comOps.style.borderColor
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
<style lang='scss' scoped>
.border{
  margin: 16px 0;
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
          margin-right: 24px;
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