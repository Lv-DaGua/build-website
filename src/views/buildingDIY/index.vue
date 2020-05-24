<template>
  <div class="building-DIY">

    <!-- 页面编辑内容 -->
    <article class="building-content" id="building_DIY">
      <template v-for="item in compList">
        <component 
          :is="item.type"
          :ops="item.ops"
          :key="item.cid" 
        >
          <div class="set-modal-global" @click="handleEdit(item.cid)"></div>
          <div class="com-btn-global">
            <el-button
              class="set-btn-global"
              type="primary" 
              icon="el-icon-edit" 
              circle 
              @click.stop="handleEdit(item.cid)"
            ></el-button>
            <el-button
              class=""
              type="danger" 
              icon="el-icon-delete" 
              circle 
              @click.stop="handleDelete(item.cid)"
            ></el-button>
          </div>
        </component>
      </template>

      <!-- 页面为空时 -->
      <section class="empty" v-if="compList.length === 0">
        <div><i class="el-icon-top-right empty-icon"></i>第一步：点击屏幕右侧按钮<img class="empty-img" src="../../assets/tishi-1.png"/>，选择一个组件添加到页面</div>
        <div><i class="el-icon-edit empty-icon"></i>第二步：点击页面组件的编辑按钮<img class="empty-img" src="../../assets/tishi-2.png"/>，自己DIY组件的样式</div>
        <div><i class="el-icon-bottom-right empty-icon"></i>第三步：点击屏幕下方按钮<img class="empty-img" src="../../assets/tishi-3.png"/>，拉起操作栏，完成创作！</div>
      </section>
    </article>

    <!-- 选择器开关 -->
    <div class="selector-btn" @click="selectorVisible = true;">
      <i class="el-icon-d-arrow-left"></i>
    </div>
    <div class="oper-btn" @click="operVisible = true;">
      <i class="el-icon-caret-top"></i>
    </div>

    <!-- 控制台 -->
    <el-dialog 
      title="控制器" 
      v-el-drag-dialog 
      width="420px"
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
        @change-text="updateText"
        @change-css="updateCss"
        @change-class="updateClass"
        @change-url="updateImgURL"
        @change-content="updateCarouselContent"
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

    <!-- 操作栏 -->
    <el-drawer
      direction="btt"
      :visible.sync="operVisible"
      :withHeader="false"
      size="150px"
    >
      <div class="oper-container">
        <el-button 
          type="primary" 
          class="oper-container-btn" 
          icon="el-icon-circle-check"
          @click="handleEditWebInfo()"
        >完成发布</el-button>
        <el-button 
          type="success" 
          class="oper-container-btn green" 
          icon="el-icon-edit-outline"
          @click="handleEditWebInfo('draft')"
        >存为草稿</el-button>
      </div>
    </el-drawer>

    <!-- 发布选项面板 -->
    <el-dialog
      :visible.sync="releaseVisible"
      :close-on-click-modal="false"
      width="500px"
      title="请填写网站信息"
      top="25vh"
      center
    >
      <section class="release-info">
        <div class="release-info-title">取个名字</div>
        <div>
          <el-input v-model="webName" type="text" size="small" placeholder="该名字将显示在页面标题上"></el-input>
        </div>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button style="width: 115px;" size="small" @click="releaseVisible = false">取 消</el-button>
        <el-button style="width: 115px;" type="primary" size="small" @click="handleRelease" :loading="releaseLoading">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 发布成功 -->
    <el-dialog
      :visible.sync="releaseSuccessVisible"
      :close-on-click-modal="false"
      custom-class="release-success-dialog"
      width="600px"
      top="25vh"
      center
      @close="goBack"
    >
      <section slot="title" class="dialog-title">
        <i class="el-icon-circle-check"></i>
        发布成功
      </section>
      <section style="text-align: center">
        <div>使用浏览器打开以下网址即可查看您的网站</div>
        <div>
          <el-input class="web-url" disabled v-model="webURL" size="small">
            <template slot="append">
              <el-button type="primary" size="small" @click="handleCopy">复制</el-button>
            </template>
          </el-input>
          <el-input ref="webURL" v-model="webURL" class="hidden"></el-input>
        </div>
        <el-button type="text" size="small">查看我的所有网站</el-button>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button style="width: 115px;" size="small" @click="releaseSuccessVisible = false">关 闭</el-button>
        <el-button style="width: 115px;" type="primary" size="small" @click="toNewWeb">查 看</el-button>
      </span>
    </el-dialog>

    <!-- 发布为草稿 -->
    <el-dialog
      :visible.sync="draftVisible"
      :close-on-click-modal="false"
      width="500px"
      title="请填写草稿信息"
      top="25vh"
      center
    >
      <section class="release-info">
        <div class="release-info-title">取个名字</div>
        <div>
          <el-input v-model="draftName" type="text" size="small" placeholder="请输入草稿名字"></el-input>
        </div>
        <div class="release-info-title" style="margin-top: 24px">备注（非必填）</div>
        <div>
          <el-input v-model="draftRemark" type="textarea" :rows="4" resize="none" placeholder="写点备注，方便下次重新创作的时候恢复灵感"></el-input>
        </div>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button style="width: 115px;" size="small" @click="draftVisible = false">取 消</el-button>
        <el-button style="width: 115px;" type="primary" size="small" @click="handleSaveDraft" :loading="draftLoading">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>
<script>
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import styleConsole from '@/components/styleConsole/index'
import selector from '@/components/selector/index'
import { getAppendOps, getSpliceOps } from '@/utils/operCss'
import { releaseWeb, saveDraft, deleteDraft } from '@/api/buildingDiy'
import html2Canvas from 'html2canvas'
import { uploadImg } from '@/api/buildingDiy'

// 组件
import container from '@/components/container/index'
import textContainer from '@/components/textContainer/index'
import imgContainer from '@/components/imgContainer/index'
import carousel from '@/components/carousel/index'

export default {
  name: 'buildingDIY',

  directives: { elDragDialog },

  components: {
    styleConsole,
    selector,
    container,
    textContainer,
    imgContainer,
    carousel
  },
 
  data () {
    return {
      consoleVisible: false,
      selectorVisible: false,
      operVisible: false,

      isEdit: false,
      editKey: '',
      editDraftKey: '',
      editType: '',

      compList: [], // 保存当前用户添加的所有组件
      curEditCom: {},
      curEditCid: null,
      curHighestCid: 0, // 记录当前最大的cid

      // 发布中
      releaseVisible: false,
      webName: '',

      // 发布后
      releaseLoading: false,
      webKey: '',
      releaseSuccessVisible: false,

      // 保存为草稿
      draftVisible: false,
      draftLoading: false,
      draftName: '',
      draftRemark: '',

    }
  },

  computed: {
    webURL(){
      let url = `${window.location.origin}/#/web?k=${this.webKey}`;
      return url
    }
  },

  created(){
    if(this.$route.params.isEdit){
      if(this.$route.params.draftKey){
        this.editType = 'draft';
      }else{
        this.editType = 'web';
      }
      this.initEdit();
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

    handleDelete(id){
      this.$confirm('', '是否移除该组件', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            let spliceIndex = null;
            for (let i = 0; i < this.compList.length; i++) {
              if(this.compList[i].cid === id){
                spliceIndex = i;
                break
              } 
            }
            if(spliceIndex !== null) this.compList.splice(spliceIndex, 1);
            instance.confirmButtonLoading = false;
            this.$message.success('移除成功');
            done();
          } else {
            done();
          }
        }
      }).then(() => {}).catch((err) => {});
    },

    updateStyle(newOps){
      // 拿到当前正处于编辑状态的组件样式对象
      this.compList.forEach((com) => {
        if(com.cid === this.curEditCid){
          com.ops = newOps;
        }
      })
    },

    updateCss(isAppend, cssTypeName){
      isAppend ? this.appendCss(cssTypeName) : this.spliceCss(cssTypeName);
    },

    appendCss(cssName){
      let style = this.curEditCom.ops.style;
      this.curEditCom.ops.style = getAppendOps(style, cssName);
    },

    spliceCss(cssName){
      let style = this.curEditCom.ops.style;
      this.curEditCom.ops.style = getSpliceOps(style, cssName);
    },

    updateClass(isAppend, className){
      // 添加类名操作
      if(isAppend){
        if(this.curEditCom.ops.className){
          this.curEditCom.ops.className = className;
        }else{
          this.$set(this.curEditCom.ops, 'className', className);
        }
      }
      // 去除类名操作
      else{
        if(this.curEditCom.ops.className){
          this.curEditCom.ops.className = null;
        }
      }
    },

    updateText(text){
      // 拿到当前正处于编辑状态的组件信息对象
      this.compList.forEach((com) => {
        if(com.cid === this.curEditCid){
          com.ops.text = text;
        }
      })
    },

    updateImgURL(url){
      this.curEditCom.ops.url = url;
    },

    updateCarouselContent(content){
      this.curEditCom.ops.content = content
    },

    handleAddCommonCom(com){
      this.$set(com, 'cid', this.curHighestCid + 1);
      this.$set(com.ops.style, 'zIndex', this.curHighestCid + 1);
      this.compList.push(com);
      this.curHighestCid++;
      this.$message.success('已添加!');
      this.selectorVisible = false; // 关闭选择器
    },

    handleEditWebInfo(type = 'web'){
      if(this.compList.length === 0){
        this.$message.warning('您的页面是空的！')
        return
      }
      if(type === 'web'){
        this.releaseVisible = true;
      }else{
        this.draftVisible = true;
      }
      this.operVisible = false;
    },

    async handleRelease(){
      if(this.webName === ''){
        this.$message.warning('名字不能为空');
        return
      }

      const canvas = await this.createWebCanvas();
      const base64 = canvas.toDataURL('image/jpeg', 1.0);
      let fd = new FormData();     
      fd.append('file', base64);
      fd.append('web', JSON.stringify(this.compList));
      fd.append('web_name', this.webName);
      fd.append('web_type', 'diy');
      
      if(this.isEdit && this.editType === 'web'){
        fd.append('web_key', this.editKey)
        // data.web_key = this.editKey;
      }
      if(this.isEdit && this.editType === 'draft'){
        // 假如是编辑草稿，同时最后的操作是发布为作品，那么要去删了对应的草稿
        this.deleteDraft(this.editDraftKey)
      }
      this.releaseLoading = true;
      const res = await releaseWeb(fd);
      this.releaseLoading = false;
      if(res.code === 10000){
        this.webKey = res.data.key;
        this.releaseVisible = false;
        this.releaseSuccessVisible = true;
      }else{
        this.$message.error(res.msg || '出错了请重试');
      }
    },

    async handleSaveDraft(){
      if(this.draftName === ''){
        this.$message.warning('名字不能为空');
        return
      }

      const canvas = await this.createWebCanvas();
      const base64 = canvas.toDataURL('image/jpeg', 1.0);
      let fd = new FormData();     
      fd.append('file', base64);
      fd.append('web', JSON.stringify(this.compList));
      fd.append('web_name', this.draftName);
      fd.append('web_remark', this.draftRemark);
      fd.append('web_type', 'diy');
      if(this.isEdit && this.editType === 'draft'){
        fd.append('web_key', this.editDraftKey);
      }

      this.draftLoading = true;
      const res = await saveDraft(fd);
      this.draftLoading = false;
      if(res.code === 10000){
        this.$message.success('保存成功，即将跳转到我的草稿..');
        setTimeout(() => {
          this.$router.push({ path: '/user/myDraft' });
        }, 2000);
      }else{
        this.$message.error(res.msg || '出错了请重试');
      }
    },

    deleteDraft(key){
      deleteDraft({key});
    },

    handleCopy(){
      this.$refs['webURL'].select();
      let flag = document.execCommand("Copy","false",null);
      if(flag){
        this.$message.success('复制成功！');
      }else{
        this.$message.error('复制失败！请重试');
      }
    },

    toNewWeb(){
      window.open(this.webURL, '_blank');
    },

    goBack(){
      // this.$router.replace({ path: '/user/buildDiy' });
      this.$router.go(-1);
    },

    initEdit(){
      let web = this.$route.params.web;
      let highestId = 0;

      if(this.editType === 'web'){
        this.webName = web.web_name;
        this.editKey = web.web_key;
      }
      if(this.editType === 'draft'){
        this.draftName = web.web_name;
        this.draftRemark = web.web_remark;
        this.editDraftKey = this.$route.params.draftKey;
      }
      
      if(web.web && typeof web.web === 'string'){
        this.compList = JSON.parse(web.web);
      }else if(web.web && Array.isArray(web.web)){
        this.compList = web.web
      }
      this.compList.forEach((com) => {
        if(com.cid > highestId){
          highestId = com.cid
        }
      })
      this.curHighestCid = highestId;
      this.isEdit = true;
    },

    createWebCanvas(){
      // 将页面置顶 https://www.jianshu.com/p/88f07d5c5c70
      window.pageYOffset = 0;
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0

      return html2Canvas(document.getElementById('building_DIY'), {
        allowTaint: false,
        useCORS: true,  
        scale: 1
      });
      
    },

    handleDrag(){},
  }
 
}
</script>
<style lang='scss' scoped>
.building-DIY{

  .building-content{
    min-height: 100vh;
  }

  .empty{
    position: absolute;
    left: 50%;
    top: 47%;
    transform: translate(-50%, -50%);
    opacity: .5;
    >div{
      margin-bottom: 16px;
    }
    &-img{
      vertical-align: middle;
    }
    &-icon{
      font-size: 40px;
      color: #1b6ace;
      margin-right: 8px;
    }
  }

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
    z-index: 9999;
    &:hover{
      opacity: 1;
    }
  }

  .oper-btn{
    position: fixed;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 24px;
    color: $fc3;
    cursor: pointer;
    transition: all .28s;
    z-index: 9999;
    &:hover{
      color: $green;
      font-size: 32px;
    }
  }

  .oper-container{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &-btn{
      width: 160px;
      margin: 0 10px;
      background: $mainC;
      border-color: $mainC;
      &:hover{
        opacity: .7;
      }
      &:active{
        opacity: 1;
      }
    }
    &-btn.green{
      background: $green;
      border-color: $green;
    }
  }

  .web-url{
    margin-top: 24px;
    // margin-bottom: 10px;
    width: 460px;
  }
  .hidden{
    opacity: 0;
    position: absolute;
    z-index: -999;
  }
  .dialog-title{
    line-height: 24px;
    font-size: 18px;
    // color: #303133;
    color: $fc0;
    >i{
      color: $success-c;
    }
  }

  .release-info{
    width: 90%;
    margin: 0 auto;
    &-title{
      text-align: center;
      margin-bottom: 16px;
    }
  }

}
</style>