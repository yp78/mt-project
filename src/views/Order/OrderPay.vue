<script setup lang="ts">
import { getaddress, getOrderDetail, addressResponse } from '@/serves/Order.d'
import { useRoute } from 'vue-router'
import type { OrderRequest, OrderResponse } from '@/types/OrderType'
import { ref } from 'vue'

const details = ref<OrderResponse>()
const address = ref<addressResponse>()
const route = useRoute()
const resorder = ref<OrderRequest>({
  couponId: '',
  prescriptionId: route.query.id as string,
  useCoupon: '1'
})

const getOredr = async () => {
  const resaddress = await getaddress()
  const resDetail = await getOrderDetail(resorder.value)
  console.log('resaddress=>', resaddress)
  console.log('resDetail=>', resDetail)
  address.value = resaddress.data[0]
  details.value = resDetail.data
}
getOredr()
</script>

<template>
  <div class="order-pay-page">
    <cp-nav-bar title="药品支付"></cp-nav-bar>
    <div class="order-address">
      <p class="area">
        <van-icon name="location" />
        <span>{{ address?.city + address?.county }}</span>
      </p>
      <p class="detail">{{ address?.addressDetail }}</p>
      <p>
        {{ address?.receiver }}
        {{ address?.mobile.replace(/^(\d{3})\d(\d{4})$/, '\${3}****\${4}') }}
      </p>
    </div>
    <div class="order-medical">
      <div class="head">
        <h3>优医药房</h3>
        <small>优医质保 假⼀赔⼗</small>
      </div>
      <div class="item van-hairline--top" v-for="i in 2" :key="i">
        <img class="img" src="@/assets/ad.png" alt="" />
        <div class="info">
          <p class="name">
            <span>优赛明 维⽣素E乳</span>
            <span>x1</span>
          </p>
          <p class="size">
            <van-tag>处⽅药</van-tag>
            <span>80ml</span>
          </p>
          <p class="price">￥25.00</p>
        </div>
        <div class="desc">⽤法⽤量：⼝服，每次1袋，每天3次，⽤药3天</div>
      </div>
    </div>
    <div class="order-detail">
      <van-cell-group>
        <van-cell title="药品⾦额" value="￥50" />
        <van-cell title="运费" value="￥4" />
        <van-cell title="优惠券" value="-￥0" />
        <van-cell title="实付款" value="￥54" class="price" />
      </van-cell-group>
    </div>
    <div class="order-tip">
      <p class="tip">
        由于药品的特殊性，如⾮错发、漏发药品的情况，药品⼀经发出
        不得退换，请核对药品信息⽆误后下单。
      </p>
      <van-checkbox>我已同意<a href="javascript:;">⽀付协议</a></van-checkbox>
    </div>
    <van-submit-bar
      :price="50 * 100"
      button-text="⽴即⽀付"
      button-type="primary"
      text-align="left"
    ></van-submit-bar>
  </div>
</template>

<style lang="scss" scoped>
.order-pay-page {
  padding: 46px 0 100px;
  :deep(.van-nav-bar) {
    background-color: var(--cp-primary);

    .van-nav-bar__title,
    .van-nav-bar__arrow {
      color: #fff;
    }
  }

  :deep(.van-cell) {
    .van-cell__title {
      font-size: 16px;
    }
    .van-cell__value {
      font-size: 16px;
    }
    &.price {
      .van-cell__value {
        font-size: 18px;
        color: var(--cp-price);
      }
    }
  }
  :deep(.van-submit-bar) {
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    .van-button {
      width: 200px;
    }
  }
  .order-pay-page {
    padding: 46px 0 65px;
  }
  .order-address {
    padding: 15px 15px 0 15px;
    background-color: #fff;
    font-size: 13px;
    .area {
      color: var(--cp-tag);
      margin-bottom: 5px;
      .van-icon-location {
        color: #ff7702;
        font-size: 14px;
      }
    }
    .detail {
      font-size: 17px;
      margin-bottom: 5px;
    }
    &::after {
      content: '';
      display: block;
      height: 12px;
      background-color: var(--cp-bg);
      margin: 0 -15px;
      margin-top: 15px;
    }
  }
  .order-medical {
    background-color: #fff;
    padding: 0 15px;
    .head {
      display: flex;
      height: 54px;
      align-items: center;
      > h3 {
        font-size: 16px;
        font-weight: normal;
      }
      > small {
        font-size: 13px;
        color: var(--cp-tag);
        margin-left: 10px;
      }
    }
    .item {
      display: flex;
      flex-wrap: wrap;
      padding: 15px 0;
      .img {
        width: 80px;
        height: 70px;
        border-radius: 2px;
        overflow: hidden;
      }
      .info {
        padding-left: 15px;
        width: 250px;
        .name {
          display: flex;
          font-size: 15px;
          margin-bottom: 5px;
          > span:first-child {
            width: 200px;
          }
          > span:last-child {
            width: 50px;
            text-align: right;
          }
        }
        .size {
          margin-bottom: 5px;
          .van-tag {
            background-color: var(--cp-primary);
            vertical-align: middle;
          }
          span:not(.van-tag) {
            margin-left: 10px;
            color: var(--cp-tag);
            vertical-align: middle;
          }
        }
        .price {
          font-size: 16px;
          color: #eb5757;
        }
      }
      .desc {
        width: 100%;
        background-color: var(--cp-bg);
        border-radius: 4px;
        margin-top: 10px;
        padding: 4px 10px;
        color: var(--cp-tip);
      }
    }
  }
  .order-tip {
    padding: 0 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 10px;
    .tip {
      font-size: 12px;
      color: var(--cp-tag);
      width: 100%;
      &::before {
        content: '*';
        color: var(--cp-price);
        font-size: 14px;
      }
      margin-bottom: 30px;
    }
    .van-checkbox {
      a {
        color: var(--cp-primary);
      }
    }
  }
}
</style>
