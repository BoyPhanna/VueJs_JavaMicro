<script setup>
import UserLayout  from './layout/UserLayout.vue';
import CEO from '@/assets/ceo.jpg'
import {useAccountStore} from '@/stores/account.js'
import { onMounted } from 'vue';
const accountStore=useAccountStore()
onMounted(async()=>{
  await accountStore.runSystem()
})
</script>

<template>

<UserLayout>

  <div class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col lg:flex-row">
    <img :src="CEO" class="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 class="text-7xl font-bold">Love Microfinance RGB</h1>
    
    </div>
  </div>
</div>
</UserLayout>

</template>
