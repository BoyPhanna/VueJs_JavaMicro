<script setup>
import UserLayout from "../layout/UserLayout.vue";

import { useClientStore } from '@/stores/client.js';
import { onMounted,watch,ref } from 'vue'
import Swal from 'sweetalert2'

const clientStore = useClientStore()
const search=ref('')
watch(search,()=>{
  console.log(search.value)
  clientStore.clientFilter=clientStore.clients.filter(client=>{
    let numberPattern = /^-?\d+(\.\d+)?$/;
    if(numberPattern.test(search.value)){
        // console.log("number")
        // console.log(`${client.id} = ${search.value} : ${client.id===Number(search.value)}`)
      return client.id.toString().includes(search.value)
    }
     
    return client.name.includes(search.value)
  })
})
onMounted(async () => {
  try {
    await clientStore.loadClients()
    clientStore.clientFilter=clientStore.clients
  
  
  }
  catch (error) {
    console.log('error ', error)
  }
})

const deleteClient= (id)=>Swal.fire({
  title: "Do you want to Delete this Client?",
  showDenyButton: true,

  confirmButtonText: "Cancel",
  denyButtonText: `Delete`
}).then(async (result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    Swal.fire("Cancel!", "", "info");
  } else if (result.isDenied) {
    Swal.fire("Deleted", "", "success");
    await clientStore.deleteClient(id)
    await clientStore.loadClients()
  }
});
</script>
<template>

<UserLayout>
    <div class="flex flex-row justify-between pr-[50px] pl-10">
      <div class="text-3xl font-bold  ml-[30px] mt-[10px]">All Clients</div>
      <div class="flex-none gap-2">
          <div class="form-control w-[300px] h-[40px] ">

            <input v-model="search" type="text" placeholder="Search"
              class="input input-bordered w-24 md:w-auto border-2 rounded-xl" />

          </div>
      </div>
      <RouterLink :to="{name:'add-new-client'}" class="btn btn-info bg-[#0000ffca] text-white capitalize hover:bg-[#0000ffa7] mt-[10px]">Add new client
      </RouterLink>
    </div>
    <div class="stats shadow">
    </div>
    <div class="overflow-x-auto pl-[70px] pr-[50px]">
      <table class="table table-xl  table-zebra">
        <thead >
          <tr class="text-[18px] bg-gray-200 rounded-xl">
            <th>No</th>
            <th>ID</th>
            <th>Name</th>
            <th>Sex</th>
            <th>Dob</th>
            <th>CID</th>
            <th>Address</th>
            <th>Job</th>
            <th>Salary</th>
            <th>Education</th>
            <th>Status</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(client, index) in clientStore.clientFilter" :key="client.id"
          >
            <th class="text-[16px]">{{ index + 1 }}</th>
            <th class="text-[16px]">{{ client.id }}</th>
            <td class="text-[16px]">{{ client.name }}</td>
            <td class="text-[16px]">{{ client.sex }}</td>
            <td class="text-[16px]">{{ client.dob }}</td>
            <td class="text-[16px]">{{ client.cid }}</td>
            <td class="text-[16px]">{{ client.address }}</td>
            <td class="text-[16px]">{{ client.job }}</td>
            <td class="text-[16px]">{{ client.salary }}</td>
            <td class="text-[16px]">{{ client.education }}</td>
            <td class="text-[16px]">{{ client.status }}</td>
            <td class="text-[16px]">{{ client.phone }}</td>
            <td>
  <button  v-if="!client.haveAccount"  @click="deleteClient(client.id)" class="p-[10px] bg-[red] hover:bg-[#ff000077] text-white font-semibold rounded-xl">
    Delete
  </button>
</td>
            <td>
              <RouterLink :to="{name:'update-client', params: { id: client.id }}"  class=" btn bg-[#008000af] mr-11 text-[white] hover:bg-[#00800052] ">
              Edit
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </UserLayout>
</template>
