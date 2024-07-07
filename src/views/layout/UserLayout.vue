<script setup>
import { ref } from 'vue';
import { watch } from 'vue';
import { useDepartmentStore } from '@/stores/department.js';
import MenuIcon from '@/views/components/MenuIcon.vue'
const searchText=ref('')
const departmentStore=useDepartmentStore()
watch(searchText, (newText) => {
  departmentStore.searchId=newText
})
</script>

<template>

<div class="drawer drawer-start">
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <div class="navbar bg-gray-200 border-1  px-12">
        <div class="flex-1">
          <label for="my-drawer-4" class="drawer-button btn btn-ghost ">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </label>
        </div>
        
      </div>
      <!-- Content -->
      <slot></slot>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 min-h-full bg-white text-base-content">
        <div class="h-[50px] mt-[-2px] flex justify-center border-b-2 ">
          <p class="text-[25px] text-black font-bold uppercase relative">love Microfinance <sup class="text-[10px] absolute top-0">RGb</sup></p> 
        </div>
        <!-- Sidebar content here -->
        <div class="text-[25px] flex mb-[15px] font-bold mt-[25px]">Menu List</div>
        <li>
          <RouterLink :to="{ name: 'home' }">
            <a class="justify-between text-[20px] text-black mb-[10px] flex ">
               <img alt="Vue logo" class="w-5 h-5 mr-[2px]" src="@/assets/icon/house-solid.svg"  />
               <p class="ml-[10px]">Home</p> 
            </a>
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'department' }">
            <!-- <a class="justify-between text-[20px] text-black mb-[10px]"> Department </a>
              -->
              <a class="justify-between text-[20px] text-black mb-[10px] flex ">
               <img alt="Vue logo" class="w-5 h-5 mr-[2px]" src="@/assets/icon/department.svg"  />
               <p class="ml-[10px]">Department</p> 
            </a>

          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'all-client-info' }">
            <!-- <a class="text-[20px] text-black mb-[10px]">Clients</a> -->
            <a class="justify-between text-[20px] text-black mb-[10px] flex ">
               <img alt="Vue logo" class="w-5 h-5 mr-[2px]" src="@/assets/icon/client.svg"  />
               <p class="ml-[10px]">Clients</p> 
            </a>
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'all-landTitles' }">
            <!-- <a class="text-[20px] text-black mb-[10px]">Land Titles</a> -->
            <a class="justify-between text-[20px] text-black mb-[10px] flex ">
               <img alt="Vue logo" class="w-5 h-5 mr-[2px]" src="@/assets/icon/land.svg"  />
               <p class="ml-[10px]">Land Titles</p> 
            </a>
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'all-account' }">
            <!-- <a class="text-[20px] text-black mb-[10px]">Accounts</a> -->
            <a class="justify-between text-[20px] text-black mb-[10px] flex ">
               <img alt="Vue logo" class="w-5 h-5 mr-[2px]" src="@/assets/icon/account.svg" />
               <p class="ml-[10px]">Accounts</p> 
            </a>
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'account-pay' }">
            <!-- <a class="text-[20px] text-black mb-[10px]">Accounts</a> -->
            <a class="justify-between text-[20px] text-black mb-[10px] flex ">
               <img alt="Vue logo" class="w-5 h-5 mr-[2px]" src="@/assets/icon/payment.svg" />
               <p class="ml-[10px]">Payment</p> 
            </a>
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'loan-over-due' }">
            <!-- <a class="text-[20px] text-black mb-[10px]">Accounts</a> -->
            <a class="justify-between text-[20px] text-black mb-[10px] flex ">
               <img alt="Vue logo" class="w-5 h-5 mr-[2px]" src="@/assets/icon/overdue.svg" />
               <p class="ml-[10px]">Loan Over due</p> 
            </a>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>

</template>

  