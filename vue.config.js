/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-10-20 20:11:58
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-10-25 11:23:11
 */

// const ScriptSetup = require('unplugin-vue2-script-setup/webpack').default
// module.exports = {
//   parallel: false,
//   configureWebpack: {
//     plugins: [
//       // ScriptSetup({ /* options */ }),
//     ],
//   },
//   chainWebpack (config) {
//     // disable type check and let `vue-tsc` handles it
//     config.plugins.delete('fork-ts-checker')
//   },
// }
module.exports = {
	transpileDependencies: ['uview-ui'],
}
