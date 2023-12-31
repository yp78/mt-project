<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { FormConsult, Image } from '@/types/consultType'
import type { UploaderAfterRead, UploaderFileListItem } from 'vant/lib/uploader/types'
import { uploadImage } from '@/serves/consult.d'
import { childtime, FlagType } from '@/enum/index'
import { showToast, showConfirmDialog } from 'vant'
import { useRouter } from 'vue-router'
import { useConsultStore } from '@/stores/consult'
const store = useConsultStore()
const router = useRouter()
const form = ref<FormConsult>({
  illnessDesc: '',
  illnessTime: undefined,
  consultFlag: undefined,
  pictures: []
})

const disabledStatus = computed(() => {
  return (
    !form.value.illnessDesc ||
    form.value.illnessTime === undefined ||
    form.value.consultFlag === undefined
  )
})

const timeOptions = [
  { label: '一周内', value: childtime.week },
  { label: '一月内', value: childtime.month },
  { label: '半年内', value: childtime.helfyear },
  { label: '大于半年', value: childtime.year }
]

const flagOptions = [
  { label: '就诊过', value: FlagType.diag },
  { label: '没就诊过', value: FlagType.wdia }
]
// 保存的是上传的图片
const fileList = ref<Image[]>([])

onMounted(async () => {
  if (store.consult.illnessDesc) {
    await showConfirmDialog({
      title: '温馨提示',
      message: '是否恢复您之前填写的病情信息呢？',
      confirmButtonColor: 'var(--cp-primary)',
      closeOnPopstate: false
    })

    const { illnessDesc, illnessTime, consultFlag, pictures } = store.consult
    form.value = { illnessDesc, illnessTime, consultFlag, pictures }
    // 图片回显
    fileList.value = pictures || []
  }
})

// 上传图片
const afterRead: UploaderAfterRead = async (item: any) => {
  if (!item.file) return

  item.status = 'uploading'
  item.message = '上传中...'

  try {
    const fileRes = await uploadImage(item.file)
    form.value.pictures?.push(fileRes.data)
    item.url = fileRes.data.url
    item.status = 'done'
    item.message = ''
  } catch {
    item.status = 'failed'
    item.message = '上传失败'
  }
}
// 删除图片
const onDeleteImg = (item: UploaderFileListItem) => {
  form.value.pictures = form.value.pictures?.filter((pic) => pic.url != item.url)
}
const next = () => {
  // 校验提示
  if (!form.value.illnessDesc) return showToast('请输入病情描述')
  if (form.value.illnessTime === undefined) return showToast('请选择症状持续时间')
  if (form.value.consultFlag === undefined) return showToast('请选择是否已经就诊')

  // 将病情描述数据存储到pinia
  store.setIllness(form.value)
  // 跳转到选择患者页面
  router.push('/user/patient?isChange=1')
}
</script>

<template>
  <div class="consult-illness-page">
    <cp-nav-bar title="图文问诊"></cp-nav-bar>
    <div class="top van-hairline--bottom">
      <img src="@/assets/avatar-doctor.svg" alt="" />
      <div class="info">
        <p class="tit">在线医⽣</p>
        <p class="tip">请描述你的疾病或症状、是否⽤药、就诊经历，需要我听过什么样的帮助</p>
        <p class="safe"><cp-icons name="consult-safe" /><span>内容仅医⽣可⻅</span></p>
      </div>
    </div>
    <div class="illness-form">
      <van-field
        v-model="form.illnessDesc"
        type="textarea"
        rows="3"
        placeholder="请详细描述您的病情，病情描述不能为空"
      ></van-field>
      <div class="item">
        <p>本次患病多久了？</p>
        <cp-radio-btn :options="timeOptions" v-model="form.illnessTime"></cp-radio-btn>
      </div>
      <div class="item">
        <p>此次病情是否去医院就诊过？</p>
        <cp-radio-btn :options="flagOptions" v-model="form.consultFlag"></cp-radio-btn>
      </div>
      <div class="illness-image">
        <van-uploader
          :max-size="5 * 1024 * 1024"
          max-count="9"
          upload-icon="photo-o"
          upload-text="上传图片"
          :after-read="afterRead"
          v-model="fileList"
          @delete="onDeleteImg"
        />
        <div class="tip" v-if="fileList.length <= 0">上传内容仅医生可见,最多9张图,最大5MB</div>
      </div>

      <div class="btn">
        <van-button @click="next" :class="{ disabled: disabledStatus }" type="primary" block round
          >下一步</van-button
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-illness-page {
  padding-top: 46px;
  .top {
    display: flex;
    padding: 15px;
    .img {
      width: 52px;
      height: 52px;
      border-radius: 4px;
      overflow: hidden;
      margin-top: 10px;
    }
    .info {
      flex: 1;
      padding-left: 12px;
      .tit {
        font-size: 16px;
        margin-bottom: 5px;
      }
      .tip {
        padding: 12px;
        background: var(--cp-bg);
        color: var(--cp-text3);
        font-size: 13px;
        margin-bottom: 10px;
      }
      .safe {
        font-size: 10px;
        color: var(--cp-text3);
        display: flex;
        align-items: center;
        .cp-icon {
          font-size: 12px;
          margin-right: 2px;
        }
      }
    }
  }
  .illness-form {
    padding: 15px;
    .van-field {
      padding: 0;
      &::after {
        border-bottom: none;
      }
    }
    .item {
      > p {
        color: var(--cp-text3);
        padding: 15px 0;
      }
    }
  }

  .illness-image {
    padding: 15px;
    display: flex;
    align-items: center;

    .tip {
      font-size: 12px;
      color: var(--cp-tip);
    }

    ::v-deep() {
      .van-uploader {
        &__preview {
          &-delete {
            left: -6px;
            top: -6px;
            border-radius: 50%;
            background-color: var(--cp-primary);
            width: 20px;
            height: 20px;
            &-icon {
              transform: scale(0.9) translate(-22%, 22%);
            }
          }
          &-image {
            border-radius: 8px;
            overflow: hidden;
          }
        }
        &__upload {
          border-radius: 8px;
        }
        &__upload-icon {
          color: var(--cp-text3);
        }
      }
    }
  }
}
</style>
