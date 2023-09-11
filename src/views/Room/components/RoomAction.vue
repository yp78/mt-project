<script setup lang="ts">
import { ref } from 'vue'
import { uploadImage } from '@/serves/consult.d'
import type { Image } from '@/types/consultType'

import { showLoadingToast, closeToast, showToast } from 'vant'

const text = ref('')
const emit = defineEmits<{
  (e: 'send-text', text: string): void
  (e: 'send-image', img: Image): void
}>()
const sendText = () => {
  if (text.value.trim() === '') {
    return showToast('请输入内容')
  }
  emit('send-text', text.value)
  text.value = ''
}
defineProps<{
  disabled: boolean
}>()

const afterRead = async (data: any) => {
  if (!data.file) return
  showLoadingToast({
    message: '正在上传',
    forbidClick: true
  })
  const res = await uploadImage(data.file)
  closeToast()
  emit('send-image', res.data)
}
</script>

<template>
  <div class="room-action">
    <van-field
      :disabled="disabled"
      v-model="text"
      type="text"
      class="input"
      :border="false"
      placeholder="问医⽣"
      autocomplete="off"
      @keyup.enter="sendText"
    ></van-field>
    <van-uploader :preview-image="false" :disabled="disabled" :after-read="afterRead">
      <cp-icons name="consult-img" />
    </van-uploader>
  </div>
</template>

<style lang="scss" scoped>
.room-action {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 1;
  box-sizing: border-box;
  .input {
    background-color: var(--cp-bg);
    border: none;
    border-radius: 25px;
    margin-right: 10px;
    padding: 8px 15px;
  }
  .cp-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
