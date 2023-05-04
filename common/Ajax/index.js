import ajax from './ajax.js'

const install = function (Vue, opts = {}) {
  if (install.installed) return
  Vue.prototype.$ajax = ajax
}

module.exports = {
  version: '1.0.0',
  install,
  ajax
}
