<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const emit = defineEmits(['click-right'])
const onClickLeft = () => {
  if (props.back) {
    return props.back()
  }
  if (history.state?.back) {
    router.back()
  } else {
    router.push('/home')
  }
}
const onClickRight = () => {
  emit('click-right')
}
const props = defineProps<{
  title?: string
  text?: string
  back?: () => void
}>()
</script>

<template>
  <van-nav-bar
    @click-left="onClickLeft"
    :title="title"
    @click-right="onClickRight"
    left-arrow
    fixed
    :right-text="text"
  />
</template>

<style lang="scss" scoped>
::v-deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }

    &__text {
      font-size: 15px;
    }
  }
}
</style>
