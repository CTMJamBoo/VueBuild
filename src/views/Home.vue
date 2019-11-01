<template>
  <div class="home">
    <!--导航栏-->
    <div class="nav">
       <div class="login">
         <img src="@/assets/img/logo_muji_b.png" alt="">
       </div>
         <div class="icons">
           <i @click="toSearch" class="iconfont icon-sousuo"></i>
          <!-- <i class="iconfont icon-quanbu"></i>
          <i class="iconfont icon-daipingjia"></i>
          <i class="iconfont icon-gouwuche"></i> -->
       </div>
       <div class="btns">
         <div class="state" v-if='!userInfo'>
            <router-link to="/register">注册</router-link> /
					  <router-link to="/login">登录</router-link>
         </div>
         <div class="state" v-else >
           <span @click="onAbout" class="iconfont icon-gerenzhongxin" ></span>/
           <span @click="onExit">退出</span>
           <!-- <button data-method="offset" data-type="auto" class="layui-btn layui-btn-normal">退出</button> -->
         </div>
       </div>
    </div>


    <!--轮播图-->
    <div>
      <Banner />
    </div>

    <!--列表-->
    <div>
       <div class="titles">
            <span>新到商品</span>
            <span class="blue" >查看全部</span>
        </div>
        <!--新到商品-->
        <div class="newGoodsList">
            <GoodsItems v-for="(item,index) in goodsList" :key="index" :item-info="item" />
        </div>
        <!--衣服杂货-->
        <div>
            <div class="classify_title">
              <span>{{classifyList0.virtual_cat_name}}</span>
              <span class="blue" @click="toList(classifyList0.virtual_cat_id,'73EBB89C7F98E52364A9ED024E047821','7FEB546125847AF16578F26A1640B202')">查看全部</span>
            </div>
            <div class='classify_list'>
              <div v-for='(item,index) in classifyDetail0' :key='index'
              @click="toList(item.virtual_cat_id,'46972E358B77B9C385019ECB21EE99C8','75FB68C863F8B9DC5C98336BD46928CB')"
              >
                <img v-lazy="item.icon" alt="">
                <span>{{item.virtual_cat_name}}</span>
              </div>
            </div>
           </div>
        <!--生活杂货-->
         <div>
            <div class="classify_title">
              <span>{{classifyList1.virtual_cat_name}}</span>
              <span class="blue" @click="toList(classifyList1.virtual_cat_id,'DDDDC2915ADE1CBA4592AB60080DC621','F5363EEA90BBF45854B38C9D52BBA0F6')">查看全部</span>
            </div>
            <div class='classify_list'>
              <div v-for='(item,index) in classifyDetail1' :key='index'
               @click="toList(item.virtual_cat_id,'AB490E967F508BA959EC2B3A46846D8D','AC5AF92DC8AE8E944E775A6130331ED1')"
              >
                <img v-lazy="item.icon" alt="">
                <span>{{item.virtual_cat_name}}</span>
              </div>
            </div>
        </div>
        <!--食品-->
        <div>
            <div class="classify_title">
              <span>{{classifyList2.virtual_cat_name}}</span>
              <span class="blue" @click="toList(classifyList2.virtual_cat_id,'E11FF43B1FE4887B6C8BDB32305F2679','D287A51FDCDEEE4FF611C1CE78ADFC02')">查看全部</span>
            </div>
            <div class='classify_list'>
              <div v-for='(item,index) in classifyDetail2' :key='index'
             @click="toList(item.virtual_cat_id,'A69B865885DDEE6DA927B05AF6A1AE71','AF419DB5FB49FECCC51FFB118667870D')"
              >
                <img v-lazy="item.icon" alt="">
                <span>{{item.virtual_cat_name}}</span>
              </div>
            </div>
        </div>

      <!--回到顶部-->
      <BackToTop />
      <!-- <Classifys></Classifys> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Banner from "@/components/Banner.vue";
// import Classifys from '@/components/Classifys.vue'
import GoodsItems from "@/components/GoodsItems.vue";
import BackToTop from '@/components/BackToTop.vue'

export default {
  name: "home",

  data() {
    return {
      userInfo:null,
      token:'',
      goodsList: [],
      swiperList:[],
      classifyList:[],
      classifyList0:[],
      classifyList1:[],
      classifyList2:[],
      classifyDetail0:[],
      classifyDetail1:[],
      classifyDetail2:[]
    }
  },
  components: {
    // HelloWorld,
    Banner,
    // Classifys,
    GoodsItems,
    BackToTop,
  },
  methods: {
    //请求获取用户信息
       reqUserInfo(){
        //  console.log(this.token)
         this.$axios.post('/native/api/user/t/info',{
           token:this.token
         })
         .then((res)=>{
           const {code,msg,info} =res

           if(code==1){
             this.userInfo = info
           }else{
             this.$Toast({
               message:msg,
               duration:800
             })
           }
         })
       },
    reqGoodsList() {
      this.$axios.get("/lijiang/api/ec-api/api", {
          params: {
            app_key: "mujiryohin",
            method: "mapi.goods.goods.get_goods_gallery",
            cat_id: 0,
            req_pages: 1,
            req_number: 10,
            p_order: "uptime desc",
            sign: "DE1600A055625CA7018D2CE03E6D9BF5"
          }
        })
        .then(objs => {
          const { rsp, res, data } = objs;
          if(rsp=='succ'){
             this.goodsList = data.response.goods_list;
            //  console.log(data)
          }else{
            this.$Toast(res)
          }
        });
    },
    //分类列表
    getVirtualCatId(){
        this.$axios.get('/lijiang/api/ec-api/api',{
            params:{
                app_key: 'mujiryohin',
                method: 'mapi.goods.cat.get_goods_virtual_category',
                virtual_cat_id: 0,
                sign: '077ECBF9138BF16C3E3B9CD94833590D'
            }
        })
        .then((objs)=>{
            const {rsp, res, data} =objs
            // console.log(data)
            if(rsp=='succ'){
              this.classifyList = data.response
                this.classifyList0 = this.classifyList[0]
                this.classifyDetail0 =this.classifyList0.child_catlist
              
                this.classifyList1 = this.classifyList[1]
                this.classifyDetail1 =this.classifyList1.child_catlist
              
                this.classifyList2 = this.classifyList[2]
                this.classifyDetail2 =this.classifyList2.child_catlist
               
            }else{
              console.log(res)
            }
        })
    },
    // //跳转到商品列表页
    toList(virtualCatId,num1,num2){
        const id = virtualCatId
        const sign1 = num1
        const sign2 = num2
				this.$router.push({name: 'goodsList',params: {classifyId: id,sign1:sign1,sign2:sign2}})
      },
      //  toLogin(){
      //    this.$router.push('/login')
      //  },
      //  toRegister(){
      //    this.$router.push('/register')
      //  },
       onExit(){
         
         if(this.userInfo){
            this.$MessageBox.confirm('确定退出登录?').then(action => {

              this.token =''
              this.token = localStorage.setItem('token','')
              this.userInfo=null
              // this.$Toast('退出成功')
          })
        }else{
          this.$Toast('用户未登录')
        }
       },
       onAbout(){
         this.$router.push('/about')
       },
       toSearch(){
         this.$router.push('/search')
       }
     
  },
  //监听组件实例的创建，可以获取this，但是dom节点还没有加载出来
  created() {
    
  },
  /*
    监听组件dom节点的加载，这个时候，dom节点全部加载完
    在这个生命周期函数中，做dom操作，以及Ajax请求
  */
  mounted() {
     //获取localStorage中的token
    this.token = localStorage.getItem('token')
    //获取已登录用户信息
    this.reqUserInfo()
    //获取商品列表
    this.reqGoodsList();
    //分类列表
    this.getVirtualCatId()

    // //热门搜索
    // this.toSearch()

    //从data中获取之前保存的滚动距离，并让页面自动回到这个位置
    const scrollTop = this.scrollTop
    window.scrollTo(0,scrollTop)
  },
  //监听组件视图的更新
  updated() {
    
  },
  //监听组件的销毁
  destroyed() {
    
  },
  //监听进入缓存组件
  activated() {
    //获取localStorage中的token
    // this.token = localStorage.getItem('token')
    //获取已登录用户信息
    // this.reqUserInfo()
    //获取商品列表
    // this.reqGoodsList();
    //分类列表
    // this.getVirtualCatId()

    // //热门搜索
    // this.toSearch()

    //从data中获取之前保存的滚动距离，并让页面自动回到这个位置
    // const scrollTop = this.scrollTop
    // window.scrollTo(0,scrollTop)

  },
  //监听离开缓存组件
  deactivated() {
    
  },
  //监听进入当前的路由组件
  beforeRouteEnter (to, from, next) {
    // 放你进来
    next()
  },
  //监听该组件被复用时调用
  beforeRouteUpdate(to,from,next){
    next()
  },
  //监听离开当前的路由组件
  beforeRouteLeave(to,from,next){
    //获取页面的滚动距离，并把它保存在当前组件的data中
     this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      next()
  },
  //监听当前组件中的数据变化
  watch: {
    isBack(newVal,oldVal){}
  },
};
</script>

<style lang="scss" scoped>
a{
  text-decoration: none;
  color:brown;
}
.blue{
  color:#60b3fa;
}
.home {
  
  .nav {
    // width: 100vw;
    height: 0.7rem;
    background-color: #eee;
    padding: 0 0.3rem;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .login{
      img{
        width: 2rem;
        height: 0.3rem;
      }
    }
      .icons{
        display: flex;
        justify-content: space-between;
        align-items: center;
        i{
          font-size: 0.4rem;
        }
    }
   .btns{
      .state{
        width: 1.5rem;
        height: 0.5rem;
        border: 1px solid brown;
        border-radius: 0.3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:0 0.2rem;
        box-sizing: border-box;
      }
   }
  }
  .classify_title{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.2rem;
      margin: 0.2rem 0;
      box-sizing: border-box;
    }
  .classify_list{
    // margin-bottom: 0.5rem;
    // float: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    box-sizing: border-box;
    div{
      width: 49%;
      height: 0.7rem;
      margin: 0.1rem 0;
      padding:0 0.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #eee;
      box-sizing: border-box;
    }
    img{
      width: 0.5rem;
      height: 0.5rem;
      object-fit: cover;
    }
    span{
      padding: 0 0.5rem;
    }
  }
  .newGoodsList{
      padding:0.2rem 0 0.2rem 0.2rem;
      display: flex;
      overflow: auto;//横向滚动
  }
}
</style>
