<template>
  <div class="nav-my-web">
    <section>
      <div class="title">
        我的自定义网站
      </div>
      <ul class="web">
        <li
          v-for="item in diyList"
          :key="item.web_key" 
          class="web-item"
        >
          <div class="img">
            <img v-if="item.web_img" :src="item.web_img">
            <img v-else src="../../assets/web.jpg">
          </div>
          <div class="content">
            <div class="name">{{item.web_name || '我的网站'}}</div>
            <div class="footer">
              <span class="time">{{getTime(item.create_time)}}</span>
              <el-dropdown trigger="click" placement="bottom" @command="handleOper($event,item)">
                <span class="oper"><i class="el-icon-more"></i></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="see" icon="el-icon-view">查看</el-dropdown-item>
                  <el-dropdown-item command="edit" icon="el-icon-edit-outline">编辑</el-dropdown-item>
                  <el-dropdown-item command="delete" icon="el-icon-delete">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <section class="template">
      <div class="container">
        <div class="title">我的模板网站</div>
        <ul class="web">
          <li class="web-item">
            <div class="img">
              <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
            </div>
            <div class="content">
              <div class="name">第一个</div>
              <div class="footer">
                <span class="time">2038-382-1</span>
                <span>...</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
import { getMyWeb, deleteWeb } from '@/api/navMyWeb'
import { formatTime } from '@/utils/formatTime'
export default {
  name: 'navMyWeb',
 
  data () {
    return {
      diyList: [],
      templateList: [],
    }
  },

  created() {
    this.fetchData();
  },

  methods: {
    async fetchData(){
      this.fetchLoading = true;
      const res = await getMyWeb();
      this.fetchLoading = false;
      if(res.code === 10000){
        this.diyList = res.data.diyList;
        this.templateList = res.data.templateList;
      }
    },

    handleOper(oper, web){
      switch (oper) {
        case 'see':
          this.handleToSee(web);
          break;
        case 'edit':
          this.handleEdit(web);
          break;
        case 'delete':
          this.handleDelete(web);
          break;
      }
    },

    handleToSee(web){
      let url = `${window.location.origin}/#/web?k=${web.web_key}`;
      window.open(url, '_blank');
    },

    handleEdit(web){
      this.$router.push({ name: 'buildingDiy', params: { web, isEdit: true } });
    },

    handleDelete(web){
      this.$confirm('', '是否删除该网站', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            let params = {
              key: web.web_key
            }
            deleteWeb(params).then((res) => {
              if(res.code === 10000){
                this.fetchData();
                this.$message.success('删除成功');
                done();
              }
            }).finally(() => {
              instance.confirmButtonLoading = false;
            });
          } else {
            done();
          }
        }
      }).then(() => {}).catch(() => {});
    },

    getTime(time){
      return formatTime(time)
    }
  }
 
}
</script>
<style lang='scss' scoped>
.nav-my-web{
  .title{
    margin-bottom: 24px;
    color: $mainC;
    padding-left: 8px;
    border-left: 4px solid $mainC;
  }

  .web{
    display: flex;
    flex-wrap: wrap;

    &-item{
      width: 258px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      border: 1px solid #EBEEF5;
      background-color: #FFFFFF;
      overflow: hidden;
      color: $fc1;
      transition: 0.3s;
      margin-right: 16px;
      margin-bottom: 16px;

      .img{
        height: 130px;
        overflow: hidden;
        border-bottom: 1px solid $line-c;
        >img{
          width: 100%;
          height: auto;
          min-height: 130px;
        }
      }

      .content{
        padding: 16px;

        .name{
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 8px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .footer{
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: $fc2;
          .time{
            font-size: 14px;
          }
          .oper{
            cursor: pointer;
            &:hover{
              color: rgb(27, 128, 236);
            }
          }
        }
      }
    }
  }

  .template{
    margin-top: 32px;
    position: absolute;
    width: 100%;
    background: #f7f7f7;
    left: 0;
    padding-bottom: 40px;

    .container{
      width: $cw;
      margin: 0 auto;
      padding-top: 16px;
    }
  }
}
</style>