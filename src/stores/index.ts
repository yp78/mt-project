import persist from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'
// 创建pinia实例
const pinia = createPinia()
// 使⽤pinia插件
pinia.use(persist)
// 导出pinia实例，给main使⽤
export default pinia
// export * from './user'
