<template>
  <el-row
    class="main-header"
    :gutter="10"
    :style="{ 'height': height }">
    <div class="hide-on-small">
      <div class="logo-wrapper" @click="clickLogo"><div class="ic ic-logo"/></div>
      <div class="tool-wrapper">
        <!-- <div class="search-field">
          <el-input
            placeholder="검색"
            prefix-icon="el-icon-search"
            v-model="state.searchValue">
          </el-input>
        </div> -->
        <div class="button-wrapper" v-if="!isLogin">
          <el-button @click="clickSignup">
            <i class="el-icon-circle-plus-outline"/>
            <span>회원가입</span>
          </el-button>
          <el-button type="primary" @click="clickLogin">
            <i class="el-icon-key"/>
            <span>로그인</span>
          </el-button>
        </div>
        <div class="button-wrapper" v-if="isLogin">
          <el-button type="primary" @click="clickLogout">
            <i class="el-icon-switch-button"/>
            <span>로그아웃</span>
          </el-button>
        </div>
      </div>

    </div>
    <div class="hide-on-big">
      <div class="menu-icon-wrapper" @click="changeCollapse"><i class="el-icon-menu"></i></div>
      <div class="logo-wrapper" @click="clickLogo"><div class="ic ic-logo"/></div>
      <!-- <div class="menu-icon-wrapper"><i class="el-icon-search"></i></div> -->
      <div class="mobile-sidebar-wrapper" v-if="!state.isCollapse">
        <div class="mobile-sidebar">
          <div class="mobile-sidebar-tool-wrapper"  v-if="!isLogin">
            <div class="logo-wrapper"><div class="ic ic-logo"/></div>
            <el-button type="primary" class="mobile-sidebar-btn login-btn" @click="clickLogin">
              <i class="el-icon-key"/>
              <span>로그인</span>
            </el-button>
            <el-button class="mobile-sidebar-btn register-btn" @click="clickSignup">
              <i class="el-icon-circle-plus-outline"/>
              <span>회원가입</span>
            </el-button>
          </div>
          <div class="mobile-sidebar-tool-wrapper"  v-if="isLogin">
            <div class="logo-wrapper"><div class="ic ic-logo"/></div>
            <el-button type="primary" class="mobile-sidebar-btn login-btn" @click="clickLogout">
              <i class="el-icon-switch-button"/>
              <span>로그아웃</span>
            </el-button>
          </div>
          <el-menu
            :default-active="String(state.activeIndex)"
            active-text-color="#58ACFA"
            class="el-menu-vertical-demo"
            @select="menuSelect">
            <el-menu-item v-for="(item, index) in state.menuItems" :key="index" :index="index.toString()">
              <i v-if="item.icon" :class="['ic', item.icon]"/>
              <span>{{ item.title }}</span>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="mobile-sidebar-backdrop" @click="changeCollapse"></div>
      </div>
    </div>
  </el-row>
</template>
<script>
import { reactive, computed, onUpdated } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'main-header',

  props: {
    height: {
      type: String,
      default: '70px'
    },
    isLogin:{
      type: Boolean
    }
  },

  setup(props, { emit }) {
    // console.log(props)
    const store = useStore()
    const router = useRouter()
    const state = reactive({
      searchValue: null,
      isCollapse: true,
      menuItems: computed(() => {
        const MenuItems = store.getters['root/getMenus']
        let keys = Object.keys(MenuItems)
        let menuArray = []
        for (let i = 0; i < keys.length; ++i) {
          let menuObject = {}
          menuObject.key = keys[i]
          menuObject.icon = MenuItems[keys[i]].icon
          menuObject.title = MenuItems[keys[i]].name
          menuObject.path = MenuItems[keys[i]].path
          menuObject.children = MenuItems[keys[i]].children
          menuObject.hidden = MenuItems[keys[i]].hidden

          const token = localStorage.getItem('accessToken')
          if(MenuItems[keys[i]].hidden==true){ //로그인 유저에게만 보여지는 메뉴이면
            if(token!=null){ //로그인되어있다면
              menuArray.push(menuObject)
              MenuItems[keys[i]].hidden = false
              menuObject.hidden = false
            }
          }
          else{
            menuArray.push(menuObject)
          }
        }

        //console.log(menuArray)
        return menuArray
      }),
      activeIndex: computed(() => store.getters['root/getActiveMenuIndex']),
    })

    if (state.activeIndex === -1) {
      state.activeIndex = 0
      store.commit('root/setMenuActive', 0)
    }

    const menuSelect = function (param) {
      store.commit('root/setMenuActive', param)
      // const MenuItems = store.getters['root/getMenus']
      // let keys = Object.keys(MenuItems)
      router.push({
        name: state.menuItems[param].key
      })
    }

    const clickLogo = () => {
      store.commit('root/setMenuActive', 0)
      const MenuItems = store.getters['root/getMenus']
      let keys = Object.keys(MenuItems)
      window.location = '/'
    }

    const clickLogin = () => {
      emit('openLoginDialog')
    }

    const clickSignup = () =>{
      emit('openSignupDialog')
    }
    const changeCollapse = () => {
      state.isCollapse = !state.isCollapse
    }

    const clickLogout = () =>{
      localStorage.removeItem('accessToken')
      window.location="/"
    }

    return { state, menuSelect, clickLogo, clickLogin, clickSignup, clickLogout, changeCollapse }
  }
}
</script>
<style>
  .main-header {
    padding: 10px 20px;
  }
  /*Mobile, Tablet*/
  .menu-icon-wrapper {
    display: inline-block;
    vertical-align: top;
    position: relative;
    top: 14px;
  }

  .main-header .hide-on-big .logo-wrapper {
    cursor: pointer;
    display: inline-block;
    margin: 0 calc(50% - 51px)
  }
  .main-header .hide-on-big .logo-wrapper .ic.ic-logo {
    width: 70px;
    height: 50px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('../../../assets/images/ssafy-logo.png');
  }
  .mobile-sidebar-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .mobile-sidebar-wrapper .mobile-sidebar {
    width: 240px; height: calc(100vh - 1px);
    display: inline-block;
    background-color: white;
    padding: 0 10px;
    vertical-align: top;
  }
  .mobile-sidebar-wrapper .mobile-sidebar .mobile-sidebar-tool-wrapper {
    padding-bottom: 20px;
  }
  .mobile-sidebar-wrapper .mobile-sidebar .mobile-sidebar-btn {
    display: block;
    margin: 0 auto;
    margin-top: 25px;
    height: 30px;
    width: 100%;
  }
  .mobile-sidebar-wrapper .mobile-sidebar .mobile-sidebar-btn.login-btn {
    color: white;
  }
  .mobile-sidebar-wrapper .mobile-sidebar .logo-wrapper {
    display: block
  }
  .mobile-sidebar-wrapper .mobile-sidebar .logo-wrapper .ic.ic-logo {
    width: 70px;
    height: 50px;
    margin: 0 auto;
    margin-top: 30px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('../../../assets/images/ssafy-logo.png');
  }
  .mobile-sidebar-wrapper .mobile-sidebar-backdrop {
    width: calc(100% - 260px); height: calc(100vh - 1px);
    background-color: black;
    display: inline-block;
    opacity: 0.3;
  }
  .mobile-sidebar-wrapper .el-menu{
    margin-top: 0;
    padding-left: 0;
    height: calc(100% - 235px);
  }
  .mobile-sidebar-wrapper .el-menu .el-menu-item {
    cursor: pointer;
  }
  .mobile-sidebar-wrapper .el-menu .el-menu-item .ic {
    margin-right: 5px;
  }

  /*Desktop - Need to add Class if Need*/
  .main-header .hide-on-small .logo-wrapper {
    cursor: pointer;
    display: inline-block;
  }
  .main-header .hide-on-small .logo-wrapper .ic.ic-logo {
    width: 70px;
    height: 50px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('../../../assets/images/ssafy-logo.png');
  }
  .main-header .hide-on-small .tool-wrapper {
    width: 50%;
    float: right;
  }
  .main-header .hide-on-small .tool-wrapper .button-wrapper {
    width: 45%;
    float: right;
  }
  .main-header .hide-on-small .tool-wrapper .button-wrapper .el-button {
    width: 45%;
    height: 50px;
    cursor: pointer;
    margin-right: 1%;
  }
  .main-header .hide-on-small .tool-wrapper .search-field {
    width: 50%;
    height: 50px;
    max-width: 400px;
    margin-right: 2%;
    display: inline-block;
    background-color: white;
  }
  .main-header .hide-on-small .tool-wrapper .search-field .el-input {
    width: 100%;
    height: 100%;
  }
  .main-header .hide-on-small .tool-wrapper .search-field .el-input .el-input__inner {
    width: 88%;
    height: 50px;
    margin-right: 1%;
  }
  .main-header .hide-on-small .tool-wrapper .search-field .el-input .el-input__prefix {
    top: 5px;
  }
  .mobile-sidebar-wrapper {
    z-index: 10;
  }
</style>
