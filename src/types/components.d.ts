import cpNavBar from '@/components/cp-nav-bar.vue'
import cpIcons from '@/components/cp-icons.vue'
declare module 'vue' {
  interface GlobalComponents {
    cpNavBar: typeof cpNavBar
    cpIcons: typeof cpIcons
  }
}
