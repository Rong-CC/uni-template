<!--
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-10-20 19:55:51
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-10-25 11:57:24
-->
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	mpType: 'app',
	onLaunch() {
		const a = {
			q: 1,
		}
		console.log('App Launch', a)
	},
	onShow() {
		console.log('App Show')
	},
	onHide() {
		console.log('App Hide')
	},
})
</script>

<style>
/*每个页面公共css */
</style>
<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import 'uview-ui/index.scss';
</style>
