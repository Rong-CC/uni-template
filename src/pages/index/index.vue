<!--
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-10-20 19:55:51
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-10-25 14:03:15
-->
<template>
	<view class="content">
		<!-- <image class="logo" src="../../static/logo.png"></image> -->
		<view>
			<u-button>默认按钮</u-button>
			<u-button type="primary">主要按钮</u-button>
			<text class="title">{{ title }}</text>
		</view>
	</view>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { onReady } from '@dcloudio/uni-app'
import request from '@/utils/request/index'
// import uButton from 'uview-ui/components/u-button/u-button.vue'
interface requestDate {
	status: number
	data: any[]
	success: string
}
// interface stateData {
// 	name: string
// }
export default defineComponent({
	name: 'PageIndex',
	setup() {
		const title = ref('Hello')
		// const state = reactive<stateData>({
		// 	name: '',
		// })
		let a = 1
		a = 2
		console.log(a)
		onReady(() => {
			console.log('onReady')
			console.log(request, 'resquest')
			request.get('/').then((res: requestDate) => {
				const a = res
				console.log(a, '1')
			})
		})
		return {
			// ...toRefs(state),
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
