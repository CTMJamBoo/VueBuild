<template>
    <div class="cartList">
        <div class="header">
             <div class="iconfont icon-xiangzuo" @click="prev()"></div>
            <div class="compile" @click="onCompile">{{isTool ? '完成' : '编辑'}}</div>
         </div>

         <!--渲染商品列表-->
          <div class="list_group_wrap">
              <div class="PageCartPartItems">
                  <div class="item" v-for="(item,index) in cartList" :key='index'>
                      <div class="item_wrap">
                          <div class="checkbox_wrap">
                              <img @click="chooseItem(item)" v-lazy="require('@/assets/img/' + (item.isChosen ? 'chosen' : 'unchosen') + '.png')" />
                          </div>
                          <div class="image_wrap">
                              <img v-lazy="item.goodsImg" alt="">
                          </div>
                          <div class="text_wrap">
                              <div class="title">{{item.goods_title}}</div>
                              <div class="options">
                                  <span>{{item.goodsColor}}</span>
                                  <span>{{item.goodsSku}}</span>
                              </div>
                              <div class="meta">
                                  <div class="price">￥{{item.goodsPrice}}</div>
                                  <div class="quantity">
                                    <span>数量：</span>
                                    <span @click='onCrease(item,subtract)' class="iconfont bgColor decrease icon-jian"></span>
                                    <span class="val">{{item.goodsNum}}</span>
                                    <span @click='onCrease(item,add)' class="iconfont bgColor increase icon-jia1"></span>
                                </div>
                              </div>
                          </div>
                      </div>
                    <div @click='delItem(item,index)' class="close" v-show="isTool">删除</div>
                  </div>
              </div>
          </div>
          <!--底部结算-->
            <div class="footer">
                <div class="text_wrap">
                    <div class="all_wrap">
                        <div class="check_wrap" @click="chooseAll">
                            <img class="all" v-lazy="require('@/assets/img/' + (isAll ? 'chosen' : 'unchosen') + '.png')"/>
                            <span>全选</span>
                        </div>
                        <div class="buyNum_wrap">
                            <span class="buyNum">{{chosenList|calcNum}}</span>
                            <span>件商品</span>
                        </div>
                    </div>
                    <div>
                        <span class="total">合计：￥</span>
                        <span class="total_price">{{chosenList|calcTotal|keepDouble}}</span>
                    </div>
                </div>
                <div class="buy" @click="getOver">去结算</div>

            </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                token:'',
                cartList:[],
                isTool:false,
                subtract:1,
                add:2,
                isChosen:false,
                // isAll:false,
                // isAdd:true
            }
        },
        computed: {
            isAll:{
                 //获取
               get(){
                   //获取全选的状态，其实就是判断每个选项是否都被选中
                   return this.cartList.length && this.cartList.every(e=>e.isChosen)
               },
               //更改
               set(newVal){
                   //改变全选的状态，其实就是让每个选项发生相同的改变
                   this.cartList.forEach(e=>e.isChosen = newVal)
               }
            },
            chosenList(){
                const result = this.cartList.filter(e=>e.isChosen)
                // console.log(result)
                return result
            }
        },
        //过滤器
        filters:{
            //合计
             calcTotal(list){
                //  console.log(list)
              return list.reduce((prevTotal,currItem)=>{
                  return prevTotal+currItem.goodsPrice*currItem.goodsNum
              },0)
          },
            //共几件商品
            calcNum(list){
               return list.reduce((prevTotal,currItem)=>{
                  return prevTotal+currItem.goodsNum
              },0)
            },
          //保留两位小数
            keepDouble(num){
                return num.toFixed(2)
            }
        },
        methods: {
            prev(){
                this.$router.go(-1)
            },
            //请求获取用户购物车列表
            reqCartList(){
                this.$axios.post('/native/api/cart/t/list',{
                    token:this.token
                })
                .then((res)=>{
                    const {code,msg,list} = res
                   
                    if(code == 1){
                        //给每个数组元素添加要给isChosen属性，表示该元素是否被选中
                        this.cartList = list.map((e)=>({
                            ...e,isChosen:false
                        }))
                        // console.log(this.cartList)
                    }else if(code == -1){
                        this.$Toast(msg)
                    }else if(code == -2){
                        this.$Toast(msg)
                        this.$router.push('/login')
                    }
                })
            },
            onCompile(){
                this.isTool = !this.isTool
            },
            //点击单选
            chooseItem(item){
                item.isChosen = !item.isChosen
            },
            //点击全选
            chooseAll(){
                this.isAll = !this.isAll
            },
            //数量加减
             onCrease(item,crease){
                if(crease == 1){//减
                    if(item.goodsNum==1){
                        this.$Toast('商品数量不能少于1件')
                    }else{
                        const goodsNum = item.goodsNum-1
                        //发出请求
                        this.$axios.post('/native/api/cart/t/update',{
                            token:this.token,
                            cartId:item._id,
                            goodsNum:goodsNum
                        })
                        .then((res)=>{
                            const {code,msg} =res

                            if(code==1){
                                this.$Toast(msg)
                                //请求成功之后才会改变页面商品数量参数
                                item.goodsNum = goodsNum
                            }else{
                                this.$Toast(msg)
                            }
                        })
                    }
                }else{//加
                    const goodsNum = item.goodsNum+1

                     //发出请求
                        this.$axios.post('/native/api/cart/t/update',{
                            token:this.token,
                            cartId:item._id,
                            goodsNum:goodsNum
                        })
                        .then((res)=>{
                            const {code,msg} =res

                            if(code==1){
                                this.$Toast(msg)
                                //请求成功之后才会改变页面商品数量参数
                                item.goodsNum = goodsNum
                            }else{
                                this.$Toast(msg)
                            }
                        })
                }
            },
            //删除
             delItem(item,index){
                this.$MessageBox.confirm('确定删除此商品?')
                .then(action=>{
                      this.$axios.post('/native/api/cart/t/del',{
                        token:this.token,
                        cartIds:item._id
                    })
                    .then((res)=>{
                        const {code,msg} = res

                        if(code==1){
                            this.$Toast(msg)

                            //请求成功之后才会删除页面数据
                            this.cartList.splice(index,1)
                        }else{
                            this.$Toast(msg)
                        }
                    })
                })   
            },
            getOver(){
                this.$MessageBox.alert('提敬请期待！', '提示');
            }
        },
        mounted() {
            this.token = localStorage.getItem('token')
            this.reqCartList()
        },
    }
</script>

<style lang="scss" scoped>
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.1rem 0.2rem;
        font-size: 0.3rem;
        color: brown;
        border-bottom: 1px solid #eee;
        z-index: 999;
        box-sizing: border-box;
        .icon-xiangzuo{
            font-size: 0.3rem;
        }
    }
    .item_wrap{
        margin-top: 0.1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        // padding: 0.1rem 0;
        .checkbox_wrap{
            padding: 0 0.3rem;
            img{
                width: 0.2rem;
                height: 0.2rem;
                object-fit: cover;
            }
        }
        .image_wrap{

            img{
                width: 1.5rem;
                height: 1.5rem;
                object-fit: cover;
            }
        }
        .text_wrap{
            width: 70%;
            padding: 0 0.2rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            box-sizing: border-box;
            .title{
                font-weight: 700;
            }
            .options{
                width: 60%;
                margin-top: 0.2rem;
                margin-bottom: 0.2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-sizing: border-box;
            }
            .meta{
                width: 80%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-sizing: border-box;
                .price{
                    font-weight: 700;
                }
                .quantity{
                    width: 2.5rem;
                    // background-color: #eee;
                    border-radius: 0.25rem;
                    line-height: 0.5rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 0.2rem;
                    box-sizing: border-box;
                    .val{
                        font-weight: 900;
                    }
                    .bgColor{
                        background-color: #eee;
                        border-radius: 0.1rem;
                    }
                }
            }
        }
    }
    .item{
        position: relative;
        .close{
            position: absolute;
            top: 0;
            right: 0;
            display: flex;
            align-items: center;
            background-color: #7f0019;
            color: white;
            width: 0.6rem;
            height: 1.5rem;
            padding-left: 0.25rem;
        box-sizing: border-box;
        }
    }
    .footer{
        position: fixed;
        bottom: 0;
        left: 0;
        border-top: 1px solid #ddd;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        padding: 0.2rem 0.2rem;
        box-sizing: border-box;
        .text_wrap{
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            // padding: 0 0.2rem;
            height: 0.8rem;
            width: 100%;
            box-sizing: border-box;
            .all_wrap{
                display:flex;
                justify-content: space-between;
                align-items: center;
                width: 40%;
                box-sizing: border-box;
                .check_wrap,.buyNum_wrap{
                    display:flex;
                    justify-content: space-between;
                    align-items: center;
                    box-sizing: border-box;
                    span{
                        margin-left: 0.1rem;
                        font-size: 0.3rem;
                        font-weight: 900;
                        color: black;
                    }
                }
                .all{
                    width: 0.3rem;
                    height: 0.3rem;
                    object-fit: cover;
                }
            }
            .total,.total_price{
                font-size: 0.3rem;
                font-weight: 900;
                color: black;
                
            }
            .total_price{
                color: red;
            }
        }
        .buy{
            width: 100%;
            height: 0.8rem;
            line-height: 0.8rem;
            text-align: center;
            font-size: 0.4rem;
            font-weight: 800;
            color: white;
            margin: auto;
            border-radius: 0.45rem;
            background-color: brown;
        box-sizing: border-box;
        }
    }
  
</style>