<script setup>
import UserLayout from "../layout/UserLayout.vue";

import {useLandTitleStore} from '@/stores/landTitle.js'
import { onMounted} from 'vue'
import Swal from 'sweetalert2'
const landTitleStore = useLandTitleStore()


onMounted(async () => {

  try {
    await landTitleStore.loadLandTitles();
  
  
  }
  catch (error) {
    console.log('error ', error)
  }


})

const deleteLandTitle= (id)=>Swal.fire({
  title: "Do you want to Delete this land title?",
  showDenyButton: true,

  confirmButtonText: "Cancel",
  denyButtonText: `Delete`
}).then(async (result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    Swal.fire("Cancel!", "", "info");
  } else if (result.isDenied) {
    Swal.fire("Deleted", "", "success");
    await landTitleStore.deleteLandTitle(id)
    await landTitleStore.loadLandTitles()
  }
});
</script>
<template>
  
  <UserLayout>
    <div class="flex justify-end pr-10">
      <RouterLink :to="{name:'add-landTitles'}" class="btn btn-info">New</RouterLink>
    </div>
    <div class="stats shadow">
    </div>
    <div class="pl-[67px] pr-[50px] mb-[10px] text-[20px] font-bold">All Land Title</div>
    <div class="overflow-x-auto pl-[67px] pr-[50px]">
      <table class="table table-xl table-zebra">
        <thead>
          <tr class="text-[18px] bg-gray-200 rounded-xl">
            <th>No</th>
            <th>ID</th>
            <th>First Owner</th>
            <th>Second Owner</th>
            <th>Type</th>
            <th>Area</th>
            <th>Address</th>
            <th>Account ID</th>
            <th>Account Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(landTitle, index) in landTitleStore.landTitles" :key="landTitle.id">
            <th class="text-[16px] font-semibold">{{ index + 1 }}</th>
            <th class="text-[16px] font-semibold">{{ landTitle.id }}</th>
            <td class="text-[16px] font-semibold">{{ landTitle.firstOwner }}</td>
            <td class="text-[16px] font-semibold">{{ landTitle.secondOwner }}</td>
            <td class="text-[16px] font-semibold">{{ landTitle.type }}</td>
            <td class="text-[16px] font-semibold">{{ landTitle.area }}</td>
            <td class="text-[16px] font-semibold">{{ landTitle.address }}</td>
            <td class="text-[16px] font-semibold">{{ landTitle.accountId }}</td>
            <td class="text-[16px] font-semibold">{{ landTitle.accountName }}</td>
            <td>
              <button @click="deleteLandTitle(landTitle.id)"  class=" btn btn-error mr-11">
                Delete
              </button>
            </td>
            <td>
              <RouterLink :to="{ name: 'landTitle-update', params: { id: landTitle.id } }"
                class=" btn btn-accent mr-11  text-white bg-[#008000ab] hover:bg-[#00800063]">
                Edit
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </UserLayout>
  
</template>