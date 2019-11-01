<template>
    <div class="goodsList">
        <!--header-->
        <!-- <div class="header">111</div> -->
         <!--分类-->
        <div class="classify">
            <div class="slide">
                <div class="item_slide" v-for="(item,index) in classify" :key='index'>
                    <span>{{item.virtual_cat_name}}</span>
                </div>
            </div>
        </div>
        <!--综合排序排序-->
        <div class="sort">
            <div v-for="(item,index) in sort" :key='index'
            @click="onSort(item.sign,item.p_order)"
            >
                <span>{{item.name}}</span>
            </div>
        </div>
         <mt-loadmore :top-method="loadTop"  :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
            <div class="goodsLists" >
                <div class="item" v-for='(item,index) in goodsList' :key='index' 
                @click="toDetail(item.products.product_id)"
                >
                    <div class="itemImg">
                        <img v-lazy="item.s_url" alt="">
                    </div>
                    <p class="title">{{item.name}}</p>
                    <div class="price_num">
                        <span>￥{{parseInt(item.products.price)}}</span>
                        <span class="mktprice">{{item.products.mktprice ? '￥'+parseInt(item.products.mktprice) : ''}}</span>
                    </div>
                </div>
            </div>
        </mt-loadmore> 

        <!--回到顶部-->
        <BackToTop />
    </div>
</template>

<script>
    import BackToTop from '@/components/BackToTop.vue'
    
    export default {
        data(){
            return{
                allLoaded:false,
                scrollObj:window,
                classifyId:'',
                sign1:'',
                sign2:'',
                classify:[],
                p_order:'',
                sort:[
                {
                    name:'综合排序',
                    sign:'E7F70D05A320F3B2BF6FAC64A61935E3',
                    p_order:'last_modify desc'
                },
                {
                    name:'按新品',
                    sign:'E7F70D05A320F3B2BF6FAC64A61935E3',
                    p_order:'last_modify desc'
                },
                {
                    name:'按销量',
                    sign:'6D3E9B1AA7055EACE553C9E83B921B87',
                    p_order:'buy_count desc'
                },
                {
                    name:'按价格',
                    sign:'price',
                    p_order:'54434DD30A7A1D60D0A14CFB635DD1A2'
                }
                ],
                goodsList:[],
                req_pages:1
            }
        },
        //配置子组件
        components:{
            BackToTop
        },
        /*
            计算属性，就是根据data中某个变量去变的属性
            使用方法和data中的变量一样，可以直接放在小胡子中
        */
       computed: {
           
       },
        methods: {
            initComponent(){
             // 获取传入的商品分类ID
                const {classifyId,sign1,sign2} = this.$route.params
                this.classifyId = classifyId
                this.sign1 = sign1
                this.sign2 = sign2
            },
            getGoodsList(){
                return  this.$axios.get('/lijiang/api/ec-api/api',{
                    params:{
                        app_key: 'mujiryohin',
                        method: 'mapi.goods.goods.get_goods_gallery',
                        virtual_cat_id: this.classifyId,
                        req_pages: this.req_pages,
                        req_number: 20,
                        p_order:'',
                        sign: this.sign1
                    }
                })
                .then((objs)=>{
                    const {rsp,res,data} = objs
                    // console.log(objs)
                    if(rsp=='succ'){
                        this.goodsList = data.response.goods_list
                        // console.log()
                       
                    }else{
                        console.log(res)
                    }
                })
            },
            //分类title
            getClassify(){
                this.$axios.get('/lijiang/api/ec-api/api',{
                    params:{
                        app_key: 'mujiryohin',
                        method: 'mapi.goods.cat.get_goods_virtual_category',
                        virtual_cat_id: this.classifyId,
                        sign: this.sign2
                    }
                })
                .then((objs)=>{
                     const {rsp,res,data} = objs
                    // console.log(objs)
                     if(rsp=='succ'){
                        this.classify = data.response
                        //    console.log(data)
                        this.classify.unshift({
                            virtual_cat_name:'全部',
                            sign:'F5363EEA90BBF45854B38C9D52BBA0F6',
                            virtual_cat_id:7
                        })
                    }else{
                        console.log(res)
                    }
                })
            },
            //刷新
            loadTop(){
                this.getGoodsList()
                // 关闭顶部的loading
                this.$refs.loadmore.onTopLoaded();
                // 打开上拉加载更多
                this.allLoaded = false
                // 让容器滚回顶部
                // this.$refs.goodsList.scrollTo(0,0)
            },
            onSort(sign,order){
                //获取旧的排序依据
                const oldOrder = this.p_order
                
                //没有进行排序
                if(!oldOrder){
                    this.p_order = order
                }
                this.loadTop('排序')
            },
            toDetail(id){
                this.$router.push({
                    name:'goodsDetail',
                    params:{
                        goodsId:id
                    }
                })
            }
        },
        mounted() {
            this.initComponent()
            this.getGoodsList()
            this.getClassify()
            this.loadTop()
            //传入回到顶部的滚动对象
            this.scrollObj = this.$refs.goodsList
        },
        
    }
</script>

<style lang="scss" scoped>
    .goodsLists{
        display: flex;
        justify-content: space-between;
        // align-items: center;
        flex-wrap: wrap;
        margin: 0.2rem 0;   
      box-sizing: border-box;
        .item{
            width: 30%;
            // height: 4.5rem;
            margin: 0 0.1rem;
            .itemImg{
                width: 100%;
                height: 2rem;
                // object-fit: cover;
                margin-bottom: 0.1rem;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
           .title{
               width: 100%;
               text-align: left;
            //    height: 0.8rem;
               margin-bottom: 0.1rem;
           }
            .price_num{
                margin-bottom: 0.1rem;
                span{
                    margin-right: 0.2rem;
                }
                .mktprice{
                    text-decoration: line-through;
                }
            }
        }
    }
    .sort{
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 0.5rem;
        border-bottom: 1px solid #eee;
        padding: 0 1rem;
        
      box-sizing: border-box;
        span{
            color: #666;
        }
    }
    .classify{
        border-bottom: 1px solid #eee;
        height: 0.5rem;
        line-height: 0.5rem;
        padding: 0 0.1rem;
        
      box-sizing: border-box;
      .slide{
        display: flex;
        overflow: auto;
        .item_slide{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 0.1rem;
            
      box-sizing: border-box;
            span{
                // width: 1.7rem;
                padding: 0 0.1rem;
                 white-space: nowrap;
            }
        }
      }
        span{
            color: #666;
        }
    }
</style>