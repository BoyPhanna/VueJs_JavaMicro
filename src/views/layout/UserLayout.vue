<script setup>
import { ref } from 'vue';
import { watch } from 'vue';
import { useDepartmentStore } from '@/stores/department.js';
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
    
<div class="navbar bg-green-950 px-12">
  <div class="flex-1">
    <label  for="my-drawer-4" class="drawer-button btn btn-ghost " >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </label>
  </div>
  <div class="flex-none gap-2">
    <div class="form-control">
      <input v-model="searchText" type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
    </div>
  </div>
</div>
<!-- Content -->
<slot></slot>

  </div> 
  <div class="drawer-side">
    <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
    <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      <!-- Sidebar content here -->
      <li><RouterLink :to="{ name: 'home' }">
              <a class="justify-between"> Home </a>
            </RouterLink></li>
      <li><RouterLink :to="{ name: 'department' }">
              <a class="justify-between"> Department </a>
            </RouterLink></li>
      <li><RouterLink :to="{name:'all-client-info'}">Clients</RouterLink></li>
      <li><RouterLink :to="{name:'all-landTitles'}">LandTitles</RouterLink></li>
      <li><RouterLink :to="{name:'all-account'}">Accounts</RouterLink></li>
      <li><RouterLink :to="{name:'account-pay'}">Payment</RouterLink></li>
      <li><RouterLink :to="{name:'loan-over-due'}">Loan Over due</RouterLink></li>
  
     
    </ul>
  </div>
</div>

</template>
