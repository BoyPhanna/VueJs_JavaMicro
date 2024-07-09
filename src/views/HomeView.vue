<script setup>
import UserLayout from './layout/UserLayout.vue';
import CEO from '@/assets/ceo.jpg'
import Smile from '@/assets/icon/smile.svg'

import { useAccountStore } from '@/stores/account.js'
import { onMounted } from 'vue';
const accountStore = useAccountStore()
onMounted(async () => {
  await accountStore.runSystem()
})
</script>

<template>
  <UserLayout>
    <div class="hero min-h-[500px]">
      <div class="hero-content flex-col lg:flex-row mt-[150px]">
        <!-- <img :src="IconHome" class="max-w-sm rounded-lg shadow-2xl" /> -->
        <img :src="CEO" class="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 class="text-7xl font-bold flex ">Love Microfinance RGB
            <sup>
              <img :src="Smile" class="w-6 h-6 mt-[20px]" />
            </sup>
          </h1>
        </div>
      </div>
    </div>
  </UserLayout>
</template>
