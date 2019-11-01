<template>
             <!--轮播图-->
   <div class="swiper">
      <mt-swipe :auto="3000">
        <mt-swipe-item v-for='(item,index) in swiperList' :key='index' >
          <img v-lazy="item.addr"/>
        </mt-swipe-item>
      </mt-swipe>
   </div>
</template>

<script>
    export default {
        data() {
            return {
               swiperList:[],
            }
        },
        methods: {
          // 请求获取轮播图
         reqSwiperItems(){
            this.$axios.get('/lijiang/api/ec-api/api',{
              params:{
                 app_key: 'mujiryohin',
                  method: 'mapi.mobilead.ad.slideshow',
                  getType: 'slidedata',
                  sign: '428FFE5728F2E7B7F22EF57C23E6A5EE'
              }
            })
            .then((res)=>{
              
              const {code,msg,data}=res
              this.swiperList = data.response
            })
          }
        },
        mounted() {
           this.reqSwiperItems()
        },
    }
</script>

<style lang="scss" scoped>
     .swiper{
      height: 3rem;
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
				background-color: #ddd;
				opacity: 1; 

				&.is-active{
					background-color: #000;
				}
			}
		}
  }
</style>