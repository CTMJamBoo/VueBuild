<template>
  <div class="about">
    <!--头部-->
    <div class="header">
      <div class="left">
        <span @click="toHome" class="iconfont icon-shouyex"></span>
        <span>商城账号</span>
      </div>
      <div class="iconfont icon-gouwuche" @click="toCartList"></div>
    </div>
    <!--个人管理-->
    <div class="center">
      <img src="@/assets/img/user.jpg" alt="">
      <span @click="toLogin" class="username">{{userInfo ? userInfo.username : '请登录！'}}</span>
    </div>
  <!--我的订单-->
    <div class="form">
      <span class="myform">我的订单</span>
      <span class="blue" @click="toCartList">查看全部</span>
    </div>
    <!--状态-->
    <div class="state">
      <div v-for='(item,index) in stateList' :key='index'>
        <div class="icons" :class="item.icon"></div>
        <span>{{item.name}}</span>
      </div>
    </div>

    <!--退出-->
    <div class="onExit" @click="onExit">退出登录</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo:null,
      stateList:[
        {
          icon:'iconfont icon-daifukuan',
          name:'待付款'
        },
        {
          icon:'iconfont icon-daifahuo',
          name:'代发货'
        },
        {
          icon:'iconfont icon-daipingjia',
          name:'待收货'
        },
        {
          icon:'iconfont icon-yifahuo',
          name:'已完成'
        },
        {
          icon:'iconfont icon-shouhou',
          name:'售后'
        },
        ]
    }
  },
  methods: {
    toCartList(){
      this.$router.push('/cartList')
    },
    //请求获取用户信息
    reqUserInfo(){
      this.$axios.post('/native/api/user/t/info',{
        token:this.token 
      })
      .then((res)=>{
        const {code,msg,info} =res

        if(code==1){
          this.userInfo =info
        }else{
          // this.$Toast(msg)
        }
      })
    },
    toHome(){
      this.$router.push('/home')
    },
    toLogin(){
      if(!this.userInfo){
        this.$router.push('/login')
      }
    },
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
    toCartList(){
       this.$router.push(this.token?'/cartList':'/login')
    }
  },
  activated(){
     
  },
  mounted() {
    this.token = localStorage.getItem('token')
    this.reqUserInfo()
  },

}
</script>
<style lang="scss" scope>
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    height: 0.8rem;
    padding: 0 0.2rem;
    border-bottom: 1px solid #ddd;
    box-shadow: 0px 1px 7px 0px #ddd;
    font-weight: 900;
        box-sizing: border-box;
    .left{
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: nowrap;
      width: 3rem;
        box-sizing: border-box;
      span{
        font-size: 0.4rem;
      }
    }
    .iconfont{
      font-size: 0.5rem;
    }
  }
  .center{
    height: 2rem;
    text-align: center;
    position: relative;
    border-bottom: 1px solid #eee;
        box-sizing: border-box;
    img{
      position:absolute;
      top:50%;
      left: 0.3rem;
      transform:translateY(-50%);
      width: 1.5rem;
      height: 1.5rem;
      object-fit: cover;
    }
    .username{
      position:absolute;
      color: brown;
      top:50%;
      left: 2.2rem;
      transform:translateY(-50%);
      font-size: 0.3rem;

    }
  }
  .form{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 0.2rem 0.2rem;
    margin-top: 0.4rem;
    // margin-bottom: 0.2rem
    border-bottom: 1px solid #eee;
        box-sizing: border-box;
    .myform{
      font-size: 0.5rem;
      font-weight: 800;
      color: #000;
    }
    .blue{
      font-size: 0.3rem;
    }
  }
  .state{
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 0.3rem;
    height: 1.8rem;
    border-bottom: 1px solid #eee;
        box-sizing: border-box;
    .icons{
      font-size: 0.5rem;
    }
  }
  .onExit{
    color: white;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    background-color: red;
    width: 90%;
    box-sizing: border-box;
    border-radius: 0.3rem;
    margin: auto;
    margin-top: 5.3rem;
    margin-bottom: 0.6rem;
        box-sizing: border-box;
  }
</style>