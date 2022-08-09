import autoImport from 'unplugin-auto-import/vite'

export default function createAutoImport() {
  return autoImport({
    imports: [
      'vue',
      'vue-router',
      'pinia',  // 移除vuex 切换pinia
    ],
    dts: false
  })
}
