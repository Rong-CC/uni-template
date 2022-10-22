<!--
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-10-20 19:55:51
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-10-21 21:28:40
-->
<template>
	<view class="content">
		<!-- <image class="logo" src="../../static/logo.png"></image> -->
		<view>
			<text class="title">{{ title }}</text>
			<!-- <text class="title">{{title1}}</text> -->
		</view>
	</view>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import { onReady } from '@dcloudio/uni-app'
export default defineComponent({
	setup() {
		const title = ref('Hello')
		onReady(() => {
			console.log('onReady')
		})
		return {
			title,
		}
	},
})
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin: 200rpx auto 50rpx auto;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>
