<script setup lang="ts">
import type { KnowledgeType } from '@/types/KnowledgeType'
import { useFollow } from './index'
const { flaglink, loading } = useFollow('knowledge')
defineProps<{
  item: KnowledgeType
}>()
</script>

<template>
  <div class="Knowledge-page">
    <div class="top">
      <img :src="item.creatorAvatar" alt="" />
      <div class="mian">
        <h4>{{ item.creatorName }}</h4>
        <p style="color: var(--cp-dark); font-size: 0.9em" class="van-ellipsis">
          {{ item.creatorTitles }}
        </p>
      </div>
      <van-button :loading="loading" color="#43bec4" round plain @click="flaglink(item)">{{
        item.likeFlag === 1 ? '已关注' : '+ 关注'
      }}</van-button>
    </div>
    <h3>{{ item.title }}</h3>
    <p class="p"><span># 肥胖</span><span># 养生</span></p>
    <p style="color: var(--cp-dark)" class="van-multi-ellipsis--l2">
      {{ item.content.replace(/<[^>]+>/g, '') }}
    </p>
    <div class="imgs">
      <img v-for="(url, i) in item.coverUrl" :key="i" :src="url" alt="" />
    </div>
    <p>
      <span>{{ item.collectionNumber }} 收藏</span>
      <span>{{ item.commentNumber }} 评论</span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.Knowledge-page {
  padding: 10px;
  .top {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 10px;
    .van-button {
      height: 30px;
    }
    .mian {
      width: 60%;
    }
    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }
  }
  .p {
    color: var(--cp-primary);
    font-weight: bold;
    font-size: 0.9em;
    margin: 5px 0;
    span {
      margin-right: 10px;
    }
  }
  .imgs {
    display: flex;
    justify-content: space-between;
    height: 100px;
    margin: 10px 0;
    img {
      width: 32%;
      height: 100%;
      border-radius: 12px;
    }
  }
}
</style>
