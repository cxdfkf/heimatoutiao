import layside from '../../components/home/lay-aside'
import layheader from '../../components/home/lay-header'
import breadCrumb from '../../components/common/bread-crumb'
import coverImg from './publish/cover-img'
import selectImg from './publish/select-img'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  install (Vue) {
    Vue.component('layside', layside)
    Vue.component('layheader', layheader)
    Vue.component('bread-crumb', breadCrumb)
    Vue.component('quill-editor', quillEditor)
    Vue.component('cover-img', coverImg)
    Vue.component('select-img', selectImg)
  }
}
