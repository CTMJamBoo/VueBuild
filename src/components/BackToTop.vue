<template>
    <img v-show="isBack" class="backToTop" src="@/assets/img/backToTop.png" alt="" @click="backToTop" />
</template>
<script>
    export default {
        data(){
            return {
                isBack: false
            }
        },
        props: {
            scrollObj: {
                type: null, // 任何类型
                default: () => window // 如果类型是对象或者数组，必须通过一个函数返回默认值
            }
        },
        methods: {
            // 点击回到顶部
			backToTop(){
				this.scrollObj.scrollTo(0,0)
            },
            // 监听页面或者容器的滚动
            onScroll(){
                // 监听页面滚动
                this.scrollObj.onscroll = () => {

                    // 获取滚动对象
                    const scrollObj = this.scrollObj

                    // 获取滚动距离
                    const scrollTop = scrollObj == window ? (document.documentElement.scrollTop || document.body.scrollTop) : scrollObj.scrollTop

                    this.isBack = scrollTop > 500
                }                
            }            
        },
        mounted(){
            this.onScroll()
        },
        watch: {
            // 监听传入的滚动对象
            scrollObj(newVal,oldVal){
                this.onScroll()            
            }
        }
    }
</script>

<style lang="scss" scoped>
    .backToTop{
		width: 0.48rem;
		height: 0.48rem;
		position: fixed;
		right: 0.4rem;
		bottom: 1rem;
		// background-image: url('@/assets/img/backToTop.png');
		background-size: cover;
        // background-color: #fff;
	}
</style>