import layside from '../../components/home/lay-aside'
import layheader from '../../components/home/lay-header'
import breadCrumb from '../../components/common/bread-crumb'
export default {
  install (Vue) {
    Vue.component('layside', layside)
    Vue.component('layheader', layheader)
    Vue.component('bread-crumb', breadCrumb)
  }
}
