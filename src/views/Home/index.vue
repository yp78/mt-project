<script setup lang="ts">
import { ref } from 'vue'
import KnowledgeList from './components/KnowledgeList.vue'
import { useConsultStore } from '@/stores/consult'
import { typelist } from '@/enum/index'

const store = useConsultStore()
const active = ref(1)
</script>

<template>
  <div class="home-page">
    <div class="home-page-top">
      <div class="min">
        <h2 style="color: #fff">优医</h2>
        <div class="search"><cp-icons name="home-search" /> 搜⼀搜：疾病/症状/医⽣/健康知识</div>
      </div>
    </div>
    <van-grid class="main" :border="false" :column-num="3">
      <van-grid-item to="/">
        <cp-icons name="home-doctor"></cp-icons>
        <p class="p1">问医生</p>
        <p class="p2">按科室查问医⽣</p>
      </van-grid-item>
      <van-grid-item to="/consult/fast" @click="store.setType(typelist.inquiry)">
        <cp-icons name="home-graphic"></cp-icons>
        <p class="p1">极速问诊</p>
        <p class="p2">20s医⽣极速回复</p>
      </van-grid-item>
      <van-grid-item to="/consult/fast">
        <cp-icons name="home-prescribe"></cp-icons>
        <p class="p1">开药⻔诊</p>
        <p class="p2">线上买药更⽅便</p>
      </van-grid-item>
    </van-grid>
    <van-grid class="nav" :border="false" :column-num="4">
      <van-grid-item to="/">
        <cp-icons name="home-order"></cp-icons>
        <p>药品订单</p>
      </van-grid-item>
      <van-grid-item to="/">
        <cp-icons name="home-docs"></cp-icons>
        <p>健康档案</p>
      </van-grid-item>
      <van-grid-item to="/">
        <cp-icons name="home-rp"></cp-icons>
        <p>我的处方</p>
      </van-grid-item>
      <van-grid-item to="/">
        <cp-icons name="home-find"></cp-icons>
        <p>疾病查询</p>
      </van-grid-item>
    </van-grid>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img src="@/assets/ad.png" alt="" />
      </van-swipe-item>
      <van-swipe-item> <img src="@/assets/ad.png" alt="" /></van-swipe-item>
    </van-swipe>
    <van-tabs v-model:active="active" shrink line-width="20px" sticky>
      <van-tab title="关注"><KnowledgeList type="like"></KnowledgeList></van-tab>
      <van-tab title="推荐"><KnowledgeList type="recommend"></KnowledgeList></van-tab>
      <van-tab title="减脂"><KnowledgeList type="fatReduction"></KnowledgeList></van-tab>
      <van-tab title="饮食"><KnowledgeList type="food"></KnowledgeList></van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  box-sizing: border-box;
  padding-bottom: 50px;
  &-top {
    height: 80px;
    border-radius: 0 0 20px 20px;
    background: linear-gradient(#52d4ce, #45c3c9);
    box-sizing: border-box;
    padding: 15px 9px 0;
    margin-bottom: 40px;
    .min {
      line-height: 30px;
      h2 {
        margin-bottom: 10px;
      }
      .search {
        background-color: #fff;
        box-shadow: 0 5px 8px 3px #ccc;
        height: 40px;
        line-height: 40px;
        border-radius: 20px;
        padding: 0 20px;
        color: var(--cp-dark);
        .cp-icon {
          font-size: 1.1em;
        }
      }
    }
  }
  .main {
    .cp-icon {
      font-size: 4em;
    }
    .p1 {
      font-weight: bold;
      font-size: 1.1em;
    }
    .p2 {
      font-size: 0.9em;
      color: var(--cp-dark);
    }
  }
  .nav {
    .cp-icon {
      font-size: 2.5em;
    }
  }
  .van-tabs {
    margin-top: 10px;
  }
  .my-swipe .van-swipe-item {
    box-sizing: border-box;
    padding: 0 15px;
    height: 100px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
