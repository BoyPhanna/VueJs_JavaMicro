<script setup>
import { ref } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import { useAccountStore } from '@/stores/account';
const route=useRoute()
const router=useRouter()
const accountStore=useAccountStore()
const choseTap=(n)=>{
    accountStore.chose=n;
    switch(n){
        case 0:
            router.push(`/account/${route.params.id}`)
        break
        case 1:
            router.push(`/account/history/${route.params.id}`)
        break
        case 2:
            router.push(`/account/scheduleclient/${route.params.id}`)
        break
        case 3:
            router.push(`/account/pay/history/${route.params.id}`)
        break
    }
}
</script>

<template>
 <div role="tablist" class="tabs tabs-boxed">
            <a @click="choseTap(0)" role="tab" :class="accountStore.chose===0?'tab tab-active':'tab'">Account infomation</a>
            <a @click="choseTap(1)" role="tab" :class="accountStore.chose===1?'tab tab-active':'tab'">Loan History</a>
            <a @click="choseTap(2)" role="tab" :class="accountStore.chose===2?'tab tab-active':'tab'">Schedule</a>
            <a @click="choseTap(3)" role="tab" :class="accountStore.chose===3?'tab tab-active':'tab'">History Payment</a>
        </div>
        <slot></slot>
</template>