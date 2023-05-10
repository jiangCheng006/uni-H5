// 一些基本的数据
const base = {
	// #ifdef H5
	HOST: 'https://ygj-base-client-dev.dev.lishicloud.com',
	// #endif
	// #ifndef H5
	// #endif
}

const install = function (Vue, opts = {}) {
  if (install.installed) return
  Vue.prototype.$base = base
}

module.exports = {
  version: '1.0.0',
	install,
  base
}
