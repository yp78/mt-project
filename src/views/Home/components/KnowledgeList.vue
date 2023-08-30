<script setup lang="ts">
import KnowledgeCard from './KnowledgeCard.vue'
import { getKnowledge } from '@/serves/Knowledge'
import type { KnowledgeParams, KnowledgeType, Knowledge } from '@/types/KnowledgeType'
import { ref, reactive } from 'vue'
import Follow from './FollowDoctor.vue'

const props = defineProps<{ type: Knowledge }>()

const list = ref<KnowledgeType[]>([])

const loading = ref(false)
const finished = ref(false)
const Knowledgelist = reactive<KnowledgeParams>({
  type: props.type,
  current: 1,
  pageSize: 10
})

const onLoad = async () => {
  const getKnowRes = await getKnowledge(Knowledgelist)
  list.value.push(...getKnowRes.data.rows)
  if (Knowledgelist.current >= getKnowRes.data.pageTotal) {
    finished.value = true
  } else {
    Knowledgelist.current++
    loading.value = false
  }
}
</script>

<template>
  <div>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <Follow v-if="type == 'like'"></Follow>
      <KnowledgeCard
        class="kowledage-list-page"
        v-for="(item, index) in list"
        :key="index"
        :item="item"
      ></KnowledgeCard>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.kowledage-list-page {
  padding: 0 6px;
}
</style>
