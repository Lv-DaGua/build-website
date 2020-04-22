/**
 * 所有控制台组件都共有的功能，包括：
 * 1. 根据各个组件的attrs属性初始化传进来的数值，分割数值和单位
 * 2. 监听ops的变化，一旦变化就更提交更新
 */
export default {

  watch: {
    ops: {
      handler(val){
        this.updateStyle(val);
      },
      deep: true
    },
  },

  created() {
    this.initDefaultVal();
  },

  methods: {
    // 初始化各个属性的数值以及对应单位
    initDefaultVal(){
      if(this.attrs && Array.isArray(this.attrs)){
        this.attrs.forEach((attr) => {
          if(this.comOps.style[attr]){
            let str = this.comOps.style[attr];
            // 100px, 分割数值和符号
            this[attr] = (/\d+/g.exec(str) && /\d+/g.exec(str)[0]) || '';
            this[`${attr}Unit`] = (/\D+/g.exec(str) && /\D+/g.exec(str)[0]) || '';
          }
        })
      }else{
        console.error('缺少attrs属性')
      }
    },

    // 检测到ops变化时就提交到上级
    updateStyle(ops){
      this.$emit('change', ops);
    },

  }

}