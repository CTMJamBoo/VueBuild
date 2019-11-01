<template>
    <div class="search">
        <!--搜索头部-->
        <div class="mtsearch">
            <div class="iconfont icon-xiangzuo" @click="prev()"></div>
           <div class="search">
               <div v-if='val' class="search_copy">{{this.search ? this.search : ''}}</div>
                <input v-else class="ipt" type="text" @keyup.enter="onSearch" v-model="search_val">
                
            </div>
            <!-- <a class="btn" href="/" @click.prevent.stop="onSearch">搜索</a> -->
        </div>

        <!--热门搜索-->
       <div v-if='!isType'>
            <div class="title">
                <span>热门搜索</span>
                <!-- <span class="blue" >换一批</span> -->
            </div>
            <div class="hotwords">
                <ul v-for='(item,index) in hotwords' :key='index'
                @click="onKey(item.search_key,item.sign)"
                >
                    <li>{{item.search_key}}</li>
                </ul>
            </div>
       </div>
       <!--搜索商品列表--> 
       <div v-else class="goodsList">
            <div class="goodsItem" v-for='(item,index) in goodsList' :key='index' >                
                <img class="smallImg" v-lazy="item.s_url" alt="">
                <p class="name">{{item.name}}</p>
                <p class="price-num">
                    <span class="price red">￥{{parseInt(item.products.price)}}</span>
                    <span class="mktPrice gray">{{item.products.mktprice ? '￥'+parseInt(item.products.mktprice) : ''}}</span>
                </p>
            </div>
            <!-- <GoodsItems v-for="(item,index) in goodsList" :key="index" :item-info="item" /> -->
       </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                isType:'',
                hotwords:[
                    {
                        search_key:'沙发',
                        sign:'F06AECD9728C6C67734120C6AA9D2FB6'
                    },
                    {
                       search_key:'睡衣',
                        sign:'91A1666105267D67FC89B3F096D0C2CC' 
                    },
                    {
                        search_key:'风扇',
                        sign:'3F6FFA9260375846AFC5409665721079'
                    },
                     {
                        search_key:'靠枕',
                        sign:'3FBA9C9CCCDEAB4D4DE46C831E8614B3'
                    },
                     {
                        search_key:'化妆水',
                        sign:'D90E6546A4382B67BE583205F9C5928D'
                    },
                ],
                value:'',
                search:'',
                val:'',
                search_val:'',
                goodsList:[]
            }
        },
        // components:{
        //     GoodsItems
        // }
        methods: {
            prev(){
                this.$router.go(-1)
            },
            //搜索
            getHotSearch(key,sign){
                this.$axios.get('/lijiang/api/ec-api/api',{
                    params:{
                    app_key: 'mujiryohin',
                    method: 'mapi.goods.goods.get_goods_gallery',
                    req_pages: 1,
                    req_number: 20,
                    search_key: key,
                    sign: sign
                    }
                })
                .then((objs)=>{
                const {rsp,res,data} =objs
                // console.log(data)
                if(rsp=='succ'){
                    this.goodsList = data.response.goods_list;
                    // console.log(this.goodsList)
                    }else{
                        this.$Toast(res)
                    }
                })
            } ,
            onKey(value,sign){
                this.val = !this.val
                this.isType = !this.isType
                this.search = value;
                this.getHotSearch(value,sign)
                // console.log(this.search)
            } 
        },
        mounted() {
            // this.onkey()
        },
    }
</script>

<style lang="scss" scoped>
.blue{
    color: aqua;
}
.title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.3rem 0;
    padding: 0 0.2rem;
    box-sizing: border-box;
}  
 
.mtsearch {
    position: sticky;
    top: 0;
    left: 0;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.7rem;
    padding: 0 0.1rem;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    .icon-xiangzuo{
        font-size: 0.4rem;
        color: brown;
    }
    .search{
      box-sizing: border-box;
      border-radius: 0.3rem;
      height: 0.5rem;
      background-color: #eee;
      width: 90%;
      .ipt{
        border: none;
        background-color: #eee;
        height: 0.5rem;
        width: 90%;
        outline: none;
    }
    .search_copy{
        line-height: 0.5rem;
        text-align: left;
        padding: 0 0.3rem;
    }
    }
     a{
        text-decoration: none;
        color: brown;
    }
}
.hotwords{
    // margin-top: 0.2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    ul{
        height: 0.6rem;
        line-height: 0.6rem;
        width: 1rem;
        background-color: #eee;
        text-align: center;
        color: brown;
        border-radius: 0.4rem;
        margin:0 0.1rem 0.2rem;
    }
    li{
        list-style: none;
        white-space: nowrap;
    }
}
.goodsList{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .goodsItem{
        width: 49%;
        margin-top: 0.2rem;
        .smallImg{
            width: 90%;
            height: 3.5rem;
            object-fit: cover;
        }
        .mktPrice{
            margin-left: 0.2rem;
        }
    }
}
</style>