<template>
  <div class="building-DIY">

    <!-- 页面编辑内容 -->
    <article>
      <template v-for="item in compList">
        <component 
          :is="item.type"
          :ops="item.ops"
          :key="item.cid" 
        >
          <div class="set-modal-global"></div>
          <el-button
            class="set-btn-global"
            type="primary" 
            icon="el-icon-edit" 
            circle 
            @click="handleEdit(item.cid)"
          ></el-button>
        </component>
      </template>
    </article>

    <!-- 选择器开关 -->
    <div class="selector-btn" @click="selectorVisible = true;">
      <i class="el-icon-d-arrow-left"></i>
    </div>

    <!-- 控制台 -->
    <el-dialog 
      title="Shipping address" 
      v-el-drag-dialog 
      width="450px"
      custom-class="console-dialog"
      :visible.sync="consoleVisible" 
      :modal="false"
      :lock-scroll="false"
      :close-on-click-modal="false"
      @dragDialog="handleDrag"
    >
      <style-console 
        v-if="consoleVisible"
        @change-style="updateStyle"
        :com-ops="curEditCom.ops"
        :type="curEditCom.type"
      />
    </el-dialog>

    <!-- 选择组件器 -->
    <el-drawer
      title="点击添加对应的组件"
      direction="rtl"
      :visible.sync="selectorVisible"
    >
      <selector @select="handleAddCommonCom"/>
    </el-drawer>

  </div>
</template>
<script>
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import styleConsole from '@/components/styleConsole/index'
import selector from '@/components/selector/index'
// 组件
import container from '@/components/container/index'

export default {
  name: 'buildingDIY',

  directives: { elDragDialog },

  components: {
    styleConsole,
    selector,
    container
  },
 
  data () {
    return {
      consoleVisible: false,
      selectorVisible: false,

      compList: [], // 保存当前用户添加的所有组件
      curEditCom: {},
      curEditCid: null,
      
    }
  },

  methods: {
    handleEdit(id){
      this.compList.forEach((com) => {
        if(com.cid === id){
          this.curEditCom = com;
          this.curEditCid = com.cid;
        }
      })
      this.consoleVisible = true;
    },

    updateStyle(newOps){
      // 拿到当前正处于编辑状态的组件样式对象
      this.compList.forEach((com) => {
        if(com.cid === this.curEditCid){
          com.ops = newOps;
        }
      })
    },

    handleAddCommonCom(com){
      this.$set(com, 'cid', this.compList.length + 1);
      this.$set(com.ops.style, 'zIndex', this.compList.length + 1);
      this.compList.push(com);
      this.selectorVisible = false; // 关闭选择器
    },


    handleDrag(){},
  }
 
}
</script>
<style lang='scss' scoped>
.building-DIY{

  .selector-btn{
    position: fixed;
    right: 0;
    top: 10vh;
    background: $green;
    padding: 8px;
    color: #fff;
    border-radius: 10px 0 0 10px;
    opacity: .3;
    cursor: pointer;
    &:hover{
      opacity: 1;
    }
  }
}
</style>