<template>
    <div class="goodsDetail">   
         <div class="header">
             <div class="iconfont icon-xiangzuo" @click="prev()"></div>
            <div class="iconfont icon-gouwuche" @click="toCartList"></div>
         </div>

        <!--渲染列表-->
        <div>
            <div class="swiper">
                <mt-swipe :auto="0">
                    <mt-swipe-item v-for="(item,index) in swiperItems" :key='index'>
                        <img v-lazy="item.image_id" alt="">
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <!--title-->
            <div class="commodity-metax">
                <div class="goodsTitle">{{goodsList.title}}</div>
                <span class="goodsPrice">￥{{parseInt((goodsList.price).substring(1))}}</span>
            </div>
            <!--brief简介-->
            <div class="brief">
                <p>商品编号：<span>{{goodsList.goods_bn}}</span></p>
                <div v-html='text1'></div>
            </div>
            <!--产品参数-->
            <div class="product" @click="toProduct">
                <span>产品参数</span>
                <img src="@/assets/img/xiangyou.png" alt="">
            </div>
            <!--产品参数隐藏板块-->
            <mt-popup v-model="isModule" position="bottom" popup-transition="popup-fade">
                <div class="product_cs">产品参数</div>
                    <div>
                        <ul v-for='(key,index) in productList' :key='index'>
                            <li class="product_module">
                                <span>{{key.name}}</span>
                                <span class="left">{{key.value}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="sure" @click="toProduct">确定</div>
            </mt-popup>
            <!--规格参数-->
            <!-- <div class="section-description">
                <div class="specs">
                    <table>
                        <thead>
                            <tr v-for="(item,index) in text2.prop_names" :key='index'>
                                <th>{{item}}</th>
                            </tr>
                        </thead>
                        <tbody v-for="(item,index) in text2.prop_values" :key='index'>
                            <tr>
                                <th></th>
                                <td>{{item}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div> -->
        </div>

         <div class="footer">
             <div class="serve" @click="toServer">
                 <span class="iconfont icon-serve"></span>
                 <span>客服</span>
             </div>
             <div class="btns">
                 <button @click="showAdd">加入购物车</button>
                 <button>立即购买</button>
             </div>
         </div>
          <!--购物车模板-->
            <mt-popup v-model="isAdd" position="bottom" popup-transition="popup-fade">
                <div class="buydetail">
                    <div class="detailTitle">
                        <img class="smallImg" v-lazy="this.goodsList.image_default_id" alt="">
                        <div class="goods">
                            <p class="goods_title">{{this.goodsList.title}}</p>
                            <p class="goods_price">￥{{parseInt((this.goodsList.price).substring(1))}}</p>
                        </div>
                    </div>
                    <div class="addInfo">
                        <div class="color_info" v-show='isInfo'>
                            <div class="color_title">{{this.list1[0].name}}</div>
                            <div class="color_sku" v-for="(val,index) in colorList" :key='index'
                             :class="{active: val == buyColor}"
                            @click="chooseColor(val)"
                            >
                                <span>{{val}}</span>
                            </div>
                        </div>
                        <div class="sku_info" v-show='isInfo'>
                            <div class="sku_title">{{this.list2[0].name}}</div>
                            <div class="sku_skus" v-for="(item,index) in typeList" :key='index'
                            :class="{active: item == buySku}"
                            @click="chooseSku(item)"
                            >
                                <span>{{item}}</span>
                            </div>
                        </div>
                        <div class="num_info">
                            <div>数量</div>
                            <div class="num">
                                <span @click="onDecrease" class="iconfont decrease icon-jian"></span>
                                <span class="val">{{buyNum}}</span>
                                <span @click="onIncrease" class="iconfont increase icon-jia1"></span>
                            </div>
                        </div>
                    </div>
                    <div class="addCart" @click="onAdd">确定</div>
                </div>
            </mt-popup>


    </div>
</template>

<script>
    export default {
        data() {
            return {
                isInfo:true,
                buyNum:1,
                buyColor:'',
                buySku:'',
                goodsId:'',
                swiperItems:'',
                detailList:'',
                goodsList:'',
                text1:`<p>${this.text1}</p>`,
                productList:'',
                text2:[],
                isModule:false,
                token:'',
                isAdd:false,
                goodsDetail:[],
                typeList:[],
                colorList:[],
                list1:[],
                list2:[]
            }
        },
        methods: {
            prev(){
                this.$router.go(-1)
            },
            //获取商品详情
            reqGoodsDetail(){
                const {goodsId} =this.goodsId
                // console.log(goodsId)
                return this.$axios.get('/lijiang/api/ec-api/api',{
                    params:{
                            app_key: 'mujiryohin',
                            method: 'mapi.goods.goods.get_goods_details',
                            product_id: goodsId,
                            sign: '639AC2040F9574EA58C5791D1D9913CD'
                    }
                })
                .then((objs)=>{
                    // console.log(objs)
                    const {rsp,res,data} =objs
                    
                    if(rsp=='succ'){
                        //图片集合
                      this.swiperItems= data.response.product.images
                      //商品名称、价格集合
                      this.goodsList = data.response.product
                    //   console.log(this.goodsList)
                      //商品简介
                      this.text1 = this.goodsList.brief
                      this.text1 = this.text1.split(/\\n/)
                      this.text1 = this.text1.join('')
                      //产品参数集合
                      this.productList = this.goodsList.props
                    //   console.log(this.goodsList)
                      const arr=[]
                      for(const key in this.productList){
                          arr.push(this.productList[key])
                      }
                      let arr2=[]
                      let arr3=[]
                    arr2 =arr.slice(0,2)
                    arr3=arr.slice(3,7) 
                    arr2=arr2.concat(arr3)
                    arr2.unshift({
                        name:'商品名称',
                        value:this.goodsList.title
                    })
                    //产品参数集合
                    this.productList = arr2
                    // console.log(this.productList)
                    //产品参数text2
                    // this.text2 = this.goodsList.props_table
                    // console.log(this.text2)
                     this.list1 = this.productList.slice(1,2)
                    // console.log(this.list1)
                   for(const key in this.list1){
                       this.colorList.push(this.list1[key].value)
                   }
                   if(!this.colorList){
                       this.isInfo = false
                   }
                   this.colorList= this.colorList.join(',')
                   this.colorList = this.colorList.split(' ')
                //    console.log(this.colorList)
                    this.list2 = this.productList.slice(2,3)
                    for(const key in this.list2){
                        this.typeList.push(this.list2[key].value)
                    }
                    // console.log(this.typeList)
                    this.typeList= this.typeList.join('')
                    this.typeList = this.typeList.split('/')
                    }else{
                        this.$Toast(res)
                    }
                })
            },
            toProduct(){
                this.isModule = !this.isModule
            },
            //组件初始化的操作
            initComponent(){
                //获取传入的商品ID
                this.goodsId = this.$route.params
            },
            //判断token是否存在
            toServer(){
                this.$router.push(this.token?'/error':'/login')
            },
            showAdd(){
                // console.log(this.token)
                if(!this.token){
                    this.$Toast({
                        message:'请登录',
                        duration:700
                    })
                    setTimeout(()=>{
                        //未登录，自动跳转到登录页
                        this.$router.push('/login')
                    },800)
                    return false
                }
                this.isAdd = !this.isAdd
            },
             //选择颜色
            chooseColor(newColor){
                const oldColor = this.buyColor

                if(!oldColor){
                    this.buyColor = newColor
                }else if(oldColor==newColor){
                    this.buyColor=''
                }else{
                    this.buyColor = newColor
                }
            },
             //选择规格
            chooseSku(newSku){
                const oldSku = this.buySku

                if(!oldSku){
                    this.buySku = newSku
                }else if(oldSku==newSku){
                    this.buySku=''
                }else{
                    this.buySku = newSku
                }
            },
            //onDecrease数量减
            onDecrease(){
                if(this.buyNum==1){
                    this.$Toast({
                        message:'商品数量不能小于1',
                        duration:2000
                    })
                }else{
                    this.buyNum--
                }
            },
            // onIncrease数量加
            onIncrease(){
                this.buyNum++
            },
            //点击添加到购物车
            onAdd(){
                const {token,buySku,buyColor,buyNum} = this
                const product_id =this.goodsList.product_id
                const title = this.goodsList.title
                const price = parseInt((this.goodsList.price).substring(1))
                const img = this.goodsList.image_default_id
                if(this.isInfo){
                    if(!buyColor || !buySku){
                        this.$Toast({
                            message:'请选择商品颜色或者规格',
                            duration:2000
                        })
                        //阻止代码向下运行
                        return false
                    }
                    //发出请求
                    // console.log(token,product_id,buySku,buyColor,buyNum,title,price,img)
                    this.$axios.post('/native/api/cart/t/add',{
                        token,product_id,buySku,buyColor,buyNum,title,price,img
                    })
                    .then((res)=>{
                        const {code,msg} = res

                        if(code==1){
                            this.$Toast({
                                message:msg,
                                duration:2000
                            })
                            this.isAdd=false
                        }else if(code==-1){
                            this.$Toast(msg)
                        }else if(code==-2){
                            this.$Toast(msg)

                            setTimeout(() => {
                            //未登录，自动跳转到登录页
                            this.$router.push('/login')
                            }, 800);
                        }
                    })
                }
            },
            //跳转到购物车页面
            toCartList(){
                this.$router.push(this.token?'/cartList':'/login')
            },
            
        },
        mounted() {
        //  获取local storage中的token
            this.token = localStorage.getItem('token')
            this.initComponent()
            this.reqGoodsDetail()
        },
        
    }
</script>

<style lang="scss" scoped>
    li{
        list-style: none;
    }
    .left{
        text-align: left;
        width: 80%;
        color: #000!important;
        font-weight: 500;
    }
    .header{
        position: sticky;
        top: 0;
        left: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.2rem;
        height: 0.6rem;
        border-bottom: 1px solid #eee;
        background-color: #fff;
        z-index: 888;
        box-sizing: border-box;
        .icon-xiangzuo{
            font-size: 0.4rem;
            font-weight: 600;
        }
        .icon-gouwuche{
             font-size: 0.4rem;
             font-weight: 600;   
        }
    }

    .swiper{
        height: 6rem;
        width: 100%;
        background-color: #0ff;
         /deep/.mint-swipe{
             img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
             .mint-swipe-indicator{
                width: 0.1rem;
                height: 0.1rem;
                background-color: #fff;
                opacity: 1;
                &.is-active{
					background-color: #000;
				}
            }
        }
    }

    .commodity-metax{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 0.4rem;
        font-size: 0.28rem;
        box-sizing: border-box;
        span{
            margin-top: 0.2rem;
            font-weight: 800;
        }
    }
    .brief{
        text-align: left;
        padding: 0.1rem 0.2rem;
        background-color: #eee;
    }
    .product{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:0.1rem 0.2rem;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        span{
            font-size: 0.3rem;
            color: #000;
        }
        img{
            width: 0.4rem;
        }
    }
    .mint-popup{
            width: 100%!important;
            position:fixed;
            right: 0;
            bottom: 0;
    }
    .product_cs{
        padding: 0.1rem;
        font-weight: 800;
    }
    .product_module{
        width: 100%;
        display: flex;
        // flex-direction: column;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #eee;
        box-sizing: border-box;
        span{
            padding: 0.1rem;
            color: #777;
        }
    }
    .sure{
        width: 80%;
        margin:0.2rem auto;
        background-color: brown;
        color: white;
        text-align: center;
        line-height: 0.5rem;
        border-radius: 0.3rem;
        box-sizing: border-box;
    }

    .footer{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1rem;
        padding: 0 0.3rem;
        position:fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        border-top: 1px solid #eee;
        background-color: #fff;
        box-sizing: border-box;
        .serve{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            .icon-serve{
                font-size: 0.4rem;
            }
        }
        .btns{
            width: 85%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            button{
                background-color: brown;
                border: none;
                width: 45%;
                color: white;
                font-weight: 900;
                font-size: 0.3rem;
                height: 0.6rem;
                border-radius: 0.4rem;
                outline: none;
            }
        }
    }
    .buydetail{
        .detailTitle{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.2rem;
            box-sizing: border-box;
            .smallImg{
                width: 1.5rem;
                height: 1.5rem;
                object-fit: cover;
            }
            .goods{
                height: 0.8rem;
                width: 75%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;
            }
        }
        .addInfo{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            padding: 0.2rem;
            text-align: left;
            box-sizing: border-box;
            .color_info,.num_info,.sku_info{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.2rem;
                box-sizing: border-box;
            }
            .color_sku,.sku_skus{
                color: black;
                border: 1px solid gray;
                border-radius: 0.25rem;
                line-height: 0.4rem;
                margin-left: 0.2rem;
                padding: 0 0.1rem;
                &.active{
                    border-color: brown;
                    color: brown;
                }
            }
            .num{
                margin-left: 0.2rem;
                border: 1px solid #eee;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-radius: 0.25rem;
                 line-height: 0.5rem;
                 width: 1.5rem;
                 padding: 0 0.2rem;
                span{
                    font-size: 0.3rem;
                }
            }
        }
        .addCart{
            background-color: brown;
            color: #fff;
            border-radius: 0.3rem;
            width: 90%;
            line-height: 0.5rem;
            margin: auto;
            margin-bottom: 0.2rem;
        }
    }
    
</style>