<script setup lang="ts">
import { ref, computed } from 'vue'
import { getDepApi } from '@/serves/consult.d'
import type { DoctorDep } from '@/types/consultType'
import { useConsultStore } from '@/stores/consult'
const store = useConsultStore()

const active = ref(0)
const getDeplist = ref<DoctorDep[]>([])

const getDep = async () => {
  const deplist = await getDepApi()
  getDeplist.value = deplist.data
}
getDep()
const change = computed(() => {
  return getDeplist.value[active.value]?.child
})
</script>

<template>
  <div class="const-dep-page">
    <cp-nav-bar title="选择科室"></cp-nav-bar>
    <div class="wrapper">
      <van-sidebar v-model="active">
        <van-sidebar-item v-for="(item, index) in getDeplist" :key="index" :title="item.name" />
      </van-sidebar>
      <div class="sub-dep">
        <router-link
          @click="store.setDepId(item.id)"
          v-for="(item, index) in change"
          :key="index"
          to="/consult/illness"
          >{{ item.name }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.const-dep-page {
  padding-top: 46px;
  .wrapper {
    height: calc(100vh - 46px);
    overflow: hidden;
    display: flex;
    .sub-dep {
      flex: 1;
      height: 100%;
      overflow-y: auto;
      a {
        display: block;
        padding: 14px 30px;
        color: var(--cp-dark);
      }
    }
  }
  .van-sidebar {
    width: 114px;
    &-item {
      padding: 14px;
      color: var(--cp-tag);
      &--select {
        color: var(--cp-main);
        font-weight: normal;
        &::before {
          display: none;
        }
      }
    }
  }
}
</style>
