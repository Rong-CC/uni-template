<!--
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-10-20 19:55:51
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-10-24 19:46:28
-->
<template>
	<view class="content">
		<!-- <image class="logo" src="../../static/logo.png"></image> -->
		<view>
			<text class="title">{{ title }}</text>
		</view>
	</view>
</template>

<script>
import { defineComponent, reactive, ref, toRefs } from '@vue/composition-api'
import { onReady } from '@dcloudio/uni-app'
import request from '@/utils/request/index'
export default defineComponent({
	setup() {
		const title = ref('Hello')
		const state = reactive({
			name: '',
		})
		onReady(() => {
			console.log('onReady')
			console.log(request, 'resquest')
			request.get('/').then((res) => {
				console.log(res, '1')
			})
		})
		return {
			title,
			...toRefs(state),
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
