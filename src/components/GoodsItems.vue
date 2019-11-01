<template>
    <div class="item">
		<div class="goodsItem" >
			<img class="smallImg" v-lazy="itemInfo.s_url" alt="">
				<p class="name">{{itemInfo.name}}</p>
				<p class="price-num">
					<span class="price red">￥{{parseInt(itemInfo.products.maxprice)}}</span>
					<span class="mktPrice gray">{{itemInfo.products.mktprice ? '￥'+parseInt(itemInfo.products.mktprice) : ''}}</span>
				</p>
		</div>
	</div>
</template>

<script>
    export default {
		props: ['itemInfo'],
		methods: {	
		},
		mounted() {
			// console.log(this.itemInfo.goodsImg.split(',')[0])
		},
    }
</script>

<style lang="scss" scoped>
// .red{
// 	color: red;
// }
// .gray{
// 	color: gray;
// 	text-decoration:line-through
// }
.goodsItem{
	padding-right: 0.2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	.name{
		width: 2rem;
		font-size: 0.2rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin: 0.2rem 0 0.1rem;
	}
	.smallImg{
		object-fit: cover;
		width: 2rem;
		height: 2rem;
	}
	.goodsName{
		margin-top: 0.2rem;
		font-size: 0.2rem;
	}
	.mktPrice{margin-left: 0.2rem}
}
</style>