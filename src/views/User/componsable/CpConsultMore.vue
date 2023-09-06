<script setup lang="ts">
import { ref, computed } from 'vue'
const props = defineProps<{ disabled?: boolean }>()
const showPopover = ref(false)
const emit = defineEmits(['on-delete', 'on-preview'])
const actions = computed(() => [
  { text: '查看处⽅', disabled: props.disabled },
  { text: '删除订单' }
])
const onSelect = (action: { text: string }, i: number) => {
  if (i === 0) {
    emit('on-preview')
  }
  if (i === 1) {
    // 删除
    emit('on-delete')
  }
}
</script>

<template>
  <div class="cp-consult-more">
    <van-popover
      placement="top-start"
      v-model:show="showPopover"
      :actions="actions"
      @select="onSelect"
    >
      <template #reference> 更多 </template>
    </van-popover>
  </div>
</template>

<style lang="scss" scoped>
.cp-consult-more {
  flex: 1;
  color: var(--cp-tag);
}
</style>
