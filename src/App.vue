<template>
  <div id="app">
      <!-- 
			keeyp-alive是一个内置组件，用于缓存组件，但是不能记住滚动条的位置
			默认是对所有的路由组件进行缓存
			如果只想缓存某些组件，使用include，后面接组件的name
			如果不想缓存某个组件，使用exclude，后面接组件的name
		 -->
      <!-- <keep-alive include="home"> -->
         <router-view/>
      <!-- </keep-alive> -->
    
    <div id="footer" v-show='isNav'>
      <router-link to="/">
        <i class="iconfont icon-shouyex"></i><span>首页</span>
      </router-link> 
      <!-- <router-link to="/goodsList">
        <i class="iconfont icon-quanbu"></i><span>列表</span>
      </router-link> -->
      <router-link to="/cartList">
        <i class="iconfont icon-gouwuche"></i><span>购物车</span>
      </router-link>
       <router-link to='/about'>
        <i class="iconfont icon-gerenzhongxin"></i><span>我的</span>
       </router-link>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      isNav:false
    }
  },
  mounted() {
    const name =this.$route.name

    //初始化的时候，只在首页、商品和关于这几个路由中显示底部的导航
    this.isNav = /home|goodsList|about/.test(name)
  },
  watch:{
    $route(to,from){
      this.isNav = /home|goodsList|about/.test(to.name)
    }
  }
}
</script>
<style lang="scss">
//引入字体图标
	@import url(./assets/font/iconfont.css);
  .mint-toast{
		z-index: 10000 !important;
	}
  .red{
	color: red;
}
.gray{
	color: gray;
	text-decoration:line-through
}
  .blue{
        color:#60b3fa;
    }
  .titles{
    margin-top: 0.2rem;
    width: 100%;
    padding: 0 0.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;

}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
}
#footer {
  position: sticky;
  bottom: 0;
  left: 0;
  display: flex;
  border-top: 1px solid #777;
 
  
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 0.1rem;
  background: #fff;
  box-sizing: border-box;
  i{
    display: block;
    font-size: 0.3rem;
  }
  span{
    font-size: 0.2rem;
  }
  a {
    text-decoration: none;
    // font-weight: bold;
    color:#777;
    &.router-link-exact-active {
      color: brown;
    }
  }
}
</style>
