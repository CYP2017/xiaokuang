<template>
  <!-- <div>  -->
  <el-menu @select="menuSelect" :default-active="route" :router="true" background-color="#313541" text-color="#707783" active-text-color="#f6f5fa" style="border-radius:none">
    <el-menu-item-group key="zhgl" v-if="userInfo.user_permission.indexOf('zhgl') != -1">
      <el-menu-item index="account">
        <i class="el-icon-menu"></i>帐户管理
      </el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group key="cssz" v-if="userInfo.user_permission.indexOf('cssz') != -1">
      <el-menu-item index="arguments">
        <i class="el-icon-location"></i>参数设置
      </el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group key="sftj" v-if="userInfo.user_permission.indexOf('sftj') != -1">
      <el-menu-item index="receive">
        <i class="el-icon-document"></i>收付统计
      </el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group key="bbgl" v-if="userInfo.user_permission.indexOf('bbgl') != -1">
      <el-menu-item index="statement">
        <i class="el-icon-more"></i>报表管理
      </el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group key="gggl" v-if="userInfo.user_permission.indexOf('gggl') != -1">
      <el-menu-item index="notice">
        <i class="el-icon-message"></i>公告管理
      </el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group key="zjgl" v-if="userInfo.user_permission.indexOf('zjgl') != -1">
      <el-menu-item index="money">
        <i class="el-icon-tickets"></i>资金管理
      </el-menu-item>
    </el-menu-item-group>
  </el-menu>
  <!-- </div> -->
</template>

<script>
import Vue from "vue";
import { getUserInfo } from "@/utils/apiUtils";
import { Button, Menu, MenuItem, MenuItemGroup, Icon } from "element-ui";
Vue.use(Button);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Icon);

export default {
  name: "SideBar",
  data() {
    return {
      msg: "account",
      userInfo: {}
    };
  },
  computed: {
    route() {
      return this.$route.name.toLowerCase();
    }
  },
  created() {
    this.userInfo = getUserInfo();
  },
  methods: {
    menuSelect(i) {
      // console.log(this.$route.path);
      // console.log(this.$route.path);
      // window.location.href = `/${i}`;
      // this.$router.push(i);
      // this.$emit("routerChange", i);
    }
  }
};
</script>

<style scoped>

</style>
