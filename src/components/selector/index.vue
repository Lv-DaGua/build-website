<template>
  <div class="selector">
    <!-- <div class="title">点击添加对应的组件</div> -->
    <el-tabs v-model="tabName">
      <el-tab-pane label="普通组件" name="first">
        <common-com @select="handleSelect"/>
      </el-tab-pane>
      <el-tab-pane label="定制组件" name="second">
        <custom-com @select="handleSelect"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import commonCom from './components/commonCom'
import customCom from './components/customCom'
export default {
  name: 'selector',

  components: {
    commonCom,
    customCom
  },
 
  data () {
    return {
      tabName: 'first',
    }
  },

  methods: {
    handleSelect(com){
      this.$emit('select', com)
    }
  }
 
}
</script>
<style lang="scss">
.el-drawer__header{
  color: $fc0;
  margin-bottom: 16px;
}
</style>
<style lang='scss' scoped>
.selector{
  padding: 18px;
  padding-top: 0%;
  .title{
    color: $fc0;
    margin-bottom: 16px;
    // font-weight: bold;
  }
}
</style>