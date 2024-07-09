<script setup>
import UserLayout from "../layout/UserLayout.vue";

import { useLandTitleStore } from '@/stores/landTitle.js'
import { onMounted, watch, ref } from 'vue'
import Swal from 'sweetalert2'
const landTitleStore = useLandTitleStore()
const search = ref('')
watch(search, () => {
  console.log(search.value)
  landTitleStore.landTitleFilter = landTitleStore.landTitles.filter(landTitle => {
    let numberPattern = /^-?\d+(\.\d+)?$/;
    if (numberPattern.test(search.value)) {
      // console.log("number")
      // console.log(`${client.id} = ${search.value} : ${client.id===Number(search.value)}`)
      return landTitle.id.toString().includes(search.value)
    }

    return landTitle.firstOwner.includes(search.value)
  })
})

onMounted(async () => {

  try {
    await landTitleStore.loadLandTitles();
    landTitleStore.landTitleFilter = landTitleStore.landTitles;
  }
  catch (error) {
    console.log('error ', error)
  }
})

const deleteLandTitle = (id) => Swal.fire({
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
    <div class="flex justify-end pr-10 mt-[10px]">
      <div class="flex-none gap-2">
        <div class="form-control w-[300px] h-[45px] mr-[10px]">
          <input v-model="search" type="text" placeholder="Search"
            class="input input-bordered w-24 md:w-auto border-2 rounded-xl" />
        </div>
      </div>
      <!-- class="btn btn-info" -->
      <RouterLink :to="{ name: 'add-landTitles' }"
        class="p-[10px] bg-primary text-white pl-[15px] pr-[15px] rounded-xl">New</RouterLink>
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
          <tr v-if="landTitleStore.landTitleFilter.length === 0">
            <td colspan="11" class="text-center text-[16px] font-semibold text-gray-500">No land title available</td>
          </tr>
          <tr v-else v-for="(landTitle, index) in landTitleStore.landTitleFilter" :key="landTitle.id">
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
              <button @click="deleteLandTitle(landTitle.id)" class="btn btn-error mr-11">
                Delete
              </button>
            </td>
            <td>
              <RouterLink :to="{ name: 'landTitle-update', params: { id: landTitle.id } }"
                class="btn btn-accent mr-11 text-white bg-[#008000ab] hover:bg-[#00800063]">
                Edit
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </UserLayout>

</template>